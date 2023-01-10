import { PrismaClient } from '@prisma/client'
import { expect } from 'chai'
import { PermissionsRole } from '../../../../generated/graphql'
import { Context } from '../../../Context'
import { isLuminaAdmin } from '../isLuminaAdmin'

import type { Permission } from '../Permission'

describe('isLuminaAdmin', () => {
  it('should return false user is not logged in', () => {
    const ctx: Context = { prisma: {} as PrismaClient }
    const iLa = isLuminaAdmin(ctx)
    expect(iLa).to.be.false
  })
  it("should return true if user has ['read:*', 'write:*'] access", () => {
    const permissions: Permission[] = ['read:*', 'write:*']
    const ctx: Context = {
      user: { permissions },
      prisma: {} as PrismaClient,
    }
    const iLa = isLuminaAdmin(ctx)
    expect(iLa).to.be.true
  })
  it('should return true if the user has the admin role for tenant lumina', () => {
    const ctx: Context = {
      user: { tenants: { lumina: { role: PermissionsRole.Admin } } },
      prisma: {} as PrismaClient,
    }
    const iLa = isLuminaAdmin(ctx)
    expect(iLa).to.be.true
  })
  it('should return false if the user has the user role for tenant lumina', () => {
    const ctx: Context = {
      user: { tenants: { lumina: { role: PermissionsRole.User } } },
      prisma: {} as PrismaClient,
    }
    const iLa = isLuminaAdmin(ctx)
    expect(iLa).to.be.false
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
    const iLa = isLuminaAdmin(ctx)
    expect(iLa).to.be.false
  })
})
