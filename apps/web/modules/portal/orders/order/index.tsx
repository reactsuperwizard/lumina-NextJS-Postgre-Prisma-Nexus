import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import { Snackbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { gql, useMutation, useQuery } from '@apollo/client'

import {
  Order as OrderType,
  QueryOrderArgs,
  RequestStatus,
  RequestCreateInput,
  Request,
  Video,
  Customer,
  VideoStatus,
  User,
  TemplateFlavor,
} from '@lumina/api'

import { useTenant } from 'modules/hooks'

import { DetailsHeader } from 'modules/portal/components/DetailsHeader'
import { OrderNumberCompleted } from '../OrdersComponents/OrderNumberCompleted'
import { VideoCard } from 'modules/portal/videos/VideoCard'
import { RequestDetail } from './RequestDetail'
import { DraftRequestForm } from './DraftRequestForm'
import { NewRequest } from './NewRequest'
import { Alert } from '@mui/material'
import Head from 'next/head'
import { ActivateCustomerDialog } from '../../components/ActivateCustomer'
import {
  TemplateDetails,
  TemplateTypes,
} from 'modules/portal/components/NewVideo/interface'

const PREFIX = 'Order'

const classes = {
  orderNameContainer: `${PREFIX}-orderNameContainer`,
  orderTitle: `${PREFIX}-orderTitle`,
  tableContainer: `${PREFIX}-tableContainer`,
  requestButton: `${PREFIX}-requestButton`,
  videoGrid: `${PREFIX}-videoGrid`,
  break: `${PREFIX}-break`,
  jobButtonDiv: `${PREFIX}-jobButtonDiv`,
  sectionTitle: `${PREFIX}-sectionTitle`,
  draftRowGrid: `${PREFIX}-draftRowGrid`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.orderNameContainer}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2rem 0 3rem 0',
  },

  [`& .${classes.orderTitle}`]: {
    color: theme.palette.primary.dark,
  },

  [`& .${classes.tableContainer}`]: { maxHeight: 715 },

  [`& .${classes.requestButton}`]: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },

  [`& .${classes.videoGrid}`]: {
    padding: '2rem 0',
    margin: '0 -0.25rem',
    display: 'grid',
    gridGap: '1rem',
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

  [`& .${classes.break}`]: {
    border: '1px solid lightgrey',
    margin: '1rem 0',
  },

  [`& .${classes.jobButtonDiv}`]: {
    margin: '0.5rem 0 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '1rem',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  },

  [`& .${classes.sectionTitle}`]: {
    marginTop: '1rem',
    marginBottom: '0.7rem',
  },

  [`& .${classes.draftRowGrid}`]: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    padding: '0 0 0.5rem',
    rowGap: '1.5rem',
    [theme.breakpoints.up('lg')]: {
      rowGap: '0.5rem',
    },
  },
}))

const GET_ORDER = gql`
  query getCustomerOrder($where: OrderWhereUniqueInput!) {
    order: getCustomerOrder(where: $where) {
      id
      name
      status
      createdAt
      customer {
        id
        defaultTemplate
      }
      requests(orderBy: { updatedAt: desc }) {
        id
        jobTitle
        url
        message
        status
        createdAt
        updatedAt
        completedAt
        submittedBy {
          email
        }
        template
      }
      videos {
        id
        vimeoId
        createdAt
        name
        thumbnail
        status
      }
    }
  }
`

export interface OrderQuery
  extends Pick<OrderType, 'name' | 'id' | 'status' | 'createdAt'> {
  customer: Pick<Customer, 'id' | 'defaultTemplate'>
  requests: (Pick<
    Request,
    | 'id'
    | 'jobTitle'
    | 'url'
    | 'message'
    | 'status'
    | 'createdAt'
    | 'updatedAt'
    | 'completedAt'
    | 'template'
  > & { submittedBy: Pick<User, 'email'> })[]
  videos: Pick<
    Video,
    'id' | 'vimeoId' | 'createdAt' | 'name' | 'thumbnail' | 'status'
  >[]
}

const ADD_REQUEST = gql`
  mutation createOneCustomerRequest($data: RequestCreateInput!) {
    createOneCustomerRequest(data: $data) {
      id
      jobTitle
      order {
        id
      }
    }
  }
`

const TEMPLATES_QUERY = gql`
  query templates($name: [TemplateFlavor!]!) {
    flavorsMultiple(name: $name)
  }
`

export const Order = () => {
  const router = useRouter()
  const query = router.query
  const orderId: number = parseInt(query?.id?.toString())

  const [addingRequest, setAddingRequest] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const [requestAdded, setRequestAdded] = useState(false)
  const [newestJobTitle, setNewestJobTitle] = useState('')
  const [licensingOpen, setLicensingOpen] = useState(false)
  const [userTemplate, setUserTemplates] = useState<TemplateDetails>()
  const { isTenantAdmin, isLuminaAdmin, name, active } = useTenant()

  const {
    data: orderQuery,
    loading,
    refetch,
  } = useQuery<{ order: OrderQuery }, QueryOrderArgs>(GET_ORDER, {
    variables: { where: { id: orderId } },
    skip: !orderId,
    pollInterval: 60000,
  })

  const { data: templates } = useQuery(TEMPLATES_QUERY, {
    variables: {
      name: [orderQuery?.order?.customer?.defaultTemplate],
    },
    skip: !orderQuery,
  })

  useEffect(() => {
    if (orderQuery?.order && !orderQuery.order.requests[0])
      setAddingRequest(true)
  }, [orderQuery])

  const [addRequest] = useMutation(ADD_REQUEST)

  useEffect(() => {
    if (templates) {
      const templateKeys = Object.keys(templates.flavorsMultiple)
      const key = templateKeys[0]
      const result: TemplateDetails = {
        id: key,
        name: templates.flavorsMultiple[key].name,
        description: templates.flavorsMultiple[key].meta?.description,
        imageUrl: templates.flavorsMultiple[key].meta?.imageUrl,
        duration: templates.flavorsMultiple[key].meta?.duration,
        orientation: templates.flavorsMultiple[key].meta?.orientation,
        category: 'Job Posting',
        status: TemplateTypes.Default,
      }
      setUserTemplates(result)
    }
  }, [templates])

  const createNewRequest = async (props: {
    jobTitle: string
    url: string
    message: string
    template?: string
  }) => {
    const { jobTitle, url, message, template } = props
    if (!(jobTitle && url)) {
      setAddLoading(false)
      return false
    }
    if (orderQuery?.order?.id) {
      setAddLoading(true)
      setNewestJobTitle(jobTitle)
      const data: RequestCreateInput = {
        jobTitle,
        url,
        message,
        template: template as TemplateFlavor,
        status:
          isTenantAdmin || isLuminaAdmin
            ? RequestStatus.Submitted
            : RequestStatus.Draft,
        order: { connect: { id: orderQuery.order.id } },
        customer: { connect: { id: orderQuery.order.customer.id } },
      }
      try {
        await addRequest({ variables: { data } })
      } catch (error) {
        console.error(error)
      }
      await refetch({ where: { id: orderId } })
      setRequestAdded(true)
      setAddLoading(false)
      setTimeout(() => {
        setAddingRequest(true)
      }, 500)
      return true
    }
    setAddLoading(false)
    return false
  }

  return (
    <Root>
      <Head>
        <title>{`Lumina - Order #${orderId} - ${name}`}</title>
      </Head>
      <DetailsHeader
        title={`Order ${
          orderQuery?.order?.id ? '#' + orderQuery.order.id : ''
        } Details`}
        actionButton={
          <NewRequest
            loading={addLoading}
            addingRequest={addingRequest}
            setAddingRequest={active ? setAddingRequest : setLicensingOpen}
            submit={createNewRequest}
            userTemplate={userTemplate}
          />
        }
      >
        {`Opened: ${
          orderQuery?.order?.createdAt
            ? new Date(orderQuery.order.createdAt).toLocaleString('en-US')
            : ''
        }`}
      </DetailsHeader>
      {(isLuminaAdmin || isTenantAdmin) &&
        (
          orderQuery?.order?.requests?.filter(
            (r) => r.status === RequestStatus.Draft,
          ) || []
        ).length > 0 && (
          <>
            <Typography variant="body2" className={classes.sectionTitle}>
              PENDING APPROVAL
            </Typography>
            <div className={classes.draftRowGrid}>
              {orderQuery?.order?.requests
                ?.filter((r) => r.status === RequestStatus.Draft)
                .map((r, i) => (
                  <DraftRequestForm request={r} key={`draft-${i}`} />
                )) || []}
            </div>
          </>
        )}
      <Typography variant="body2" className={classes.sectionTitle}>
        {(isTenantAdmin || isLuminaAdmin) &&
        (
          orderQuery?.order?.requests?.filter(
            (r) => r.status === RequestStatus.Draft,
          ) || []
        ).length > 0
          ? 'APPROVED'
          : `VIDEO REQUEST${
              (
                orderQuery?.order?.requests?.filter(
                  (r) => r.status !== RequestStatus.Cancelled,
                ) || []
              ).length > 1
                ? 'S'
                : ''
            }`}
      </Typography>
      <div className={classes.jobButtonDiv}>
        <>
          {orderQuery?.order?.requests
            ?.filter((r) => {
              if (r.status === RequestStatus.Cancelled) return false
              return isLuminaAdmin || isTenantAdmin
                ? r.status !== RequestStatus.Draft
                : true
            })
            .map((r, i) => (
              <RequestDetail request={r} key={`request-${i}`} />
            )) || []}
        </>
      </div>
      <hr className={classes.break} />
      {orderQuery?.order && (
        <OrderNumberCompleted
          text="Completed Videos: "
          status={orderQuery.order.status}
          videoCount={
            orderQuery.order.videos?.filter(
              (v) => v.status === VideoStatus.Live,
            ).length || 0
          }
          requestCount={
            orderQuery.order.requests?.filter(
              (r) =>
                r.status !== RequestStatus.Cancelled &&
                r.status !== RequestStatus.Draft,
            ).length || 0
          }
        />
      )}
      <div className={classes.videoGrid}>
        {loading || !orderQuery?.order ? (
          [1, 2, 3, 4].map((i) => <VideoCard key={`placeholder-${i}`} />)
        ) : (
          <>
            {orderQuery.order.videos
              .filter((v) =>
                isLuminaAdmin ? true : v.status === VideoStatus.Live,
              )
              .map((video) => {
                return (
                  <VideoCard video={video} key={`video-card-${video.id}`} />
                )
              })}
          </>
        )}
      </div>
      <ActivateCustomerDialog
        open={licensingOpen}
        close={() => setLicensingOpen(false)}
        perVideo
      />
      <Snackbar
        open={requestAdded}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={() => setRequestAdded(false)}
      >
        <Alert severity="success">
          {newestJobTitle} - Video Request Received
        </Alert>
      </Snackbar>
    </Root>
  )
}
