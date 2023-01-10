import React, { useEffect, useState } from 'react'
import { gql } from '@apollo/client'

import {
  ResourceList,
  AdminViewGrid,
  FilterSearchBar,
} from 'modules/admin/Components'

import {
  PlatformOrderByInput,
  Platform,
  PlatformWhereInput,
  Customer,
  QueryMode,
} from '@lumina/api'

const PLATFORMS_QUERY = gql`
  query platforms(
    $where: PlatformWhereInput
    $orderBy: [PlatformOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    rows: platforms(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      name
      createdAt
      updatedAt
      customers {
        id
        name
      }
    }
  }
`

const PLATFORMS_COUNT = gql`
  query totalPlatforms($where: PlatformWhereInput) {
    result: totalPlatforms(where: $where) {
      count
    }
  }
`

interface GetPlatformsQuery
  extends Pick<Platform, 'id' | 'name' | 'createdAt' | 'updatedAt'> {
  customers: Pick<Customer, 'id' | 'name'>[]
}

export const Platforms = () => {
  const [filters, setFilters] = useState<null | {
    where?: PlatformWhereInput
  }>(null)
  const [nameFilter, setNameFilter] = useState<string | null>(null)
  const columns: (keyof GetPlatformsQuery)[] = [
    'name',
    'customers',
    'createdAt',
    'updatedAt',
  ]
  const orderByColumns: (keyof PlatformOrderByInput)[] = [
    'name',
    'createdAt',
    'updatedAt',
  ]
  const connectedColumns = {
    customers: 'name',
  }

  useEffect(() => {
    if (nameFilter !== '' && !nameFilter) return
    const where: PlatformWhereInput = {}
    where.name = {
      contains: nameFilter,
      mode: QueryMode.Insensitive,
    }
    setFilters(nameFilter !== '' ? { where } : { where: undefined })
  }, [nameFilter])

  return (
    <AdminViewGrid
      heading="Platforms"
      searchBar={
        <FilterSearchBar
          filterLabel="Search platforms by name"
          setTerm={setNameFilter}
          searchTerm="name"
        />
      }
    >
      <ResourceList
        resourceName="Platform"
        RESOURCES_QUERY={PLATFORMS_QUERY}
        COUNT_QUERY={PLATFORMS_COUNT}
        columns={columns}
        orderByColumns={orderByColumns}
        connectedColumns={connectedColumns}
        filters={filters}
        routeName="platforms"
      />
    </AdminViewGrid>
  )
}
