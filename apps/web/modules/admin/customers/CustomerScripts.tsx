import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
} from '@mui/material'
import { AdminViewGrid, SubTable } from '../Components'
import { useUrlSearch } from 'modules/hooks/useUrlSearch'
import {
  QueryCustomerArgs,
  Customer as CustomerType,
  Maybe,
  Script,
} from '@lumina/api'

const PREFIX = 'CustomerScripts'

const classes = {
  paper: `${PREFIX}-paper`,
  loadingBox: `${PREFIX}-loadingBox`,
  loadingAnimation: `${PREFIX}-loadingAnimation`,
  deleteButtonBox: `${PREFIX}-deleteButtonBox`,
  deleteButton: `${PREFIX}-deleteButton`,
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
})

const CUSTOMER_QUERY = gql`
  query customer($where: CustomerWhereUniqueInput!) {
    customer(where: $where) {
      id
      name
      scripts(orderBy: { updatedAt: desc }) {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`

interface GetCustomerQuery extends Pick<CustomerType, 'name' | 'id'> {
  scripts: Pick<Script, 'id' | 'name' | 'createdAt' | 'updatedAt'>[]
}

export const CustomerScripts = () => {
  const router = useRouter()

  const { search, setSearch } = useUrlSearch()
  const [filter, setFilter] = useState<Maybe<string>>('')

  const { id } = router.query
  const customerId = parseInt(id?.toString())

  const {
    data: customerQuery,
    loading,
    error,
  } = useQuery<{ customer: GetCustomerQuery }, QueryCustomerArgs>(
    CUSTOMER_QUERY,
    {
      variables: { where: { id: customerId } },
      skip: !customerId,
    },
  )

  useEffect(() => {
    if (!filter && !search) return
    setSearch(filter || '')
  }, [filter])

  return (
    <Root>
      <AdminViewGrid
        heading={
          customerQuery?.customer
            ? `${customerQuery.customer.name} Scripts`
            : `Customer #${id} Scripts`
        }
        searchBar={
          <Grid item sm={3}>
            <TextField
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Search orders by name"
              fullWidth
            />
          </Grid>
        }
      >
        <Paper className={classes.paper}>
          {loading ? (
            <Box className={classes.loadingBox}>
              <CircularProgress className={classes.loadingAnimation} />
            </Box>
          ) : customerQuery?.customer && !error ? (
            <>
              {customerQuery.customer.scripts?.[0] ? (
                <SubTable
                  columns={['id', 'name', 'createdAt', 'updatedAt']}
                  labels={['Id', 'Name', 'Created', 'Updated']}
                  values={customerQuery.customer.scripts.filter((script) =>
                    search
                      ? script.name
                          ?.toLowerCase()
                          ?.includes(search.toLowerCase())
                      : true,
                  )}
                  connectedType="scripts"
                  complete
                />
              ) : (
                'No scripts yet'
              )}
              <Box className={classes.deleteButtonBox}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => router.push(`../${router.query.id}`)}
                  fullWidth
                >
                  Return to Customer Details
                </Button>
              </Box>
            </>
          ) : null}
        </Paper>
      </AdminViewGrid>
    </Root>
  )
}
