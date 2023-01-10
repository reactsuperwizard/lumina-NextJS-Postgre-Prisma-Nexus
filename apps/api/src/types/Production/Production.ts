import { extendType, arg, intArg, booleanArg, stringArg } from 'nexus'
import { isLuminaAdmin } from '../../auth'
import {
  activateCustomer,
  changeRequestOwner,
  createRender,
  createScript,
  createVideo,
  publishVideo,
  updateRender,
  updateUrl,
  sendSurveyData,
  customerScriptEdit,
} from './resolvers'

export const ProductionMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('changeRequestOwner', {
      type: 'Request',
      args: {
        whereUser: arg({
          type: 'UserWhereUniqueInput',
          nullable: true,
        }),
        whereRequest: arg({
          type: 'RequestWhereUniqueInput',
          nullable: false,
        }),
      },
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: changeRequestOwner,
    })
    t.field('createScript', {
      type: 'Script',
      args: {
        data: arg({
          type: 'ScriptCreateInput',
          nullable: false,
        }),
      },
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: createScript,
    })
    t.field('createVideo', {
      type: 'Video',
      args: {
        data: arg({
          type: 'VideoCreateInput',
          nullable: false,
        }),
      },
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: createVideo,
    })
    t.field('createRender', {
      type: 'Render',
      args: {
        data: arg({
          type: 'RenderCreateInput',
          nullable: false,
        }),
      },
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: createRender,
    })
    t.field('updateRender', {
      type: 'Render',
      args: {
        where: arg({
          type: 'RenderWhereUniqueInput',
          nullable: false,
        }),
        data: arg({
          type: 'RenderUpdateInput',
          nullable: false,
        }),
      },
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: updateRender,
    })
    t.field('publishVideo', {
      type: 'Video',
      nullable: true,
      args: {
        id: intArg({
          description: 'Id of the video to be published.',
          required: true,
        }),
        live: booleanArg({
          description: 'Is the video being published',
          required: true,
        }),
      },
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: publishVideo,
    })
    t.field('updateUrl', {
      type: 'Request',
      args: {
        data: arg({
          type: 'RequestUpdateInput',
          nullable: false,
        }),
        where: arg({
          type: 'RequestWhereUniqueInput',
          nullable: false,
        }),
      },
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: updateUrl,
    })
    t.field('activateCustomer', {
      type: 'Customer',
      args: {
        where: arg({
          type: 'CustomerWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: activateCustomer,
    })
    t.field('sendSurveyData', {
      type: 'Customer',
      args: {
        where: arg({
          type: 'CustomerWhereUniqueInput',
          nullable: false,
        }),
        brandReflection: stringArg({ required: true }),
        compelling: stringArg({ required: true }),
        attractTalent: stringArg({ required: true }),
        comments: stringArg({ required: true }),
      },
      resolve: sendSurveyData,
    })

    t.field('customerScriptEdit', {
      type: 'Script',
      args: {
        where: arg({
          type: 'ScriptWhereUniqueInput',
          nullable: false,
        }),
        customerId: intArg({ required: true }),
        userId: intArg({ required: true }),
      },
      resolve: customerScriptEdit,
    })
  },
})
