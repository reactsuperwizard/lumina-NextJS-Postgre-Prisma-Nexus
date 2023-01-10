import React from 'react'
import {
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import { ApolloError } from '@apollo/client'
import { useRouter } from 'next/router'
import { RowErrorMessage } from 'modules/utils/RowErrorMessage'

import { OrderRow } from '../OrdersComponents/OrderRow'
import { GetOrdersQuery } from '..'

interface Props {
  loading: boolean
  ordersQuery: { customer: GetOrdersQuery } | undefined
  search: string
  error?: ApolloError
}

export const OrdersTable = ({ loading, error, ordersQuery, search }: Props) => {
  const router = useRouter()
  return (
    <Table size="small" style={{ marginTop: '1.5rem' }}>
      <TableBody>
        <TableRow key={`topper`}>
          <TableCell width="100%" colSpan={6}>
            {''}
          </TableCell>
        </TableRow>
        {error ? (
          <TableRow key={`errorOnFetch`}>
            <TableCell colSpan={5}>
              <RowErrorMessage text="An error occurred fetching your orders" />
            </TableCell>
          </TableRow>
        ) : loading || !ordersQuery?.customer ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <TableRow key={`loading${i}`}>
                <TableCell colSpan={6}>
                  <LinearProgress
                    style={{ height: '9.5rem', opacity: 0.1 }}
                    color="secondary"
                  />
                </TableCell>
              </TableRow>
            ))}
          </>
        ) : !ordersQuery.customer.orders[0] ? (
          <TableRow key={`errorNoOrders`}>
            <TableCell colSpan={5}>
              <RowErrorMessage text="We don't have any orders from you yet" />
            </TableCell>
          </TableRow>
        ) : (
          ordersQuery.customer.orders
            .filter((order) => {
              if (!search) return true
              const requestJobTitles =
                order.requests?.map((r) => r.jobTitle || '') || []
              return requestJobTitles.some((jobTitle) =>
                jobTitle.toLowerCase()?.includes(search.toLowerCase()),
              )
            })
            .map((order) => (
              <OrderRow
                key={`orderRow${order.id}`}
                order={order}
                handleOnClick={() =>
                  router.push(`/${router.query?.portal}/orders/${order.id}`)
                }
              />
            ))
        )}
      </TableBody>
    </Table>
  )
}
