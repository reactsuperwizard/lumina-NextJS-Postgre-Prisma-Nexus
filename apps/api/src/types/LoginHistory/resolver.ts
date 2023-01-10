import { FieldResolver } from 'nexus'
import type { Prisma } from '.prisma/client'

interface dailyActiveUsersresult {
  loggedInDate: string
  uniqueUsers: number
}
interface monthlyActiveUsersresult {
  mau: number
}
export const dailyActiveUsers: FieldResolver<
  'Query',
  'dailyActiveUsers'
> = async (_root, args, ctx) => {
  const monthlyData = (await ctx.prisma
    .$queryRaw(`SELECT a.logged_in_date as "loggedInDate", COUNT(*) "uniqueUsers"
  FROM (SELECT t."userId", date(t."loggedInAt") as logged_in_date
  FROM "LoginHistory" AS t 
  WHERE t."loggedInAt" > current_date - interval '30' day
  GROUP BY t."userId", date(t."loggedInAt")
  ORDER BY 2) a
  GROUP BY a.logged_in_date;`)) as dailyActiveUsersresult[]
  const res = []
  let mau = 0
  const dateMap: Record<string, number> = {}
  for (let i = 0; i < monthlyData.length; i++) {
    dateMap[monthlyData[i].loggedInDate] = monthlyData[i].uniqueUsers
  }
  for (let i = 29; i >= 0; i--) {
    const dateNow = new Date(new Date().setDate(new Date().getDate() - i))
      .toISOString()
      .split('T')[0]
    if (dateMap[dateNow]) {
      res.push({ date: dateNow, activeUsers: dateMap[dateNow] })
      mau += dateMap[dateNow]
    } else {
      res.push({ date: dateNow, activeUsers: 0 })
    }
  }
  return {
    dailyUsers: res,
    monthlyActiveUsers: mau,
  }
}

export const monthlyActiveUsers: FieldResolver<
  'Query',
  'monthlyActiveUsers'
> = async (_root, args, ctx) => {
  const monthlyData = (await ctx.prisma
    .$queryRaw(`SELECT count(*) as mau from (SELECT DISTINCT t."userId"
    FROM "LoginHistory" AS t 
    WHERE t."loggedInAt" > current_date - interval '30' day) a;`)) as monthlyActiveUsersresult[]
  return {
    monthlyActiveUsers: monthlyData.length == 1 ? monthlyData[0].mau : 0,
  }
}
