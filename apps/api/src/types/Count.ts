import { objectType } from 'nexus'

export const Countz = objectType({
  name: 'Count',
  definition(t) {
    t.int('count')
  },
})
