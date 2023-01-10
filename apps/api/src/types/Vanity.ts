import { extendType, stringArg } from 'nexus'
import { hashids } from '../utils'

export const VanityQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('getVideoByShortId', {
      description:
        'Get video by short 4 (or a little longer some day) letter hash.',
      type: 'Video',
      args: {
        hash: stringArg({ required: true }),
      },
      nullable: true,
      async resolve(_root, args, ctx) {
        const [id] = hashids.decode(args.hash)
        const video = await ctx.prisma.video.findUnique({
          where: { id: id as number },
        })
        return video
      },
    })
  },
})
