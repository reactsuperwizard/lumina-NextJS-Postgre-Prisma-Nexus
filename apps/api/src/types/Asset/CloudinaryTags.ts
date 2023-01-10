import {
  objectType,
  inputObjectType,
  enumType,
  arg,
  extendType,
} from 'nexus'
import { isLuminaAdmin } from '../../auth'

import { getAssetTagsResolver } from './resolvers'

export const CloudinaryResourceType = enumType({
  name: 'CloudinaryResourceType',
  members: ['video', 'image', 'raw'],
  description:
    "Resource types for assets stored in Cloudinary.  Note: use 'video' for all audio assets, e.g. .mp3",
})

export const CloudinaryTagsInput = inputObjectType({
  name: 'CloudinaryTagsInput',
  description: 'Inputs to search for Cloudinary asset tags.',
  definition(t) {
    t.field('resource_type', { type: CloudinaryResourceType })
    t.string('prefix', {
      description: 'Search term used to search for tags by name.',
    })
    t.int('max_results', {
      default: 10,
      description: 'Number of results to return per page.  Max 500.',
    })
    t.string('next_cursor', {
      description: 'Cursor to return next page of results.',
    })
  },
})

export const CloudinaryTags = objectType({
  name: 'CloudinaryTags',
  definition(t) {
    t.string('tags', { list: [false], nullable: true })
    t.string('next_cursor', {
      description: 'Cursor to return next page of results.',
      nullable: true,
    })
  },
})

export const getAssetTags = extendType({
  type: 'Query',
  definition(t) {
    t.field('getAssetTags', {
      type: 'CloudinaryTags',
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      description:
        'Returns a paginated list of all tags used for all images stored in cloudinary.',
      args: { params: arg({ type: 'CloudinaryTagsInput', required: false }) },
      resolve: getAssetTagsResolver,
    })
  },
})
