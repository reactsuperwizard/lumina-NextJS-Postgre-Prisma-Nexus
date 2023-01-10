// run with different .env file
// e.g. export $(grep -v '^#' apps/api/.env.production | xargs) && yarn api ts-node scripts/migrations/20210318connectUserTennantsAsCustomers

import { PrismaClient } from '.prisma/client'
import { managementClient } from '../../src/auth/managementClient'
// update all users that where created before auth0Ids were stored on user
const prisma = new PrismaClient()
;(async () => {
  console.log('getting users')
  const users = await prisma.user.findMany({
    select: { id: true, email: true },
  })
  console.log(`found ${users.length} users`)
  for (let usr in users) {
    const u = users[usr]
    const [auth0User] = await managementClient.getUsersByEmail(
      u.email.toLowerCase(),
    )
    if (auth0User) {
      const tenants = auth0User.app_metadata?.tenants
      if (tenants) {
        const tenantNames = Object.keys(tenants)
        console.log(
          `Update User: ${u.email} with customers: ${tenantNames.join(', ')}`,
        )
        const tenantConnects = tenantNames.map((n) => ({ tenant: n }))
        try {
          await prisma.user.update({
            where: { id: u.id },
            data: { customers: { connect: tenantConnects } },
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
  console.log('!!!!!!Done!!!!!!!')
})()
