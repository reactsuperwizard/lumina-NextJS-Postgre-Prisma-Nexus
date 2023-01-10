import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { NetworkStatus, useQuery } from '@apollo/client'
import { Grid, LinearProgress, Paper, Theme } from '@mui/material'
import { Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import {
  AdminViewGrid,
  LuminaAutocomplete,
  QueryField,
  ReturnField,
} from '../Components'
import { RequestCard } from './RequestCard'
import { GetRequestsQuery, GET_REQUESTS } from './queries'
import { RequestDialog } from './RequestDialog'
import {
  QueryRequestsArgs,
  RequestOrderByInput,
  RequestStatus,
  RequestWhereInput,
  SortOrder,
} from '@lumina/api'

const PREFIX = 'Production'

const classes = {
  root: `${PREFIX}-root`,
  mainGrid: `${PREFIX}-mainGrid`,
  heading: `${PREFIX}-heading`,
  columns: `${PREFIX}-columns`,
  skeleton: `${PREFIX}-skeleton`,
  filterDiv: `${PREFIX}-filterDiv`,
  unassigned: `${PREFIX}-unassigned`,
  loading: `${PREFIX}-loading`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    flexGrow: 1,
  },

  [`& .${classes.mainGrid}`]: {
    marginTop: '0.5rem',
  },

  [`& .${classes.heading}`]: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    padding: '15px 0'
  },

  [`& .${classes.columns}`]: {
    padding: theme.spacing(2),
    paddingBottom: '0.5rem',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#dae3f1',
    minHeight: '35rem',
  },

  [`& .${classes.skeleton}`]: {
    height: '6rem',
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.filterDiv}`]: {
    width: '19rem',
    textAlign: 'right',
  },

  [`& .${classes.unassigned}`]: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    fontSize: '0.87rem',
    margin: '0 auto'
  },

  [`& .${classes.loading}`]: {
    height: '0.5rem',
    margin: '-1rem 0 -0.75rem',
  },
}))

export const Production = () => {
  const router = useRouter()
  const { query } = router
  const [requestId, setRequestId] = useState<number | null>(null)
  const { owner } = router.query
  const [where, setWhere] = useState<RequestWhereInput>({
    status: { notIn: [RequestStatus.Draft, RequestStatus.Completed] },
  })
  const [orderBy, setOrderBy] = useState<RequestOrderByInput[]>([
    { createdAt: SortOrder.Desc },
  ])
  const [unassigned, setUnassigned] = useState(false)
  const [refetching, setRefetching] = useState(false)

  const { data, loading, refetch, networkStatus } = useQuery<
    { requests: GetRequestsQuery[] },
    QueryRequestsArgs
  >(GET_REQUESTS, {
    variables: { where, orderBy },
    pollInterval: 60000,
  })

  useEffect(() => {
    if (networkStatus === NetworkStatus.refetch) {
      setRefetching(true)
    } else if (refetching) {
      setRefetching(false)
    }
  }, [networkStatus])

  useEffect(() => {
    if (query.request) {
      const requestId = parseInt(query.request as string)
      setRequestId(requestId || null)
    } else {
      if (requestId) {
        setRequestId(null)
        refetch()
      }
    }
  }, [query])

  useEffect(() => {
    if (owner) {
      const newWhere = { ...where }
      newWhere.owner =
        owner === 'null' ? null : { email: { equals: owner as string } }
      setWhere(newWhere)
    } else if (where.owner) {
      const { owner: _, ...newWhere } = where
      setWhere(newWhere)
    }
  }, [owner])

  const clearRequest = () => {
    const { request: _, ...newQuery } = query
    router.push({ pathname: '/admin/production', query: newQuery })
  }

  const addOwner = (email: string) => {
    const newQuery = { ...router.query, owner: email }
    router.push({ pathname: '/admin/production', query: newQuery })
  }

  const clearOwner = () => {
    const { owner: _, ...newQuery } = query
    router.push({ pathname: '/admin/production', query: newQuery })
  }

  const clearFilters = () => router.push('/admin/production')

  return (
    <Root>
      <AdminViewGrid
        heading={`Production Dashboard`}
        searchBar={
          <div className={classes.filterDiv}>
            <LuminaAutocomplete
              label="Filter by Owner Email"
              getOptionLabel="email"
              resourceName="User"
              fieldName="email"
              queryFields={[QueryField.email]}
              returnFields={[ReturnField.email]}
              source="user.id"
              initValue={owner}
              parse={(v: any) => {
                return v.id
              }}
              onChange={(value: any) =>
                value?.email ? addOwner(value.email) : clearOwner()
              }
            />
            {!owner && (
              <div className={classes.unassigned}>
                <span onClick={() => setUnassigned(true)}>
                  See Unassigned Requests
                </span>
              </div>
            )}
            <div className={classes.unassigned}>
              <span
                onClick={() => {
                  setUnassigned(false)
                  clearFilters()
                }}
              >
                Clear Filters
              </span>
            </div>
          </div>
        }
      >
        <Grid container spacing={3} className={classes.mainGrid}>
          <Grid item xs={12}>
            <Paper className={classes.heading} onClick={clearRequest}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  Submitted
                </Grid>
                <Grid item xs={3}>
                  Scripting
                </Grid>
                <Grid item xs={3}>
                  QA
                </Grid>
                <Grid item xs={3}>
                  Ready for Delivery
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.loading}>
            {(refetching || loading) && <LinearProgress />}
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.columns}>
              {data && !loading
                ? data.requests
                    .filter((req) => (unassigned ? !req.owner : true))
                    .filter((req) => req.status === RequestStatus.Submitted)
                    .map((req) => (
                      <RequestCard
                        key={`request-card-${req.id}`}
                        requestId={req.id}
                        jobTitle={req.jobTitle || 'Job title'}
                        customer={req.customer.name}
                        owner={req.owner?.email || 'Not assigned'}
                      />
                    ))
                : [1, 2, 3, 4].map((n) => (
                    <Skeleton
                      variant="rectangular"
                      className={classes.skeleton}
                      key={`skeleton-1-${n}`}
                    />
                  ))}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.columns}>
              {data && !loading
                ? data.requests
                    .filter((req) => (unassigned ? !req.owner : true))
                    .filter(
                      (req) =>
                        req.status === RequestStatus.Scripting ||
                        req.status === RequestStatus.Queued ||
                        req.status === RequestStatus.Rendering,
                    )
                    .map((req) => (
                      <RequestCard
                        key={`request-card-${req.id}`}
                        requestId={req.id}
                        jobTitle={req.jobTitle || 'Job title'}
                        customer={req.customer.name}
                        owner={req.owner?.email || 'Not assigned'}
                      />
                    ))
                : [1, 2, 3, 4].map((n) => (
                    <Skeleton
                      variant="rectangular"
                      className={classes.skeleton}
                      key={`skeleton-2-${n}`}
                    />
                  ))}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.columns}>
              {data && !loading
                ? data.requests
                    .filter((req) => (unassigned ? !req.owner : true))
                    .filter((req) => req.status === RequestStatus.Qa)
                    .map((req) => (
                      <RequestCard
                        key={`request-card-${req.id}`}
                        requestId={req.id}
                        jobTitle={req.jobTitle || 'Job title'}
                        customer={req.customer.name}
                        owner={req.owner?.email || 'Not assigned'}
                      />
                    ))
                : [1, 2, 3, 4].map((n) => (
                    <Skeleton
                      variant="rectangular"
                      className={classes.skeleton}
                      key={`skeleton-3-${n}`}
                    />
                  ))}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.columns}>
              {data && !loading
                ? data.requests
                    .filter((req) => (unassigned ? !req.owner : true))
                    .filter((req) => req.status === RequestStatus.Final)
                    .map((req) => (
                      <RequestCard
                        key={`request-card-${req.id}`}
                        requestId={req.id}
                        jobTitle={req.jobTitle || 'Job title'}
                        customer={req.customer.name}
                        owner={req.owner?.email || 'Not assigned'}
                      />
                    ))
                : [1, 2, 3, 4].map((n) => (
                    <Skeleton
                      variant="rectangular"
                      className={classes.skeleton}
                      key={`skeleton-4-${n}`}
                    />
                  ))}
            </Paper>
          </Grid>
        </Grid>
        <RequestDialog
          requestId={requestId}
          open={true}
          cancel={clearRequest}
        />
      </AdminViewGrid>
    </Root>
  )
}
