// yarn api ts-node scripts/addSlugsToCustomers`

import { PrismaClient, Customer } from '.prisma/client'
import { slugify } from '../src/utils'
// update all customers that where created before slugs

const prisma = new PrismaClient()

const addSlugsToCustomers = async () => {
  console.log('getting customers')
  const customers: Pick<Customer, 'name'>[] = await prisma.customer.findMany({
    select: { name: true },
  })
  console.log(`found ${customers.length} customers`)
  customers.forEach(async c => {
    const { name } = c
    const slug = slugify(name)
    const result = await prisma.customer.update({
      where: { name },
      data: { slug },
    })
    console.log(`Update Customer: ${name} with slug: ${result.slug}`)
  })
  console.log('!!!!Finished!!!!')
}

addSlugsToCustomers()
