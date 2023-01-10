// part of 20201215 Migration to add make
// 1. Request require an order //
// 2. Script require a request
// 3. Video require a script
// 4. Order and all require a customer
// yarn api ts-node scripts/addSlugsToCustomers`
// @ts-nocheck
import { PrismaClient, Customer } from '.prisma/client'

import { speak } from '../../../src/utils'

speak()

const prisma = new PrismaClient()

const addRequiredFields = async (): Promise<void> => {
  try {
    await prisma.$connect()
    // assing customerSlug to orders
    console.log('Getting all orders')
    const orders = await prisma.order.findMany({
      include: { customer: true },
    })
    await prisma.$disconnect()
    orders.forEach(async order => {
      const { tenant } = order.customer
      if (order.customerTenant === tenant) return
      console.log(
        `Assign customer ${tenant} to order.customerTenant of ${order.id}`,
      )
      await prisma.$connect()
      await prisma.order.update({
        where: { id: order.id },
        data: { customerTenant: tenant },
      })
      await prisma.$disconnect()
    })

    // assing customerSlug to requests
    console.log('Getting all requests')
    const requests = await prisma.request.findMany({
      include: { customer: true },
    })
    await prisma.$disconnect()
    requests.forEach(async request => {
      const { tenant } = request.customer
      if (request.customerTenant === tenant) return
      console.log(
        `Assign customer ${tenant} to order.customerTenant of ${request.id}`,
      )
      await prisma.$connect()
      await prisma.request.update({
        where: { id: request.id },
        data: { customerTenant: tenant },
      })
      await prisma.$disconnect()
    })

    // assing customerSlug to videos
    console.log('Getting all videos')
    const videos = await prisma.video.findMany({
      include: { customer: true },
    })
    await prisma.$disconnect()
    videos.forEach(async video => {
      const tenant = video.customer?.tenant
      if (!tenant) return
      if (video.customerTenant === tenant) return
      console.log(
        `Assign customer ${tenant} to order.customerTenant of ${video.id}`,
      )
      await prisma.$connect()
      await prisma.video.update({
        where: { id: video.id },
        data: { customerTenant: tenant },
      })
      await prisma.$disconnect()
    })

    await prisma.$disconnect()
    console.log('Finished')
  } catch (e) {
    console.error(e.message)
  }
}

addRequiredFields()
