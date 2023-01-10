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
import { QueryUserArgs, Maybe, Request, User as UserType } from '@lumina/api'

const PREFIX = 'UserRequests'

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
  query user($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      firstName
      lastName
      requests(orderBy: { updatedAt: desc }) {
        id
        jobTitle
        status
        createdAt
        updatedAt
      }
      submittedRequests(orderBy: { updatedAt: desc }) {
        id
        jobTitle
        status
        createdAt
        updatedAt
      }
    }
  }
`

interface GetUserQuery extends Pick<UserType, 'id' | 'firstName' | 'lastName'> {
  requests: Pick<
    Request,
    'id' | 'jobTitle' | 'message' | 'status' | 'createdAt' | 'updatedAt'
  >[]
  submittedRequests: Pick<
    Request,
    'id' | 'jobTitle' | 'message' | 'status' | 'createdAt' | 'updatedAt'
  >[]
}

export const UserRequests = () => {
  const router = useRouter()

  const { search, setSearch } = useUrlSearch()
  const [filter, setFilter] = useState<Maybe<string>>('')

  const { id } = router.query
  const userId = parseInt(id?.toString())

  const {
    data: userQuery,
    loading,
    error,
  } = useQuery<{ user: GetUserQuery }, QueryUserArgs>(REQUEST_QUERY, {
    variables: { where: { id: userId } },
    skip: !userId,
  })

  useEffect(() => {
    if (!filter && !search) return
    setSearch(filter || '')
  }, [filter])

  const { user } = userQuery || {}

  return (
    <Root>
      <AdminViewGrid
        heading={
          user
            ? `${user.firstName} ${user.lastName}'s Requests`
            : `User #${userId} Requests`
        }
        searchBar={
          <Grid item sm={3}>
            <TextField
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Search requests by Job Title"
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
          ) : user && !error ? (
            <>
              {user.requests?.[0] ? (
                <SubTable
                  columns={[
                    'id',
                    'jobTitle',
                    'message',
                    'status',
                    'createdAt',
                    'updatedAt',
                  ]}
                  labels={[
                    'Id',
                    'Job Title',
                    'Message',
                    'Status',
                    'Created',
                    'Updated',
                  ]}
                  values={user.requests.filter((request) =>
                    search
                      ? request.jobTitle
                          ?.toLowerCase()
                          ?.includes(search.toLowerCase())
                      : true,
                  )}
                  connectedType="requests"
                  complete
                />
              ) : (
                'No requests yet'
              )}

              {user.submittedRequests?.[0] ? (
                <SubTable
                  columns={[
                    'id',
                    'jobTitle',
                    'message',
                    'status',
                    'createdAt',
                    'updatedAt',
                  ]}
                  labels={[
                    'Id',
                    'Job Title',
                    'Message',
                    'Status',
                    'Created',
                    'Updated',
                  ]}
                  values={user.submittedRequests.filter((request) =>
                    search
                      ? request.jobTitle
                          ?.toLowerCase()
                          ?.includes(search.toLowerCase())
                      : true,
                  )}
                  connectedType="requests"
                  complete
                />
              ) : (
                'No requests yet'
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
