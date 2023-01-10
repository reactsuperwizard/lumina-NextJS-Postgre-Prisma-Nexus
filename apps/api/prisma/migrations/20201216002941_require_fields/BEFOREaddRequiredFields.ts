// part of 20201215 Migration to add make
// 1. Request require an order //
// 2. Script require a request
// 3. Video require a script
// 4. Order and all require a customer
// yarn api ts-node scripts/addSlugsToCustomers`
// may need to be run multiple times, its not perfect

// @ts-nocheck

import { PrismaClient, Customer } from '.prisma/client'

import { speak } from '../../../src/utils'

speak()

const prisma = new PrismaClient()

const addRequiredFields = async (): Promise<void> => {
  try {
    await prisma.$connect()
    // 1. Requests require order
    console.log('Getting existing requests where there is no customer')
    const requestsWithoutCustomers = await prisma.request.findMany({
      where: { customer: null },
      include: { order: { include: { customer: true } } },
    })
    requestsWithoutCustomers.forEach(async request => {
      const customerId = request.order?.customer.id
      console.log(`Assign customer ${customerId} to request ${request.id}`)
      await prisma.request.update({
        where: { id: request.id },
        data: { customer: { connect: { id: customerId } } },
      })
    })

    console.log('Get or create default order for "lumina')
    let defaultOrder = await prisma.order.findFirst({
      where: { name: 'default', customer: { slug: 'lumina' } },
    })
    if (!defaultOrder) {
      defaultOrder = await prisma.order.create({
        data: { name: 'default', customer: { connect: { slug: 'lumina' } } },
      })
    }
    if (!defaultOrder) {
      throw new Error('Default order was not found or created for some reason!')
    }
    console.log('Getting existing requests where there is no order')
    const requestsWithoutOrder = await prisma.request.findMany({
      where: { order: null },
    })
    console.log('Assign default lumina order to request')
    requestsWithoutOrder.forEach(async request => {
      console.log(`${request.id}`)
      await prisma.request.update({
        where: { id: request.id },
        data: {
          order: {
            connect: { id: defaultOrder?.id as number },
          },
          customer: { connect: { slug: 'lumina' } },
        },
      })
    })
    // 2. Script requires requests
    console.log('Assign scripts to new requests under default lumina order')
    const scriptsWithoutRequests = await prisma.script.findMany({
      where: { request: null },
    })
    scriptsWithoutRequests.forEach(async script => {
      console.log(
        `for script ${
          script.id
        } creating request and attaching to default order with id ${defaultOrder?.id as number}`,
      )
      await prisma.script.update({
        where: { id: script.id },
        data: {
          request: {
            create: {
              customer: { connect: { slug: 'lumina' } },
              order: {
                connect: { id: defaultOrder?.id as number },
              },
            },
          },
        },
      })
    })
    // 3. Video requires script
    const videosWithoutScripts = await prisma.video.findMany({
      where: { script: null },
    })
    videosWithoutScripts.forEach(async video => {
      await prisma.$connect()
      console.log(
        `connect video ${
          video.id
        } to default lumina order ${defaultOrder?.id as number} and to customer slug lumina and create new script`,
      )
      await prisma.video.update({
        where: { id: video.id },
        data: {
          customer: { connect: { slug: 'lumina' } },
          script: {
            create: {
              request: {
                create: {
                  order: { connect: { id: defaultOrder?.id as number } },
                },
              },
            },
          },
        },
      })
      await prisma.$disconnect()
    })
    console.log('Finished')
  } catch (e) {
    console.error(e.message)
  } finally {
    await prisma.$disconnect()
  }
  console.log('finished')
}

addRequiredFields()
