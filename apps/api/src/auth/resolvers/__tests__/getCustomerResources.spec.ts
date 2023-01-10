import { expect } from 'chai'
import { Context } from '../../../Context'
import { getCustomerResources } from '../getCustomerResources'
import { GraphQLResolveInfo } from 'graphql'
import { PrismaClient } from '@prisma/client'
import { FieldResolver } from 'nexus'
import { PermissionsRole } from '../../../../generated/graphql'

import { ForbiddenError } from 'apollo-server-lambda'

describe('getCustomerResources', () => {
  const originalResolve: unknown = async () => {
    return Promise.resolve({
      customerTenant: 'foo',
    })
  }
  let ctx: Context | any

  beforeEach(() => {
    ctx = {
      prisma: {} as typeof PrismaClient,
      user: { sub: 'f00', tenants: {} },
    }
  })

  it('should throw a forbidden error if a user has no permissions', async () => {
    ctx.user.tenants = undefined
    try {
      const foo = await getCustomerResources(
        {},
        {},
        ctx,
        {} as GraphQLResolveInfo,
        originalResolve as FieldResolver<'Query', 'getCustomerRequests'>,
      )
      expect.fail()
    } catch (e) {
      expect(e).to.be.instanceof(ForbiddenError)
    }
  })

  it('should attach the users tenants to the where clause to limit data returned', async () => {
    ctx.user.tenants = { foo: { role: PermissionsRole.Admin } }
    const args: any = {}
    const foo = await getCustomerResources(
      {},
      args,
      ctx,
      {} as GraphQLResolveInfo,
      originalResolve as FieldResolver<'Query', 'getCustomerRequest'>,
    )
    expect(args.where.customerTenant.in).to.eql(['foo'])
  })

  it('should throw a forbiden error if {where: {customerTenant}} argument is provided', async () => {
    try {
      await getCustomerResources(
        {},
        { where: { customerTenant: { equals: 'evil-tenant-query' } } },
        ctx,
        {} as GraphQLResolveInfo,
        originalResolve as FieldResolver<'Query', 'getCustomerRequest'>,
      )
      expect.fail()
    } catch (e) {
      expect(e).to.be.instanceof(ForbiddenError)
    }
  })
})
