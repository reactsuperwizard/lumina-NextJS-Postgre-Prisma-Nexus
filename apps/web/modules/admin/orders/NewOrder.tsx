import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import {
  Button,
  Paper,
  Box,
  Typography,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import { Save } from '@mui/icons-material'
import {
  QueryField,
  ReturnField,
  LuminaAutocomplete,
} from '../Components/LuminaAutocomplete'
import { Order, OrderStatus } from '@lumina/api'

const PREFIX = 'NewOrder';

const classes = {
  formBox: `${PREFIX}-formBox`,
  findRequest: `${PREFIX}-findRequest`,
  saveButton: `${PREFIX}-saveButton`,
  orderFormInput: `${PREFIX}-orderFormInput`,
  orderFormSelectLabel: `${PREFIX}-orderFormSelectLabel`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.formBox}`]: {
    padding: '1.5rem',
  },
  [`& .${classes.findRequest}`]: {
    margin: '1.5rem 0 0.5rem',
  },
  [`& .${classes.saveButton}`]: {
    marginTop: '1.5rem',
  },
  [`& .${classes.orderFormInput}`]: { margin: '1.5rem 0 1.5rem', width: 300, display: 'block' },
  [`& .${classes.orderFormSelectLabel}`]: { marginTop: '1.5rem', display: 'block' },
});

const CREATE_ORDER = gql`
  mutation createOneOrder($data: OrderCreateInput!) {
    order: createOneOrder(data: $data) {
      id
    }
  }
`

export const NewOrder = () => {

  const router = useRouter()
  const [customer, setCustomer] = useState<any | null>(null)
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  const [status, setStatus] = useState(OrderStatus.InProgress)

  const [addOrder] = useMutation<{ order: Pick<Order, 'id'> }>(CREATE_ORDER)

  const createOrder = async () => {
    if (!customer) return
    setCreating(true)
    const result = await addOrder({
      variables: {
        data: {
          name,
          customer: { connect: { id: customer.id } },
          status: OrderStatus.InProgress,
        },
      },
    })
    setCreating(false)
    const newId = result.data?.order?.id
    router.push(`./${newId}`)
  }

  return (
    (<Root>
      <Paper>
        <Box className={classes.formBox}>
          <Typography variant="h4">Create Order</Typography>
          <TextField
            variant="outlined"
            className={classes.orderFormInput}
            margin="dense"
            color="primary"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Order Name"
          />
          <LuminaAutocomplete
            label="Lookup Customer by Name"
            getOptionLabel="name"
            resourceName="Customer"
            fieldName="template"
            queryFields={[QueryField.name]}
            returnFields={[ReturnField.id, ReturnField.name]}
            source="template.id"
            parse={(v: any) => {
              return v.id
            }}
            onChange={(value: any) => setCustomer(value)}
          />
          <InputLabel
            id="video-status"
            className={classes.orderFormSelectLabel}
          >
            Status
          </InputLabel>
          <Select
            labelId="order-status"
            // className={classes.orderFormInput}
            label="Status"
            id="order-status-select"
            value={status}
            style={{ width: '300px', display: 'block' }}
            margin="dense"
            variant="outlined"
            onChange={(e) =>
              setStatus(
                e.target.value === OrderStatus.Completed
                  ? OrderStatus.Completed
                  : OrderStatus.InProgress,
              )
            }
          >
            <MenuItem value={OrderStatus.Completed}>Completed</MenuItem>
            <MenuItem value={OrderStatus.InProgress}>In Progress</MenuItem>
          </Select>
          {creating ? (
            <CircularProgress />
          ) : (
            <Button
              className={classes.saveButton}
              disabled={customer === null}
              variant="contained"
              color="secondary"
              startIcon={<Save />}
              onClick={createOrder}
            >
              Save
            </Button>
          )}
        </Box>
      </Paper>
    </Root>)
  );
}
