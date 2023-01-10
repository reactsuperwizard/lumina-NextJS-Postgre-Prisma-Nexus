import { objectType } from 'nexus'

export const UserSignUpAndToken = objectType({
  name: 'UserSignUpAndToken',
  definition(t) {
    t.string('firstName')
    t.string('lastName')
    t.string('email')
    t.string('password')
    t.string('accessToken')
    t.string('idToken')
    t.int('expiresIn')
    t.json('decodedToken')
    t.int('expiresAt')
  },
})
