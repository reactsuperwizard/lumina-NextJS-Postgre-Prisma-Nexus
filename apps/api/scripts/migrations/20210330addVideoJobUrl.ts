// run with:
// yarn api ts-node scripts/migrations/20210330addVideoJobUrl

import { PrismaClient } from '.prisma/client'

// update all videos that where created before auth0Ids were stored on user
const prisma = new PrismaClient()
;(async () => {
  console.log('getting videos')
  const videos = await prisma.video.findMany({
    select: { id: true, requestId: true },
  })
  console.log(`found ${videos.length} videos`)
  for (let vid in videos) {
    const v = videos[vid]
    try {
      if (v.requestId) {
        console.log(`updating video #${v.id}`)
        const r = await prisma.request.findUnique({
          where: { id: v.requestId },
        })
        if (r?.url) {
          await prisma.video.update({
            where: { id: v.id },
            data: { jobUrl: r.url },
          })
          console.log(`video #${v.id} updated with ${r.url}`)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log('!!!!!!Done!!!!!!!')
})()
