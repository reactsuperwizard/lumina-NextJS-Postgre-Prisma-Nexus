const path = require('path')
// yarn node --inspect-brk node_modules/.bin/ts-node ./scripts/seedAssets.ts
import { PrismaClient } from '../node_modules/.prisma/client'
require('dotenv').config({ path: path.join(__dirname, '../.env.local') })
import { cloudinary } from '../src/types/Asset/cloudinary-client'
import _ from 'lodash'
import { pathToArray } from 'graphql/jsutils/Path'

const prisma = new PrismaClient()

/*
////////////////////////////
CAREFUL WITH THIS SCRIPT SO THAT YOU DON'T NUKE ALL OF THE PRODUCTION ASSETS
////////////////////////////
*/
const main = async () => {
  const { resources: images } = await cloudinary.v2.api.resources({
    max_results: 500,
  })
  // "video" includes audio assets for cloudinary...
  const { resources: videos } = await cloudinary.v2.api.resources({
    max_results: 500,
    resource_type: 'video',
  })
  const resources = [...images, ...videos]
  // create a new asset for every asset in cloudinary
  const cloudinaryPublicIds = resources.map(
    ({ public_id }: { public_id: string }) => {
      return public_id
    },
  )
  const existingAssets = await prisma.asset.findMany({
    where: { publicId: { in: cloudinaryPublicIds } },
  })
  const midasPublicIds = _.map(existingAssets, 'publicId')
  const missingPublicIds = _.without(cloudinaryPublicIds, ...midasPublicIds)
  missingPublicIds.forEach(async (publicId: string) => {
    try {
      const createdAsset = await prisma.asset.create({ data: { publicId } })
      console.log(
        `Created asset with publicId:${createdAsset.publicId} and id:${createdAsset.id}`,
      )
    } catch (e) {
      console.log(`Failed to create asset with ${publicId}`)
    }
  })

  // delete any asset in our database that is unattached to a cloudinary asset
  // const result = await prisma.asset.deleteMany({
  //   where: { publicId: { notIn: cloudinaryPublicIds } },
  // })
  // console.log(
  //   `Deleted ${result.count} assets that do not correlate to cloudinary assets.`,
  // )
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log(`Prisma disconnected`)
  })
