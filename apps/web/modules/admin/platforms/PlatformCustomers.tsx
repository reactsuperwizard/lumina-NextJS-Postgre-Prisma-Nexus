import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
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
  QueryPlatformArgs,
  Platform as PlatformType,
  Maybe,
  Customer,
} from '@lumina/api'

const PREFIX = 'PlatformCustomers';

const classes = {
  paper: `${PREFIX}-paper`,
  loadingBox: `${PREFIX}-loadingBox`,
  loadingAnimation: `${PREFIX}-loadingAnimation`,
  deleteButtonBox: `${PREFIX}-deleteButtonBox`,
  deleteButton: `${PREFIX}-deleteButton`
};

const Root = styled('div')({
  [`& .${classes.paper}`]: { minHeight: '15rem' },
  [`& .${classes.loadingBox}`]: {
    height: '15rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`& .${classes.loadingAnimation}`]: { height: '10rem !important', width: '10rem !important' },
  [`& .${classes.deleteButtonBox}`]: { padding: '1rem 0.5rem' },
  [`& .${classes.deleteButton}`]: { color: 'red', border: '1px solid red' },
});

const CUSTOMER_QUERY = gql`
  query platform($where: PlatformWhereUniqueInput!) {
    platform(where: $where) {
      id
      name
      customers(orderBy: { updatedAt: desc }) {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`

interface GetPlatformQuery extends Pick<PlatformType, 'name' | 'id'> {
  customers: Pick<Customer, 'id' | 'name' | 'createdAt' | 'updatedAt'>[]
}

export const PlatformCustomers = () => {
  const router = useRouter()

  const { search, setSearch } = useUrlSearch()
  const [filter, setFilter] = useState<Maybe<string>>('')

  const { id } = router.query
  const platformId = parseInt(id?.toString())

  const { data: platformQuery, loading, error } = useQuery<
    { platform: GetPlatformQuery },
    QueryPlatformArgs
  >(CUSTOMER_QUERY, {
    variables: { where: { id: platformId } },
    skip: !platformId,
  })

  useEffect(() => {
    if (!filter && !search) return
    setSearch(filter || '')
  }, [filter])

  return (
    <Root>
      <AdminViewGrid
        heading={
          platformQuery?.platform
            ? `${platformQuery.platform.name} Customers`
            : `Platform #${id} Customers`
        }
        searchBar={
          <Grid item sm={3}>
            <TextField
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Search customers by name"
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
          ) : platformQuery?.platform && !error ? (
            <>
              {platformQuery.platform.customers?.[0] ? (
                <SubTable
                  columns={['id', 'name', 'createdAt', 'updatedAt']}
                  labels={['Id', 'Name', 'Created', 'Updated']}
                  values={platformQuery.platform.customers.filter((order) =>
                    search
                      ? order.name
                          ?.toLowerCase()
                          ?.includes(search.toLowerCase())
                      : true,
                  )}
                  connectedType="customers"
                  complete
                />
              ) : (
                'No customers yet'
              )}
              <Box className={classes.deleteButtonBox}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => router.push(`../${router.query.id}`)}
                  fullWidth
                >
                  Return to Platform Details
                </Button>
              </Box>
            </>
          ) : null}
        </Paper>
      </AdminViewGrid>
    </Root>
  )
}
