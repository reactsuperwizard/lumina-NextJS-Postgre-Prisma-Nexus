import { PermissionsRole } from '../../generated/graphql';
export interface Tenants {
    [tenant: string]: {
        role: PermissionsRole | PermissionsRole[];
    };
}
export interface TenantsPayload {
    'https://lumina.com/tenants': Tenants;
}
