import React, { Fragment, useEffect, useState } from 'react'
import { gql } from '@apollo/client'

import {
  AdminViewGrid,
  FilterSearchBar,
  ResourceList,
} from 'modules/admin/Components'

import { QueryMode } from '@lumina/api'

import type { ScriptOrderByInput, ScriptWhereInput, Script } from '@lumina/api'
import { Button } from '@mui/material'

const SCRIPT_QUERY = gql`
  query scripts(
    $where: ScriptWhereInput
    $orderBy: [ScriptOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    rows: scripts(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      name
      createdAt
      updatedAt
      video {
        id
      }
      request {
        id
      }
      order {
        id
        customer {
          id
          name
        }
      }
    }
  }
`

const SCRIPT_COUNT = gql`
  query totalScripts($where: ScriptWhereInput) {
    result: totalScripts(where: $where) {
      count
    }
  }
`

export const Scripts = () => {
  const [filters, setFilters] = useState<null | { where?: ScriptWhereInput }>(
    null,
  )
  const [nameFilter, setNameFilter] = useState<string | null>(null)
  const [customerNameFilter, setCustomerNameFilter] = useState<string | null>(
    null,
  )
  const [checkUpdatedScripts, setCheckUpdatedScripts] = useState<boolean>(false)

  const columns: (keyof Script)[] = [
    'name',
    'order',
    'request',
    'video',
    'createdAt',
    'updatedAt',
  ]
  const orderByColumns: (keyof ScriptOrderByInput)[] = [
    'name',
    'producer',
    'video',
    'order',
    'createdAt',
    'updatedAt',
  ]
  const connectedColumns = {
    customer: 'name',
    order: 'id',
    request: 'id',
    video: 'id',
  }

  // This contains mapping of the filter name with the nested mapping to reach the column
  const nestedColumns = {
    customer: 'order.customer.name',
  }

  // This contains the chip name that needs to be displayed based on the key name
  const chipKeyNameMapping = {
    order: 'customer',
  }

  useEffect(() => {
    if (!nameFilter && !customerNameFilter)
      return setFilters({ where: undefined })
    const where: ScriptWhereInput = {}
    where.name = {
      contains: nameFilter,
      mode: QueryMode.Insensitive,
    }
    setFilters(
      nameFilter !== ''
        ? { where: { ...filters?.where, ...where } }
        : { where: { ...filters?.where, ...{ name: undefined } } },
    )
  }, [nameFilter])

  useEffect(() => {
    if (!nameFilter && !customerNameFilter)
      return setFilters({ where: undefined })

    const where: ScriptWhereInput = {}
    where.order = {
      customer: {
        name: {
          contains: customerNameFilter,
          mode: QueryMode.Insensitive,
        },
      },
    }
    setFilters(
      customerNameFilter !== ''
        ? { where: { ...filters?.where, ...where } }
        : { where: { ...filters?.where, ...{ order: undefined } } },
    )
  }, [customerNameFilter])

  useEffect(() => {
    if (checkUpdatedScripts)
      setFilters({ where: { customerUpdate: { equals: true } } })
    return () => {
      setCheckUpdatedScripts(false)
    }
  }, [checkUpdatedScripts, filters])

  const toggleUpdatedScriptsList = () => {
    setCheckUpdatedScripts(!checkUpdatedScripts)
  }
  return (
    <AdminViewGrid
      heading="Scripts"
      searchBar={
        <Fragment>
          <FilterSearchBar
            filterLabel="Filter scripts by name"
            setTerm={setNameFilter}
            searchTerm="name"
          />
          <FilterSearchBar
            filterLabel="Filter scripts by customer name"
            setTerm={setCustomerNameFilter}
            searchTerm="customer"
            connectedColumns={nestedColumns}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleUpdatedScriptsList}
          >
            Check Revision Requests
          </Button>
        </Fragment>
      }
    >
      <ResourceList
        resourceName="Script"
        RESOURCES_QUERY={SCRIPT_QUERY}
        COUNT_QUERY={SCRIPT_COUNT}
        columns={columns}
        orderByColumns={orderByColumns}
        connectedColumns={connectedColumns}
        filters={filters}
        routeName="scripts"
        chipKeyNameMapping={chipKeyNameMapping}
      />
    </AdminViewGrid>
  )
}
