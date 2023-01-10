// yarn api ts-node scripts/migrations/makeEmailLowerCase.ts
import { PrismaClient, User } from '.prisma/client'

const prisma = new PrismaClient()

const makeEmailLowerCase = async () => {
  const users = await prisma.user.findMany({
    select: { id: true, avatar: true, authId: true, email: true },
  })
  console.log(`found ${users.length} users`)
  for (let i = 0; i < users.length; i++) {
    const u = users[i]
    const newEmail = u.email.toLowerCase()
    await prisma.user.update({
      where: { authId: u.authId },
      data: { email: { set: newEmail } },
    })
    console.log('updated user??', u)
  }
  console.log('Finished!!!!')
}

makeEmailLowerCase()
