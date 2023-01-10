// yarn api ts-node scripts/addSlugsToCustomers`

import { PrismaClient, Customer } from '.prisma/client'
import { slugify } from '../src/utils'
// update all customers that where created before slugs

const prisma = new PrismaClient()

const migrateCustomerSlugs = async () => {
  await prisma.$connect()
  console.log('getting customers')
  const customers: Pick<
    Customer,
    'name' | 'slug'
  >[] = await prisma.customer.findMany({
    select: { name: true, slug: true },
  })
  console.log(`found ${customers.length} customers`)
  return Promise.all(
    customers.map(async c => {
      const { name, slug: oldSlug } = c
      const newSlug = slugify(oldSlug)

      const result = await prisma.customer.update({
        where: { name },
        data: { slug: newSlug },
      })

      console.log(`Updated Customer: ${name} with slug: ${result.slug}`)
    }),
  )
}

migrateCustomerSlugs().finally(() => {
  prisma.$disconnect()
  console.log('!!!!Finished!!!!')
})
