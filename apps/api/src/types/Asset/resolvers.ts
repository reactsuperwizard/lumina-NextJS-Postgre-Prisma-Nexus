import { FieldResolver } from 'nexus'
import { cloudinary } from './cloudinary-client'

import type { Prisma } from '.prisma/client'

export const totalAssets: FieldResolver<'Query', 'totalAssets'> = async (
  _root,
  args,
  ctx,
) => {
  const whereArg = args.where as Prisma.AssetFindManyArgs['where']
  const count = await ctx.prisma.asset.count({ where: whereArg })
  return { count }
}

export const getUploadSignatureResolver: FieldResolver<
  'Query',
  'getUploadSignature'
> = (_parent, args, _ctx) => {
  if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error(`Make sure to define ${process.env.CLOUDINARY_API_SECRET}`)
  }
  const uploadSignature = cloudinary.v2.utils.api_sign_request(
    args.params,
    process.env.CLOUDINARY_API_SECRET,
  )
  return { uploadSignature }
}

export const getAssetTagsResolver: FieldResolver<
  'Query',
  'getAssetTags'
> = async (_parent, args, _ctx) => {
  const params: typeof args.params | undefined | null = args.params
  try {
    // @ts-ignore
    const { tags, next_cursor } = await cloudinary.v2.api.tags(params)
    return { tags, next_cursor }
  } catch (e) {
    throw e
  }
}

export const getAssetResolver: FieldResolver<'Query', 'getAsset'> = async (
  _parent,
  args,
  _ctx,
) => {
  const {
    publicId,
    withContext,
    withTags,
    withColors,
    withFaces,
    type,
    resourceType,
  } = args.params

  switch (resourceType) {
    case 'image':
    case 'video':
    case 'raw':
      break
    default:
      throw new Error("Resource type must be 'raw' | 'image' | 'video'")
  }

  const options: {
    context?: boolean
    tags?: boolean
    type?: string
    faces?: boolean
    colors?: boolean
    resource_type: 'raw' | 'image' | 'video'
  } = {
    context: withContext,
    tags: withTags,
    colors: withColors,
    faces: withFaces,
    type,
    resource_type: resourceType,
  }

  try {
    const result = await cloudinary.v2.api.resource(publicId, options)
    return result
  } catch (e) {
    throw e
  }
}

export const getAssetsResolver: FieldResolver<'Query', 'getAssets'> = async (
  _parent,
  args,
  _ctx,
) => {
  const query = new cloudinary.v2.search()
  if (!args.params) {
    try {
      const result = await query.execute()
      return result
    } catch (e) {
      throw e
    }
  }
  const {
    expression,
    nextCursor,
    sortBy,
    sortDirection,
    withTags,
    withContext,
    maxResults,
  } = args.params
  try {
    if (expression) {
      query.expression(expression)
    }
    if (nextCursor) {
      query.next_cursor(nextCursor)
    }
    if (withTags) {
      query.with_field('tags')
    }
    if (withContext) {
      query.with_field('context')
    }
    // uses defaults from CloudinaryGetAssetsInputs
    const result = await query
      .max_results(maxResults)
      .sort_by(sortBy, sortDirection)
      .execute()
    const assets = result?.resources?.map(
      (res: any) => res['public_id'],
    ) as string[]
    const assetsData = await _ctx.prisma.asset.findMany({
      where: { publicId: { in: assets } },
    })
    const assetsMap: Record<string, number> = {}
    for (const asset of assetsData) {
      assetsMap[asset.publicId] = asset.id
    }
    const resources = []
    for (const resource of result?.resources) {
      resources.push({ ...resource, id: assetsMap[resource['public_id']] })
    }
    result.resources = resources
    return result
  } catch (e) {
    throw e
  }
}

export const updateAssetResolver: FieldResolver<
  'Mutation',
  'updateAsset'
> = async (_parent, args, ctx) => {
  const { publicId, tags, newPublicId, type } = args.params
  if (!tags && !newPublicId) {
    throw new Error("Provide 'tags' or 'newPublicId' to change a resource.")
  }

  try {
    let resource = null
    if (tags) {
      const newTags = tags.join(',')
      resource = await cloudinary.v2.api.update(publicId, {
        tags: newTags,
        type: 'authenticated',
      })
    }
    if (newPublicId) {
      // https://cloudinary.com/documentation/image_upload_api_reference#rename_method
      resource = await cloudinary.v2.uploader.rename(publicId, newPublicId, {
        type,
      })
      await ctx.prisma.asset.update({
        where: { publicId },
        data: { publicId: newPublicId },
      })
    }
    return resource
  } catch (e) {
    throw e
  }
}

export const deleteAssetResolver: FieldResolver<
  'Mutation',
  'deleteAsset'
> = async (_parent, args, ctx) => {
  const { publicId, type } = args.params

  try {
    // https://cloudinary.com/documentation/admin_api#delete_resources
    const resource = await cloudinary.v2.api.delete_resources([publicId], {
      type,
    })
    await ctx.prisma.asset.delete({
      where: { publicId },
    })
    return resource
  } catch (e) {
    throw e
  }
}
