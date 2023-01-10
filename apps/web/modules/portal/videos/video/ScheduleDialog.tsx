import { styled } from '@mui/material'
import { LuminaDialog } from 'modules/utils/LuminaDialog'
import Head from 'next/head'
// import Script from 'next/script'

const PREFIX = 'ScheduleDialog'

const classes = {
  actionButton: `${PREFIX}-actionButton`,
  cancelButton: `${PREFIX}-cancelButton`,
  revisionButton: `${PREFIX}-revisionButton`,
}
const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  [`& .${classes.actionButton}`]: {
    textTransform: 'capitalize',
    margin: '.72em 0',
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
  [`& .${classes.revisionButton}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: 'theme.palette.secondary.main',
      backgroundColor: '#9c00f0',
    },
  },
}))

interface Props {
  open: boolean
  onClose: () => void
  title: string
  description?: string
}

export const ScheduleDialog = ({
  onClose,
  open,
  title,
  description,
}: Props) => {
  return (
    <>
      {open && (
        <Head>
          <script
            type="text/javascript"
            src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
          ></script>
        </Head>
      )}
      <LuminaDialog
        title={title}
        onClose={onClose}
        open={open}
        description={description}
        width="md"
      >
        <div
          className="meetings-iframe-container"
          data-src="https://meetings.hubspot.com/connor-whan-lumina/schedule-a-demo?embed=true"
        ></div>
      </LuminaDialog>
    </>
  )
}
