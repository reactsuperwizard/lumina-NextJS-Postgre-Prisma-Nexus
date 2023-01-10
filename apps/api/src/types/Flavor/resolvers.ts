import { FieldResolver } from 'nexus'
import {
  T1,
  T2,
  T4,
  T6,
  T7,
  T8,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  // T16,
  E1,
} from '@lumina/render'
import { TemplateFlavor } from '@prisma/client'
import { Flavor, FlavorBase } from '@lumina/render/dist/src/flavors'

export const getFlavor: FieldResolver<'Query', 'flavor'> = (
  _,
  args,
  _ctx,
  _info,
) => {
  return getFlavorById(args.name)
}

export const getFlavors: FieldResolver<'Query', 'flavors'> = (
  _,
  _args,
  _ctx,
  _info,
) => {
  return { T1, T4, T7, T8, T10, T11, T12, T6, T13, T14, T15, E1 }
}

export const getMultipleFlavors: FieldResolver<'Query', 'flavorsMultiple'> = (
  _,
  args,
  _ctx,
  _info,
) => {
  // Get multiple templates
  const result: Record<string, any> = {}
  for (let i = 0; i < args.name.length; i++) {
    const arg = args.name[i]
    switch (arg) {
      case 'T1':
        result[arg] = T1
        break
      case 'T2':
        result[arg] = T2
        break
      case 'T4':
        result[arg] = T4
        break
      case 'T6':
        result[arg] = T6
        break
      case 'T7':
        result[arg] = T7
        break
      case 'T8':
        result[arg] = T8
        break
      case 'T10':
        result[arg] = T10
        break
      case 'T11':
        result[arg] = T11
        break
      case 'T12':
        result[arg] = T12
        break
      case 'T13':
        result[arg] = T13
        break
      case 'T14':
        result[arg] = T14
        break
      case 'T15':
        result[arg] = T15
        break
      // case 'T16':
      //   result[arg] = T16
      //   break
      case 'E1':
        result[arg] = E1
        break
    }
  }
  return result
}

export const getFlavorById = (flavor: TemplateFlavor): Flavor | FlavorBase => {
  switch (flavor) {
    case 'T1':
      return T1
    case 'T2':
      return T2
    case 'T4':
      return T4
    case 'T6':
      return T6
    case 'T7':
      return T7
    case 'T8':
      return T8
    case 'T10':
      return T10
    case 'T11':
      return T11
    case 'T12':
      return T12
    case 'T13':
      return T13
    case 'T14':
      return T14
    case 'T15':
      return T15
    // case 'T16':
    //   return T16
    case 'E1':
      return E1
    default:
      throw new Error('Nexus type defs will not allow this.')
  }
}
