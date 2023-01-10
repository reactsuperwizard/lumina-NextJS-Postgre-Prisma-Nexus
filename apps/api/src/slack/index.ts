import { WebClient } from '@slack/web-api'
import { Slack } from './Slack'

const shouldGenerateArtifacts = process.env.GEN_ARTIFACTS === 'true'

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN
const channelId = process.env.SLACK_CHANNEL_ID

if (!token && !shouldGenerateArtifacts) {
  throw new Error('check process.env.SLACK_TOKEN')
}

if (!channelId && !shouldGenerateArtifacts) {
  throw new Error('check process.env.CHANNEL_ID')
}

const client = new WebClient(token)

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export default new Slack(client, channelId!)
