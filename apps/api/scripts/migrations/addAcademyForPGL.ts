// yarn api ts-node scripts/migrations/addAcademyForPGL.ts
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

const addAcademyForPGL = async () => {
  const customers = await prisma.customer.findMany({
    select: { id: true, isPaid: true, displayAcademy: true },
  })
  console.log(`found ${customers.length} customers`)
  for (let i = 0; i < customers.length; i++) {
    const customer = customers[i]
    if (!customer.isPaid) {
      const updatedCustomer = await prisma.customer.update({
        where: { id: customer.id },
        data: { displayAcademy: { set: true } },
      })
      console.log('updated customer??', updatedCustomer)
    }
  }
  console.log('Finished!!!!')
  process.exit(0)
}

addAcademyForPGL()
