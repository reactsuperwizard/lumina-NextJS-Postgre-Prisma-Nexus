import { objectType } from 'nexus'

export const UserSignUpWithCustomerAndToken = objectType({
  name: 'UserSignUpWithCustomerAndToken',
  definition(t) {
    t.string('accessToken')
    t.string('idToken')
    t.int('expiresIn')
    t.json('decodedToken')
    t.int('expiresAt')
    t.string('tenant')
  },
})
