import { S3, Credentials } from 'aws-sdk'
import Stream from 'stream'

import type { FileUpload } from 'graphql-upload'

type UploadedFileResponse = {
  filename: string
  mimetype: string
  encoding: string
  url: string
}

type S3UploadStream = {
  writeStream: Stream.PassThrough
  promise: Promise<AWS.S3.ManagedUpload.SendData>
}

const shouldGenerateArtifacts = process.env.GEN_ARTIFACTS === 'true'

const accessKeyId = process.env.AWS_ACCESS_KEY_ID
if (!shouldGenerateArtifacts && !accessKeyId) {
  throw 'Make sure AWS_ACCESS_KEY_ID exists in your env variables.'
}
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
if (!shouldGenerateArtifacts && !secretAccessKey) {
  throw 'Make sure AWS_SECRET_ACCESS_KEY exists in your env variables.'
}

class AWSS3Uploader {
  private S3: S3
  private Bucket: string

  constructor() {
    const config: S3.ClientConfiguration = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      credentials: new Credentials(accessKeyId!, secretAccessKey!),
      region: 'us-west-2',
    }
    this.Bucket = 'lumina-assets-dev'
    this.S3 = new S3(config)
  }

  private createUploadStream(key: string): S3UploadStream {
    const pass = new Stream.PassThrough()
    return {
      writeStream: pass,
      promise: this.S3.upload({
        Bucket: this.Bucket,
        Key: key,
        Body: pass,
      }).promise(),
    }
  }

  async singleFileUpload(file: FileUpload): Promise<UploadedFileResponse> {
    const { createReadStream, filename, mimetype, encoding } = await file
    const stream = createReadStream()
    const uploadStream = this.createUploadStream(filename)
    stream.pipe(uploadStream.writeStream)
    const result = await uploadStream.promise
    return { filename, mimetype, encoding, url: result.Location }
  }

  async multipleUploads(files: [FileUpload]): Promise<UploadedFileResponse[]> {
    return Promise.all(files.map((file, key) => this.singleFileUpload(file)))
  }
}

export default new AWSS3Uploader()
