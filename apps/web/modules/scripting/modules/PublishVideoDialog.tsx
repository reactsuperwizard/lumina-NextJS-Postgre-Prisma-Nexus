import { ApolloError } from '@apollo/client'
import {
  Box,
  Button,
  CircularProgress,
  styled,
  Typography,
} from '@mui/material'
import { LuminaDialog } from 'modules/utils/LuminaDialog'
import { LuminaErrorText } from 'modules/utils/LuminaErrorText'

const PREFIX = 'PublishVideo-Dialog'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  handlePublish: () => void
  loading: boolean
  error: ApolloError | undefined
}

const classes = {
  buttonBox: `${PREFIX}-buttonBox`,
  accept: `${PREFIX}-accept`,
  close: `${PREFIX}-close`,
}

const StyledButtonBox = styled(Box)(({ theme }) => ({
  [`&.${classes.buttonBox}`]: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  [`& .${classes.accept}`]: {
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
  },
}))

export const PublishVideoDialog = ({
  open,
  setOpen,
  handlePublish,
  loading,
  error,
}: Props) => {
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <LuminaDialog
      onClose={handleClose}
      open={open}
      title="Publish edits to the Master Script?"
      width="sm"
      align={'top'}
    >
      {error && <LuminaErrorText>Something went wrong!</LuminaErrorText>}
      <Typography fontSize={'0.875rem'}>
        These changes will take effect immediately for unaccepted requests.
        In-progress scripts will not be effected.
      </Typography>
      <StyledButtonBox className={classes.buttonBox}>
        <Button
          disabled={loading}
          className={classes.accept}
          onClick={handlePublish}
        >
          {loading ? (
            <CircularProgress color="primary" size={'1rem'} />
          ) : (
            'Publish'
          )}
        </Button>
        <Button
          disabled={loading}
          className={classes.close}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
      </StyledButtonBox>
    </LuminaDialog>
  )
}
