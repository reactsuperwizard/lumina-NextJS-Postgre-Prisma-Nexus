import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import { Box, useMediaQuery } from '@mui/material'
import { Theme } from '@mui/material/styles'

import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { useUrlSearch } from 'modules/hooks/useUrlSearch'
import { RowErrorMessage } from 'modules/utils/RowErrorMessage'

import {
  Video,
  Customer,
  QueryGetCustomerArgs,
  Request,
  RequestStatus,
} from '@lumina/api'

import { VideoCard } from './VideoCard'
import { useTenant, useUser } from 'modules/hooks'
import { ListPageTop } from '../components/ListPageTop'
import { LuminaPagination } from '../components/LuminaPagination'
import Head from 'next/head'
import { VideoTabs } from './VideoTabs'
import { useUrlQuery } from 'modules/hooks/useUrlQuery'
import { NewVideoButton } from '../components/NewVideo/NewVideoButton'

const PREFIX = 'Videos'

const classes = {
  gridList: `${PREFIX}-gridList`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.gridList}`]: {
    padding: '0 0 2rem',
    margin: '0 -0.25rem',
    display: 'grid',
    gridGap: '1rem',
    minHeight: '48vh',
    gridTemplateColumns: '1fr',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },
    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    },
  },
}))
const TEMPLATES_QUERY = gql`
  query templates {
    flavors
  }
`
const GET_CUSTOMER_VIDEOS = gql`
  query getCustomer($where: CustomerWhereUniqueInput!) {
    customer: getCustomer(where: $where) {
      id
      name
      approvedTemplates
      requestedTemplates
      defaultTemplate

      videos(
        orderBy: { createdAt: desc }
        where: { status: { equals: live } }
      ) {
        id
        vimeoId
        name
        createdAt
        thumbnail
        request {
          submittedBy {
            id
          }
        }
      }
      requests(
        orderBy: { createdAt: desc }
        where: { status: { notIn: [completed] } }
      ) {
        id
        status
        createdAt
        jobTitle
        orderId
        submittedBy {
          id
        }
      }
    }
  }
`

interface CustomerQuery
  extends Pick<
    Customer,
    | 'id'
    | 'name'
    | 'approvedTemplates'
    | 'defaultTemplate'
    | 'requestedTemplates'
  > {
  videos: Pick<
    Video,
    'id' | 'vimeoId' | 'createdAt' | 'name' | 'thumbnail' | 'request'
  >[]
  requests: Pick<
    Request,
    'id' | 'status' | 'createdAt' | 'jobTitle' | 'orderId' | 'submittedBy'
  >[]
}

export const Videos = () => {
  const router = useRouter()
  const query = router.query
  const { page, count } = query
  const { search, setSearch } = useUrlSearch()
  const { tenant, name, isPaid, loading: tenantLoading } = useTenant()
  const { isApproved, loading: userLoading, id } = useUser()
  const [defaultCount, setDefaultCount] = useState(12)
  const [totalCount, setTotalCount] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [tabState, setTabState] = useState<
    'completed' | 'inProgress' | 'draft'
  >('completed')
  const [completed, setCompleted] = useState<CustomerQuery['videos'][0][]>([])
  const [inProg, setInProg] = useState<CustomerQuery['requests'][0][]>([])
  const [draft, setDraft] = useState<CustomerQuery['requests'][0][]>([])
  const [myVideos, setMyVideos] = useState(false)
  const [urlTabValue, setUrlTabValue] = useUrlQuery(
    ['tab', 'page', 'count'],
    ['id', 'portal'],
  )

  const xl = useMediaQuery('(min-width:1920px)')

  const {
    data: videosQuery,
    loading,
    error,
    refetch,
  } = useQuery<{ customer: CustomerQuery }, QueryGetCustomerArgs>(
    GET_CUSTOMER_VIDEOS,
    {
      variables: { where: { tenant } },
      skip: !tenant,
      pollInterval: 60000,
    },
  )

  const { data: templates } = useQuery(TEMPLATES_QUERY, {
    // variables: {
    //   name: [
    //     ...new Set([
    //       ...(videosQuery?.customer?.approvedTemplates?.map((template) =>
    //         template.toString(),
    //       ) || []),
    //       ...(videosQuery?.customer?.defaultTemplate
    //         ? [videosQuery?.customer?.defaultTemplate]
    //         : []),
    //     ]),
    //   ],
    // },
    skip: !videosQuery && tenantLoading!,
  })
  useEffect(() => {
    const _defaultCount = xl ? 15 : 12
    if (defaultCount !== _defaultCount) setDefaultCount(_defaultCount)
  }, [xl])

  useEffect(() => {
    if (!urlTabValue.tab) {
      if (tabState !== 'completed') setTabState('completed')
      return
    }
    setTabState(urlTabValue.tab === 'draft' ? 'draft' : 'inProgress')
  }, [urlTabValue])

  const handleOutsideClick = (e: MouseEvent) => {
    const textBoxEle = document.querySelector('#text-box')
    if (textBoxEle?.contains(e?.target as Node)) return
    setShowFilters(false)
  }

  useEffect(() => {
    if (!videosQuery) return
    document.removeEventListener('click', handleOutsideClick)
    document.addEventListener('click', handleOutsideClick)

    if (myVideos) setUrlTabValue({ page: undefined })

    setCompleted(
      videosQuery.customer.videos
        .filter((video) =>
          search
            ? video?.name?.toLowerCase()?.includes(search.toLowerCase())
            : true,
        )
        .filter((video) =>
          myVideos ? video?.request?.submittedBy?.id == id : true,
        ),
    )

    setInProg(
      videosQuery.customer.requests
        .filter(
          (request) =>
            request.status !== RequestStatus.Draft &&
            request.status !== RequestStatus.Cancelled,
        )
        .filter((request) =>
          search
            ? request?.jobTitle?.toLowerCase()?.includes(search.toLowerCase())
            : true,
        )
        .filter((request) =>
          myVideos ? request?.submittedBy?.id == id : true,
        ),
    )
    setDraft(
      videosQuery.customer.requests
        .filter((request) => request.status === RequestStatus.Draft)
        .filter((request) =>
          search
            ? request?.jobTitle?.toLowerCase()?.includes(search.toLowerCase())
            : true,
        )
        .filter((request) =>
          myVideos ? request?.submittedBy?.id == id : true,
        ),
    )

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [videosQuery, search, myVideos])

  useEffect(() => {
    if (!videosQuery?.customer) return
    let _totalCount = 0
    switch (tabState) {
      case 'completed':
        _totalCount = completed.length
        break
      case 'inProgress':
        _totalCount = inProg.length
        break
      default:
        _totalCount = draft.length
        break
    }
    setTotalCount(_totalCount)
  }, [completed, inProg, tabState])

  return (
    <StyledBox>
      <Head>
        <title>{`Lumina - Videos - ${name}`}</title>
      </Head>
      <ListPageTop
        title={'Videos'}
        customerName={name}
        search={search}
        setSearch={setSearch}
        myVideos={myVideos}
        setMyVideos={setMyVideos}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
      {(isApproved && isPaid) || !isPaid ? (
        <>
          <VideoTabs
            completedOnClick={() => setUrlTabValue({})}
            inProgressOnClick={() => setUrlTabValue({ tab: 'inProgress' })}
            draftOnClick={() => setUrlTabValue({ tab: 'draft' })}
            tabState={tabState}
            inProgressCount={inProg.length}
            draftCount={draft.length}
            completedCount={completed.length}
          />
          {error ? (
            <RowErrorMessage text="An error occurred fetching your videos" />
          ) : videosQuery?.customer &&
            !completed[0] &&
            tabState === 'completed' ? (
            <>
              <Box className={classes.gridList}>
                <NewVideoButton
                  refetch={refetch}
                  templates={templates?.flavors}
                  approvedTemplates={videosQuery?.customer?.approvedTemplates!}
                  requestedTemplates={
                    videosQuery?.customer?.requestedTemplates!
                  }
                  defaultTemplate={videosQuery?.customer?.defaultTemplate}
                  loaded={Boolean(videosQuery)}
                />
              </Box>
            </>
          ) : videosQuery?.customer &&
            ((tabState === 'inProgress' && !inProg[0]) ||
              (tabState === 'draft' && !draft[0])) ? (
            <RowErrorMessage
              text={
                search
                  ? 'No matches'
                  : `We don't have any ${
                      tabState === 'inProgress'
                        ? 'In Progress videos'
                        : 'Pending Approval videos'
                    } for you yet`
              }
            />
          ) : (
            <>
              <Box className={classes.gridList}>
                {/* <VideoCard key={`placeholder-`} /> */}
                <NewVideoButton
                  templates={templates?.flavors}
                  refetch={refetch}
                  approvedTemplates={videosQuery?.customer?.approvedTemplates!}
                  requestedTemplates={
                    videosQuery?.customer?.requestedTemplates!
                  }
                  defaultTemplate={videosQuery?.customer?.defaultTemplate}
                  loaded={Boolean(videosQuery)}
                />
                {loading || !videosQuery?.customer ? (
                  [...Array(defaultCount).keys()].map((i) => (
                    <VideoCard key={`placeholder-${i}`} />
                  ))
                ) : (
                  <>
                    {(tabState === 'completed'
                      ? completed.map((card) => (
                          <VideoCard
                            video={card}
                            key={`video-card-${card.id}`}
                          />
                        ))
                      : tabState === 'inProgress'
                      ? inProg.map((card) => (
                          <VideoCard
                            request={card}
                            key={`request-card-${card.id}`}
                          />
                        ))
                      : draft.map((card) => (
                          <VideoCard
                            request={card}
                            key={`request-card-${card.id}`}
                          />
                        ))
                    ).slice(
                      search ? 0 : page ? +page * (+count || defaultCount) : 0,
                      search
                        ? undefined
                        : (+page || 0) * (+count || defaultCount) +
                            (+count || defaultCount),
                    )}
                  </>
                )}
              </Box>
              <LuminaPagination
                label="Videos per page"
                defaultCount={defaultCount}
                total={totalCount}
                loading={loading}
              />
            </>
          )}
        </>
      ) : (
        !tenantLoading &&
        !userLoading && (
          <RowErrorMessage text="You’re one step closer to creating brilliant job ads! Your administrator should grant you access soon." />
        )
      )}
    </StyledBox>
  )
}
