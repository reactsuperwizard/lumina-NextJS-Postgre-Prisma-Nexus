import { objectType, inputObjectType, arg, extendType } from 'nexus'
import { isLuminaAdmin } from '../../auth'

import { getUploadSignatureResolver } from './resolvers'

export const UploadSignatureInput = inputObjectType({
  name: 'UploadSignatureInput',
  description: 'Parameters needed for signing uploads to cloudinary.',
  definition(t) {
    t.string('source', { required: true })
    t.int('timestamp', { required: true })
    t.string('upload_preset')
    t.string('public_id')
    t.string('folder')
    t.string('tags', {
      description:
        'comma seperated list of tags.  E.g. "tags=foo,bar,hello world"',
    })
  },
})

export const UploadSignature = objectType({
  name: 'UploadSignature',
  description:
    'A signature used to sign uploads from the Cloudinary upload widget.',
  definition(t) {
    t.string('uploadSignature')
  },
})

export const getUploadSignature = extendType({
  type: 'Query',
  definition(t) {
    t.field('getUploadSignature', {
      type: 'UploadSignature',
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      description:
        'Returns a signature to use with the Cloudinary Upload Widget.',
      nullable: false,
      args: { params: arg({ type: 'UploadSignatureInput', required: true }) },
      resolve: getUploadSignatureResolver,
    })
  },
})
