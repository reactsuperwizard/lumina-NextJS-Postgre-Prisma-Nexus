import React, { useState } from 'react'
import { Box, styled } from '@mui/system'
import { Card, Dialog, IconButton, Snackbar, Typography } from '@mui/material'

import { HighlightOffRounded } from '@mui/icons-material/'
import type { ObservableQuery } from '@apollo/client'

import { NewVideoDialog } from './NewVideoDialog'
import { Alert } from '@mui/material'
import { VideoLogo } from 'modules/utils/VideoLogo'
import { TemplateFlavor } from '@lumina/api'
import { usePlausible, useAuth0, useTenant } from 'modules/hooks'
import { EventNames } from 'modules/providers/plausible/Constants'

const PREFIX = 'NewVideoButton'

const classes = {
  requestButton: `${PREFIX}-requestButton`,
  closeButton: `${PREFIX}-closeButton`,
  addIcon: `${PREFIX}-addIcon`,
  wrapperDiv: `${PREFIX}-wrapperDiv`,
  thumbnailOuterWrap: `${PREFIX}-thumbnailOuterWrap`,
  thumbnailInnerWrap: `${PREFIX}-thumbnailInnerWrap`,
  thumbnailCard: `${PREFIX}-thumbnailCard`,
  thumbnailCrop: `${PREFIX}-thumbnailCrop`,
  hoveredCard: `${PREFIX}-hoveredCard`,
  title: `${PREFIX}-title`,
  subtitle: `${PREFIX}-subtitle`,
  mainBody: `${PREFIX}-mainBody`,
  videoCallIcon: `${PREFIX}-videoCallIcon`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.wrapperDiv}`]: {
    position: 'relative',
    width: '100%',
  },

  [`& .${classes.thumbnailOuterWrap}`]: {
    padding: '56.25% 0 0 0',
    position: 'relative',
  },

  [`& .${classes.thumbnailInnerWrap}`]: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  [`& .${classes.thumbnailCard}`]: {
    borderRadius: 15,
    width: '98%',
    margin: '1%',
    transition: 'width 0.25s, margin 0.25s',
    border: '2px dashed #9A30DE80',
    // ['&:hover']: {
    //   backgroundColor: '#9A30DE14',
    //   borderColor: '#9A30DE',
    // },
  },

  [`& .${classes.thumbnailCrop}`]: {
    margin: '0 0 -7px',
  },

  [`& .${classes.hoveredCard}`]: {
    backgroundColor: '#9A30DE14',
    borderColor: '#9A30DE',
  },

  [`& .${classes.title}`]: {
    width: '100%',
    textAlign: 'left',
    padding: '0.75rem 1rem 0 0.25rem',
  },

  [`& .${classes.subtitle}`]: {
    marginTop: '-3px',
    color: 'darkgrey',
  },

  [`&.${classes.mainBody}`]: {
    width: '100%',
    maxWidth: '37rem',
    cursor: 'pointer',
  },
}))
// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.requestButton}`]: {
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: '#9B00F0',
    },
    textTransform: 'none',
    fontSize: '1rem',
  },

  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  [`& .${classes.addIcon}`]: {
    fontSize: '1.8rem !important',
    marginTop: '-3px',
  },
}))

interface Props {
  refetch?: ObservableQuery['refetch'] | (() => Promise<void>)
  stay?: boolean
  templates: any
  approvedTemplates: TemplateFlavor[]
  requestedTemplates: TemplateFlavor[]
  defaultTemplate: TemplateFlavor | undefined | null
  loaded: boolean
}

export const NewVideoButton = ({
  refetch,
  stay,
  templates,
  approvedTemplates,
  defaultTemplate,
  requestedTemplates,
  loaded,
}: Props) => {
  const [addingOrder, setAddingOrder] = useState(false)
  const [requestAdded, setRequestAdded] = useState<number>(0)
  const { name } = useTenant()
  const { user } = useAuth0()
  const [hover, setHover] = useState(false)
  const { requestNewVideoButtonClick } = usePlausible()
  const clickNewRequestButton = () => {
    setAddingOrder(true)
    requestNewVideoButtonClick(EventNames.REQUEST_NEW_VIDEO_BUTTON, {
      props: { userEmail: user?.email, customer: name },
    })
  }
  return (
    <>
      {!addingOrder ? (
        <StyledBox
          className={classes.mainBody}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => {
            if (loaded && templates) clickNewRequestButton()
          }}
        >
          <Box className={classes.wrapperDiv}>
            <Box className={classes.thumbnailOuterWrap}>
              <Box className={classes.thumbnailInnerWrap}>
                <Card
                  className={`${classes.thumbnailCard} ${
                    hover && classes.hoveredCard
                  }`}
                >
                  <Box className={classes.thumbnailOuterWrap}>
                    <Box className={classes.thumbnailInnerWrap}>
                      <Box sx={{ width: '2.5rem' }}>
                        <VideoLogo color={hover ? '#9A30DE' : '#9A30DE80'} />
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Box>
          </Box>
          <Box className={classes.title}>
            <Typography align="center" variant="body1">
              Request New Video
            </Typography>
          </Box>
        </StyledBox>
      ) : undefined}
      <Dialog
        onClose={() => setAddingOrder(false)}
        aria-labelledby="simple-dialog-title"
        open={addingOrder}
        fullWidth
        maxWidth="sm"
      >
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => setAddingOrder(false)}
          size="large"
        >
          <HighlightOffRounded fontSize="large" />
        </IconButton>
        <NewVideoDialog
          open={addingOrder}
          refetch={refetch}
          close={() => setAddingOrder(false)}
          stay={stay}
          setRequestAdded={setRequestAdded}
          templates={templates}
          approvedTemplates={approvedTemplates}
          requestedTemplates={requestedTemplates}
          defaultTemplate={defaultTemplate}
          loaded={loaded}
          marketingFlow={false}
        />
      </Dialog>
      <Snackbar
        open={Boolean(requestAdded)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={() => setRequestAdded(Number(false))}
      >
        <Alert severity="success">Video Request Received</Alert>
      </Snackbar>
    </>
  )
}
