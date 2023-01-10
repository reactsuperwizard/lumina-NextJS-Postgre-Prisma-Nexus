import { Prisma } from '.prisma/client'
import { arg, extendType, objectType, stringArg } from 'nexus'
import { hashids } from '../../utils'

export const PublicVideo = objectType({
  name: 'PublicVideo',
  definition(t) {
    t.model('Video').id()
    t.model('Video').vimeoId()
    t.string('thumbnail', {
      description: 'Return the thumbnail Vimeo video.',
      nullable: true,
    })
    t.model('Video').name()
    t.model('Video').jobUrl()
    t.model('Video').embedJobPage()
    t.model('Video').vanityButtonText()
  },
})

export const PublicVideoQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('publicVideo', {
      type: 'PublicVideo',
      args: {
        where: arg({ type: 'VideoWhereUniqueInput' }),
      },
      nullable: true,
      resolve: async (_root, args, ctx) => {
        const whereArg = args.where as Prisma.VideoFindUniqueArgs['where']
        const video = await ctx.prisma.video.findUnique({ where: whereArg })
        return video
          ? {
              id: video.id,
              vimeoId: video.vimeoId,
              thumbnail: video.thumbnail,
              name: video.name,
              jobUrl: video.jobUrl,
              vanityButtonText: video.vanityButtonText,
            }
          : null
      },
    })
    t.field('getVideoByHash', {
      description:
        'Get video by short 4 (or a little longer some day) letter hash.',
      type: 'PublicVideo',
      args: {
        hash: stringArg({ required: true }),
      },
      nullable: true,
      resolve: async (_root, args, ctx) => {
        try {
          const [id] = hashids.decode(args.hash)
          const safeId = parseInt(`${id}`)
          console.log(safeId)
          if (!safeId) return null
          const whereArg = {
            id: safeId,
          } as Prisma.VideoFindUniqueArgs['where']
          const video = await ctx.prisma.video.findUnique({ where: whereArg })
          return video
            ? {
                id: video.id,
                vimeoId: video.vimeoId,
                thumbnail: video.thumbnail,
                name: video.name,
                jobUrl: video.jobUrl,
                embedJobPage: video.embedJobPage,
                vanityButtonText: video.vanityButtonText,
              }
            : null
        } catch (error: any) {
          console.error(
            '\n\nError fetching video by hash:\n\n',
            error?.message,
            '\n',
          )
          return null
        }
      },
    })
  },
})
