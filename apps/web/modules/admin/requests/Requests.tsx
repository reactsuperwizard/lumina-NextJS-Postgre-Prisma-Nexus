import React, { useEffect, useState } from 'react'
import { gql } from '@apollo/client'

import {
  AdminViewGrid,
  FilterSearchBar,
  ResourceList,
} from 'modules/admin/Components'

import {
  RequestOrderByInput,
  RequestWhereInput,
  QueryMode,
  Request,
  Customer,
  Order,
  Script,
  User,
} from '@lumina/api'

const REQUEST_QUERY = gql`
  query requests(
    $where: RequestWhereInput
    $orderBy: [RequestOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    rows: requests(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      jobTitle
      status
      createdAt
      updatedAt
      owner {
        id
        email
      }
      customer {
        id
        name
      }
      order {
        id
      }
      script {
        id
      }
    }
  }
`

const REQUEST_COUNT = gql`
  query totalRequests($where: RequestWhereInput) {
    result: totalRequests(where: $where) {
      count
    }
  }
`

interface GetRequestsQuery
  extends Pick<
    Request,
    'jobTitle' | 'id' | 'createdAt' | 'updatedAt' | 'status'
  > {
  owner: Pick<User, 'id' | 'email'>
  customer: Pick<Customer, 'id' | 'name'>
  order: Pick<Order, 'id'>
  script: Pick<Script, 'id'>
}

export const Requests = () => {
  const [filters, setFilters] = useState<null | { where?: RequestWhereInput }>(
    null,
  )
  const [nameFilter, setNameFilter] = useState<null | string>(null)
  const columns: (keyof GetRequestsQuery)[] = [
    'jobTitle',
    'customer',
    'order',
    'script',
    'status',
    'owner',
    'createdAt',
  ]
  const orderByColumns: (keyof RequestOrderByInput)[] = [
    'jobTitle',
    'createdAt',
    'status',
    'customer',
    'owner',
    'status',
  ]
  const connectedColumns = {
    customer: 'name',
    order: 'id',
    script: 'id',
    owner: 'email',
  }

  useEffect(() => {
    if (nameFilter !== '' && !nameFilter) return
    const where: RequestWhereInput = {}
    where.jobTitle = {
      contains: nameFilter,
      mode: QueryMode.Insensitive,
    }
    setFilters(nameFilter !== '' ? { where } : { where: undefined })
  }, [nameFilter])

  return (
    <AdminViewGrid
      heading="Requests"
      searchBar={
        <FilterSearchBar
          filterLabel="Filter requests by job title"
          setTerm={setNameFilter}
          searchTerm="jobTitle"
        />
      }
    >
      <ResourceList
        resourceName="Request"
        RESOURCES_QUERY={REQUEST_QUERY}
        COUNT_QUERY={REQUEST_COUNT}
        columns={columns}
        orderByColumns={orderByColumns}
        connectedColumns={connectedColumns}
        filters={filters}
        routeName="requests"
      />
    </AdminViewGrid>
  )
}
