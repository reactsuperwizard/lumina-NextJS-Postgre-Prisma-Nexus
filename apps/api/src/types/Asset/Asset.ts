import { objectType, extendType, arg, scalarType, nonNull } from 'nexus'
import { isLuminaAdmin } from '../../auth'
import { totalAssets } from './resolvers'

import S3 from '../../uploaders/s3'

import type { FileUpload } from 'graphql-upload'

export const Asset = objectType({
  name: 'Asset',
  description:
    'Asset managed and stored in midas db to associate unique, immutable id to cloudinary public id',
  definition(t) {
    t.model.id()
    t.model.publicId()
    t.model.url()
    t.model.folder()
    t.model.assetType()
    t.model.name()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

export const AssetQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.asset({ authorize: (_root, _args, ctx) => isLuminaAdmin(ctx) })
    t.crud.assets({
      ordering: true,
      pagination: true,
      filtering: true,
    })
    t.field('totalAssets', {
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      description: 'Total number of assets for use with pagination.',
      type: 'Count',
      args: {
        where: arg({ type: 'AssetWhereInput' }),
      },
      nullable: true,
      resolve: totalAssets,
    })
  },
})

export const AssetMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('assetUploadNew', {
      type: 'Asset',
      args: {
        file: nonNull(arg({ type: 'Upload' })),
      },
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: async (_root, args, ctx) => {
        // 1. Upload file
        // 2.1 Create Asset with bucket ID, etc. and pass to 2.2
        // 2.2 Trigger recognition function (async)
        // 2.2.1 update asset with tags from recognition
        // return asset
        // const { stream, filename, mimetype, encoding } = await file
        const file = args.file as FileUpload
        const res = await S3.singleFileUpload(file)
        // CHANGE THIS WITH A MIGRATION SO THAT SAVE S3 URLS UNDER A NEW PROPERTY
        const asset = ctx.prisma.asset.create({ data: { publicId: res.url } })
        return asset
      },
    })
    t.crud.createOneAsset({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateOneAsset({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteOneAsset({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
  },
})
