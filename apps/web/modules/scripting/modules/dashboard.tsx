import { gql, useQuery } from '@apollo/client'
import {
  Customer,
  RequestLog,
  User,
  Request,
  Video,
  Script,
  QueryScriptsArgs,
  RequestStatus,
  SortOrder,
  QueryRequestsArgs,
  QueryGetCustomerArgs,
  PermissionsRole,
} from '@lumina/api'
import { Box, styled } from '@mui/material'
import { useAuth0 } from 'modules/hooks'
import { LuminaHeader } from 'modules/utils/LuminaHeader'
import { useEffect, useState } from 'react'
import { ScriptingList } from '../components/ScriptingList'
import { AllScripts } from './AllScripts'
import {
  ALL_SCRIPTS_TAB,
  MY_SCRIPTS_TAB,
  SUBMISSION_QUEUE_TAB,
  TypeScriptingTab,
} from './constants'
import { DashboardHeader } from './DashboardHeader'
import { MyScripts } from './MyScripts'
import { SubmissionQueue } from './SubmissionQueue'

export interface ScriptQuery extends Pick<Script, 'id'> {
  video: Pick<Video, 'id' | 'vimeoId' | 'createdAt'>
  producer: Pick<User, 'email'>
  request: Pick<
    Request,
    | 'id'
    | 'status'
    | 'createdAt'
    | 'basePrice'
    | 'bonusPrice'
    | 'bonusDeadline'
    | 'jobTitle'
    | 'url'
    | 'template'
    | 'notes'
    | 'message'
  > & {
    customer: Pick<Customer, 'name' | 'id'>
    logs: (Pick<RequestLog, 'id' | 'event' | 'createdAt'> & {
      user: Pick<User, 'email' | 'id' | 'firstName' | 'lastName'>
    })[]
  }
}

export interface SubmissionQueueQuery
  extends Pick<
    Request,
    | 'id'
    | 'status'
    | 'createdAt'
    | 'basePrice'
    | 'bonusPrice'
    | 'bonusDeadline'
    | 'jobTitle'
    | 'url'
    | 'template'
    | 'notes'
    | 'message'
  > {
  customer: Pick<Customer, 'name' | 'id'>
  logs: (Pick<RequestLog, 'id' | 'event' | 'createdAt'> & {
    user: Pick<User, 'email' | 'id' | 'firstName' | 'lastName'>
  })[]
}

export interface CustomerQuery extends Pick<Customer, 'id'> {
  users: Pick<
    User,
    'email' | 'firstName' | 'lastName' | 'isUserActive' | 'avatar' | 'tenants'
  >[]
}

const GET_REQUESTS = gql`
  query Requests($where: RequestWhereInput, $orderBy: [RequestOrderByInput!]) {
    requests(where: $where, orderBy: $orderBy) {
      id
      status
      createdAt
      basePrice
      bonusPrice
      bonusDeadline
      logs {
        id
        event
        createdAt
        user {
          email
          id
          firstName
          lastName
        }
      }
      jobTitle
      url
      customer {
        name
        id
      }
      template
      notes
      message
    }
  }
`

const GET_SCRIPTS = gql`
  query Scripts($where: ScriptWhereInput, $orderBy: [ScriptOrderByInput!]) {
    scripts(where: $where, orderBy: $orderBy) {
      id
      video {
        id
        vimeoId
        createdAt
      }
      producer {
        email
      }
      request {
        id
        status
        createdAt
        basePrice
        bonusPrice
        bonusDeadline
        logs {
          id
          event
          createdAt
          user {
            email
            id
            firstName
            lastName
          }
        }
        jobTitle
        url
        customer {
          name
          id
        }
        template
        notes
        message
      }
    }
  }
`

const GET_CUSTOMER_USERS = gql`
  query getCustomer($where: CustomerWhereUniqueInput!) {
    customer: getCustomer(where: $where) {
      id
      users {
        email
        firstName
        lastName
        isUserActive
        avatar
        tenants
      }
    }
  }
`

const PREFIX = 'Scripting-Dashboard'

const classes = {
  box: `${PREFIX}-box`,
  dashboardContainer: `${PREFIX}-dashboardContainer`,
  extend: `${PREFIX}-extend`,
  header: `${PREFIX}-header`,
  scripting: `${PREFIX}-scripting`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.box}`]: {
    display: 'flex',
  },

  [`& .${classes.dashboardContainer}`]: {
    width: '70%',
  },

  [`& .${classes.extend}`]: {
    flex: 1,
  },
  [`& .${classes.header}`]: {
    paddingBottom: '2rem',
  },
  [`& .${classes.scripting}`]: {
    marginTop: '1rem',
    paddingRight: '0.5rem',
  },
}))

export const Dashboard = () => {
  const { user } = useAuth0()
  const [submissionQueueData, setSubmissionQueueData] = useState<
    SubmissionQueueQuery[]
  >([])
  const [myScriptData, setMyScriptData] = useState<ScriptQuery[]>([])
  const [allScriptData, setAllScriptData] = useState<ScriptQuery[]>([])
  const [activeScripters, setActiveScripters] = useState<
    CustomerQuery['users']
  >([])
  const [inactiveScripters, setInactiveScripters] = useState<
    CustomerQuery['users']
  >([])

  const [activeTab, setActiveTab] =
    useState<TypeScriptingTab>(SUBMISSION_QUEUE_TAB)

  const {
    data: scriptData,
    loading: scriptLoading,
    error: scriptErr,
    refetch: scriptRefetch,
  } = useQuery<{ scripts: ScriptQuery[] }, QueryScriptsArgs>(GET_SCRIPTS, {
    variables: {
      where: {
        request: {
          status: {
            in: [
              RequestStatus.Qa,
              RequestStatus.Queued,
              RequestStatus.Rendering,
              RequestStatus.Scripting,
            ],
          },
        },
      },
      orderBy: [
        {
          createdAt: SortOrder.Asc,
        },
      ],
    },
    notifyOnNetworkStatusChange: true,
  })

  const {
    data: requestData,
    loading: requestLoading,
    error: requestErr,
    refetch: requestRefetch,
  } = useQuery<{ requests: SubmissionQueueQuery[] }, QueryRequestsArgs>(
    GET_REQUESTS,
    {
      variables: {
        where: {
          status: {
            equals: RequestStatus.Submitted,
          },
        },
        orderBy: [
          {
            createdAt: SortOrder.Asc,
          },
        ],
      },
      notifyOnNetworkStatusChange: true,
    },
  )

  const { data: usersQuery, loading: usersLoading } = useQuery<
    { customer: CustomerQuery },
    QueryGetCustomerArgs
  >(GET_CUSTOMER_USERS, {
    variables: { where: { tenant: 'lumina' } },
  })

  useEffect(() => {
    setSubmissionQueueData(requestData?.requests!)
  }, [requestData])

  useEffect(() => {
    if (usersQuery) {
      const scripters = usersQuery.customer.users.filter((u) => {
        return Array.isArray(u.tenants?.lumina?.role)
          ? u.tenants.lumina.role.includes(PermissionsRole.Scripter)
          : u.tenants?.lumina?.role == PermissionsRole.Scripter
      })
      const activeScripters = scripters.filter((u) => u.isUserActive)

      const inactiveScripters = scripters.filter((u) => !u.isUserActive)

      setActiveScripters(activeScripters)
      setInactiveScripters(inactiveScripters)
    }
  }, [usersQuery])

  useEffect(() => {
    if (!scriptData) return
    const myScripts: ScriptQuery[] = []
    for (let script of scriptData?.scripts) {
      if (script.producer.email === user?.email) {
        myScripts.push(script)
      }
    }
    setMyScriptData(myScripts)
    setAllScriptData(scriptData?.scripts!)
  }, [scriptData])

  return (
    <StyledBox className={classes.box}>
      <Box className={classes.dashboardContainer}>
        <Box className={classes.header}>
          <LuminaHeader>Production Dashboard</LuminaHeader>
        </Box>
        <DashboardHeader
          submissionQueueCount={submissionQueueData?.length}
          myScriptCount={myScriptData?.length}
          setActiveTab={setActiveTab}
          active={activeTab}
        />
        <Box className={classes.scripting}>
          {activeTab === SUBMISSION_QUEUE_TAB && (
            <SubmissionQueue
              submissionQueueData={submissionQueueData}
              loading={requestLoading}
              error={requestErr}
            />
          )}
          {activeTab === MY_SCRIPTS_TAB && (
            <MyScripts
              scriptQueueData={myScriptData}
              loading={scriptLoading}
              error={scriptErr}
              requestRefetch={requestRefetch}
              scriptRefetch={scriptRefetch}
            />
          )}
          {activeTab === ALL_SCRIPTS_TAB && (
            <AllScripts
              scriptQueueData={allScriptData}
              loading={scriptLoading}
              error={scriptErr}
              users={inactiveScripters}
            />
          )}
        </Box>
      </Box>
      <Box className={classes.extend}>
        <ScriptingList
          loading={usersLoading}
          activeScripters={activeScripters}
          inactiveScripters={inactiveScripters}
        />
      </Box>
    </StyledBox>
  )
}
