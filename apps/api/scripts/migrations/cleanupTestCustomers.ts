import { PrismaClient } from '.prisma/client'
import { managementClient } from '../../src/auth/managementClient'

const prisma = new PrismaClient()
;(async () => {
  const customers = ['Another Test']
  for (let customerName of customers) {
    console.log('--------------')
    console.log('Customer Name - ', customerName)
    const customerData = await prisma.customer.findFirst({
      where: {
        name: customerName,
      },
      include: {
        users: true,
        orders: true,
        requests: true,
        videos: true,
        scripts: true,
      },
    })
    console.dir(customerData, { depth: null })
    const orderIds = customerData?.orders.map((order) => order.id)
    const requestIds = customerData?.requests.map((req) => req.id)
    const videoIds = customerData?.videos.map((req) => req.id)
    const scriptIds = customerData?.scripts.map((req) => req.id)
    if (requestIds?.length) {
      await prisma.request.updateMany({
        where: { id: { in: requestIds } },
        data: { customerTenant: 'lumina' },
      })
    }
    if (videoIds?.length) {
      await prisma.video.updateMany({
        where: { id: { in: videoIds } },
        data: { customerTenant: 'lumina' },
      })
    }
    if (scriptIds?.length) {
      await prisma.script.updateMany({
        where: { id: { in: scriptIds } },
        data: { customerTenant: 'lumina' },
      })
    }
    if (orderIds?.length) {
      await prisma.order.updateMany({
        where: { id: { in: orderIds } },
        data: { customerTenant: 'lumina' },
      })
    }
    for (let user of customerData?.users!) {
      await prisma.loginHistory.deleteMany({ where: { userId: user.id } })
      await prisma.user.delete({ where: { id: user.id } })
      console.log('Deleting from Auth0 ', user.authId)
      await managementClient.deleteUser({ id: user.authId })
    }

    await prisma.customer.delete({
      where: { name: customerName },
    })
  }
  console.log('!!!!!!Done!!!!!!!')
  process.exit(0)
})()
