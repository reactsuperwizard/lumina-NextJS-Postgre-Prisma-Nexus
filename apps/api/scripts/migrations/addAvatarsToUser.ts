// yarn api ts-node scripts/migrations/addAvatarsToUser
import { PrismaClient, User } from '.prisma/client'

const prisma = new PrismaClient()

const addAvatarToUser = async () => {
  const users = await prisma.user.findMany({
    select: { id: true, avatar: true },
  })
  const avatars = await prisma.asset.findMany({ where: { folderId: 233 } })
  console.log(avatars)
  console.log(`found ${avatars.length} avatars`)
  console.log(`found ${users.length} users`)
  for (let i = 0; i < users.length; i++) {
    const u = users[i]

    const randomIndex = Math.floor(Math.random() * avatars.length)
    await prisma.user.update({
      where: { id: u.id },
      data: { avatar: { set: avatars[randomIndex].url } },
    })
    console.log('updated user??', u)
  }
  console.log('Finished!!!!')
}

addAvatarToUser()
