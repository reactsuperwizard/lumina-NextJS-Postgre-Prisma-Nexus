// import {
//   NotAuthorizedError,
//   InvalidTokenError,
//   AuthenticationError,
// } from './errors'

import { AuthenticationClient } from 'auth0'

import jwksClient from 'jwks-rsa'
import jwt from 'jsonwebtoken'

const client = jwksClient({
  strictSsl: false, // Default value
  jwksUri: 'https://dev-2fat32cy.auth0.com/.well-known/jwks.json',
})

import { TenantsPayload } from './Tenants'
import { Permission } from './permissions/Permission'
import { UserContext } from '../Context'
import { AuthenticationError } from 'apollo-server-lambda'

const isPublicAPI = (operation: string): boolean =>
  ['login', 'forgetPassword', 'signup'].includes(operation)
interface VerifiedToken extends TenantsPayload {
  sub: string
  permissions: Permission[]
}

export async function tryAuth(
  resolve: any,
  root: any,
  args: any,
  ctx: any,
  info: any,
) {
  // This will present problem with user that has an expired token trying to login to a public page
  // tryAuth should take place farther down the chain, like `isUser`
  const { authorization, operation } = ctx.headers
  if (
    typeof authorization === 'string' &&
    authorization != 'undefined' &&
    !ctx.user &&
    !isPublicAPI(operation)
  ) {
    try {
      const token = authorization.replace('Bearer ', '')
      const decoded: any = jwt.decode(token, { complete: true })
      const { kid }: { kid: string; rest: any } = decoded.header
      const getKey = async () => {
        return new Promise((resolve, reject) => {
          client.getSigningKey(kid, (err, key) => {
            if (err) {
              reject(err)
            }
            if (key) {
              resolve(key)
            }
          })
        })
      }
      const key: any = await getKey()
      const verifiedToken: VerifiedToken = (await jwt.verify(
        token,
        key.publicKey,
      )) as VerifiedToken
      const {
        sub, //unique auth0Id
        permissions,
        'https://lumina.com/tenants': tenants,
      } = verifiedToken
      ctx.user = { sub, permissions, tenants }
    } catch (e) {
      // if (typeof e === 'string') {
      throw new AuthenticationError(e as string)
      // } else console.log(e)
    }
  }

  const result = await resolve(root, args, ctx, info)

  return result
}
