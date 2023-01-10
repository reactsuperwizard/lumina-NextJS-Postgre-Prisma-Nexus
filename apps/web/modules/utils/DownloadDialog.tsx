import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Dialog,
  Typography,
  IconButton,
  Box,
  Button,
  Link,
  Paper,
} from '@mui/material'
import { CloseSharp, SystemUpdateAlt } from '@mui/icons-material'
import { usePlausible, useTenant } from 'modules/hooks'
import { EventNames } from 'modules/providers/plausible/Constants'

const PREFIX = 'DownloadDialog'

const classes = {
  title: `${PREFIX}-title`,
  closeButton: `${PREFIX}-closeButton`,
  tableBox: `${PREFIX}-tableBox`,
  tableRow: `${PREFIX}-tableRow`,
  tableSpacer: `${PREFIX}-tableSpacer`,
  downloadButton: `${PREFIX}-downloadButton`,
  showLowLink: `${PREFIX}-showLowLink`,
  verticalCentering: `${PREFIX}-verticalCentering`,
  dialogWrap: `${PREFIX}-dialogWrap`,
  dialog: `${PREFIX}-dialog`,
  resLink: `${PREFIX}-resLink`,
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.title}`]: {
    margin: theme.spacing(3),
  },

  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  [`& .${classes.tableBox}`]: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: '1fr',
    rowGap: '0.75rem',
    [theme.breakpoints.up('sm')]: {
      minWidth: '25rem',
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '30rem',
    },
  },

  [`& .${classes.tableRow}`]: {
    backgroundColor: theme.palette.grey[100],
    width: '100%',
    border: `1px solid ${theme.palette.grey[100]}`,
    display: 'grid',
    gridTemplateColumns: '4.5rem 3.5rem 1fr 2.5rem',
    padding: '0.5rem',
    columnGap: '1rem',
    cursor: 'pointer',
    ['&:hover']: {
      border: `1px solid ${theme.palette.grey[300]}`,
      backgroundColor: theme.palette.grey[200],
    },
  },

  [`& .${classes.tableSpacer}`]: { minWidth: theme.spacing(10) },

  [`& .${classes.downloadButton}`]: {
    minWidth: '1rem',
    padding: '0.5rem',
  },

  [`& .${classes.showLowLink}`]: {
    marginTop: '1rem',
    cursor: 'pointer',
  },

  [`& .${classes.verticalCentering}`]: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.87rem',
  },

  [`&.${classes.dialogWrap}`]: {
    cursor: 'default',
  },

  [`& .${classes.dialog}`]: {
    borderRadius: 20,
  },

  [`& .${classes.resLink}`]: {
    textDecoration: 'none',
    fontSize: '0.87rem',
  },
}))

interface Size {
  public_name: string
  link: string
  size_short: string
}

export const DownloadDialog = (props: {
  onClose: () => void
  open: boolean
  links: Size[]
  videoId: number
}) => {
  const { onClose, open, links } = props

  const [lowRes, setLowRes] = useState(false)
  const { videoDownload } = usePlausible()
  const { email } = useTenant()

  const handleDownload = (size: Size) => {
    window.open(size.link, '_blank')

    videoDownload(EventNames.VIDEO_DOWNLOAD, {
      props: {
        size: size.size_short,
        videoId: props.videoId,
        page: location.pathname,
        email: email,
      },
    })
  }

  return (
    <StyledDialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      className={classes.dialogWrap}
      classes={{ paper: classes.dialog }}
    >
      <Typography variant="h5" className={classes.title}>
        Download Video
      </Typography>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
        size="large"
      >
        <CloseSharp />
      </IconButton>
      <Box className={classes.tableBox}>
        {links
          ? links
              .filter(
                (size: any) => lowRes || /^(1080p)/i.test(size.public_name),
              )
              .map((size: any) => (
                <Paper
                  key={`size${size.public_name}`}
                  className={classes.tableRow}
                  onClick={() => handleDownload(size)}
                  elevation={2}
                >
                  <Box className={classes.verticalCentering}>
                    <strong>{size.public_name}</strong>
                  </Box>
                  <Box className={classes.verticalCentering}>
                    {size.size_short}
                  </Box>
                  <Box />
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.downloadButton}
                      onClick={() => handleDownload(size)}
                    >
                      <SystemUpdateAlt />
                    </Button>
                  </Box>
                </Paper>
              ))
          : undefined}
        <div className={classes.showLowLink}>
          <Link className={classes.resLink} onClick={() => setLowRes(!lowRes)}>
            {`${lowRes ? 'Hide' : 'Show'} lower resolution versions`}
          </Link>
        </div>
      </Box>
    </StyledDialog>
  )
}
