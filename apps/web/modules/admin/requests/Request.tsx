import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import {
  AdminViewGrid,
  ConnectedChip,
  DeleteResourceDialog,
  LuminaAutocomplete,
  QueryField,
  ReturnField,
  SubTable,
} from '../Components'
import { LiveDateTimePicker, LiveField, LiveSelect } from 'modules/utils'
import { AddScriptDialog } from './AddScriptDialog'
import {
  Customer,
  MutationUpdateOneRequestArgs,
  Order,
  QueryRequestArgs,
  Request as RequestType,
  RequestLog,
  RequestStatus,
  RequestWhereUniqueInput,
  Scalars,
  Script,
  User,
  Video,
} from '@lumina/api'
import { CopyRequestDialog } from './CopyRequestDialog'

const PREFIX = 'Request'

const classes = {
  paper: `${PREFIX}-paper`,
  loadingBox: `${PREFIX}-loadingBox`,
  loadingAnimation: `${PREFIX}-loadingAnimation`,
  deleteButtonBox: `${PREFIX}-deleteButtonBox`,
  deleteButton: `${PREFIX}-deleteButton`,
  chip: `${PREFIX}-chip`,
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
  [`& .${classes.deleteButtonBox}`]: { padding: '1rem 0.5rem' },
  [`& .${classes.deleteButton}`]: { color: 'red', border: '1px solid red' },
  [`& .${classes.chip}`]: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
}))

const REQUEST_QUERY = gql`
  query request($where: RequestWhereUniqueInput!) {
    request(where: $where) {
      id
      jobTitle
      url
      message
      notes
      status
      createdAt
      updatedAt
      completedAt
      template
      basePrice
      bonusPrice
      bonusDeadline
      customer {
        id
        name
      }
      order {
        id
      }
      script {
        id
      }
      video {
        id
      }
      owner {
        id
        email
      }
      submittedBy {
        id
        email
      }
      logs {
        event
        createdAt
        user {
          id
          email
        }
      }
    }
  }
`

const SAVE_REQUEST = gql`
  mutation updateOneRequest(
    $where: RequestWhereUniqueInput!
    $data: RequestUpdateInput!
  ) {
    request: updateOneRequest(where: $where, data: $data) {
      id
    }
  }
`

const UPDATE_URL = gql`
  mutation updateUrl(
    $where: RequestWhereUniqueInput!
    $data: RequestUpdateInput!
  ) {
    request: updateUrl(where: $where, data: $data) {
      id
      url
    }
  }
`

export interface GetRequestQuery
  extends Pick<
    RequestType,
    | 'jobTitle'
    | 'id'
    | 'message'
    | 'url'
    | 'createdAt'
    | 'updatedAt'
    | 'completedAt'
    | 'status'
    | 'notes'
    | 'template'
    | 'bonusDeadline'
    | 'bonusPrice'
    | 'basePrice'
  > {
  customer: Pick<Customer, 'id' | 'name'>
  order: Pick<Order, 'id'>
  script: Pick<Script, 'id'>
  video: Pick<Video, 'id'>
  owner: Pick<User, 'email' | 'id'>
  submittedBy: Pick<User, 'email' | 'id'>
  logs: Pick<RequestLog, 'event' | 'createdAt'> &
    {
      user: Pick<User, 'email' | 'id' | 'firstName' | 'lastName'>
    }[]
}

export const Request = () => {
  const router = useRouter()

  const [openDelete, setOpenDelete] = useState(false)
  const [openCreateScript, setOpenCreateScript] = useState(false)
  const [openCopyRequest, setOpenCopyRequest] = useState(false)
  const [owner, setOwner] = useState<Pick<User, 'id' | 'email'> | null>(null)
  const [requestedBy, setRequestedBy] = useState<Pick<
    User,
    'id' | 'email'
  > | null>(null)

  const { id } = router.query
  const requestId = parseInt(id?.toString())

  const where: RequestWhereUniqueInput = { id: requestId }

  const {
    data: requestQuery,
    loading,
    error,
  } = useQuery<{ request: GetRequestQuery }, QueryRequestArgs>(REQUEST_QUERY, {
    variables: { where: { id: requestId } },
    skip: !requestId,
    fetchPolicy: 'network-only',
  })

  const [updateRequest] = useMutation<
    {
      request: Pick<RequestType, 'id'>
    },
    MutationUpdateOneRequestArgs
  >(SAVE_REQUEST)

  useEffect(() => {
    if (!owner && requestQuery?.request?.owner?.id) {
      setOwner(requestQuery?.request?.owner)
      return
    }
    if (!owner || owner.id === requestQuery?.request?.owner?.id) return
    updateRequest({
      variables: {
        data: { owner: { connect: { id: owner.id } } },
        where: { id: +requestId },
      },
    })
  }, [owner, requestQuery])

  useEffect(() => {
    if (!requestedBy && requestQuery?.request?.submittedBy?.email) {
      setRequestedBy(requestQuery?.request?.submittedBy)
      return
    }
    if (
      !requestedBy ||
      requestedBy.id === requestQuery?.request?.submittedBy?.id
    )
      return
    updateRequest({
      variables: {
        data: { submittedBy: { connect: { id: requestedBy.id } } },
        where: { id: +requestId },
      },
    })
  }, [requestedBy, requestQuery])

  const formatDate = (value: Scalars['DateTime']) =>
    new Date(value).toLocaleString('en-US')

  return (
    <Root>
      <AdminViewGrid heading={`Request #${id}`}>
        <Paper className={classes.paper}>
          {loading ? (
            <Box className={classes.loadingBox}>
              <CircularProgress className={classes.loadingAnimation} />
            </Box>
          ) : requestQuery?.request && !error ? (
            <Box m={2}>
              <Box p={1}>
                <LiveField
                  dense
                  disabled
                  label="Request Id"
                  defaultValue={requestQuery.request.id}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  label="Job Title"
                  resource="Request"
                  field="jobTitle"
                  where={where}
                  defaultValue={requestQuery.request.jobTitle || ''}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  // resource="Request"
                  field="url"
                  label="Job Posting Url"
                  where={where}
                  defaultValue={requestQuery.request.url || ''}
                  customMutation={(_field: string) => UPDATE_URL}
                />
              </Box>

              <Box p={1}>
                <LiveField
                  dense
                  label="Base Price"
                  resource="Request"
                  field="basePrice"
                  where={where}
                  defaultValue={requestQuery.request.basePrice || 0}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  label="Bonus Price"
                  resource="Request"
                  field="bonusPrice"
                  where={where}
                  defaultValue={requestQuery.request.bonusPrice || 0}
                />
              </Box>
              <Box p={1}>
                <LiveDateTimePicker
                  label="Bonus Deadline"
                  field="bonusDeadline"
                  defaultValue={requestQuery.request.bonusDeadline}
                  resource="Request"
                  where={where}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  label="Customer Special Instructions"
                  resource="Request"
                  field="message"
                  where={where}
                  defaultValue={requestQuery.request.message || ''}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  resource="Request"
                  field="notes"
                  label="Internal Notes"
                  where={where}
                  defaultValue={requestQuery.request.notes || ''}
                />
              </Box>
              <Box p={1}>
                <LuminaAutocomplete
                  label="Request Owner Email"
                  getOptionLabel="email"
                  resourceName="User"
                  fieldName="email"
                  queryFields={[QueryField.email]}
                  returnFields={[ReturnField.id, ReturnField.email]}
                  source="user.id"
                  initValue={requestQuery.request.owner}
                  parse={(v: any) => {
                    return v.id
                  }}
                  onChange={(value: any) =>
                    value?.id ? setOwner(value) : null
                  }
                  customWhereFilter={{
                    customers: { some: { tenant: { equals: 'lumina' } } },
                  }}
                />
              </Box>
              <Box p={1}>
                <LiveSelect
                  dense
                  label="Request Status"
                  resource="Request"
                  field="status"
                  where={where}
                  defaultValue={requestQuery.request.status}
                  options={[
                    { label: 'Draft', value: RequestStatus.Draft },
                    { label: 'Submitted', value: RequestStatus.Submitted },
                    { label: 'Completed', value: RequestStatus.Completed },
                    { label: 'Cancelled', value: RequestStatus.Cancelled },
                    {
                      label: 'Scripting',
                      value: RequestStatus.Scripting,
                    },
                    {
                      label: 'QA',
                      value: RequestStatus.Qa,
                    },
                    {
                      label: 'Final',
                      value: RequestStatus.Final,
                    },
                    {
                      label: 'Queued',
                      value: RequestStatus.Queued,
                      disabled: true,
                    },
                    {
                      label: 'Rendering',
                      value: RequestStatus.Rendering,
                      disabled: true,
                    },
                  ]}
                />
              </Box>
              {requestQuery.request.submittedBy?.id && (
                <Box p={1}>
                  <LuminaAutocomplete
                    label="Requested By"
                    getOptionLabel="email"
                    resourceName="User"
                    fieldName="email"
                    queryFields={[QueryField.email]}
                    returnFields={[ReturnField.id, ReturnField.email]}
                    source="user.id"
                    initValue={requestQuery?.request.submittedBy}
                    parse={(v: any) => {
                      return v.id
                    }}
                    onChange={(value: any) =>
                      value?.id ? setRequestedBy(value) : null
                    }
                  />
                </Box>
              )}

              {requestQuery.request.template && (
                <Box p={1}>
                  <Typography variant="subtitle1">
                    Requested Template:
                  </Typography>
                  <Chip
                    label={requestQuery.request.template}
                    className={classes.chip}
                  />
                </Box>
              )}

              {requestQuery.request.customer?.id && (
                <Box p={1}>
                  <Typography variant="subtitle1">Customer:</Typography>
                  <ConnectedChip
                    id={requestQuery.request.customer.id}
                    resourceName="customer"
                    label={requestQuery.request.customer.name}
                  />
                </Box>
              )}

              {requestQuery.request.order?.id && (
                <Box p={1}>
                  <Typography variant="subtitle1">Order:</Typography>
                  <ConnectedChip
                    id={requestQuery.request.order.id}
                    resourceName="order"
                  />
                </Box>
              )}
              <Box p={1}>
                <Typography variant="subtitle1">Script:</Typography>
                {requestQuery.request.script?.id ? (
                  <ConnectedChip
                    id={requestQuery.request.script.id}
                    resourceName="script"
                  />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenCreateScript(true)}
                  >
                    Add Script
                  </Button>
                )}
              </Box>
              <Box p={1}>
                <Typography variant="subtitle1">Video:</Typography>
                {requestQuery.request.video?.id ? (
                  <ConnectedChip
                    id={requestQuery.request.video.id}
                    resourceName="video"
                  />
                ) : (
                  <Typography color="primary">
                    &nbsp; No video exists yet.
                  </Typography>
                )}
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  disabled
                  label="Created At"
                  defaultValue={formatDate(requestQuery.request.createdAt)}
                />
              </Box>

              {requestQuery.request.updatedAt && (
                <Box p={1}>
                  <LiveField
                    dense
                    disabled
                    label="Updated At"
                    defaultValue={formatDate(requestQuery.request.updatedAt)}
                  />
                </Box>
              )}
              {requestQuery.request.completedAt && (
                <Box p={1}>
                  <LiveField
                    dense
                    disabled
                    label="Completed At"
                    defaultValue={formatDate(requestQuery.request.completedAt)}
                  />
                </Box>
              )}
              {requestQuery.request && (
                <Box p={1}>
                  <Typography variant="subtitle1">Copy Request:</Typography>
                  {requestQuery.request.script?.id ? (
                    <ConnectedChip
                      id={requestQuery.request.script.id}
                      resourceName="script"
                    />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setOpenCopyRequest(true)}
                    >
                      Copy
                    </Button>
                  )}
                  <CopyRequestDialog
                    request={requestQuery.request}
                    open={openCopyRequest}
                    cancel={() => setOpenCopyRequest(false)}
                  />
                </Box>
              )}
              <Box p={2}>
                <Typography variant="subtitle1">Logs:</Typography>
                {requestQuery.request?.logs.length > 0 ? (
                  <SubTable
                    columns={['event', 'user.email', 'createdAt']}
                    labels={['Event', 'Email', 'Created At']}
                    values={requestQuery.request.logs}
                    connectedType="requests"
                    nonclickableRow={true}
                  />
                ) : (
                  'No logs yet'
                )}
              </Box>
              {requestQuery?.request && !requestQuery.request.script?.id && (
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

              <AddScriptDialog
                request={requestQuery.request}
                open={openCreateScript}
                cancel={() => setOpenCreateScript(false)}
              />
            </Box>
          ) : null}
        </Paper>
        <DeleteResourceDialog
          open={openDelete}
          cancel={() => setOpenDelete(false)}
          id={requestId}
          resource="Request"
        />
      </AdminViewGrid>
    </Root>
  )
}
