import { gql } from '@apollo/client'

export const UPDATE_USER_PERMISSIONS = gql`
  mutation updateUserPermissions(
    $authId: String!
    $customerTenant: String!
    $role: [PermissionsRole]
    $isApproved: Boolean
    $hasFreeRequest: Boolean
  ) {
    updateUserPermissions(
      authId: $authId
      customerTenant: $customerTenant
      role: $role
      isApproved: $isApproved
      hasFreeRequest: $hasFreeRequest
    ) {
      id
      tenants
      customers {
        slug
        name
        isPaid
      }
    }
  }
`
