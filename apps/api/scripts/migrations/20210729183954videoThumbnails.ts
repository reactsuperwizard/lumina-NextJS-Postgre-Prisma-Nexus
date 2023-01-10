// yarn api ts-node scripts/migrations/20210729183954videoThumbnails
import { PrismaClient, Video, Request } from '.prisma/client'
import console from 'console'
const axios = require('axios')

const prisma = new PrismaClient()

const addVideoThumbnails = async () => {
  console.log('getting videos without thumbnail')
  const videos: Video[] = await prisma.video.findMany({
    where: { thumbnail: { equals: null }, vimeoId: { gt: 0 } },
  })
  console.log(`found ${videos.length} videos without a thumbnail`)
  for (let i = 0; i < videos.length; i++) {
    const v = videos[i]
    console.log('fetching thumbnail from Vimeo')
    const newUrl = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${v.vimeoId}`
    await axios.get(newUrl).then(
      async (res: any) => {
        await res
        try {
          const url: string | null = res.data?.thumbnail_url || null
          if (url) {
            const updatedVideo = await prisma.video.update({
              where: { id: v.id },
              data: { thumbnail: { set: url } },
            })
            console.log(
              `stored thumbnail for ${v.name} updated to ${updatedVideo.thumbnail}`,
            )
          }
        } catch (e) {
          console.log(`Error: ${e}`)
          return null
        }
      },
      (error: any) => {
        console.log(`Unable to load thumbnail for Vimeo video ${v.vimeoId}`)
        console.log(`Error: ${error}`)
        return null
      },
    )
  }
  console.log('!!!!Finished!!!!')
}

addVideoThumbnails()
