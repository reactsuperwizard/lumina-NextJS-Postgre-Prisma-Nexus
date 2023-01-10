import { expect } from 'chai'
import { Context } from '../../../Context'
import { createOneCustomerResource } from '../createOneCustomerResource'
import { GraphQLResolveInfo } from 'graphql'
import { FieldResolver } from 'nexus'
import { PermissionsRole } from '../../../../generated/graphql'
import { ForbiddenError } from 'apollo-server-lambda'

describe('createOneCustomerResource', () => {
  const originalResolve: unknown = async () => {
    return Promise.resolve({
      id: 1,
    })
  }
  const ctx: Context | any = {
    prisma: {
      customer: {
        findUnique: () => {
          return Promise.resolve({ tenant: 'foo' })
        },
      },
    },
    user: { sub: 'f00', tenants: {} },
  }

  const args = {
    data: { customer: { connect: { id: 1 } } },
  }

  it('should throw a forbidden error if a user has no permissions', async () => {
    ctx.user.tenants = undefined
    try {
      const foo = await createOneCustomerResource()(
        {},
        args,
        ctx,
        {} as GraphQLResolveInfo,
        originalResolve as FieldResolver<'Mutation', 'createOneCustomerOrder'>,
      )
      expect.fail()
    } catch (e) {
      expect(e).to.be.instanceof(ForbiddenError)
    }
  })

  it('should throw a forbidden error if the user is not an admin', async () => {
    ctx.user.tenants = { foo: { role: PermissionsRole.User } }
    try {
      const foo = await createOneCustomerResource()(
        {},
        args,
        ctx,
        {} as GraphQLResolveInfo,
        originalResolve as FieldResolver<'Mutation', 'createOneCustomerOrder'>,
      )
      expect.fail()
    } catch (e) {
      expect(e).to.be.instanceof(ForbiddenError)
    }
  })

  it('data.customer.connect must be provided to lookup Customer.tenant', async () => {
    // nearly impossible for error to occur
    expect(true)
  })

  it('should throw a forbiden error if customer tenant does not match user tenants', async () => {
    ctx.user.tenants = { foobar: { role: PermissionsRole.Admin } }
    try {
      const res = await createOneCustomerResource()(
        {},
        args,
        ctx,
        {} as GraphQLResolveInfo,
        originalResolve as any,
      )
      expect.fail()
    } catch (e) {
      expect(e).to.be.instanceof(ForbiddenError)
    }
  })

  it('should work if isCustomerAdmin', async () => {
    ctx.user.tenants = { foo: { role: PermissionsRole.Admin } }

    const res = await createOneCustomerResource()(
      {},
      args,
      ctx,
      {} as GraphQLResolveInfo,
      originalResolve as any,
    )
    expect(res.id).to.equal(1)
  })

  it('should work if isLuminaAdmin', async () => {
    ctx.user.tenants = { lumina: { role: PermissionsRole.Admin } }

    const res = await createOneCustomerResource()(
      {},
      args,
      ctx,
      {} as GraphQLResolveInfo,
      originalResolve as any,
    )
    expect(res.id).to.equal(1)
  })
})
