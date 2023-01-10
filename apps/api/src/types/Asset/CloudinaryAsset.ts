import {
  objectType,
  inputObjectType,
  enumType,
  arg,
  extendType,
  interfaceType,
} from 'nexus'
import { isLuminaAdmin } from '../../auth'

import {
  deleteAssetResolver,
  getAssetResolver,
  getAssetsResolver,
  updateAssetResolver,
} from './resolvers'

export const CloudinarySortType = enumType({
  name: 'CloudinarySortType',
  members: ['asc', 'desc'],
  description: 'Direction to sort results.',
})

export const CloudinaryGetAssetsInput = inputObjectType({
  name: 'CloudinaryGetAssetsInput',
  description: 'Inputs to search for Cloudinary assets.',
  definition(t) {
    t.string('expression', {
      description:
        'Search expression used to return resources.  See https://cloudinary.com/documentation/search_api#expressions for examples.',
    })
    t.int('maxResults', {
      default: 50,
      description: 'Number of results to return per page.  Max 500.',
      required: true,
    })
    t.string('nextCursor', {
      description: 'Cursor to return next page of results.',
    })
    t.string('sortBy', {
      description: 'Field to sort on.',
      default: 'created_at',
      required: true,
    })
    t.field('sortDirection', {
      type: 'CloudinarySortType',
      default: 'desc',
      required: true,
    })
    t.boolean('withContext', {
      description: 'Provide context with returned assets.',
      default: false,
      required: true,
    })
    t.boolean('withTags', {
      description: 'Provide tags with returned assets.',
      default: false,
      required: true,
    })
  },
})

export const CloudinaryGetAssetInput = inputObjectType({
  name: 'CloudinaryGetAssetInput',
  description:
    'Inputs to search for specific Cloudinary assets. Returns a list of assets.',
  definition(t) {
    t.string('publicId', {
      description: 'Public Id of asset to fetch.',
      required: true,
    })
    t.boolean('withContext', {
      default: false,
      description: 'Provide context with returned asset.',
      required: true,
    })
    t.boolean('withTags', {
      default: false,
      description: 'Provide tags with returned asset.',
      required: true,
    })
    t.boolean('withColors', {
      default: false,
      description: 'Provide color analysis of returned asset.',
      required: true,
    })
    t.boolean('withFaces', {
      default: false,
      description: 'Provide coordinates of detected faces in returned asset.',
      required: true,
    })
    t.string('type', {
      default: 'authenticated',
      required: true,
      description:
        'https://cloudinary.com/documentation/admin_api#get_resources',
    })
    t.string('resourceType', {
      default: 'image',
      required: true,
      description:
        '"image", "raw", "video".  Use "video" for audio and other footage items."',
    })
  },
})

export const CloudinaryAsset = interfaceType({
  name: 'CloudinaryAsset',
  resolveType: () => null,
  definition(t) {
    t.string('public_id')
    t.string('format', { nullable: true })
    t.string('version')
    t.field('resource_type', { type: 'CloudinaryResourceType' })
    t.string('type')
    t.string('created_at')
    t.string('uploaded_at')
    t.int('bytes')
    t.int('width', { nullable: true })
    t.int('height', { nullable: true })
    t.int('aspect_ration', { nullable: true })
    t.int('pixels', { nullable: true })
    t.jsonObject('context', {
      nullable: true,
    })
    t.string('tags', { list: true, nullable: true })
    t.string('url')
    t.string('secure_url')
    t.string('access_mode')
    // t.resolveType(() => null)
  },
})

export const CloudinaryGetAssets = objectType({
  name: 'CloudinaryGetAssets',
  definition(t) {
    t.implements('CloudinaryAsset')
    t.string('folder')
    t.string('filename')
    t.string('status')
    t.int('id')
    t.json('colors', { description: 'Not yet implemented.' })
  },
  // modify(t) {
  //   t.string('folder')
  //   t.string('filename')
  //   t.string('status')
  //   t.json('colors', { description: 'Not yet implemented.' })
  // },

  // getAssets
  // {
  //   "backup_bytes": 16905,
  //   "aspect_ratio": 4.7254901960784315,
  //   "pixels": 12291,
  //   "access_control": [
  //    { access_type: "token" },
  //    { access_type: "anonymous", start: "2017-12-15T12:00Z", end: "2018-01-20T12:00Z" }],
  //   "image_analysis": {
  //     "face_count": 0,
  //     "faces": [],
  //     "grayscale": true,
  //     "illustration_score": 1,
  //     "quality_score": 0.5702875417111385,
  //     "transparent": false,
  //     "colors": {
  //       "gray": 96.7
  //     }
  //   },
  // },
})

export const CloudinaryGetAsset = objectType({
  name: 'CloudinaryGetAsset',
  definition(t) {
    t.implements('CloudinaryAsset')
    t.json('colors', { description: 'Color analysis of image' })
    t.json('faces', { description: 'List of coordinates of detected faces' })
    // TODO - possible fields not yet needed
    //     "derived": [
    //       {
    //         "transformation": "c_fill,w_100,h_100",
    //         "format": "jpg",
    //         "bytes": 7112,
    //         "id": "8267a869b62a93a59248f35d7f124c1f",
    //         "url": "http://.../demo/image/upload/c_fill,w_100,h_100/v1312461204/sample.jpg",
    //         "secure_url": "https://.../image/upload/c_fill,w_100,h_100/v1312461204/sample.jpg"
    //       },
    //       {
    //         "transformation": "w_230,h_168,c_fit",
    //         "format": "jpg",
    //         "bytes": 19173,
    //         "id": "383e22a57167445552a3cdc16f0a0c85",
    //         "url": "http://.../demo/image/upload/w_230,h_168,c_fit/v1312461204/sample.jpg",
    //         "secure_url": "https://.../image/upload/w_230,h_168,c_fit/v1312461204/sample.jpg"
    //       }
    //     ],
  },
})

export const getAsset = extendType({
  type: 'Query',
  definition(t) {
    t.field('getAsset', {
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      type: 'CloudinaryGetAsset',
      description: 'Returns a cloudinary asset based on publicId.',
      args: {
        params: arg({ type: 'CloudinaryGetAssetInput', required: true }),
      },
      resolve: getAssetResolver,
    })
  },
})

export const CloudinaryAssets = objectType({
  name: 'CloudinaryAssets',
  definition(t) {
    t.int('rate_limit_allowed', { nullable: true })
    t.int('rate_limit_remaining', { nullable: true })
    t.string('rate_limit_reset_at', {
      resolve: (ca: any) => new Date(ca.rate_limit_reset_at).toDateString(),
      nullable: true,
    })
    t.int('total_count', {
      description: 'Total results from query.',
      nullable: true,
    })
    t.int('time', {
      description: 'Total time to return query.',
      nullable: true,
    })
    t.string('next_cursor', {
      description: 'Parameter to use to get next page of results.',
      nullable: true,
    })
    t.field('resources', {
      type: 'CloudinaryGetAssets',
      list: true,
      nullable: true,
    })
  },
})

export const getAssets = extendType({
  type: 'Query',
  definition(t) {
    t.field('getAssets', {
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      type: 'CloudinaryAssets',
      description:
        'Returns a paginated list of cloudinary assets that match current search parameters.',
      args: {
        params: arg({ type: CloudinaryGetAssetsInput, required: false }),
      },
      resolve: getAssetsResolver,
    })
  },
})

export const CloudinaryAssetUpdateInput = inputObjectType({
  name: 'CloudinaryAssetUpdateInput',
  definition(t) {
    t.string('publicId', { required: true })
    t.string('newPublicId', { required: false })
    t.string('tags', { required: false, list: true })
    t.string('type', { required: true, default: 'authenticated' })
  },
})

export const updateAsset = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateAsset', {
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      type: 'CloudinaryGetAsset',
      description: 'Update the public_id and/or tags for a Cloudinary asset.',
      args: {
        params: CloudinaryAssetUpdateInput.asArg({ required: true }),
      },
      resolve: updateAssetResolver,
    })
  },
})

export const CloudinaryAssetDeleteInput = inputObjectType({
  name: 'CloudinaryAssetDeleteInput',
  definition(t) {
    t.string('publicId', { required: true })
    t.string('type', { required: true, default: 'authenticated' })
  },
})

export const CloudinaryDeletedAsset = objectType({
  name: 'CloudinaryDeletedAsset',
  definition(t) {
    t.jsonObject('deleted')
  },
})

export const deleteAsset = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteAsset', {
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      type: 'CloudinaryDeletedAsset',
      description: 'Delete an asset by public_id.',
      args: {
        params: CloudinaryAssetDeleteInput.asArg({ required: true }),
      },
      resolve: deleteAssetResolver,
    })
  },
})
