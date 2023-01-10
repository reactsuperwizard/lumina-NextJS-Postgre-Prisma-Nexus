import { User, Customer, Order, UserOrderByInput, CustomerOrderByInput, OrderOrderByInput, RequestOrderByInput, Request, Video, VideoOrderByInput, Script, ScriptOrderByInput, QueryUsersArgs, QueryCustomersArgs, QueryOrdersArgs, QueryRequestsArgs, QueryVideosArgs, QueryScriptsArgs } from './generated/graphql';
export declare type LuminaResource = User & Customer & Order & Request & Video & Script;
export declare type LuminaResourceOrderByInput = UserOrderByInput & CustomerOrderByInput & OrderOrderByInput & RequestOrderByInput & VideoOrderByInput & ScriptOrderByInput;
export declare type QueryLuminaResourcesArgs = QueryUsersArgs & QueryCustomersArgs & QueryOrdersArgs & QueryRequestsArgs & QueryVideosArgs & QueryScriptsArgs;
export * from './generated/graphql';
export { slugify } from './src/utils/slugify';
export * from './src/auth/Tenants';
export * from './src/types/User/onboarding';
