import { objectType, extendType, arg, intArg, floatArg } from 'nexus'

import {
  getCustomerResource,
  getCustomerResources,
  isLuminaAdmin,
  updateOneCustomerResource,
} from '../../auth'
import {
  createOneVideo,
  downloads,
  checkReady,
  producerId,
  thumbnail,
  totalVideos,
  updateOneVideo,
  updateThumbnail,
  updateVideoName,
  canRevise,
  customerId,
  scriptLayers,
  scriptId,
  scriptIdAndLayers,
} from './resolvers'

import { hashids } from '../../utils'

export const Video = objectType({
  name: 'Video',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.status()
    t.model.vimeoId()
    t.model.customerTenant()
    t.model.customer({ authorize: (_root, _args, ctx) => isLuminaAdmin(ctx) })
    t.model.orderId()
    t.model.order({ authorize: (_root, _args, ctx) => isLuminaAdmin(ctx) })
    t.model.request()
    t.model.script({ authorize: (_root, _args, ctx) => isLuminaAdmin(ctx) })
    t.model.publishedAt()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.jobUrl()
    t.model.ready()
    t.model.embedJobPage()
    t.model.rating()
    t.model.vanityButtonText({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.string('hash', { resolve: (root) => hashids.encode(root.id) })
    t.json('downloads', {
      description: 'Return the download options for a Vimeo video.',
      resolve: downloads,
    })
    t.boolean('checkReady', {
      description:
        'Return Vimeo status for a video, and update Video.ready when encoding is done.',
      resolve: checkReady,
    })
    t.string('thumbnail', {
      description: 'Return the thumbnail Vimeo video.',
      nullable: true,
      resolve: thumbnail,
    })
    t.int('producerId', {
      description: 'Return the id of the employee that scripted the video.',
      nullable: true,
      resolve: producerId,
    })
    t.json('scriptLayers', {
      description: 'Return the id of the employee that scripted the video.',
      resolve: scriptLayers,
    })
    t.int('scriptId', {
      description: 'Return the id of the employee that scripted the video.',
      resolve: scriptId,
    })
    t.jsonObject('scriptIdAndLayers', {
      description: 'Return the id of the employee that scripted the video.',
      resolve: scriptIdAndLayers,
    })
    t.boolean('canRevise', {
      description: 'Return the boolean of canRevise',
      resolve: canRevise,
    })
    t.int('customerId', {
      description: 'Return the id of the employee that scripted the video.',
      resolve: customerId,
    })
  },
})

export const VideoQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.video({ authorize: (_root, _args, ctx) => isLuminaAdmin(ctx) })
    t.crud.videos({
      ordering: true,
      pagination: true,
      filtering: true,
      // authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.field('totalVideos', {
      description: 'Total number of videos for use with pagination.',
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      type: 'Count',
      args: {
        where: arg({ type: 'VideoWhereInput' }),
      },
      nullable: true,
      resolve: totalVideos,
    })
    t.crud.video({
      alias: 'getCustomerVideo',
      resolve: getCustomerResource,
    })
    t.crud.videos({
      ordering: true,
      pagination: true,
      filtering: true,
      alias: 'getCustomerVideos',
      resolve: getCustomerResources,
    })
  },
})

export const VideoMutations = extendType({
  type: 'Mutation',
  definition(t) {
    // LUMINA ADMIN
    t.crud.createOneVideo({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: createOneVideo,
    })
    t.crud.updateOneVideo({
      // authorize: (_root, _args, ctx, _info) => isLuminaAdmin(ctx),
      resolve: updateOneVideo,
    })
    t.field('updateThumbnail', {
      type: 'Video',
      nullable: true,
      args: {
        id: intArg({
          description: 'Id of the video to be updated.',
          required: true,
        }),
        time: floatArg({
          description: 'Time to set the thumbnail to',
          required: false,
        }),
      },
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: updateThumbnail,
    })
    t.field('updateVideoName', {
      type: 'Video',
      nullable: true,
      args: {
        where: arg({ type: 'VideoWhereUniqueInput', required: true }),
        data: arg({ type: 'VideoUpdateInput', required: true }),
      },
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: updateVideoName,
    })
    t.crud.deleteOneVideo({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateManyVideo({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteManyVideo({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    // PORTAL
    t.crud.updateOneVideo({
      alias: 'updateOneCustomerVideo',
      resolve: updateOneCustomerResource('video'),
    })
  },
})
