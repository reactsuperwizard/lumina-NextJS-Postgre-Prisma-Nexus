import { objectType } from 'nexus'

export const DailyUser = objectType({
  name: 'DailyUser',
  definition(t) {
    t.int('activeUsers')
    t.string('date')
  },
})

export const DailyActiveUsers = objectType({
  name: 'DailyActiveUsers',
  definition(t) {
    t.list.field('dailyUsers', {
      type: DailyUser,
    })
  },
})
export const MonthlyActiveUsers = objectType({
  name: 'MonthlyActiveUsers',
  definition(t) {
    t.int('monthlyActiveUsers')
  },
})
