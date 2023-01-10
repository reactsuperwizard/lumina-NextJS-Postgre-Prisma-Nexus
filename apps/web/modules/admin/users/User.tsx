import React from 'react'
import { styled } from '@mui/material/styles'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { Alert } from '@mui/material'
import { AdminViewGrid, LinkButton, SubTable } from '../Components'
import { LiveField, LiveSelect } from 'modules/utils'
import {
  QueryUserArgs,
  User as UserType,
  Scalars,
  UserWhereUniqueInput,
  Customer,
  Request,
  LoginHistory,
} from '@lumina/api'
import { UserActions } from './actions/UserActions'
import { OptOutSwitch } from '../Components/OptOutSwitch'
import UserLoggedInHistory from './UserLoggedInHistory'

const PREFIX = 'User'

const classes = {
  paper: `${PREFIX}-paper`,
  loadingBox: `${PREFIX}-loadingBox`,
  loadingAnimation: `${PREFIX}-loadingAnimation`,
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
})

const REQUEST_QUERY = gql`
  query user($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      authId
      firstName
      lastName
      createdAt
      updatedAt
      onboarding
      tenants
      slackId
      hsContactId
      isApproved
      customers {
        id
        name
        slug
        tenant
      }
      requests(take: 5, orderBy: { updatedAt: desc }) {
        id
        jobTitle
        status
        createdAt
        updatedAt
      }
      submittedRequests(take: 5, orderBy: { updatedAt: desc }) {
        id
        jobTitle
        status
        createdAt
        updatedAt
      }
      loginHistory(take: 50, orderBy: { loggedInAt: desc }) {
        loggedInAt
      }
    }
  }
`

export interface GetUserQuery
  extends Pick<
    UserType,
    | 'email'
    | 'id'
    | 'firstName'
    | 'lastName'
    | 'createdAt'
    | 'updatedAt'
    | 'authId'
    | 'onboarding'
    | 'tenants'
    | 'slackId'
    | 'hsContactId'
    | 'isApproved'
  > {
  customers: Pick<Customer, 'id' | 'name' | 'slug' | 'tenant'>[]
  requests: Pick<
    Request,
    'id' | 'jobTitle' | 'status' | 'createdAt' | 'updatedAt'
  >[]
  submittedRequests: Pick<
    Request,
    'id' | 'jobTitle' | 'status' | 'createdAt' | 'updatedAt'
  >[]
  loginHistory: Pick<LoginHistory, 'loggedInAt'>[]
}

const LAST_LOGIN_QUERY = gql`
  query user($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      lastLogin
    }
  }
`

export type GetLastLoginQuery = Pick<UserType, 'id' | 'lastLogin'>

export const User = () => {
  const router = useRouter()

  const { id } = router.query
  const userId = parseInt(id?.toString())

  const where: UserWhereUniqueInput = { id: userId }

  const {
    data: userQuery,
    loading,
    error,
    refetch,
  } = useQuery<{ user: GetUserQuery }, QueryUserArgs>(REQUEST_QUERY, {
    variables: { where: { id: userId } },
    skip: !userId,
  })

  const {
    data: lastLoginQuery,
    loading: lastLoginLoading,
    error: lastLoginError,
  } = useQuery<{ user: GetLastLoginQuery }, QueryUserArgs>(LAST_LOGIN_QUERY, {
    variables: { where: { id: userId } },
    skip: !userId,
  })

  const formatDate = (value: Scalars['DateTime']) =>
    new Date(value).toLocaleString('en-US')

  const { user } = userQuery || {}

  const { hsContactId } = userQuery?.user || {}

  return (
    <Root>
      <AdminViewGrid heading={`User #${id}`}>
        <Alert elevation={6} variant="filled" severity="info">
          You can reset a user{"'"}s password OR sign a user up from here. Make
          sure you{"'"}ve connected them to a customer (probably as Admin)
          before you send an invite link so they get onboarded. If you don{"'"}
          t, no worries, they just might miss the onboarding tour.
        </Alert>
        <br />
        <Paper className={classes.paper}>
          {loading && (
            <Box className={classes.loadingBox}>
              <CircularProgress className={classes.loadingAnimation} />
            </Box>
          )}
          {user && !error && (
            <Box m={1}>
              <Box p={1}>
                <LiveField
                  dense
                  disabled
                  label="Id"
                  defaultValue={user.id || ''}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  disabled
                  label="Email"
                  defaultValue={user.email || ''}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  label="Hubspot Contact Id"
                  resource="User"
                  field="hsContactId"
                  where={where}
                  defaultValue={hsContactId || 0}
                />
              </Box>
              <Box p={1}>
                <Typography variant="subtitle1">Status:</Typography>
                <LiveSelect
                  dense
                  resource="User"
                  field="isApproved"
                  where={where}
                  defaultValue={user.isApproved}
                  options={[
                    { label: 'Approved', value: true },
                    { label: 'Pending', value: false },
                  ]}
                />
              </Box>
              <Box p={1}>
                <Typography variant="subtitle1">View in Hubspot:</Typography>
                {hsContactId ? (
                  <LinkButton
                    href={`https://app.hubspot.com/contacts/20184043/contact/${hsContactId}`}
                    blank
                  />
                ) : (
                  <Typography color="primary">
                    &nbsp; Enter a Hubspot Contact Id to create a link.
                  </Typography>
                )}
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  disabled
                  label="Auth Id"
                  defaultValue={user.authId || ''}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  resource="User"
                  label="First Name"
                  field="firstName"
                  where={where}
                  defaultValue={user.firstName || ''}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  label="Last Name"
                  resource="User"
                  field="lastName"
                  where={where}
                  defaultValue={user.lastName || ''}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  label="Slack Id"
                  resource="User"
                  field="slackId"
                  where={where}
                  defaultValue={user.slackId || ''}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  disabled
                  label="Created At"
                  defaultValue={formatDate(user.createdAt)}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  disabled
                  label="Updated At"
                  defaultValue={formatDate(user.updatedAt)}
                />
              </Box>
              {lastLoginQuery?.user && !lastLoginError ? (
                <Box p={1}>
                  <LiveField
                    dense
                    disabled
                    label="Last Logged In At"
                    defaultValue={
                      lastLoginQuery.user.lastLogin
                        ? formatDate(lastLoginQuery.user.lastLogin)
                        : 'User has not logged in.'
                    }
                  />
                </Box>
              ) : null}
              <Box p={1}>
                <OptOutSwitch />
              </Box>

              <Box p={2}>
                <Typography variant="subtitle1">Permissions</Typography>
                <UserActions
                  user={user}
                  refetch={async () => {
                    await refetch()
                  }}
                />
              </Box>
              <Box p={2}>
                <Typography variant="subtitle1">Approved Requests:</Typography>
                {user.requests && user.requests.length > 0 ? (
                  <SubTable
                    columns={[
                      'id',
                      'jobTitle',
                      'status',
                      'createdAt',
                      'updatedAt',
                    ]}
                    labels={['Id', 'Job Title', 'Status', 'Created', 'Updated']}
                    values={user.requests}
                    connectedType="requests"
                  />
                ) : (
                  'No approved requests yet'
                )}
              </Box>
              <Box p={2}>
                <Typography variant="subtitle1">Submitted Requests:</Typography>
                {user.submittedRequests && user.submittedRequests.length > 0 ? (
                  <SubTable
                    columns={[
                      'id',
                      'jobTitle',
                      'status',
                      'createdAt',
                      'updatedAt',
                    ]}
                    labels={['Id', 'Job Title', 'Status', 'Created', 'Updated']}
                    values={user.submittedRequests}
                    connectedType="requests"
                  />
                ) : (
                  'No submitted requests yet'
                )}
              </Box>

              <Box p={2}>
                <Typography variant="subtitle1">Login History:</Typography>
                {user.loginHistory && user.loginHistory.length > 0 ? (
                  <UserLoggedInHistory rows={user.loginHistory} />
                ) : (
                  'No login history yet'
                )}
              </Box>
            </Box>
          )}
          {userQuery?.user === null && (
            <Typography color="textPrimary">User not found</Typography>
          )}
        </Paper>
      </AdminViewGrid>
    </Root>
  )
}
