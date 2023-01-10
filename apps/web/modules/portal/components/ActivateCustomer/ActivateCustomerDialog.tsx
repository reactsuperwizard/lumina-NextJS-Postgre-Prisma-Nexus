import React, { useEffect } from 'react'
import { IconButton, Dialog, DialogTitle, styled } from '@mui/material'
import { HighlightOffRounded } from '@mui/icons-material/'
import { ActivateCustomerSurvey } from './ActivateCustomerSurvey'
import { usePlausible, useTenant } from 'modules/hooks'
import { EventNames } from 'modules/providers/plausible/Constants'
import { ActivateCustomerContent } from './ActivateCustomerContent'
import { useRouter } from 'next/router'

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
    maxWidth: '640px',
  },

  [`& .${classes.confirmationDialog}`]: {
    maxWidth: '675px',
  },
}))

interface Props {
  close: () => void
  open: boolean
  perVideo?: boolean
}

export const ActivateCustomerDialog = ({ close, open, perVideo }: Props) => {
  const { name, active, email } = useTenant()
  const { licenseDialog } = usePlausible()
  const router = useRouter()
  useEffect(() => {
    if (open) {
      licenseDialog(EventNames.LICENSE_DIALOG, {
        props: {
          customer: name || '',
          page: location.pathname,
          email: email,
        },
      })
    }
  }, [open])

  return (
    <>
      <StyledDialog
        onClose={close}
        aria-labelledby="simple-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
        classes={{
          paper: `${classes.dialog} ${
            !active ? classes.confirmationDialog : ''
          }`,
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
        {router.pathname.split('/')[2] === 'orders' ? (
          <ActivateCustomerContent perVideo={perVideo} close={close} />
        ) : (
          <ActivateCustomerSurvey perVideo={perVideo} close={close} />
        )}
      </StyledDialog>
    </>
  )
}
