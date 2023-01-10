import chai from 'chai'
import { Context } from '../../../Context'
import { getCustomer } from '../getCustomer'
import { GraphQLResolveInfo } from 'graphql'
import { PrismaClient } from '@prisma/client'
import { FieldResolver } from 'nexus'
import { PermissionsRole } from '../../../../generated/graphql'
import { ForbiddenError } from 'apollo-server-lambda'

describe('getCustomer', () => {
  const originalResolve: unknown = async () => {
    return Promise.resolve({
      tenant: 'foo',
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
    const foo = await getCustomer(
      {},
      { where: { id: 1 } },
      ctx,
      {} as GraphQLResolveInfo,
      originalResolve as FieldResolver<'Query', 'getCustomer'>,
    )
    chai.expect(foo?.tenant).to.equal('foo')
  })

  it('should allow a customer admin', async () => {
    ctx.user.tenants = { foo: { role: PermissionsRole.Admin } }
    const foo = await getCustomer(
      {},
      { where: { id: 1 } },
      ctx,
      {} as GraphQLResolveInfo,
      originalResolve as FieldResolver<'Query', 'getCustomer'>,
    )
    chai.expect(foo?.tenant).to.equal('foo')
  })

  it('should allow a customer user', async () => {
    ctx.user.tenants = { foo: { role: PermissionsRole.User } }
    const foo = await getCustomer(
      {},
      { where: { id: 1 } },
      ctx,
      {} as GraphQLResolveInfo,
      originalResolve as FieldResolver<'Query', 'getCustomer'>,
    )
    chai.expect(foo?.tenant).to.equal('foo')
  })

  it('should throw an error if there is no user', async () => {
    try {
      await getCustomer(
        {},
        { where: { id: 1 } },
        ctx,
        {} as GraphQLResolveInfo,
        originalResolve as FieldResolver<'Query', 'getCustomer'>,
      )
      chai.expect.fail('This test failed.')
    } catch (e) {
      chai.expect(e).to.be.an.instanceOf(ForbiddenError)
    }
  })

  it('should throw an error if there is a user with the access to a different tenant', async () => {
    ctx.user.tenants = {
      foobar: { role: PermissionsRole.User },
      foobarz: { role: PermissionsRole.Admin },
    }
    try {
      await getCustomer(
        {},
        { where: { id: 1 } },
        ctx,
        {} as GraphQLResolveInfo,
        originalResolve as FieldResolver<'Query', 'getCustomer'>,
      )
      chai.expect.fail('This test failed.')
    } catch (e) {
      chai.expect(e).to.be.an.instanceOf(ForbiddenError)
    }
  })
})
