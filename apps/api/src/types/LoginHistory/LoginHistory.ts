import { objectType, extendType } from 'nexus'
import { isLuminaAdmin } from '../../auth'
import { dailyActiveUsers, monthlyActiveUsers } from './resolver'

export const LoginHistory = objectType({
  name: 'LoginHistory',
  description: 'Login History of users',
  definition(t) {
    t.model.id()
    t.model.user()
    t.model.userId()
    t.model.loggedInAt()
  },
})

export const LoginHistoryQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.loginHistory({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.loginHistories({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      ordering: true,
      pagination: true,
      filtering: true,
    })
    t.field('dailyActiveUsers', {
      type: 'DailyActiveUsers',
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: dailyActiveUsers,
    })
    t.field('monthlyActiveUsers', {
      type: 'MonthlyActiveUsers',
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
      resolve: monthlyActiveUsers,
    })
  },
})

export const LoginHistoryMutations = extendType({
  type: 'Mutation',
  definition(t) {
    // Login History
    t.crud.createOneLoginHistory()
    t.crud.updateOneLoginHistory({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteOneLoginHistory({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.updateManyLoginHistory({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
    t.crud.deleteManyLoginHistory({
      authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
    })
  },
})
