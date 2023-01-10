// run with different .env file
// e.g. export $(grep -v '^#' apps/api/.env.dev | xargs) && yarn api node --inspect -r ts-node/register scripts/addAuth0IdToUsers

import { PrismaClient, Customer } from '.prisma/client'
import { managementClient } from '../../../src/utils'
// update all users that where created before auth0Ids were stored on user
const prisma = new PrismaClient()
;(async () => {
  console.log('getting users')
  const users = await prisma.user.findMany({
    select: { id: true, email: true },
  })
  console.log(`found ${users.length} users`)
  await users.forEach(async u => {
    const [auth0User] = await managementClient.getUsersByEmail(u.email)
    await prisma.user.update({
      where: { id: u.id },
      data: { authId: auth0User.user_id },
    })
    auth0User
    console.log(`Update User: ${u.email} with Auth0Id: ${auth0User.user_id}`)
  })
  console.log('!!!!!!Done!!!!!!!')
})()
