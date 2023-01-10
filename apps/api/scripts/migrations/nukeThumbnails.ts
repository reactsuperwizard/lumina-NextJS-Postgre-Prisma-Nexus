// yarn api ts-node scripts/migrations/nukeThumbnails
import { PrismaClient, Video } from '.prisma/client'
import console from 'console'

const prisma = new PrismaClient()

const addVideoThumbnails = async () => {
  console.log('getting videos with thumbnail')
  const videos: Video[] = await prisma.video.findMany({
    where: { thumbnail: { not: null }, vimeoId: { gt: 0 } },
  })
  console.log(`found ${videos.length} videos with a thumbnail`)
  for (let i = 0; i < videos.length; i++) {
    const v = videos[i]

    const updatedVideo = await prisma.video.update({
      where: { id: v.id },
      data: { thumbnail: { set: null } },
    })
    console.log(
      `stored thumbnail for ${v.name} updated to ${updatedVideo.thumbnail}`,
    )
  }
  console.log('!!!!Finished!!!!')
}

addVideoThumbnails()
