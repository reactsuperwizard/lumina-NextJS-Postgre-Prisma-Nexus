import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Theme,
  CircularProgress,
  Table,
  TableCell,
  TableRow,
  Button,
  TableBody,
  Box,
} from '@mui/material'
import { CloseSharp } from '@mui/icons-material'
import { GetRequestQuery, GET_REQUEST } from './queries'
import {
  ConnectedChip,
  LuminaAutocomplete,
  QueryField,
  ReturnField,
  VideoDetailDialog,
} from '../Components'
import { LiveField, LiveSelect, getThumbnailTime } from 'modules/utils'
import { useMutation, gql, useQuery } from '@apollo/client'
import {
  MutationUpdateOneRequestArgs,
  MutationChangeRequestOwnerArgs,
  QueryRequestArgs,
  Request,
  RequestStatus,
  RequestWhereUniqueInput,
  User,
  Video,
} from '@lumina/api'
import { AddScriptDialog } from '../requests/AddScriptDialog'

const PREFIX = 'RequestDialog'

const classes = {
  dialogContainer: `${PREFIX}-dialogContainer`,
  closeButton: `${PREFIX}-closeButton`,
  dialogBody: `${PREFIX}-dialogBody`,
  loading: `${PREFIX}-loading`,
  finalButtonDiv: `${PREFIX}-finalButtonDiv`,
  requestLink: `${PREFIX}-requestLink`,
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.dialogContainer}`]: {
    padding: '1rem 3rem 0',
  },

  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  [`& .${classes.dialogBody}`]: {
    marginTop: '-0.5rem',
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.loading}`]: {
    width: '30rem',
    height: '30rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  [`& .${classes.finalButtonDiv}`]: {
    width: '100%',
    padding: '0 1rem 0.75rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '1rem',
    rowGap: '1rem',
  },

  [`& .${classes.requestLink}`]: {
    marginLeft: '-0.5rem',
    textTransform: 'none',
  },
}))

const CHANGE_REQUEST_OWNER = gql`
  mutation changeRequestOwner(
    $whereUser: UserWhereUniqueInput!
    $whereRequest: RequestWhereUniqueInput!
  ) {
    request: changeRequestOwner(
      whereUser: $whereUser
      whereRequest: $whereRequest
    ) {
      id
    }
  }
`

const REMOVE_REQUEST_OWNER = gql`
  mutation changeRequestOwner($whereRequest: RequestWhereUniqueInput!) {
    request: changeRequestOwner(whereUser: null, whereRequest: $whereRequest) {
      id
    }
  }
`

const UPDATE_REQUEST = gql`
  mutation updateOneRequest(
    $where: RequestWhereUniqueInput!
    $data: RequestUpdateInput!
  ) {
    request: updateOneRequest(where: $where, data: $data) {
      id
    }
  }
`

const PUBLISH_VIDEO = gql`
  mutation publishVideo($id: Int!) {
    publishVideo(id: $id, live: true) {
      id
    }
  }
`

const UPDATE_THUMBNAIL = gql`
  mutation updateThumbnail($id: Int!, $time: Float) {
    updateThumbnail(id: $id, time: $time) {
      id
    }
  }
`

export const RequestDialog = ({
  open,
  cancel,
  requestId,
}: {
  open: boolean
  cancel: () => void
  requestId: number | null
}) => {
  const router = useRouter()
  const [openVideo, setOpenVideo] = useState(false)
  const [forcedLoading, setForcedLoading] = useState(false)
  const [openCreateScript, setOpenCreateScript] = useState(false)
  const [progress, setProgress] = useState(0)

  const { data, loading, refetch } = useQuery<
    { request: GetRequestQuery },
    QueryRequestArgs
  >(GET_REQUEST, {
    variables: { where: { id: requestId } },
    fetchPolicy: 'network-only',
    skip: !requestId,
  })

  const [updateRequest] = useMutation<
    { request: Pick<Request, 'id'> },
    MutationUpdateOneRequestArgs
  >(UPDATE_REQUEST)

  const [changeRequestOwner] = useMutation<
    { request: Pick<Request, 'id'> },
    MutationChangeRequestOwnerArgs
  >(CHANGE_REQUEST_OWNER)

  const [removeRequestOwner] = useMutation<
    { request: Pick<Request, 'id'> },
    MutationChangeRequestOwnerArgs
  >(REMOVE_REQUEST_OWNER)

  const [publishVideoMutation] = useMutation<
    { video: Pick<Video, 'id'> },
    { id: number }
  >(PUBLISH_VIDEO)

  const [updateThumbnailMutation] = useMutation<
    { video: Pick<Video, 'id'> },
    { id: number; time: number }
  >(UPDATE_THUMBNAIL)

  const setNewOwner = async (newOwner: Pick<User, 'id' | 'email'>) => {
    if (!data?.request.id || newOwner?.id === data?.request.owner?.id) return
    await changeRequestOwner({
      variables: {
        whereRequest: { id: data.request.id },
        whereUser: { id: newOwner.id },
      },
    })
    refetch()
  }

  const removeOwner = async () => {
    if (!data?.request.id) return
    await removeRequestOwner({
      variables: {
        whereRequest: { id: data.request.id },
      },
    })
    refetch()
  }

  const closeVideo = async (skipRefetch?: boolean) => {
    setOpenVideo(false)
    if (skipRefetch) return
    setForcedLoading(true)
    await refetch()
    setForcedLoading(false)
  }

  const setRequestFinal = async () => {
    if (!data?.request.id) return
    closeVideo(true)
    setForcedLoading(true)
    await updateRequest({
      variables: {
        where: { id: data.request.id },
        data: { status: { set: RequestStatus.Final } },
      },
    })
    await refetch()
    setForcedLoading(false)
  }

  const publishVideo = async () => {
    if (!data?.request?.video?.id) return
    setForcedLoading(true)
    await publishVideoMutation({
      variables: { id: data.request.video.id },
    })
    setForcedLoading(false)
    cancel()
  }

  const updateVimeoThumbnail = (customTime?: number) => {
    if (!data?.request?.video?.id) return
    const videoId = data.request.video.id
    const time = customTime || getThumbnailTime(data?.request?.script?.flavor)
    updateThumbnailMutation({ variables: { id: videoId, time } })
    closeVideo()
  }

  if (!requestId) return null

  const goToRequest = () => router.push(`/admin/requests/${requestId}`)

  const where: RequestWhereUniqueInput = { id: data?.request.id }

  const request = data?.request

  return (
    <StyledDialog onClose={cancel} open={open} maxWidth="lg">
      {request && !loading && !forcedLoading ? (
        <div className={classes.dialogContainer}>
          <DialogTitle>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={cancel}
              size="large"
            >
              <CloseSharp />
            </IconButton>
            <Typography variant="h5" color="textPrimary">
              Request #<strong>{request.id}</strong> for{' '}
              <strong>{request.customer.name}</strong>
            </Typography>
            <Button onClick={goToRequest} className={classes.requestLink}>
              <Typography variant="h6" color="primary">
                {request.jobTitle}
              </Typography>
            </Button>
          </DialogTitle>
          <DialogContent className={classes.dialogBody}>
            <Table size="small">
              <TableBody>
                {request.status === RequestStatus.Final && (
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => publishVideo()}
                        fullWidth
                      >
                        Publish
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell>Submitted:</TableCell>
                  <TableCell>
                    {new Date(request.createdAt).toLocaleString('en-US')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Customer:</TableCell>
                  <TableCell>
                    <ConnectedChip
                      id={request.customer.id}
                      resourceName="customer"
                      label={request.customer.name}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Script:</TableCell>
                  <TableCell>
                    {request.script ? (
                      <ConnectedChip
                        id={request.script.id}
                        resourceName="script"
                      />
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setOpenCreateScript(true)}
                        >
                          Add Script
                        </Button>
                        <AddScriptDialog
                          request={request}
                          open={openCreateScript}
                          cancel={() => setOpenCreateScript(false)}
                        />
                      </>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Video:</TableCell>
                  <TableCell>
                    {request.video ? (
                      <>
                        <ConnectedChip
                          id={request.video.id}
                          resourceName="video"
                        />
                        {request.video.vimeoId && (
                          <>
                            {' '}
                            <Button
                              variant="contained"
                              onClick={() => setOpenVideo(!openVideo)}
                            >
                              Open Video
                            </Button>
                          </>
                        )}
                      </>
                    ) : (
                      'No video yet'
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Assigned:</TableCell>
                  <TableCell>
                    <LuminaAutocomplete
                      label="Owner Email"
                      getOptionLabel="email"
                      resourceName="User"
                      fieldName="email"
                      queryFields={[QueryField.email]}
                      returnFields={[ReturnField.id, ReturnField.email]}
                      source="user.id"
                      initValue={request.owner}
                      parse={(v: any) => {
                        return v.id
                      }}
                      onChange={(value: any) => {
                        if (value.id) {
                          setNewOwner(value)
                        }
                        if (!value.id && request.owner) {
                          removeOwner()
                        }
                      }}
                      customWhereFilter={{
                        customers: { some: { tenant: { equals: 'lumina' } } },
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status:</TableCell>
                  <TableCell>
                    <LiveSelect
                      dense
                      resource="Request"
                      field="status"
                      where={where}
                      defaultValue={request.status}
                      options={[
                        { label: 'Draft', value: RequestStatus.Draft },
                        {
                          label: 'Submitted',
                          value: RequestStatus.Submitted,
                        },
                        {
                          label: 'Completed',
                          value: RequestStatus.Completed,
                        },
                        {
                          label: 'Cancelled',
                          value: RequestStatus.Cancelled,
                        },
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
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Internal Notes:</TableCell>
                  <TableCell>
                    <LiveField
                      dense
                      resource="Request"
                      field="notes"
                      where={where}
                      defaultValue={request.notes || ''}
                      multiline
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Special Instructions:</TableCell>
                  <TableCell>
                    {request.message || 'No special instructions.'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DialogContent>
          {request.video?.vimeoId && (
            <VideoDetailDialog
              vimeoId={request.video.vimeoId}
              open={openVideo}
              handleClose={() => closeVideo()}
              ready={request.video.checkReady || false}
              updateProgress={(newProgress: number) => setProgress(newProgress)}
              notes={
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Notes:</TableCell>
                      <TableCell width="100%">
                        <LiveField
                          dense
                          resource="Request"
                          field="notes"
                          where={where}
                          defaultValue={request.notes || ''}
                          multiline
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              }
              actions={
                (request.status === RequestStatus.Qa ||
                  request.status === RequestStatus.Final) && (
                  <Box component="div" className={classes.finalButtonDiv}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => closeVideo()}
                    >
                      Close
                    </Button>
                    <Button
                      disabled={!(request.status === RequestStatus.Qa)}
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={setRequestFinal}
                    >
                      Approve as Final
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => updateVimeoThumbnail()}
                    >
                      Set Thumbnail to Default
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => {
                        updateVimeoThumbnail(progress)
                      }}
                    >
                      Set Thumbnail at Current Time
                    </Button>
                  </Box>
                )
              }
            />
          )}
        </div>
      ) : (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )}
    </StyledDialog>
  )
}
