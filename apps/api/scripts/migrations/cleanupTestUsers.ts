import { PrismaClient } from '.prisma/client'
import { managementClient } from '../../src/auth/managementClient'

const prisma = new PrismaClient()
;(async () => {
  const emails = ['test7394872@gmail.com']
  for (let email of emails) {
    console.log('--------------')
    console.log('Email - ', email)
    const user = await prisma.user.findFirst({ where: { email } })
    console.dir(user, { depth: null })
    if (!user) continue
    await prisma.loginHistory.deleteMany({ where: { userId: user.id } })
    await prisma.user.delete({ where: { id: user.id } })
    console.log('Deleting from Auth0 ', user.authId)
    await managementClient.deleteUser({ id: user.authId })
  }
  console.log('!!!!!!Done!!!!!!!')
  process.exit(0)
})()
