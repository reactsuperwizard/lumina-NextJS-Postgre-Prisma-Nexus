import type { WebClient } from '@slack/web-api'

export class Slack {
  constructor(public client: WebClient, readonly channelId: string) {}
}
