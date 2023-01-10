// yarn api node --inspect -r ts-node/register scripts/migrations/20210311requestCompletedAt
import { PrismaClient, RequestStatus, VideoStatus } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  // Get all completed requests that do not have a completedAt time stamp
  const requests = await prisma.request.findMany({
    include: {
      video: true,
    },
    where: {
      AND: {
        status: { equals: RequestStatus.completed },
        completedAt: { equals: null },
      },
    },
  })
  for (const r of requests) {
    // Update each request to have completedAt as their video's `updatedAt` time stamp
    if (!r.video) {
      throw `request ${r.id} does not have a video attached. :-(`
    }
    console.log(
      `updating request ${r.id} with completedAt ${r?.video?.updatedAt}`,
    )
    await prisma.request.update({
      where: { id: r.id },
      data: { completedAt: r.video.updatedAt },
    })
  }

  const videos = await prisma.video.findMany({
    where: {
      AND: {
        status: { equals: VideoStatus.live },
        publishedAt: { equals: null },
      },
    },
  })
  for (const v of videos) {
    // Update each request to have publishedAt as video's `updatedAt` time stamp
    console.log(`updating video ${v.id} with publishedAt ${v.updatedAt}`)
    await prisma.video.update({
      where: { id: v.id },
      data: { publishedAt: v.updatedAt },
    })
  }

  console.info(
    `updated ${requests.length} requests and ${videos.length} videos`,
  )
}

main()
