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
  Video,
  Script,
  Maybe,
} from '@lumina/api'

const PREFIX = 'CustomerVideos'

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
      videos(orderBy: { updatedAt: desc }) {
        id
        status
        createdAt
        updatedAt
        name
      }
    }
  }
`

interface GetCustomerQuery extends Pick<CustomerType, 'id' | 'name'> {
  videos: Pick<Video, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'name'>[]
}

export const CustomerVideos = () => {
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
            ? `${customerQuery.customer.name} Videos`
            : `Customer #${id} Videos`
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
              {customerQuery.customer.videos?.[0] ? (
                <SubTable
                  columns={['id', 'name', 'status', 'createdAt', 'updatedAt']}
                  labels={['Id', 'Name', 'Status', 'Created', 'Updated']}
                  values={customerQuery.customer.videos.filter((video) =>
                    search
                      ? video.name
                          ?.toLowerCase()
                          ?.includes(search.toLowerCase())
                      : true,
                  )}
                  connectedType="videos"
                  complete
                />
              ) : (
                'No videos yet'
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
