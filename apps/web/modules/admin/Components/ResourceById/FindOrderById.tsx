import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { gql, useApolloClient } from '@apollo/client'
import {
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
  Table,
  TableBody,
} from '@mui/material'
import { Alert } from '@mui/material';
import { FindResourceResultRow } from '..'
import { Order, Customer } from '@lumina/api'

const PREFIX = 'FindOrderById';

const classes = {
  requestIdInput: `${PREFIX}-requestIdInput`,
  findButton: `${PREFIX}-findButton`,
  resultDiv: `${PREFIX}-resultDiv`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.requestIdInput}`]: { margin: '1.5rem 0 1.5rem', width: 300, display: 'block' },
  [`& .${classes.findButton}`]: { marginBottom: '1.5rem' },
  [`& .${classes.resultDiv}`]: { padding: '0 0 1.5rem 0', maxWidth: '400px' },
});

export interface GetOrderQuery extends Pick<Order, 'id' | 'name'> {
  customer: Pick<Customer, 'id' | 'name'>
}

const GET_ORDER = gql`
  query Order($where: OrderWhereUniqueInput!) {
    order(where: $where) {
      id
      name
      customer {
        id
        name
      }
    }
  }
`

export const FindOrderById = (props: {
  order: GetOrderQuery | null
  setOrder: React.Dispatch<React.SetStateAction<GetOrderQuery | null>>
}) => {

  const { order, setOrder } = props
  const client = useApolloClient()
  const [alertOpen, setAlertOpen] = useState(false)
  const [finding, setFinding] = useState(false)
  const [newOrderId, setNewOrderId] = useState<number | null>(null)

  const findOrder = async () => {
    setFinding(true)
    const { data } = await client.query<{ order: GetOrderQuery }>({
      query: GET_ORDER,
      variables: { where: { id: newOrderId } },
    })
    if (!data?.order || !data.order.customer) {
      setAlertOpen(true)
    } else setOrder(data.order)
    setFinding(false)
  }

  return (
    <Root>
      <Typography variant="h6">
        Please enter the ID number for the Order this Request should be
        connected to:
      </Typography>
      <TextField
        className={classes.requestIdInput}
        value={newOrderId || ''}
        type="number"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setOrder(null)
          setNewOrderId(parseInt(event.target.value))
        }}
        variant="outlined"
        margin="dense"
        required
        id="newOrderIdInput"
        name="orderId"
        label="Order Id"
        fullWidth
      />
      {order === null ? (
        finding ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={findOrder}
            className={classes.findButton}
          >
            Find
          </Button>
        )
      ) : (
        <div className={classes.resultDiv}>
          <Table size="small">
            <TableBody>
              <FindResourceResultRow
                label="Customer:"
                value={order.customer.name}
              />
              <FindResourceResultRow label="Order Name:" value={order.name} />
              <FindResourceResultRow label="Order Id:" value={order.id} />
            </TableBody>
          </Table>
        </div>
      )}
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1500}
        onClose={() => setAlertOpen(false)}
      >
        <Alert severity="error">That Order Id can not be found</Alert>
      </Snackbar>
    </Root>
  )
}
