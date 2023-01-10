import SendIcon from '@mui/icons-material/Send'
import { Player } from '@lumina/player'
import { Box, Button, styled, Typography } from '@mui/material'
import { LuminaDrawer } from 'modules/utils/LuminaDrawer'
import { Compensation } from './Compensation'
import { TypeScriptingTab } from './constants'

const PREFIX = 'SubmissionQueue-Dialog'

const classes = {
  compensation: `${PREFIX}-compensation`,
  compensationText: `${PREFIX}-compensationText`,
  buttonBox: `${PREFIX}-buttonBox`,
  accept: `${PREFIX}-accept`,
  close: `${PREFIX}-close`,
}

const StyledButtonBox = styled(Box)(({ theme }) => ({
  [`&.${classes.buttonBox}`]: { marginTop: '2rem', display: 'flex' },
  [`& .${classes.accept}`]: {
    marginRight: '0.75rem',
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    paddingLeft: '1rem',
    paddingRight: '1rem',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'blue',
      color: '#fff',
    },
  },
  [`& .${classes.close}`]: {
    textTransform: 'none',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
}))
interface Props {
  scriptId: number
  vimeoId: number
  baseCompensation: number
  bonusCompensation: number
  open: boolean
  setOpen: (open: boolean) => void
}
export const QADialog = ({
  scriptId,
  vimeoId,
  baseCompensation,
  bonusCompensation,
  open,
  setOpen,
}: Props) => {
  return (
    <LuminaDrawer
      title={`QA Script #${scriptId}`}
      open={open}
      anchor="right"
      onClose={() => setOpen(false)}
    >
      <Box>
        <Typography fontSize={'0.875rem'}>
          Review the video and publish it to the customer’s portal if there are
          no errors. If there are errors, edit the script and re-render the
          video.
        </Typography>
        <Player
          poweredBy={{
            logoSrc: '/Negative@3x.png',
            iconSrc: '/Negative@3xIcon.png',
            href: 'https://www.lumina.co',
          }}
          vimeoId={vimeoId}
          responsive
        />
        <Compensation
          baseCompensation={baseCompensation}
          bonusCompensation={bonusCompensation}
        />
      </Box>
      <StyledButtonBox className={classes.buttonBox}>
        <Button
          startIcon={<SendIcon />}
          className={classes.accept}
          onClick={() => setOpen(false)}
        >
          Publish Video
        </Button>
        <Button className={classes.close} onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </StyledButtonBox>
    </LuminaDrawer>
  )
}
