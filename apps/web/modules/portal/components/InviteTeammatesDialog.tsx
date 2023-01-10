import React, { useEffect, useState } from 'react'
import {
  IconButton,
  Dialog,
  DialogTitle,
  styled,
  Typography,
  Button,
  Chip,
  FormControl,
  Snackbar,
  Alert,
} from '@mui/material'
import ChipInput from 'material-ui-chip-input'
import { HighlightOffRounded } from '@mui/icons-material/'
import { useAuth0, usePlausible, useTenant } from 'modules/hooks'
import { gql, useMutation, useQuery } from '@apollo/client'
import { InviteEmailType, QueryUserArgs, User } from '@lumina/api'
import { EventNames } from 'modules/providers/plausible/Constants'

const PREFIX = 'InviteTeammatesDialog'

const classes = {
  closeButton: `${PREFIX}-closeButton`,
  dialog: `${PREFIX}-dialog`,
  confirmationDialog: `${PREFIX}-confirmationDialog`,
  inviteButton: `${PREFIX}-inviteButton`,
  cancelButton: `${PREFIX}-cancelButton`,
  actionButton: `${PREFIX}-actionButton`,
}

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

  [`& .${classes.actionButton}`]: {
    textTransform: 'capitalize',
    margin: '.72em 0',
    // minWidth: '15rem',s
    width: '8rem',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '15rem',
    },
  },

  [`& .${classes.inviteButton}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: 'theme.palette.secondary.main',
      backgroundColor: '#9c00f0',
    },
  },

  [`& .${classes.cancelButton}`]: {
    color: theme.palette.primary.light,
    '&:hover': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.light,
    },
    '& span': {
      margin: '-1px',
    },
    borderColor: theme.palette.primary.light,
    marginRight: '0.5rem',
  },
}))

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
}))

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: 'white',
  margin: '0.2rem',
  borderRadius: '9px',
  '& .MuiChip-deleteIcon': {
    color: 'white',
    '&:hover': {
      color: 'white',
    },
  },
}))

const BodyContainer = styled('div')(({ theme }) => ({
  padding: '0 1.5rem',
}))

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  '& .MuiFormControl-root': {
    whiteSpace: 'initial',
    paddingBottom: '3px',
  },
}))

const SEND_INVITATION_EMAIL = gql`
  mutation SendTeammateInvitations(
    $authId: String!
    $customer: String!
    $emails: [String!]
    $type: InviteEmailType!
  ) {
    sendTeammateInvitations(
      authId: $authId
      customer: $customer
      emails: $emails
      type: $type
    ) {
      id
    }
  }
`
const GET_USER = gql`
  query User($where: UserWhereUniqueInput!) {
    me(where: $where) {
      authId
    }
  }
`
interface Props {
  close: () => void
  open: boolean
  inviteText?: string
  type: InviteEmailType
}

export const InviteTeammatesDialog = ({
  close,
  open,
  inviteText,
  type,
}: Props) => {
  const [listOfEmail, setListOfEmails] = useState<string[]>([])
  const [emailSent, setEmailSent] = useState<boolean>(false)
  const { name } = useTenant()
  const { user } = useAuth0()
  const { inviteTeammateDialogOpen, inviteTeammateSent } = usePlausible()
  const [sendInvitationEmail] = useMutation<{
    sendTeammateInvitations: Pick<User, 'id'>
  }>(SEND_INVITATION_EMAIL)
  const { data } = useQuery<{ me: Pick<User, 'authId'> }, QueryUserArgs>(
    GET_USER,
    {
      variables: {
        where: { email: user?.email },
      },
      skip: !user,
    },
  )
  useEffect(() => {
    if (open) {
      inviteTeammateDialogOpen(EventNames.INVITE_TEAMMATE_DIALOG_OPEN, {
        props: {
          userEmail: user?.email,
          customer: name,
        },
      })
    }
  }, [open])

  const handleDelete = (emailToDelete: string) => {
    setListOfEmails((emails) =>
      emails.filter((email) => email !== emailToDelete),
    )
  }

  const sendInvitations = () => {
    if (listOfEmail.length === 0) return
    const arrayOfEmails = listOfEmail.map((email) => {
      return email.trim()
    })

    sendInvitationEmail({
      variables: {
        authId: data?.me.authId,
        customer: name,
        emails: arrayOfEmails,
        type,
      },
    })
    inviteTeammateSent(EventNames.INVITE_TEAMMATE_SENT, {
      props: {
        userEmail: user?.email,
        customer: name,
      },
    })
    setEmailSent(true)
    close()
    setListOfEmails([])
  }

  return (
    <>
      <StyledDialog
        onClose={close}
        aria-labelledby="simple-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
        classes={{
          paper: classes.dialog,
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
          <Typography variant="h4" style={{ fontWeight: 'bold' }}>
            Invite Teammates
          </Typography>
        </DialogTitle>
        <BodyContainer>
          <Typography
            variant="subtitle2"
            style={{ marginBottom: '1rem', fontSize: '0.8rem' }}
          >
            {inviteText || "They'll get an email to view the video."}
          </Typography>
          <StyledFormControl variant="filled">
            <ChipInput
              value={listOfEmail}
              onAdd={(chip) =>
                setListOfEmails((prevState) => [...prevState, chip])
              }
              onDelete={(chip) => handleDelete(chip)}
              newChipKeyCodes={[32, 188]}
              chipRenderer={({ value, chip, handleDelete }, key) => (
                <StyledChip
                  key={key}
                  label={value}
                  onDelete={() => handleDelete(chip)}
                />
              )}
            />
          </StyledFormControl>
          <ButtonContainer>
            <Button
              className={`${classes.actionButton} ${classes.cancelButton}`}
              variant="outlined"
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              className={`${classes.actionButton} ${classes.inviteButton}`}
              variant="contained"
              onClick={sendInvitations}
            >
              Invite
            </Button>
          </ButtonContainer>
        </BodyContainer>
      </StyledDialog>
      <Snackbar
        open={emailSent}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setEmailSent(false)}
      >
        <Alert severity="success">Invite email sent</Alert>
      </Snackbar>
    </>
  )
}
