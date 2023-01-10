// yarn api ts-node scripts/migrations/uploadThumbnailsToCloudinary
import cloudinary from 'cloudinary'
import path from 'path'
import { PrismaClient, Video } from '.prisma/client'
import { Vimeo } from 'vimeo'

const dotenvAbsolutePath = path.join(__dirname, '../../.env.development')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv').config({ path: dotenvAbsolutePath })

const vimeoClient = new Vimeo(
  dotenv.parsed.VIMEO_CLIENT_ID,
  dotenv.parsed.VIMEO_CLIENT_SECRET,
  dotenv.parsed.VIMEO_ACCESS_TOKEN,
)
const prisma = new PrismaClient()

const uploadThumbnailsToCloundinary = async () => {
  if (!dotenv.parsed.CLOUDINARY_API_SECRET) {
    throw new Error(
      `Make sure to define ${dotenv.parsed.CLOUDINARY_API_SECRET}`,
    )
  }
  const videos: Video[] = await prisma.video.findMany({
    where: { vimeoId: { gt: 0 } },
  })

  console.log(`found ${videos.length} videos with a thumbnail`)

  for (let i = 0; i < videos.length; i++) {
    const v = videos[i]
    let oldUrl = v.thumbnail
    if (!oldUrl)
      oldUrl = await new Promise((resolve, reject) => {
        vimeoClient.request(
          {
            path: `/videos/${v.vimeoId}`,
            query: {
              fields: 'pictures',
            },
            method: 'GET',
          },
          // eslint-disable-next-line @typescript-eslint/camelcase
          (error: any, body: any, statusCode: number | undefined) => {
            if (error) {
              console.log('error')
              console.log(error)
              //   reject()
              resolve(null)
            } else {
              const thumbnail = body.pictures.sizes.find(
                (thumbnail: { width: number }) => thumbnail.width === 640,
              )
              // eslint-disable-next-line @typescript-eslint/camelcase
              statusCode === 200 && thumbnail
                ? resolve(thumbnail.link)
                : resolve(null)
            }
          },
        )
      })
    if (oldUrl) {
      let newUrl: string | null = null
      const id = v.id
      const uploadSignature = cloudinary.v2.utils.api_sign_request(
        {
          source: oldUrl,
          upload_preset: 'jla39qxv',
        },
        dotenv.parsed.CLOUDINARY_API_SECRET,
      )
      await cloudinary.v2.uploader
        .upload(oldUrl, {
          cloud_name: 'hdngr',
          api_key: 544831596869866,
          upload_preset: 'jla39qxv', // defined in cloudinary dashboard
          upload_signature: uploadSignature,
          api_secret: dotenv.parsed.CLOUDINARY_API_SECRET,
          public_id: id.toString(),
        })
        .then((result) => {
          console.log(`Uploaded Thumbnail for video number ${id}`)
          newUrl = result.secure_url
        })
        .catch((error) => {
          console.log(
            `Error video number ${id}`,
            JSON.stringify(error, null, 2),
          )
        })
      if (newUrl) {
        const updatedVideo = await prisma.video.update({
          where: { id: v.id },
          data: { thumbnail: { set: newUrl } },
        })
        console.log(
          `stored thumbnail for ${v.name} updated to ${updatedVideo.thumbnail}`,
        )
      }
    }
  }
  console.log('Complete')
}

uploadThumbnailsToCloundinary()
