// yarn api ts-node scripts/migrations/addRequestsToVideos

import { PrismaClient, Script } from '.prisma/client'

const prisma = new PrismaClient()

const addRequestsToVideos = async () => {
  console.log('getting scripts with videos')
  const scripts: Script[] = await prisma.script.findMany({
    where: { video: { isNot: null } },
  })
  console.log(`found ${scripts.length} scripts with videos`)
  await Promise.all(
    scripts.map(async (v) => {
      const videoName = v.name?.split('|#|')[0] || ''
      if (v.requestId && v.videoId) {
        try {
          console.log(`Updating video for script #${v.id} ${v.name}`)
          const result = await prisma.video.update({
            where: { id: v.videoId },
            data: { request: { connect: { id: v.requestId } }, name: videoName },
          })
          console.log(`${result.name} completed`)
        } catch (error) {
          console.log(v.name, v.id, v.videoId, v.requestId, error)
        }
      }
    }),
  )
  console.log('!!!!Finished!!!!')
}

addRequestsToVideos()
