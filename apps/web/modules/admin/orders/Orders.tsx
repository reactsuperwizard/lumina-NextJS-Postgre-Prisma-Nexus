import React, { useEffect, useState } from 'react'
import { gql } from '@apollo/client'

import {
  ResourceList,
  AdminViewGrid,
  FilterSearchBar,
} from 'modules/admin/Components'

import {
  Customer,
  Order as OrderType,
  OrderOrderByInput,
  OrderWhereInput,
  QueryMode,
  Request as RequestType,
  Script,
  Video,
} from '@lumina/api'

const ORDERS_QUERY = gql`
  query orders(
    $where: OrderWhereInput
    $orderBy: [OrderOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    rows: orders(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      name
      createdAt
      updatedAt
      customer {
        id
        name
      }
      scripts(take: 10) {
        id
      }
      videos(take: 10) {
        id
      }
    }
  }
`

const ORDER_COUNT = gql`
  query totalOrders($where: OrderWhereInput) {
    result: totalOrders(where: $where) {
      count
    }
  }
`

interface GetOrdersQuery
  extends Pick<
    OrderType,
    'name' | 'id' | 'createdAt' | 'updatedAt' | 'status'
  > {
  customer: Pick<Customer, 'id' | 'name'>
  videos: Pick<Video, 'id'>[]
  scripts: Pick<Script, 'id'>[]
  requests: Pick<RequestType, 'id'>[]
}

export const Orders = () => {
  const [filters, setFilters] = useState<null | { where?: OrderWhereInput }>(
    null,
  )

  const [nameFilter, setNameFilter] = useState<null | string>(null)

  const columns: (keyof GetOrdersQuery)[] = [
    'name',
    'customer',
    'scripts',
    'videos',
    'createdAt',
    'updatedAt',
  ]
  const orderByColumns: (keyof OrderOrderByInput)[] = [
    'name',
    'customer',
    'createdAt',
    'updatedAt',
  ]
  const connectedColumns = {
    customer: 'name',
    scripts: 'id',
    videos: 'id',
  }

  useEffect(() => {
    if (nameFilter !== '' && !nameFilter) return
    const where: OrderWhereInput = {}
    where.name = {
      contains: nameFilter,
      mode: QueryMode.Insensitive,
    }
    setFilters(nameFilter !== '' ? { where } : { where: undefined })
  }, [nameFilter])

  return (
    <AdminViewGrid
      heading="Orders"
      searchBar={
        <FilterSearchBar
          filterLabel="Filter orders by name"
          setTerm={setNameFilter}
          searchTerm="name"
        />
      }
    >
      <ResourceList
        resourceName="Order"
        RESOURCES_QUERY={ORDERS_QUERY}
        COUNT_QUERY={ORDER_COUNT}
        columns={columns}
        orderByColumns={orderByColumns}
        connectedColumns={connectedColumns}
        filters={filters}
        routeName="orders"
      />
    </AdminViewGrid>
  )
}
