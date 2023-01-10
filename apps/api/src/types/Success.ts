import { objectType } from 'nexus'

export const Success = objectType({
  name: 'Success',
  definition(t) {
    t.string('message')
  },
})
