import * as Prisma from '.prisma/client'

import { Tenants } from '../auth/Tenants'
import { Permission } from '../auth/permissions/Permission'

export type UserContext = {
  tenants?: Tenants
  sub?: string
}

export type MachineToMachineContext = {
  permissions?: Permission[]
}

export type Context = {
  prisma: Prisma.PrismaClient
  user?: UserContext & MachineToMachineContext
}
