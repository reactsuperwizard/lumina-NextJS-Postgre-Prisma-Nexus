import { Button, styled } from '@mui/material'
import { useState } from 'react'
import { InviteTeammatesDialog } from './InviteTeammatesDialog'
import { Drafts as DraftIcon } from '@mui/icons-material/'
import { InviteEmailType } from '@lumina/api'

const PREFIX = 'InviteTeammates'

const classes = {
  actionButton: `${PREFIX}-actionButton`,
  luminaActionButton: `${PREFIX}-luminaActionButton`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.actionButton}`]: {
    textTransform: 'capitalize',
    margin: '.72em 0',
    // minWidth: '15rem',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '15rem',
    },
  },

  [`& .${classes.luminaActionButton}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: 'theme.palette.secondary.main',
      backgroundColor: '#9c00f0',
    },
  },
}))

interface Props {
  inviteText?: string
  type: InviteEmailType
}
export const InviteTeammatesButton = ({ inviteText, type }: Props) => {
  const [inviteTeammatesOpen, setInviteTeammatesOpen] = useState(false)
  return (
    <Root>
      <InviteTeammatesDialog
        open={inviteTeammatesOpen}
        close={() => setInviteTeammatesOpen(false)}
        inviteText={inviteText}
        type={type}
      />
      <Button
        sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}
        fullWidth
        variant="contained"
        color="primary"
        title="Invite Teammates"
        className={`${classes.actionButton} ${classes.luminaActionButton}`}
        onClick={() => setInviteTeammatesOpen(true)}
        startIcon={<DraftIcon />}
      >
        Invite Teammates
      </Button>
    </Root>
  )
}
