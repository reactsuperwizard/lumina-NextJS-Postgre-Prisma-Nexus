const { assets } = require('./assetJson')
const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

const root = {
  id: 1,
  name: 'assets',
}

const createFolderInDb = async ({ name, parentId }) => {
  let newId
  await client.folder
    .create({ data: { name, parent: { connect: { id: parentId } } } })
    .then((result) => {
      newId = result.id
    })
  console.log(`${name} created as #${newId} in folder #${parentId}`)
  return newId
}

const createFolderIds = async (obj, name, parentId = root.id) => {
  if (name && !obj.id && name !== 'id' && name !== 'parentId') {
    const newId = await createFolderInDb({ name, parentId })
    obj.id = newId
    obj.parentId = parentId
  }
  const keyArray = Object.keys(obj)
  if (keyArray.length < 1) return
  for (let i = 0; i < keyArray.length; i++) {
    const key = keyArray[i]
    await createFolderIds(obj[key], key, obj.id || root.id)
  }
  return
}

const createFolders = async (folders) => {
  const foldersSet = new Set()
  const _folders = folders
  for (let i = 0; i < assets.length; i++) {
    const a = assets[i]
    foldersSet.add(a.publicId.split('/').slice(0, -1).join('/'))
  }
  const foldersArray = Array.from(foldersSet)
  foldersArray.forEach((f) => {
    const nameArray = f.split('/')
    if (!_folders[nameArray[0]]) _folders[nameArray[0]] = {}
    if (nameArray[1] && !_folders[nameArray[0]][nameArray[1]])
      _folders[nameArray[0]][nameArray[1]] = {}
    if (nameArray[2] && !_folders[nameArray[0]][nameArray[1]][nameArray[2]])
      _folders[nameArray[0]][nameArray[1]][nameArray[2]] = {}
  })
  await createFolderIds(_folders)
  return _folders
}

module.exports.createFolders = createFolders
