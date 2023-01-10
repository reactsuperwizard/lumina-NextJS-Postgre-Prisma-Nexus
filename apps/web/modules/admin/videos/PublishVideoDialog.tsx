import React from 'react'
import { useMutation, gql } from '@apollo/client'
import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  styled
} from '@mui/material'
import { CloseSharp } from '@mui/icons-material'
import { VideoStatus } from '@lumina/api'

const PREFIX = 'PublishVideoDialog'

const classes = {
  title: `${PREFIX}-title`,
  closeButton: `${PREFIX}-closeButton`,
  updateButton: `${PREFIX}-updateButton`,
  tableBox: `${PREFIX}-tableBox`,
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.title}`]: {
    marginTop: theme.spacing(1),
  },

  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  [`& .${classes.updateButton}`]: { border: '1px solid red', color: 'red' },
  [`& .${classes.tableBox}`]: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
}))

const PUBLISH_VIDEO = gql`
  mutation publishVideo($id: Int!, $live: Boolean!) {
    publishVideo(id: $id, live: $live) {
      id
    }
  }
`

export const PublishVideoDialog = ({
  id,
  open,
  cancel,
  status,
}: {
  id: number
  open: boolean
  cancel: () => void
  status: VideoStatus
}) => {
  const [publishUnPublishMutation, { loading }] = useMutation(PUBLISH_VIDEO)

  const updateVideo = async () => {
    await publishUnPublishMutation({
      variables: {
        id,
        live: status === VideoStatus.Pending,
      },
    })
    cancel()
  }

  return (
    <StyledDialog onClose={cancel} open={open}>
      <DialogTitle>
        <Typography variant="h5" className={classes.title}>
          {status === VideoStatus.Pending ? 'Publish' : 'Un-publish'} Video
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={cancel}
          size="large"
        >
          <CloseSharp />
        </IconButton>
      </DialogTitle>
      <Box className={classes.tableBox}>
        <Typography variant="h6">
          {status === VideoStatus.Pending
            ? 'Are you sure you want to publish this video?'
            : 'Are you sure you want to un-publish this video?'}
        </Typography>
        <Typography variant="body2">
          {status === VideoStatus.Pending
            ? 'It will be visible in the customer portal immediately.'
            : 'This will remove the video from the customer portal, but any related customer messages or alerts can not be un-sent.'}
        </Typography>
        <br />
        <br />
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Button
              variant="outlined"
              fullWidth
              className={classes.updateButton}
              onClick={updateVideo}
            >
              {status === VideoStatus.Pending ? 'PUBLISH' : 'UN-PUBLISH'}
            </Button>
            <br />
            <br />
            <Button variant="outlined" fullWidth onClick={cancel}>
              CANCEL
            </Button>
          </>
        )}
      </Box>
    </StyledDialog>
  )
}
