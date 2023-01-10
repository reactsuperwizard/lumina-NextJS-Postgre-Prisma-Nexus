import React from 'react'
import { styled } from '@mui/material/styles'
import { gql, useQuery } from '@apollo/client'
import { Box, CircularProgress, Paper } from '@mui/material'
import { AdminViewGrid } from '../Components'
import {
  QueryRendersArgs,
  Render as RenderType,
  RenderStatus,
  Script,
  SortOrder,
} from '@lumina/api'
import { Render } from './Render'

const PREFIX = 'GET_RENDERS'

const classes = {
  paper: `${PREFIX}-paper`,
  loadingBox: `${PREFIX}-loadingBox`,
  loadingAnimation: `${PREFIX}-loadingAnimation`,
  head: `${PREFIX}-head`,
}

const Root = styled('div')(({ theme }) => ({
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

  [`& .${classes.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}))

export const GET_RENDERS = gql`
  query renders(
    $where: RenderWhereInput
    $take: Int
    $orderBy: [RenderOrderByInput!]
  ) {
    renders(where: $where, take: $take, orderBy: $orderBy) {
      id
      script {
        id
      }
      status
      queuedAt
      updatedAt
    }
  }
`

export type GetRendersQuery = Pick<
  RenderType,
  'id' | 'status' | 'queuedAt' | 'updatedAt'
> & {
  script: Pick<Script, 'id'>
}

export const Renders = () => {
  const variables: QueryRendersArgs = {
    where: { status: { in: [RenderStatus.Queued, RenderStatus.Rendering] } },
    take: 15,
    orderBy: [{ status: SortOrder.Asc }, { updatedAt: SortOrder.Desc }],
  }

  const doneVariables: QueryRendersArgs = {
    where: { status: { in: [RenderStatus.Errored, RenderStatus.Completed] } },
    take: 5,
    orderBy: [{ updatedAt: SortOrder.Desc }],
  }

  const {
    data: queueQuery,
    loading,
    error,
  } = useQuery<{ renders: RenderType[] }, QueryRendersArgs>(GET_RENDERS, {
    variables,
    pollInterval: 60000,
  })

  const {
    data: doneQuery,
    loading: loadingDone,
    error: errorDone,
  } = useQuery<{ renders: RenderType[] }, QueryRendersArgs>(GET_RENDERS, {
    variables: doneVariables,
    pollInterval: 60000,
  })

  return (
    <Root>
      <AdminViewGrid heading={`Render Engine`}>
        <Paper className={classes.paper}>
          {loading ? (
            <Box className={classes.loadingBox}>
              <CircularProgress className={classes.loadingAnimation} />
            </Box>
          ) : queueQuery?.renders && !error && !errorDone ? (
            <Box m={1}>
              <Box p={1}>
                <Render
                  loading={loading}
                  loadingCompleted={loadingDone}
                  queue={queueQuery?.renders}
                  completed={doneQuery?.renders}
                />
              </Box>
            </Box>
          ) : null}
        </Paper>
      </AdminViewGrid>
    </Root>
  )
}
