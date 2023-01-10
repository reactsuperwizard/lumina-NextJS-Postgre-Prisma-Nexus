// yarn api ts-node scripts/migrations/20210630183301addCustomerToScripts

import { PrismaClient, Script, Request } from '.prisma/client'

const prisma = new PrismaClient()

const addCustomerToScripts = async () => {
  console.log('getting scripts without a customer')
  const scripts: Script[] = await prisma.script.findMany({
    where: { customer: { is: null }, request: { isNot: null } },
  })
  console.log(`found ${scripts.length} scripts without a connected customer`)
  for (let i = 0; i < scripts.length; i++) {
    const s = scripts[i]
    const { requestId } = s
    if (requestId) {
      try {
        console.log(`Finding customer for script #${s.id} - ${s.name}`)

        const request: Request | null = await prisma.request.findUnique({
          where: { id: requestId },
        })
        if (request && request.customerTenant) {
          const result = await prisma.script.update({
            where: { id: s.id },
            data: {
              customer: { connect: { tenant: request.customerTenant } },
            },
          })
          console.log(`${result.name} completed`)
        } else {
          throw new Error(
            `No customer associated with request #${request?.id} - ${request?.jobTitle}`,
          )
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  console.log('!!!!Finished!!!!')
}

addCustomerToScripts()
