const { assets } = require('./assetJson')
const { folders } = require('./folders')
const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

const root = {
  id: 1,
  name: 'assets',
}

const getFolderId = async (publicId) => {
  const keys = publicId.split('/').slice(0, -1)
  if (keys.length < 1) return root.id
  const crawl = (keyArray, obj) => {
    const key = keyArray.shift()
    if (keyArray.length < 1) return obj[key].id
    return crawl(keyArray, obj[key])
  }
  return crawl(keys, folders)
}

const connectAsset = async (publicId) => {
  const folderId = await getFolderId(publicId)
  // get id for Asset from publicId or create new asset if it doesn't exist
  // console.log(`connecting ${publicId} to folder #${folderId}`)
  return folderId
}

const updateAssets = async () => {
  const _assets = assets
  for (let i = 0; i < assets.length; i++) {
    const a = _assets[i]
    const isInDb = await client.asset.findUnique({
      where: { publicId: a.publicId },
    })
    let assetType = a.resource_type === 'video' ? 'audio' : a.resource_type
    const newName = a.publicId.split('/').pop()
    const newFolderId = await getFolderId(a.publicId)
    a.folderId = newFolderId
    a.url = a.secure_url
    a.assetType = assetType
    a.name = newName
    if (isInDb) {
      await client.asset
        .update({
          where: { publicId: a.publicId },
          data: {
            name: newName,
            url: a.secure_url,
            assetType,
            folder: { connect: { id: newFolderId } },
          },
        })
        .then((data) => console.log(`${data.publicId} updated`))
    } else {
      await client.asset
        .create({
          data: {
            publicId: a.publicId,
            name: newName,
            url: a.secure_url,
            assetType,
            folder: { connect: { id: newFolderId } },
          },
        })
        .then((data) => console.log(`${data.publicId} created`))
    }
  }
  return _assets
}

module.exports.updateAssets = updateAssets
