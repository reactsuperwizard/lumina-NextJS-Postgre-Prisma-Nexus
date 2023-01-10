// all types to be consumed by other packages
import {
  User,
  Customer,
  Order,
  UserOrderByInput,
  CustomerOrderByInput,
  OrderOrderByInput,
  RequestOrderByInput,
  Request,
  Video,
  VideoOrderByInput,
  Script,
  ScriptOrderByInput,
  QueryUsersArgs,
  QueryCustomersArgs,
  QueryOrdersArgs,
  QueryRequestsArgs,
  QueryVideosArgs,
  QueryScriptsArgs,
} from './generated/graphql'

// TODO: export union type for all resources and inputs
export type LuminaResource = User & Customer & Order & Request & Video & Script // TODO: ...
export type LuminaResourceOrderByInput = UserOrderByInput &
  CustomerOrderByInput &
  OrderOrderByInput &
  RequestOrderByInput &
  VideoOrderByInput &
  ScriptOrderByInput
export type QueryLuminaResourcesArgs = QueryUsersArgs &
  QueryCustomersArgs &
  QueryOrdersArgs &
  QueryRequestsArgs &
  QueryVideosArgs &
  QueryScriptsArgs

export * from './generated/graphql'
export { slugify } from './src/utils/slugify'
export * from './src/auth/Tenants'
export * from './src/types/User/onboarding'
