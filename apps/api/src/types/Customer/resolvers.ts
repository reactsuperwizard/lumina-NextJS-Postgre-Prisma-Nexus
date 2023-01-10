import { FieldResolver } from 'nexus'
import { ApolloError } from 'apollo-server-lambda'
import { CustomFieldResolver } from 'nexus-plugin-prisma/typegen'
import type { Prisma } from '.prisma/client'
import { slugify } from '../../utils'
import { isCustomerAdmin, isLuminaAdmin } from '../../auth'
import { notifyTemplateUnlock } from '../Production/slackIntegration'
import { TemplateFlavor } from '@prisma/client'
import { getFlavorById } from '../Flavor/resolvers'
import { Flavor } from '@lumina/render/dist/src/flavors'
import { createMasterTemplate } from '../MasterTemplate/utils'

export const updateOneCustomer: CustomFieldResolver<
  'Mutation',
  'updateOneCustomer'
> = async (root, args, ctx, info, originalResolve) => {
  const { data, where } = args
  const customerData = await ctx.prisma.customer.findFirst({
    where: where as Prisma.CustomerWhereInput,
  })

  if (!isCustomerAdmin(ctx, customerData?.tenant!) && !isLuminaAdmin)
    throw new ApolloError(`Forbidden resource`)
  if (data.tenant) {
    throw new ApolloError(
      `Failed to update customer where ${JSON.stringify(
        where,
      )}. Customer.tenant is immutable!!`,
    )
  }
  if (data.isPaid && !isLuminaAdmin(ctx)) {
    throw new ApolloError(`Cannot update isPaid`)
  }

  if (data.approvedTemplates && !isLuminaAdmin(ctx)) {
    throw new ApolloError(`Cannot update approvedTemplates`)
  }

  if (args.data?.slug?.set) {
    const slug = args.data?.slug?.set
    const slugified = slugify(slug)
    args.data.slug.set = slugified
  }
  const res = originalResolve(root, args, ctx, info)
  if (
    data?.requestedTemplates?.set?.length! >
    customerData?.requestedTemplates?.length!
  ) {
    const userData = await ctx.prisma.user.findFirst({
      where: { authId: ctx.user?.sub },
    })
    await notifyTemplateUnlock({
      userId: userData?.id!,
      customerId: customerData?.id!,
    })
  }

  // Check if templates is assigned to the customer.
  // Create basic master template if found
  let newTemplates: TemplateFlavor[] = []
  if (data.approvedTemplates?.set && data.approvedTemplates.set?.length! > 0) {
    newTemplates = [...data.approvedTemplates.set]
  }
  if (data.defaultTemplate?.set) newTemplates.push(data.defaultTemplate.set)
  newTemplates = Array.from(new Set(newTemplates))
  if (newTemplates.length > 0) {
    const masterTemplatesData = await ctx.prisma.masterTemplate.findMany({
      where: { customerId: customerData?.id! },
      select: { flavor: true },
    })
    const masterTemplatesDataSet = new Set(
      masterTemplatesData.map((template) => template.flavor),
    )
    const masterTemplateToAdd: TemplateFlavor[] = []
    for (const template of newTemplates) {
      if (!masterTemplatesDataSet.has(template))
        masterTemplateToAdd.push(template)
    }
    if (masterTemplateToAdd.length > 0) {
      await createMasterTemplate(
        masterTemplateToAdd,
        ctx.prisma,
        customerData?.id!,
      )
    }
  }
  return res
}

export const createOneCustomer: CustomFieldResolver<
  'Mutation',
  'createOneCustomer'
> = async (root, args, ctx, info, originalResolve) => {
  const { data } = args
  const res = await originalResolve(root, args, ctx, info)

  // Check if templates is assigned to the customer.
  // Create basic master template if found
  let newTemplates: TemplateFlavor[] = []
  if (data.approvedTemplates?.set && data.approvedTemplates.set?.length! > 0) {
    newTemplates = [...data.approvedTemplates.set]
  }
  if (data.defaultTemplate) newTemplates.push(data.defaultTemplate)
  newTemplates = Array.from(new Set(newTemplates))
  if (newTemplates.length > 0) {
    await createMasterTemplate(newTemplates, ctx.prisma, res.id as number)
  }
  return res
}

export const totalCustomers: FieldResolver<'Query', 'totalCustomers'> = async (
  _root,
  args,
  ctx,
) => {
  const whereArg = args.where as Prisma.CustomerFindManyArgs['where']
  const count = await ctx.prisma.customer.count({ where: whereArg })
  return { count }
}
