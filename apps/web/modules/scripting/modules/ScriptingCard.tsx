import {
  Box,
  Button,
  Link,
  ListItemIcon,
  ListItemText,
  MenuItem,
  styled,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useState } from 'react'
import { SubmissionQueueDialog } from './SubmissionQueueDialog'
import {
  RequestLog,
  RequestLogsEvent,
  RequestStatus,
  TemplateFlavor,
  User,
} from '@lumina/api'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import { QADialog } from './QADialog'
import {
  ALL_SCRIPTS_TAB,
  MY_SCRIPTS_TAB,
  SUBMISSION_QUEUE_TAB,
  TypeScriptingTab,
} from './constants'
import { LuminaMenu } from 'modules/utils/LuminaMenu'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VideocamIcon from '@mui/icons-material/Videocam'
import { WatchVideoDialog } from './WatchVideoDialog'
import { ReturnToSubmissionQueueDialog } from './ReturnToSubmissionQueueDialog'
const PREFIX = 'Scripting-Card'

const classes = {
  box: `${PREFIX}-box`,
  requestContainer: `${PREFIX}-requestContainer`,
  button: `${PREFIX}-button`,
  buttonBox: `${PREFIX}-buttonBox`,
  requestHeader: `${PREFIX}-requestHeader`,
  link: `${PREFIX}-link`,
  info: `${PREFIX}-info`,
  accept: `${PREFIX}-accept`,
  close: `${PREFIX}-close`,
  relative: `${PREFIX}-relative`,
  icon: `${PREFIX}-icon`,
  inQueue: `${PREFIX}-inQueue`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.box}`]: {
    display: 'flex',
    borderRadius: '5px',
    width: '100%',
    marginBottom: '10px',
    border: '1px solid #D9D9D9',
    borderLeft: `6px solid #1222A3`,
  },

  [`& .${classes.requestContainer}`]: {
    flex: 3,
    padding: '1rem 1.25rem',
  },
  [`& .${classes.relative}`]: {
    position: 'relative',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
  [`& .${classes.inQueue}`]: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    color: '#0A0A0A',
  },
  [`& .${classes.icon}`]: {
    position: 'absolute',
    top: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#DADADA',
      borderRadius: '1rem',
    },
  },

  [`& .${classes.requestHeader}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.25rem',
  },
  [`& .${classes.info}`]: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  [`& .${classes.link}`]: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    '&:hover': {
      cursor: 'pointer',
    },
  },

  [`& .${classes.button}`]: {
    flex: 1,
    backgroundColor: '#1222A3',
    fontWeight: 'bold',
    textTransform: 'none',
    fontSize: '1.125rem',
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}))

interface Props {
  id: number
  scriptId?: number
  vimeoId?: number | null | undefined
  videoCreationDate?: Date
  createdAt: Date
  customerName: string
  customerId: number
  specialInstructions: string
  title: string
  bonusPrice: number
  basePrice: number
  bonusDeadline: Date
  template: TemplateFlavor
  status: RequestStatus
  tab: TypeScriptingTab
  scriptRefetch?: () => void
  requestRefetch?: () => void
  logs: (Pick<RequestLog, 'id' | 'event' | 'createdAt'> & {
    user: Pick<User, 'email' | 'id' | 'firstName' | 'lastName'>
  })[]
}
export const ScriptingCard = ({
  id,
  scriptId,
  status,
  createdAt,
  customerName,
  customerId,
  basePrice,
  bonusDeadline,
  bonusPrice,
  title,
  template,
  specialInstructions,
  logs,
  vimeoId,
  videoCreationDate,
  tab,
  scriptRefetch,
  requestRefetch,
}: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [showMenu, setshowMenu] = useState<boolean>()
  const [openDialog, setOpenDialog] = useState(false)

  const getButtonMessage = () => {
    if (scriptId && status == RequestStatus.Qa) {
      return 'QA Video'
    } else if (status == RequestStatus.Scripting) {
      return 'Edit Script'
    } else {
      return (
        <>
          Accept <br /> +${basePrice}
        </>
      )
    }
  }

  const getButtonClick = () => {
    if (status == RequestStatus.Scripting)
      return router.push(`/scripting/${scriptId}`)
    return setOpen(true)
  }

  const generateOffsetTimeMessage = (
    requestTime: Date,
    isRescheduled: boolean,
    status: RequestStatus,
  ) => {
    const currentTime = new Date().getTime()
    const requestTimeMs = new Date(requestTime).getTime()
    const difference = Math.round((currentTime - requestTimeMs) / 60000)
    const message =
      status === RequestStatus.Qa
        ? 'Rendered'
        : isRescheduled
        ? 'Returned to Queue'
        : 'Submitted'
    if (difference == 0) return `${message} few second(s) ago`
    else if (difference < 60) return `${message} ${difference} minute(s) ago`
    else return `${message} ${Math.round(difference / 60)} hour(s) ago`
  }

  const getFeedbackMessage = (
    logs: (Pick<RequestLog, 'id' | 'event' | 'createdAt'> & {
      user: Pick<User, 'email' | 'id' | 'firstName' | 'lastName'>
    })[],
    createdAt: Date,
    status: RequestStatus,
    videoCreationDate?: Date,
  ): React.ReactNode => {
    if (status === RequestStatus.Rendering) return 'Rendering'
    if (status === RequestStatus.Queued)
      return (
        <Box className={classes.inQueue}>
          <HourglassEmptyIcon style={{ fontSize: 'inherit' }} /> In Queue
        </Box>
      )
    if (status === RequestStatus.Scripting)
      return (
        <Link
          fontSize={'0.75rem'}
          sx={{
            textDecoration: 'underline',
            color: '#0A1467',
            cursor: 'pointer',
          }}
          onClick={() => setOpenDialog(true)}
        >
          Return to Submission Queue
        </Link>
      )

    let isRescheduled = false
    let timeToFormat = createdAt
    for (let log of logs) {
      if (log.event == RequestLogsEvent.RequestReturnedToQueue) {
        isRescheduled = true
        timeToFormat = new Date(log.createdAt)
        break
      }
    }
    if (status === RequestStatus.Qa && videoCreationDate) {
      timeToFormat = videoCreationDate
    }
    return generateOffsetTimeMessage(timeToFormat, isRescheduled, status)
  }

  const getRescheduledUser = (): string | undefined => {
    for (let log of logs) {
      if (log.event == RequestLogsEvent.RequestReturnedToQueue) {
        return log.user.firstName + ' ' + log.user.lastName
      }
    }
    return
  }
  const bonusTimeLeft = Math.floor(
    (new Date(bonusDeadline).getTime() - new Date().getTime()) / 60000,
  )
  const more = (
    <Box
      id={`more-${id}`}
      className={classes.relative}
      onClick={() => setshowMenu(true)}
    >
      <Box className={classes.icon}>
        <MoreHorizIcon />
      </Box>

      <LuminaMenu
        showMenu={showMenu}
        setShowMenu={setshowMenu}
        id={`#more-${id}`}
        sx={{
          right: 0,
          top: '1rem',
          padding: 0,
          margin: 0,
        }}
      >
        <Box>
          <MenuItem>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View Script</ListItemText>
          </MenuItem>
          {status == RequestStatus.Qa && (
            <MenuItem onClick={() => setOpen(true)}>
              <ListItemIcon>
                <VideocamIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Watch Video</ListItemText>
            </MenuItem>
          )}
        </Box>
      </LuminaMenu>
    </Box>
  )
  return (
    <StyledBox className={classes.box}>
      {openDialog && (
        <ReturnToSubmissionQueueDialog
          id={id}
          open={openDialog}
          setOpen={setOpenDialog}
          onClose={() => setOpenDialog(false)}
          scriptRefetch={scriptRefetch!}
          requestRefetch={requestRefetch!}
        />
      )}
      {tab === MY_SCRIPTS_TAB && status === RequestStatus.Qa && (
        <QADialog
          scriptId={scriptId!}
          vimeoId={vimeoId!}
          baseCompensation={basePrice}
          bonusCompensation={bonusPrice}
          open={open}
          setOpen={setOpen}
        />
      )}
      {tab === SUBMISSION_QUEUE_TAB && (
        <SubmissionQueueDialog
          id={id}
          title={title}
          customer={customerName}
          customerId={customerId}
          createdAt={createdAt}
          template={template}
          specialInstructions={specialInstructions}
          baseCompensation={basePrice}
          bonusCompensation={bonusPrice}
          open={open}
          setOpen={setOpen}
          rescheduledBy={getRescheduledUser()}
        />
      )}
      {tab === ALL_SCRIPTS_TAB && status === RequestStatus.Qa && (
        <WatchVideoDialog
          renderDate={createdAt}
          vimeoId={vimeoId!}
          open={open}
          setOpen={setOpen}
        />
      )}
      <Box className={classes.requestContainer}>
        <Box className={classes.requestHeader}>
          <Typography color="#0A0A0A" fontSize={'0.875rem'}>
            REQUEST #{id}
          </Typography>
          {tab === ALL_SCRIPTS_TAB ? (
            status === RequestStatus.Queued ||
            status === RequestStatus.Rendering ? (
              // TODO - Add Rendering
              <Box className={classes.inQueue}>
                <HourglassEmptyIcon style={{ fontSize: 'inherit' }} /> In Queue
              </Box>
            ) : (
              more
            )
          ) : (
            <Box color="#0A0A0A" fontSize={'0.75rem'}>
              {getFeedbackMessage(logs, createdAt, status, videoCreationDate)}
            </Box>
          )}
        </Box>
        <Link className={classes.link}>{customerName}</Link>
        <Typography fontSize={'0.875rem'} fontWeight="bold" mt={'0.25rem'}>
          {title}
        </Typography>
        {bonusTimeLeft > 0 && (
          <Box className={classes.info}>
            <AccessTimeIcon fontSize={'inherit'} />
            <Typography fontSize={'inherit'} ml={'0.25rem'} color="#0A0A0A">
              Publish within {bonusTimeLeft} minutes to receive ${bonusPrice}{' '}
              bonus
            </Typography>
          </Box>
        )}
      </Box>
      {status !== RequestStatus.Rendering &&
        status !== RequestStatus.Queued &&
        tab != ALL_SCRIPTS_TAB && (
          <Button className={classes.button} onClick={() => getButtonClick()}>
            {getButtonMessage()}
          </Button>
        )}
    </StyledBox>
  )
}
