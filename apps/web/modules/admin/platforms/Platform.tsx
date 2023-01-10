import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import { AdminViewGrid, DeleteResourceDialog, SubTable } from '../Components'
import { LiveField } from 'modules/utils'
import {
  QueryPlatformArgs,
  Platform as PlatformType,
  Scalars,
  PlatformWhereUniqueInput,
  Customer,
} from '@lumina/api'

const PREFIX = 'Platform'

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

const REQUEST_QUERY = gql`
  query platform($where: PlatformWhereUniqueInput!) {
    platform(where: $where) {
      id
      name
      createdAt
      updatedAt
      customers {
        id
        name
        slug
        tenant
        createdAt
      }
    }
  }
`

export interface GetPlatformQuery
  extends Pick<PlatformType, 'id' | 'name' | 'createdAt' | 'updatedAt'> {
  customers: Pick<Customer, 'id' | 'name' | 'slug' | 'tenant' | 'createdAt'>[]
}

export const Platform = () => {
  const router = useRouter()

  const [openDelete, setOpenDelete] = useState(false)

  const { id } = router.query
  const platformId = parseInt(id?.toString())

  const where: PlatformWhereUniqueInput = { id: platformId }

  const {
    data: platformQuery,
    loading,
    error,
    refetch,
  } = useQuery<{ platform: GetPlatformQuery }, QueryPlatformArgs>(
    REQUEST_QUERY,
    {
      variables: { where: { id: platformId } },
      skip: !platformId,
    },
  )

  const formatDate = (value: Scalars['DateTime']) =>
    new Date(value).toLocaleString('en-US')

  return (
    <Root>
      <AdminViewGrid
        heading={
          platformQuery?.platform.name
            ? `Platform: ${platformQuery.platform.name}`
            : `Platform #${id}`
        }
      >
        <Paper className={classes.paper}>
          {loading && (
            <Box className={classes.loadingBox}>
              <CircularProgress className={classes.loadingAnimation} />
            </Box>
          )}
          {platformQuery?.platform && !error && (
            <Box m={1}>
              <Box p={1}>
                <LiveField
                  dense
                  disabled
                  label="Id"
                  defaultValue={platformQuery.platform.id || ''}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  resource="Platform"
                  label="Name"
                  field="name"
                  where={where}
                  defaultValue={platformQuery.platform.name || ''}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  disabled
                  label="Created At"
                  defaultValue={formatDate(platformQuery.platform.createdAt)}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  disabled
                  label="Updated At"
                  defaultValue={formatDate(platformQuery.platform.updatedAt)}
                />
              </Box>
              <Box p={2}>
                <Typography variant="subtitle1">Customers:</Typography>
                {platformQuery?.platform?.customers &&
                platformQuery.platform.customers.length > 0 ? (
                  <SubTable
                    columns={['id', 'name', 'slug', 'tenant', 'createdAt']}
                    labels={['Id', 'Name', 'Slug', 'Tenant', 'Created']}
                    values={platformQuery.platform.customers}
                    connectedType="customers"
                  />
                ) : (
                  'No customers yet'
                )}
              </Box>
              {platformQuery?.platform &&
                !platformQuery.platform.customers?.[0] && (
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
          )}
          {platformQuery?.platform === null && (
            <Typography color="textPrimary">Platform not found</Typography>
          )}
        </Paper>
        <DeleteResourceDialog
          open={openDelete}
          cancel={() => setOpenDelete(false)}
          id={platformId}
          resource="Platform"
        />
      </AdminViewGrid>
    </Root>
  )
}
