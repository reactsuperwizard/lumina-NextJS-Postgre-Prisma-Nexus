import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth0, usePlausible } from 'modules/hooks'
import {
  ApolloQueryResult,
  FetchResult,
  gql,
  useApolloClient,
} from '@apollo/client'
import {
  Customer,
  PermissionsRole,
  Query,
  QueryGetCustomerArgs,
} from '@lumina/api'

import { TenantContext } from './TenantContext'

import { EventNames } from 'modules/providers/plausible/Constants'
import { Auth0User } from '../auth/Auth0User'

interface ITenantProviderOptions {
  children: React.ReactElement
}

const GET_CUSTOMER = gql`
  query getCustomer($where: CustomerWhereUniqueInput!) {
    customer: getCustomer(where: $where) {
      id
      tenant
      slug
      name
      active
      isPaid
    }
  }
`

type CustomerQuery = Pick<
  Customer,
  'id' | 'tenant' | 'slug' | 'name' | 'active' | 'isPaid'
>

const ACTIVATE_CUSTOMER = gql`
  mutation activateCustomer($where: CustomerWhereUniqueInput!) {
    customer: activateCustomer(where: $where) {
      id
      tenant
      slug
      name
      active
      isPaid
    }
  }
`

export const TenantProvider = ({ children }: ITenantProviderOptions) => {
  const ref = useRef<Auth0User>()
  const router = useRouter()
  const slug: string | null =
    router.query?.portal?.toString().toLowerCase() || null
  const { user, isAuthenticated } = useAuth0()
  ref.current = user as Auth0User
  const apollo = useApolloClient()
  const { inactiveCustomerLoginToPortal, isPlausibleLoaded } = usePlausible()

  const [isLuminaAdmin, setIsLuminaAdmin] = useState<boolean | null>(null)
  const [isLuminaScripter, setIsLuminaScripter] = useState<boolean | null>(null)
  const [isLuminaManager, setIsLuminaManager] = useState<boolean | null>(null)
  const [isTenantAdmin, setIsTenantAdmin] = useState<boolean | null>(null)
  const [isTenantUser, setIsTenantUser] = useState<boolean | null>(null)
  const [active, setActive] = useState(true)
  const [tenant, setTenant] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [isPaid, setIsPaid] = useState<boolean | null>(null)
  const [loading, setLoading] = useState<boolean | null>(true)
  const [email, setEmail] = useState<{ role: PermissionsRole } | null>(null)

  const getTenant = async (slug: string) => {
    setLoading(true)
    const customerQuery: ApolloQueryResult<{
      customer: CustomerQuery
    }> = await apollo.query<{ customer: CustomerQuery }, QueryGetCustomerArgs>({
      query: GET_CUSTOMER,
      variables: { where: { slug } },
    })
    const _tenant = customerQuery.data.customer?.tenant
    if (!_tenant) return redirectToCustomer()
    setTenant(_tenant)
    const _name = customerQuery.data.customer.name
    if (_name) setName(_name)
    const _active = customerQuery.data.customer.active
    if (_active !== active) setActive(_active)
    const _email = user?.name
    if (_email) setEmail(_email)
    setIsPaid(customerQuery.data.customer.isPaid)
    setLoading(false)
  }

  const getSlug = async (tenant: string) => {
    const customerQuery = await apollo.query<
      { customer: Customer },
      QueryGetCustomerArgs
    >({
      query: GET_CUSTOMER,
      variables: { where: { tenant } },
    })
    const _slug = customerQuery?.data?.customer?.slug || null
    return _slug
  }

  /**
   * Function that accesses a user's tenants and navigates to the portal
   * of whichever key is first.
   */
  const redirectToCustomer = async () => {
    setLoading(false)
    const user = ref.current
    const tenants = user?.['https://lumina.com/tenants']
    if (!tenants) {
      if (user) {
        router.replace('/setupCustomer')
        return
      }
      throw Error('Must authenticate to use redirectToCustomer')
    }
    if (tenants) {
      const tenant = Object.keys(tenants)[0]
      const customer = await getSlug(tenant)
      router.push(`/${customer}`)
    }
  }

  /**
   * A function that accesses the current tenant and updates its
   * active value to `true` in the DB as well as the `active` state hook
   *
   * @returns void
   */
  const activateCustomer = async () => {
    const activatedCustomer: FetchResult<{
      customer: CustomerQuery
    }> = await apollo.mutate<{ customer: CustomerQuery }, QueryGetCustomerArgs>(
      {
        mutation: ACTIVATE_CUSTOMER,
        variables: { where: { slug } },
      },
    )
    if (!activatedCustomer?.data) return
    const _active = activatedCustomer.data.customer.active
    if (_active !== active) setActive(_active)
  }

  useEffect(() => {
    if (!isAuthenticated || !isPlausibleLoaded) return
    if (!active) {
      inactiveCustomerLoginToPortal(EventNames.INACTIVE_CUSTOMER_LOGIN_PORTAL, {
        props: {
          customer: name || '',
          active: active,
          email: email,
        },
      })
    }
  }, [isAuthenticated, isPlausibleLoaded, active])

  useEffect(() => {
    if (slug && isAuthenticated) {
      ;(async () => {
        await getTenant(slug)
      })()
    }
  }, [slug])

  useEffect(() => {
    if (!user || !tenant) return
    if (isLuminaAdmin === null) return

    let _userIsTenantAdmin = false
    let _userIsTenantUser = false
    if (Array.isArray(user?.['https://lumina.com/tenants']?.[tenant]?.role)) {
      _userIsTenantAdmin = user?.['https://lumina.com/tenants']?.[
        tenant
      ]?.role.includes(PermissionsRole.Admin)
    } else {
      _userIsTenantAdmin =
        user?.['https://lumina.com/tenants']?.lumina?.role ===
        PermissionsRole.Admin
    }

    if (tenant) {
      if (Array.isArray(user?.['https://lumina.com/tenants']?.[tenant]?.role)) {
        _userIsTenantUser = user?.['https://lumina.com/tenants']?.[
          tenant
        ]?.role.includes(PermissionsRole.User)
      } else {
        _userIsTenantUser =
          user?.['https://lumina.com/tenants']?.lumina?.role ===
          PermissionsRole.User
      }
    }

    if (_userIsTenantAdmin || _userIsTenantUser) {
      setIsTenantAdmin(_userIsTenantAdmin)
      setIsTenantUser(_userIsTenantUser)
    }
    if (!_userIsTenantUser && !_userIsTenantAdmin && isLuminaAdmin === false) {
      redirectToCustomer()
    }
  }, [user, tenant, isLuminaAdmin])

  useEffect(() => {
    if (!user) return
    ref.current = user

    // Remove this after going live
    if (Array.isArray(user?.['https://lumina.com/tenants']?.lumina?.role)) {
      setIsLuminaAdmin(
        user?.['https://lumina.com/tenants']?.lumina?.role.includes(
          PermissionsRole.Admin,
        ),
      )
      setIsLuminaManager(
        user?.['https://lumina.com/tenants']?.lumina?.role.includes(
          PermissionsRole.Manager,
        ),
      )
      setIsLuminaScripter(
        user?.['https://lumina.com/tenants']?.lumina?.role.includes(
          PermissionsRole.Scripter,
        ),
      )
    } else {
      setIsLuminaAdmin(
        user?.['https://lumina.com/tenants']?.lumina?.role ===
          PermissionsRole.Admin,
      )
      setIsLuminaManager(
        user?.['https://lumina.com/tenants']?.lumina?.role ===
          PermissionsRole.Manager,
      )
      setIsLuminaScripter(
        user?.['https://lumina.com/tenants']?.lumina?.role ===
          PermissionsRole.Scripter,
      )
    }
  }, [user])

  return (
    <TenantContext.Provider
      value={{
        tenant,
        name,
        active,
        isLuminaAdmin,
        isTenantAdmin,
        isTenantUser,
        isLuminaManager,
        isLuminaScripter,
        redirectToCustomer,
        activateCustomer,
        email,
        isPaid,
        loading,
      }}
    >
      {children}
    </TenantContext.Provider>
  )
}
