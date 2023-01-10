import React, { useEffect, useState } from 'react'
import { gql } from '@apollo/client'

import {
  ResourceList,
  AdminViewGrid,
  FilterSearchBar,
} from 'modules/admin/Components'

import {
  UserOrderByInput,
  User,
  UserWhereInput,
  Customer,
  QueryMode,
} from '@lumina/api'
import { Button } from '@mui/material'

const USERS_QUERY = gql`
  query users(
    $where: UserWhereInput
    $orderBy: [UserOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    rows: users(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      email
      createdAt
      updatedAt
      firstName
      lastName
      lastLogin
      customers {
        id
        name
      }
    }
  }
`

const USERS_COUNT = gql`
  query totalUsers($where: UserWhereInput) {
    result: totalUsers(where: $where) {
      count
    }
  }
`

interface GetUsersQuery
  extends Pick<
    User,
    'email' | 'id' | 'createdAt' | 'firstName' | 'lastName' | 'lastLogin'
  > {
  customers: Pick<Customer, 'id' | 'name'>[]
}

export const Users = () => {
  const [filters, setFilters] = useState<null | {
    where?: UserWhereInput
  }>(null)
  const [lastNameFilter, setLastNameFilter] = useState<string | null>(null)
  const [emailFilter, setEmailFilter] = useState<string | null>(null)
  const [checkUserApprovals, setCheckUserApprovals] = useState<boolean>(false)
  const columns: (keyof GetUsersQuery)[] = [
    'firstName',
    'lastName',
    'email',
    'customers',
    'lastLogin',
    'createdAt',
  ]
  const orderByColumns: (keyof User)[] = [
    'firstName',
    'lastName',
    'email',
    'lastLogin',
    'createdAt',
  ]
  const connectedColumns = {
    customers: 'name',
  }
  const removeWhiteSpaceFromLastNameFilter = (lastNameString: string) => {
    if (lastNameString !== '') {
      return lastNameString?.trim().split(/ +/).join(' ')
    } else if (lastNameString.includes('')) {
      return lastNameString?.replace(/\s/g, '')
    }
  }

  const removeWhiteSpaceFromEmailFilter = (email: string) => {
    if (email.includes('')) {
      return email?.trim().split(/ +/).join('')
    } else if (email !== '') {
      return email?.replace(/\s/g, '')
    }
  }
  useEffect(() => {
    if (emailFilter !== '' && !emailFilter)
      return setFilters({ where: undefined })
    const where: UserWhereInput = {}
    where.email = {
      contains: removeWhiteSpaceFromEmailFilter(emailFilter),
      mode: QueryMode.Insensitive,
    }

    setFilters(
      emailFilter !== ''
        ? { where: { ...filters?.where, ...where } }
        : { where: { ...filters?.where, ...{ email: undefined } } },
    )
  }, [emailFilter])

  useEffect(() => {
    if (lastNameFilter !== '' && !lastNameFilter)
      return setFilters({ where: undefined })
    const where: UserWhereInput = {}
    where.lastName = {
      contains: removeWhiteSpaceFromLastNameFilter(lastNameFilter),
      mode: QueryMode.Insensitive,
    }
    setFilters(
      lastNameFilter !== ''
        ? { where: { ...filters?.where, ...where } }
        : { where: { ...filters?.where, ...{ lastName: undefined } } },
    )
  }, [lastNameFilter])

  useEffect(() => {
    if (checkUserApprovals)
      setFilters({ where: { isApproved: { equals: false } } })
    return () => {
      setCheckUserApprovals(false)
    }
  }, [checkUserApprovals, filters])

  const toggleUserApprovalList = () => {
    setCheckUserApprovals(!checkUserApprovals)
  }

  return (
    <AdminViewGrid
      heading="Users"
      searchBar={
        <>
          <FilterSearchBar
            filterLabel="Search users by last name"
            setTerm={setLastNameFilter}
            searchTerm="lastName"
          />
          <FilterSearchBar
            filterLabel="Search users by email"
            setTerm={setEmailFilter}
            searchTerm="email"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleUserApprovalList}
          >
            Check Pending User Approval
          </Button>
        </>
      }
    >
      <ResourceList
        resourceName="User"
        RESOURCES_QUERY={USERS_QUERY}
        COUNT_QUERY={USERS_COUNT}
        columns={columns}
        orderByColumns={orderByColumns}
        connectedColumns={connectedColumns}
        filters={filters}
        routeName="users"
      />
    </AdminViewGrid>
  )
}
