import { objectType } from 'nexus'

export const Token = objectType({
  name: 'Token',
  definition(t) {
    t.string('accessToken')
    t.string('idToken')
    t.int('expiresIn')
    t.json('decodedToken')
    t.int('expiresAt')
  },
})
