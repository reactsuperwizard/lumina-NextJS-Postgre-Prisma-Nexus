import { PrismaClient } from '@prisma/client'
import { expect } from 'chai'
import { PermissionsRole } from '../../../../generated/graphql'
import { Context } from '../../../Context'
import { isMe } from '../isMe'

import type { Permission } from '../Permission'

describe('isMe()', () => {
  it('should return false user if user is not logged in', () => {
    const ctx: Context = {
      prisma: {} as PrismaClient,
    }
    const iCa = isMe(ctx, 'foo')
    expect(iCa).to.be.false
  })
  it('should return false user in ctx is different than authId', () => {
    const ctx: Context = {
      user: { sub: 'foo' },
      prisma: {} as PrismaClient,
    }
    const iCa = isMe(ctx, 'foo')
    expect(iCa).to.be.true
  })
})
