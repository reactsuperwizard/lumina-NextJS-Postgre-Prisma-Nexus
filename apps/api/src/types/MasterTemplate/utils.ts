import { Flavor } from '@lumina/render/dist/src/flavors'
import { Prisma, PrismaClient, TemplateFlavor } from '@prisma/client'
import { getFlavorById } from '../Flavor/resolvers'

export const createMasterTemplate = async (
  newTemplates: TemplateFlavor[],
  prisma: PrismaClient,
  customerId: number,
) => {
  for (const template of newTemplates) {
    // E1 doesnot have layers
    if (template === 'E1') continue
    const layers = (getFlavorById(template) as Flavor)
      .layers as unknown as Prisma.InputJsonValue
    await prisma.masterTemplate.create({
      data: {
        layers,
        customerId,
        flavor: template,
      },
    })
  }
}
