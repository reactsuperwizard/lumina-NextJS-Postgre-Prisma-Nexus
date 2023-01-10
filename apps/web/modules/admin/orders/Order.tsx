import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import {
  AdminViewGrid,
  ConnectedChip,
  DeleteResourceDialog,
} from '../Components'
import { AddRequestDialog } from './AddRequestDialog'
import { LiveField, LiveSelect } from 'modules/utils'
import {
  QueryOrderArgs,
  Order as OrderType,
  Scalars,
  OrderWhereUniqueInput,
  OrderStatus,
  Customer,
  Video,
  Script,
  Request as RequestType,
} from '@lumina/api'

const PREFIX = 'Order'

const classes = {
  paper: `${PREFIX}-paper`,
  loadingBox: `${PREFIX}-loadingBox`,
  loadingAnimation: `${PREFIX}-loadingAnimation`,
  deleteButtonBox: `${PREFIX}-deleteButtonBox`,
  deleteButton: `${PREFIX}-deleteButton`,
  addRequestButton: `${PREFIX}-addRequestButton`,
}

const Root = styled('div')({
  [`& .${classes.paper}`]: { minHeight: '15rem' },
  [`& .${classes.loadingBox}`]: {
    height: '15rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`& .${classes.loadingAnimation}`]: {
    height: '10rem !important',
    width: '10rem !important',
  },
  [`& .${classes.deleteButtonBox}`]: { padding: '1rem 0.5rem' },
  [`& .${classes.deleteButton}`]: { color: 'red', border: '1px solid red' },
  [`& .${classes.addRequestButton}`]: {
    marginRight: '7px',
    padding: '0.5rem 1rem 0.5rem 1rem',
  },
})

const ORDER_QUERY = gql`
  query order($where: OrderWhereUniqueInput!) {
    order(where: $where) {
      id
      name
      createdAt
      updatedAt
      status
      customer {
        id
        name
      }
      videos(orderBy: { createdAt: desc }) {
        id
      }
      scripts(orderBy: { createdAt: desc }) {
        id
      }
      requests(orderBy: { createdAt: desc }) {
        id
      }
    }
  }
`

export interface GetOrderQuery
  extends Pick<
    OrderType,
    'name' | 'id' | 'createdAt' | 'updatedAt' | 'status'
  > {
  customer: Pick<Customer, 'id' | 'name'>
  videos: Pick<Video, 'id'>[]
  scripts: Pick<Script, 'id'>[]
  requests: Pick<RequestType, 'id'>[]
}

export const Order = () => {
  const router = useRouter()

  const [openDelete, setOpenDelete] = useState(false)
  const [openCreateRequest, setOpenCreateRequest] = useState(false)

  const { id } = router.query
  const orderId = parseInt(id?.toString())

  const where: OrderWhereUniqueInput = { id: orderId }

  const {
    data: orderQuery,
    loading,
    error,
  } = useQuery<{ order: GetOrderQuery }, QueryOrderArgs>(ORDER_QUERY, {
    variables: { where: { id: orderId } },
    skip: !orderId,
  })

  const formatDate = (value: Scalars['DateTime']) =>
    new Date(value).toLocaleString('en-US')

  return (
    <Root>
      <AdminViewGrid heading={`Order #${id}`}>
        <Paper className={classes.paper}>
          {loading ? (
            <Box className={classes.loadingBox}>
              <CircularProgress className={classes.loadingAnimation} />
            </Box>
          ) : orderQuery?.order && !error ? (
            <Box m={2}>
              <Box p={1}>
                <LiveField
                  disabled
                  label="Order Id"
                  defaultValue={orderQuery.order.id}
                />
              </Box>

              <Box p={1}>
                <LiveField
                  dense
                  label="Order Name"
                  resource="Order"
                  field="name"
                  where={where}
                  defaultValue={orderQuery.order.name || ''}
                />
              </Box>
              <Box p={1}>
                <Typography variant="subtitle1">Status</Typography>
                <LiveSelect
                  dense
                  resource="Order"
                  field="status"
                  where={where}
                  defaultValue={orderQuery.order.status}
                  options={[
                    { label: 'In Progress', value: OrderStatus.InProgress },
                    { label: 'Completed', value: OrderStatus.Completed },
                  ]}
                />
              </Box>
              {orderQuery.order.customer?.id && (
                <Box p={1}>
                  <Typography variant="subtitle1">Customer:</Typography>
                  <ConnectedChip
                    id={orderQuery.order.customer.id}
                    resourceName="customer"
                    label={orderQuery.order.customer.name}
                  />
                </Box>
              )}
              <Box p={1}>
                <Typography variant="subtitle1">Videos:</Typography>
                {orderQuery.order.videos?.length > 1 ? (
                  <>
                    {orderQuery.order.videos.map((video) => (
                      <ConnectedChip
                        id={video.id}
                        resourceName="video"
                        key={`video-connected-chip-${video.id}`}
                      />
                    ))}
                  </>
                ) : (
                  <Typography color="primary">
                    &nbsp; No videos yet for this order.
                  </Typography>
                )}
              </Box>
              <Box p={1}>
                <Typography variant="subtitle1">Requests:</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenCreateRequest(true)}
                  className={classes.addRequestButton}
                >
                  Add Request
                </Button>
                {orderQuery.order.requests?.length > 0 ? (
                  <>
                    {orderQuery.order.requests.map((request) => (
                      <ConnectedChip
                        id={request.id}
                        resourceName="request"
                        key={`request-connected-chip-${request.id}`}
                      />
                    ))}
                  </>
                ) : (
                  <Typography color="primary">
                    &nbsp; No requests yet for this order.
                  </Typography>
                )}
              </Box>
              <Box p={1}>
                <Typography variant="subtitle1">Scripts:</Typography>
                {orderQuery.order.scripts?.length > 0 ? (
                  <>
                    {orderQuery.order.scripts.map((script) => (
                      <ConnectedChip
                        id={script.id}
                        resourceName="script"
                        key={`script-connected-chip-${script.id}`}
                      />
                    ))}
                  </>
                ) : (
                  <Typography color="primary">
                    &nbsp; No scripts yet for this order.
                  </Typography>
                )}
              </Box>
              <Box p={1}>
                <LiveField
                  disabled
                  label="Created At"
                  defaultValue={formatDate(orderQuery.order.createdAt)}
                />
              </Box>

              {orderQuery.order.updatedAt && (
                <Box p={1}>
                  <LiveField
                    disabled
                    label="Updated At"
                    defaultValue={formatDate(orderQuery.order.updatedAt)}
                  />
                </Box>
              )}
              {orderQuery?.order &&
                !orderQuery.order.scripts?.[0] &&
                !orderQuery.order.requests?.[0] &&
                !orderQuery.order.videos?.[0] && (
                  <Box className={classes.deleteButtonBox}>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenDelete(true)}
                      fullWidth
                      className={classes.deleteButton}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
            </Box>
          ) : null}
        </Paper>
        <AddRequestDialog
          open={openCreateRequest}
          cancel={() => setOpenCreateRequest(false)}
          order={orderQuery?.order}
        />
        <DeleteResourceDialog
          open={openDelete}
          cancel={() => setOpenDelete(false)}
          id={orderId}
          resource="Order"
        />
      </AdminViewGrid>
    </Root>
  )
}
