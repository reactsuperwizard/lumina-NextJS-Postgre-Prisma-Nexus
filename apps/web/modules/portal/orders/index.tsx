import React, { useEffect } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import Head from 'next/head'

import { useQuery, gql } from '@apollo/client'

import {
  Customer,
  QueryGetCustomerArgs,
  Order,
  Request,
  Video,
} from '@lumina/api'

import { useUrlSearch } from 'modules/hooks/useUrlSearch'
import { ListPageTop } from '../components/ListPageTop'
import { useTenant } from 'modules/hooks'
import { OrdersTable } from './OrdersComponents/OrdersTable'
import { OrdersGrid } from './OrdersComponents/OrdersGrid'

const GET_ORDERS = gql`
  query getCustomer($where: CustomerWhereUniqueInput!) {
    customer: getCustomer(where: $where) {
      name
      id
      orders(orderBy: { createdAt: desc }) {
        id
        name
        status
        videos {
          id
          thumbnail
          status
        }
        requests {
          id
          jobTitle
          status
        }
        createdAt
        updatedAt
      }
    }
  }
`

export interface GetOrdersQuery extends Pick<Customer, 'name' | 'id'> {
  orders: (Pick<Order, 'id' | 'name' | 'status' | 'createdAt' | 'updatedAt'> & {
    videos: Pick<Video, 'id' | 'thumbnail' | 'status'>[]
    requests: Pick<Request, 'id' | 'jobTitle' | 'status'>[]
  })[]
}

export const Orders = () => {
  const { tenant, name } = useTenant()
  const { search, setSearch } = useUrlSearch()
  const grid = useMediaQuery('(max-width:959px)')

  const { data: ordersQuery, loading, error, refetch } = useQuery<
    { customer: GetOrdersQuery },
    QueryGetCustomerArgs
  >(GET_ORDERS, {
    variables: { where: { tenant } },
    skip: !tenant,
    pollInterval: 60000,
  })

  useEffect(() => {
    if (ordersQuery) refetch()
  }, [])

  return (
    <Box>
      <Head>
        <title>{`Lumina - Orders - ${name}`}</title>
      </Head>
      <ListPageTop
        title={'Orders'}
        search={search}
        setSearch={setSearch}
        refetch={refetch}
      />
      {grid ? (
        <OrdersGrid
          loading={loading}
          error={error}
          ordersQuery={ordersQuery}
          search={search}
        />
      ) : (
        <OrdersTable
          loading={loading}
          error={error}
          ordersQuery={ordersQuery}
          search={search}
        />
      )}
    </Box>
  )
}
