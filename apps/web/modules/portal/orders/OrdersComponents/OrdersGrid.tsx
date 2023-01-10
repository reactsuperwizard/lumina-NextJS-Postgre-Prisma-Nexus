import React from 'react'
import { styled } from '@mui/system'
import { Box } from '@mui/material'
import { ApolloError } from '@apollo/client'
import { useRouter } from 'next/router'
import { RowErrorMessage } from 'modules/utils/RowErrorMessage'

import { GetOrdersQuery } from '..'
import { OrderCard } from './OrderCard'

const PREFIX = 'OrdersGrid'

const classes = {
  gridWrap: `${PREFIX}-gridWrap`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.gridWrap}`]: {
    marginTop: '2rem',
    display: 'grid',
    gridGap: '1rem',
    gridTemplateColumns: '1fr',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
}))

interface Props {
  loading: boolean
  ordersQuery: { customer: GetOrdersQuery } | undefined
  search: string
  error?: ApolloError
}

export const OrdersGrid = ({ loading, error, ordersQuery, search }: Props) => {
  const router = useRouter()

  return (
    <StyledBox>
      <Box className={classes.gridWrap}>
        {error ? (
          <Box key={`errorOnFetch`}>
            <Box>
              <RowErrorMessage text="An error occurred fetching your orders" />
            </Box>
          </Box>
        ) : loading || !ordersQuery?.customer ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <OrderCard handleOnClick={() => {}} key={`loading${i}`} />
            ))}
          </>
        ) : !ordersQuery.customer.orders[0] ? (
          <Box key={`errorNoOrders`}>
            <Box>
              <RowErrorMessage text="We don't have any orders from you yet" />
            </Box>
          </Box>
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
              <OrderCard
                key={`orderRow${order.id}`}
                order={order}
                handleOnClick={() =>
                  router.push(`/${router.query?.portal}/orders/${order.id}`)
                }
              />
            ))
        )}
      </Box>
    </StyledBox>
  )
}
