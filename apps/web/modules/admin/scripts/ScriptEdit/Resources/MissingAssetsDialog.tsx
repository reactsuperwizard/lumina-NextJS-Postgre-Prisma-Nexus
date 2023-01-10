import React from 'react'
import { styled } from '@mui/material/styles'
import { Typography, Dialog, IconButton } from '@mui/material/'
import { CloseSharp } from '@mui/icons-material'

const PREFIX = 'MissingAssetsDialog'

const classes = {
  closeButton: `${PREFIX}-closeButton`,
  title: `${PREFIX}-title`,
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(0),
    top: theme.spacing(0),
  },

  [`& .${classes.title}`]: {
    margin: theme.spacing(5),
  },
}))

export const MissingAssetsDialog = (props: {
  onClose: () => void
  open: boolean
  missingAssetIds: number[] | null
}) => {
  const { onClose, open, missingAssetIds } = props

  return (
    <>
      <StyledDialog open={open} onClose={onClose}>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="large"
        >
          <CloseSharp />
        </IconButton>
        <Typography variant="h4" className={classes.title}>
          {`These assets don't exist: ${missingAssetIds}`}
        </Typography>
      </StyledDialog>
    </>
  )
}
