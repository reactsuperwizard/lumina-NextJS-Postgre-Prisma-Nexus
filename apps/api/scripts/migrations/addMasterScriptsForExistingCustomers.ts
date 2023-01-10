import { PrismaClient } from '.prisma/client'
import { Flavor } from '@lumina/render/src/flavors'
import { Prisma } from '@prisma/client'
import { managementClient } from '../../src/auth/managementClient'
import { getFlavorById } from '../../src/types/Flavor/resolvers'

const prisma = new PrismaClient()
;(async () => {
  const customers = await prisma.customer.findMany({
    where: {
      OR: [
        { defaultTemplate: { not: null } },
        { approvedTemplates: { isEmpty: false } },
      ],
      id: 22,
    },
  })
  for (let cust of customers) {
    console.log('Running - ', cust.id)
    const templates = Array.from(
      new Set([...cust.approvedTemplates, cust.defaultTemplate]),
    )
    // const payload:
    for (let template of templates) {
      if (template === 'E1') continue
      const flavorData = getFlavorById(template!) as Flavor
      await prisma.masterTemplate.create({
        data: {
          flavor: template!,
          customer: { connect: { id: cust.id } },
          layers: flavorData.layers as unknown as Prisma.InputJsonValue,
        },
      })
    }
  }
  // console.log('Len:', customers.length)
  console.log(
    '!!!!!!Done!!!!!!!',
    // customers.map((cust) => ({
    //   id: cust.id,
    //   app: cust.approvedTemplates,
    //   def: cust.defaultTemplate,
    // })),
  )
  process.exit(0)
})()
