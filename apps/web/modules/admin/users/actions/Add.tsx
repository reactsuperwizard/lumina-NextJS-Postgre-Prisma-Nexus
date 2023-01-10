import React, { useEffect, useState } from 'react'

import { TableCell, Button, TextField, Box } from '@mui/material'
import { Autocomplete } from '@mui/material'
import { AddCircle, RemoveCircleOutline } from '@mui/icons-material'

import { gql, useApolloClient } from '@apollo/client'
import { useDebounce } from 'modules/utils'

import { Customer } from '@lumina/api'

import { Role } from './Role'

const GET_CUSTOMER_BY_NAME = gql`
  query customers($nameStartsWith: String) {
    customers(
      where: { name: { startsWith: $nameStartsWith, mode: insensitive } }
      take: 5
    ) {
      id
      name
      tenant
    }
  }
`

export const Add = ({
  authId,
  refetchCustomers,
}: {
  authId: string
  refetchCustomers: () => Promise<void>
}) => {
  const [addingCustomer, setAddingCustomer] = useState<boolean>(false)
  const [addingCustomerRole, setAddingCustomerRole] = useState<boolean>(false)
  const [customerNameStartsWith, setCustomerNameStartsWith] = useState<
    string | null
  >(null)
  const [customers, setCustomers] = useState<
    Pick<Customer, 'id' | 'name' | 'tenant'>[]
  >([])
  const [customer, setCustomer] = useState<Pick<
    Customer,
    'id' | 'name' | 'tenant'
  > | null>(null)
  const client = useApolloClient()

  // const getCustomerByName = useLazyQuery(GET_CUSTOMER_BY_NAME)
  const debouncedCStartsWith = useDebounce(customerNameStartsWith, 100)

  // use debouncedCStarts with to search
  useEffect(() => {
    if (debouncedCStartsWith) {
      ;(async () => {
        const { data } = await client.query<{
          customers: Pick<Customer, 'id' | 'name' | 'tenant'>[]
        }>({
          query: GET_CUSTOMER_BY_NAME,
          variables: { nameStartsWith: debouncedCStartsWith },
        })
        const { customers } = data
        if (customers) return setCustomers(customers)
        return setCustomers([])
      })()
    }
  }, [debouncedCStartsWith])

  const reset = () => setCustomer(null)

  if (addingCustomer) {
    return (
      <>
        <TableCell colSpan={3}>
          <Autocomplete
            // value={value}
            onChange={(_e: any, customer: any, reason: any) => {
              if (reason === 'clear') {
                setCustomer(null)
                return
              }
              setAddingCustomer(false)
              setCustomer(customer)
              setCustomerNameStartsWith(null)
              setAddingCustomerRole(true)
            }}
            onInputChange={(_e, value) => {
              setCustomerNameStartsWith(value)
            }}
            options={customers}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params: any) => {
              return (
                <Box p={1}>
                  <TextField
                    {...params}
                    label={'Search for customer by name'}
                    margin="dense"
                    variant="filled"
                  />
                </Box>
              )
            }}
          />
        </TableCell>
        <TableCell />
        <TableCell>
          <RemoveCircleOutline
            onClick={() => {
              setAddingCustomer(false)
              setAddingCustomerRole(false)
            }}
          />
        </TableCell>
      </>
    )
  }

  if (addingCustomerRole && customer) {
    return (
      <>
        <TableCell colSpan={3}>
          <Box component="span" p={1}>
            <TextField
              label={'Customer Name'}
              margin="dense"
              variant="filled"
              value={customer.name}
              style={{ width: '100%' }}
            />
          </Box>
        </TableCell>
        <TableCell>
          <Role
            key="add-role"
            refetchCustomers={refetchCustomers}
            customerTenant={customer.tenant}
            authId={authId}
            role={[]}
            reset={reset}
          />
        </TableCell>
        <TableCell>
          <RemoveCircleOutline
            onClick={() => {
              setAddingCustomer(false)
              setAddingCustomerRole(false)
            }}
          />
        </TableCell>
      </>
    )
  }

  return (
    <>
      <TableCell colSpan={5} align="center">
        <Button
          onClick={() => {
            setAddingCustomer(true)
          }}
          endIcon={<AddCircle />}
        >
          Add Customer
        </Button>
      </TableCell>
    </>
  )
}
