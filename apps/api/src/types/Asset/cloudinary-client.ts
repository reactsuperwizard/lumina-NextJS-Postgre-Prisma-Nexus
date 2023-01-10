import * as cloudinary from 'cloudinary'

cloudinary.v2.config({
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
})

export { cloudinary }
