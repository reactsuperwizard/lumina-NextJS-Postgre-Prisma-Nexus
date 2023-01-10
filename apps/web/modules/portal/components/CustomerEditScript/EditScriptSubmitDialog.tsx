import React from 'react'
import {
  IconButton,
  Dialog,
  DialogTitle,
  styled,
  Typography,
} from '@mui/material'
import { HighlightOffRounded } from '@mui/icons-material/'

const PREFIX = 'ActivateCustomerDialog'

const classes = {
  closeButton: `${PREFIX}-closeButton`,
  dialog: `${PREFIX}-dialog`,
  confirmationDialog: `${PREFIX}-confirmationDialog`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  [`& .${classes.dialog}`]: {
    borderRadius: 20,
    padding: '1.5rem',
    paddingBottom: '3rem',
    maxWidth: '640px',
  },

  [`& .${classes.confirmationDialog}`]: {
    maxWidth: '675px',
  },
}))

interface Props {
  close: () => void
  open: boolean
}

export const EditScriptSubmitDialog = ({ close, open }: Props) => {
  return (
    <>
      <StyledDialog
        onClose={close}
        aria-labelledby="simple-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
        classes={{
          paper: `${classes.dialog}`,
        }}
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={close}
            size="large"
          >
            <HighlightOffRounded fontSize="large" />
          </IconButton>
        </DialogTitle>
        <Typography variant="h5" color="textPrimary" textAlign="center">
          Your revisions have been submitted!
        </Typography>
        <Typography variant="h6" color="textPrimary" textAlign="center">
          We will notify you when your video is updated.
        </Typography>
      </StyledDialog>
    </>
  )
}
