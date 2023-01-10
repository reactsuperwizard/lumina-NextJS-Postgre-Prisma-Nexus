import { PrismaClient } from '@prisma/client'
import { expect } from 'chai'
import { PermissionsRole } from '../../../../generated/graphql'
import { Context } from '../../../Context'
import { isCustomerUser } from '../isCustomerUser'

import type { Permission } from '../Permission'

describe('isCustomerUser()', () => {
  it('should return false user is not logged in', () => {
    const ctx: Context = { prisma: {} as PrismaClient }
    const iCu = isCustomerUser(ctx, 'foobar')
    expect(iCu).to.be.false
  })
  it('should return false if the user has no tenant roles', () => {
    const ctx: Context = {
      user: { tenants: {} },
      prisma: {} as PrismaClient,
    }
    const iCa = isCustomerUser(ctx, 'foo')
    expect(iCa).to.be.false
  })
  it('should return true if the user has the user role for the current tenant', () => {
    const ctx: Context = {
      user: { tenants: { foo: { role: PermissionsRole.User } } },
      prisma: {} as PrismaClient,
    }
    const iCu = isCustomerUser(ctx, 'foo')
    expect(iCu).to.be.true
  })
  it('should return true if the user has the user role for the current tenant', () => {
    const ctx: Context = {
      user: { tenants: { foo: { role: PermissionsRole.User } } },
      prisma: {} as PrismaClient,
    }
    const iCu = isCustomerUser(ctx, 'foo')
    expect(iCu).to.be.true
  })
  it('should return false if the user has an admin or user role for any other tenant', () => {
    const ctx: Context = {
      user: {
        tenants: {
          someAwesomeTenant: { role: PermissionsRole.Admin },
          someOtherReallyAwesomeTenant: { role: PermissionsRole.User },
        },
      },
      prisma: {} as PrismaClient,
    }
    const iCa = isCustomerUser(ctx, 'foo')
    expect(iCa).to.be.false
  })
})
