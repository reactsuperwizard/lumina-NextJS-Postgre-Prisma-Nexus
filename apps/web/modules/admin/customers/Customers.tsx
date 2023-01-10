import React, { useEffect, useState } from 'react'
import { gql } from '@apollo/client'

import {
  ResourceList,
  AdminViewGrid,
  FilterSearchBar,
} from 'modules/admin/Components'

import {
  Customer,
  CustomerOrderByInput,
  CustomerWhereInput,
  Order,
  QueryMode,
  Video,
} from '@lumina/api'
import { Button } from '@mui/material'

const CUSTOMERS_QUERY = gql`
  query customers(
    $where: CustomerWhereInput
    $orderBy: [CustomerOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    rows: customers(
      where: $where
      orderBy: $orderBy
      take: $take
      skip: $skip
    ) {
      id
      name
      createdAt
      updatedAt
      orders(take: 10) {
        id
        name
      }
      videos(take: 10) {
        id
      }
    }
  }
`

const CUSTOMER_COUNT = gql`
  query totalCustomers($where: CustomerWhereInput) {
    result: totalCustomers(where: $where) {
      count
    }
  }
`

interface GetCustomersQuery
  extends Pick<Customer, 'name' | 'id' | 'createdAt' | 'updatedAt'> {
  customer: Pick<Customer, 'id' | 'name'>
  videos: Pick<Video, 'id'>[]
  orders: Pick<Order, 'id'>[]
}

export const Customers = () => {
  const [filters, setFilters] = useState<null | {
    where?: CustomerWhereInput
  }>(null)
  const [nameFilter, setNameFilter] = useState<null | string>(null)
  const [checkRequestedTemplates, setCheckRequestedTemplates] =
    useState<boolean>(false)
  const columns: (keyof GetCustomersQuery)[] = [
    'name',
    'videos',
    'orders',
    'createdAt',
    'updatedAt',
  ]
  const orderByColumns: (keyof CustomerOrderByInput)[] = [
    'name',
    'createdAt',
    'updatedAt',
  ]
  const connectedColumns = {
    orders: 'id',
    videos: 'id',
  }

  useEffect(() => {
    if (checkRequestedTemplates)
      setFilters({ where: { requestedTemplates: { isEmpty: false } } })
    return () => {
      setCheckRequestedTemplates(false)
    }
  }, [checkRequestedTemplates, filters])

  const toggleRequestedTemplatesList = () => {
    setCheckRequestedTemplates(!checkRequestedTemplates)
  }

  useEffect(() => {
    if (nameFilter !== '' && !nameFilter) return
    const where: CustomerWhereInput = {}
    where.name = {
      contains: nameFilter,
      mode: QueryMode.Insensitive,
    }
    setFilters(nameFilter !== '' ? { where } : { where: undefined })
  }, [nameFilter])

  return (
    <AdminViewGrid
      heading="Customers"
      searchBar={
        <>
          <FilterSearchBar
            filterLabel="Search customers by name"
            setTerm={setNameFilter}
            searchTerm="name"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleRequestedTemplatesList}
          >
            Check Pending Templates Approval
          </Button>
        </>
      }
    >
      <ResourceList
        resourceName="Customer"
        RESOURCES_QUERY={CUSTOMERS_QUERY}
        COUNT_QUERY={CUSTOMER_COUNT}
        columns={columns}
        orderByColumns={orderByColumns}
        connectedColumns={connectedColumns}
        filters={filters}
        routeName="customers"
      />
    </AdminViewGrid>
  )
}
