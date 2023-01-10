import { Button, styled, Typography } from '@mui/material'
import { LuminaDialog } from 'modules/utils/LuminaDialog'

const PREFIX = 'RevisionDialog'

const classes = {
  actionButton: `${PREFIX}-actionButton`,
  cancelButton: `${PREFIX}-cancelButton`,
  revisionButton: `${PREFIX}-revisionButton`,
}
const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '2rem 0 0 0',
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
  title: string
  open: boolean
  onClose: () => void
  openCalendar: () => void
}

export const RevisionDialog = ({
  title,
  onClose,
  open,
  openCalendar,
}: Props) => {
  return (
    <LuminaDialog title={title} onClose={onClose} open={open} width={'sm'}>
      <Typography>Schedule a free revision with a Lumina Expert.</Typography>
      <ButtonContainer>
        {/* <Button
          className={`${classes.actionButton} ${classes.cancelButton}`}
          variant="outlined"
          onClick={close}
        >
          I don't want my free revision
        </Button> */}
        <Button
          className={`${classes.actionButton} ${classes.revisionButton}`}
          variant="contained"
          onClick={openCalendar}
        >
          Schedule Revision
        </Button>
      </ButtonContainer>
    </LuminaDialog>
  )
}
