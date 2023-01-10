import chai from 'chai'
import { Context } from '../../../Context'
import { getCustomerResource } from '../getCustomerResource'
import { Tenants } from '../../Tenants'
import sinon from 'sinon'
import { GraphQLResolveInfo } from 'graphql'
import { PrismaClient } from '@prisma/client'
import { FieldResolver } from 'nexus'
import { PermissionsRole } from '../../../../generated/graphql'
import { type } from 'os'
import { ForbiddenError } from 'apollo-server-lambda'

describe('getCustomerResource', () => {
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

  it('should allow a lumina admin', async () => {
    ctx.user.tenants = { lumina: { role: PermissionsRole.Admin } }
    const foo = await getCustomerResource(
      {},
      { where: { id: 1 } },
      ctx,
      {} as GraphQLResolveInfo,
      originalResolve as FieldResolver<'Query', 'getCustomerRequest'>,
    )
    chai.expect(foo?.customerTenant).to.equal('foo')
  })

  it('should allow a customer admin', async () => {
    ctx.user.tenants = { foo: { role: PermissionsRole.Admin } }
    const foo = await getCustomerResource(
      {},
      { where: { id: 1 } },
      ctx,
      {} as GraphQLResolveInfo,
      originalResolve as FieldResolver<'Query', 'getCustomerRequest'>,
    )
    chai.expect(foo?.customerTenant).to.equal('foo')
  })

  it('should allow a customer user', async () => {
    ctx.user.tenants = { foo: { role: PermissionsRole.User } }
    const foo = await getCustomerResource(
      {},
      { where: { id: 1 } },
      ctx,
      {} as GraphQLResolveInfo,
      originalResolve as FieldResolver<'Query', 'getCustomerRequest'>,
    )
    chai.expect(foo?.customerTenant).to.equal('foo')
  })

  it('should throw an error if there is no user', async () => {
    try {
      await getCustomerResource(
        {},
        { where: { id: 1 } },
        ctx,
        {} as GraphQLResolveInfo,
        originalResolve as FieldResolver<'Query', 'getCustomerRequest'>,
      )
      chai.expect.fail('This test failed.')
    } catch (e) {
      chai.expect(e).to.be.an.instanceOf(ForbiddenError)
    }
  })
})
