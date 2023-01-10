import { Context } from '../../Context'

import { managementClient } from '../managementClient'

// the user who is logged in, is the one making the change
export const isMe = (ctx: Context, authId: string): boolean => {
  return ctx.user?.sub === authId
}
