import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Rating,
  Snackbar,
  Typography,
} from '@mui/material'
import {
  AdminViewGrid,
  ConnectedChip,
  DeleteResourceDialog,
  VideoDetailDialog,
  LinkButton,
} from '../Components'
import { LiveField, LiveSelect } from 'modules/utils'
import {
  QueryVideoArgs,
  Video as VideoType,
  Scalars,
  VideoWhereUniqueInput,
  VideoStatus,
  Order,
  Customer,
  Script as ScriptType,
  Request,
} from '@lumina/api'
import { PublishVideoDialog } from './PublishVideoDialog'
import { Alert } from '@mui/material'
import { DownloadDialog, getThumbnailTime } from '../../utils'
import { VideoThumbnail } from '../Components/VideoThumbnail'

const PREFIX = 'Video'

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

const StyledButton = styled(Button)({
  color: 'red',
  border: '1px solid red',
})
const StyledBox = styled(Box)({
  padding: '1rem 0.5rem',
})
const VIDEO_QUERY = gql`
  query video($where: VideoWhereUniqueInput!) {
    video(where: $where) {
      id
      name
      createdAt
      updatedAt
      vimeoId
      status
      hash
      checkReady
      downloads
      jobUrl
      embedJobPage
      thumbnail
      publishedAt
      vanityButtonText
      rating
      order {
        id
        customer {
          id
          name
          slug
        }
      }
      script {
        id
        name
        flavor
      }
      request {
        id
      }
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

interface GetVideoQuery
  extends Pick<
    VideoType,
    | 'vimeoId'
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'status'
    | 'name'
    | 'hash'
    | 'checkReady'
    | 'downloads'
    | 'jobUrl'
    | 'embedJobPage'
    | 'thumbnail'
    | 'publishedAt'
    | 'vanityButtonText'
    | 'rating'
  > {
  order: Pick<Order, 'id'> & {
    customer: Pick<Customer, 'id' | 'name' | 'slug'>
  }
  script: Pick<ScriptType, 'id' | 'name' | 'flavor'>
  request: Pick<Request, 'id'>
}

const UPDATE_NAME = (_: string) => gql`
  mutation updateVideoName(
    $where: VideoWhereUniqueInput!
    $data: VideoUpdateInput!
  ) {
    resource: updateVideoName(where: $where, data: $data) {
      id
      name
    }
  }
`

export const Video = () => {
  const vanityUrl = process.env.VANITY_URL_ENDPOINT
  const playerUrl = process.env.NEXT_PUBLIC_PLAYER_URL_ENDPOINT

  const router = useRouter()

  const { id } = router.query
  const videoId = parseInt(id?.toString())
  const [openDelete, setOpenDelete] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [publish, setPublish] = useState(false)
  const [thumbnailUpdated, setThumbnailUpdated] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)

  const where: VideoWhereUniqueInput = { id: videoId }

  const {
    data: videoQuery,
    loading,
    error,
    refetch,
  } = useQuery<{ video: GetVideoQuery }, QueryVideoArgs>(VIDEO_QUERY, {
    variables: { where: { id: videoId } },
    skip: !videoId,
  })

  const [updateThumbnailMutation] = useMutation<
    { video: Pick<VideoType, 'id'> },
    { id: number; time: number }
  >(UPDATE_THUMBNAIL)

  const updateVimeoThumbnail = async () => {
    if (!videoQuery?.video?.id) return
    const videoId = videoQuery.video.id
    const time = getThumbnailTime(videoQuery?.video?.script?.flavor)
    await updateThumbnailMutation({ variables: { id: videoId, time } })
    await refetch()
    setThumbnailUpdated(true)
  }

  const formatDate = (value: Scalars['DateTime']) =>
    new Date(value).toLocaleString('en-US')
  const { hash } = videoQuery?.video || {}
  return (
    <Root>
      <AdminViewGrid heading={`Video #${id}`}>
        <Paper className={classes.paper}>
          {loading ? (
            <Box className={classes.loadingBox}>
              <CircularProgress className={classes.loadingAnimation} />
            </Box>
          ) : videoQuery?.video && !error ? (
            <Box m={2}>
              <Box p={1}>
                <LiveField
                  dense
                  disabled
                  label="Video Id"
                  defaultValue={videoQuery.video.id || ''}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  label="Name"
                  customMutation={UPDATE_NAME}
                  field="name"
                  where={where}
                  defaultValue={videoQuery.video.name || ''}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  label="Vimeo Id"
                  resource="Video"
                  field="vimeoId"
                  where={where}
                  defaultValue={videoQuery.video.vimeoId || ''}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  label="Job Url"
                  resource="Video"
                  field="jobUrl"
                  where={where}
                  defaultValue={videoQuery.video.jobUrl || ''}
                />
              </Box>
              {videoQuery.video.vimeoId && (
                <Box p={1}>
                  <Typography variant="subtitle1">View on Vimeo:</Typography>
                  <LinkButton
                    href={`https://vimeo.com/${videoQuery.video.vimeoId}`}
                    blank
                  />
                </Box>
              )}
              <Box p={1}>
                <Typography variant="subtitle1">Rating By Customer:</Typography>
                <Rating readOnly value={videoQuery.video.rating}></Rating>
              </Box>
              {videoQuery.video.vimeoId && (
                <Box p={1}>
                  <Typography variant="subtitle1">
                    Update Video Thumbnail to default time:
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={updateVimeoThumbnail}
                  >
                    Update Thumbnail
                  </Button>
                  <Snackbar
                    open={thumbnailUpdated}
                    autoHideDuration={1500}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={() => setThumbnailUpdated(false)}
                  >
                    <Alert severity="success">
                      Thumbnail updated to default time
                    </Alert>
                  </Snackbar>
                </Box>
              )}
              {videoQuery.video.thumbnail && (
                <Box p={1} width="20rem">
                  <VideoThumbnail imageUrl={videoQuery.video.thumbnail} />
                </Box>
              )}
              <Box p={1}>
                <LiveField
                  dense
                  label="Thumbnail URL"
                  resource="Video"
                  field="thumbnail"
                  key={videoQuery.video.thumbnail || 'thumbnailUrl'}
                  where={where}
                  defaultValue={videoQuery.video.thumbnail || ''}
                />
              </Box>
              {videoQuery.video.hash && (
                <Box p={1}>
                  <Typography variant="subtitle1">
                    LinkedIn Post Inspector:
                  </Typography>
                  <LinkButton
                    href={`https://www.linkedin.com/post-inspector/inspect/https:%2F%2Flmna.io%2F${videoQuery.video.hash}`}
                    blank
                  />
                </Box>
              )}
              {videoQuery.video.vimeoId && (
                <Box p={1}>
                  <Typography variant="subtitle1">
                    View most recent render:
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenView(!openView)}
                  >
                    Open Video
                  </Button>
                </Box>
              )}
              <Box p={1}>
                <Typography variant="subtitle1">
                  View in customer portal:
                </Typography>
                <LinkButton
                  href={`${window.location.origin}/${videoQuery.video.order.customer.slug}/videos/${videoId}`}
                  text={
                    videoQuery.video.status !== VideoStatus.Live
                      ? `Click the button below to PUBLISH and enable the video at: ${window.location.origin}/${videoQuery.video.order.customer.slug}/videos/${videoId}`
                      : undefined
                  }
                  disabled={videoQuery.video.status !== VideoStatus.Live}
                  blank
                />
              </Box>
              <Box p={1}>
                <Typography variant="subtitle1">Vanity URL:</Typography>
                <LinkButton
                  href={`${vanityUrl}/${hash}`}
                  text={
                    videoQuery.video.status !== VideoStatus.Live
                      ? `Click the button below to PUBLISH and enable the video at: ${vanityUrl}/${hash}`
                      : undefined
                  }
                  disabled={videoQuery.video.status !== VideoStatus.Live}
                  blank
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  resource="Video"
                  label="Vanity Button Text"
                  field="vanityButtonText"
                  where={where}
                  defaultValue={
                    videoQuery.video.vanityButtonText || 'Apply Now'
                  }
                />
              </Box>
              <Box p={1}>
                <LiveSelect
                  dense
                  label="Show Embedded Job Page"
                  resource="Video"
                  field="embedJobPage"
                  where={where}
                  defaultValue={videoQuery.video.embedJobPage || false}
                  options={[
                    { label: 'Embed job page on vanity url', value: true },
                    {
                      label: "Don't embed job page on vanity url",
                      value: false,
                    },
                  ]}
                />
              </Box>
              <Box p={1}>
                <Typography variant="subtitle1">Player URL:</Typography>
                <LinkButton
                  href={`${playerUrl}/${videoQuery.video.vimeoId}`}
                  text={
                    videoQuery.video.status !== VideoStatus.Live
                      ? `Click the button below to PUBLISH and enable the video at: ${vanityUrl}/${videoQuery.video.vimeoId}`
                      : undefined
                  }
                  disabled={videoQuery.video.status !== VideoStatus.Live}
                  blank
                />
              </Box>
              <Box p={1}>
                <Typography variant="subtitle1">
                  Update video status:
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setPublish(true)}
                >
                  {videoQuery.video.status === VideoStatus.Live
                    ? 'Un-Publish'
                    : 'Publish'}
                </Button>
              </Box>
              {videoQuery.video.order?.customer?.id && (
                <Box p={1}>
                  <Typography variant="subtitle1">Customer:</Typography>
                  <ConnectedChip
                    id={videoQuery.video.order.customer.id}
                    resourceName="customer"
                    label={videoQuery.video.order.customer.name}
                  />
                </Box>
              )}
              {videoQuery.video.script?.id && (
                <Box p={1}>
                  <Typography variant="subtitle1">Script:</Typography>
                  <ConnectedChip
                    id={videoQuery.video.script.id}
                    resourceName="script"
                  />
                </Box>
              )}
              {videoQuery.video.request?.id && (
                <Box p={1}>
                  <Typography variant="subtitle1">Customer:</Typography>
                  <ConnectedChip
                    id={videoQuery.video.request.id}
                    resourceName="request"
                  />
                </Box>
              )}
              {videoQuery.video.order?.id && (
                <Box p={1}>
                  <Typography variant="subtitle1">Order:</Typography>
                  <ConnectedChip
                    id={videoQuery.video.order.id}
                    resourceName="order"
                  />
                </Box>
              )}

              <Box p={1}>
                <LiveField
                  dense
                  disabled
                  label="Created At"
                  defaultValue={formatDate(videoQuery.video.createdAt)}
                />
              </Box>
              <Box p={1}>
                <LiveField
                  dense
                  disabled
                  label="Published At"
                  defaultValue={formatDate(videoQuery.video.publishedAt)}
                />
              </Box>

              {videoQuery.video.updatedAt && (
                <Box p={1}>
                  <LiveField
                    dense
                    disabled
                    label="Updated At"
                    defaultValue={formatDate(videoQuery.video.updatedAt)}
                  />
                </Box>
              )}
              {videoQuery.video.vimeoId && videoQuery.video.downloads && (
                <Box p={1}>
                  <Typography variant="subtitle1">Download:</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    title="DOWNLOAD VIDEO"
                    onClick={() => setDownloadOpen(true)}
                  >
                    Download Video
                  </Button>
                </Box>
              )}
              <StyledBox>
                <StyledButton
                  variant="outlined"
                  onClick={() => setOpenDelete(true)}
                  fullWidth
                >
                  Delete
                </StyledButton>
              </StyledBox>
              {videoQuery.video.vimeoId && (
                <VideoDetailDialog
                  open={openView}
                  vimeoId={videoQuery.video.vimeoId}
                  handleClose={() => setOpenView(false)}
                  ready={videoQuery.video.checkReady || false}
                />
              )}
            </Box>
          ) : null}
        </Paper>
        <DeleteResourceDialog
          open={openDelete}
          cancel={() => setOpenDelete(false)}
          id={videoId}
          resource="Video"
        />
        {videoQuery?.video.downloads ? (
          <DownloadDialog
            videoId={videoId}
            open={downloadOpen}
            onClose={() => setDownloadOpen(false)}
            links={videoQuery.video.downloads}
          />
        ) : undefined}
        {videoQuery?.video.status && (
          <PublishVideoDialog
            id={videoId}
            open={publish}
            cancel={() => {
              setPublish(false)
              refetch()
            }}
            status={videoQuery?.video.status}
          />
        )}
      </AdminViewGrid>
    </Root>
  )
}
