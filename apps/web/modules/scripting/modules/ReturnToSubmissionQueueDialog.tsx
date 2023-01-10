import { gql, useMutation } from '@apollo/client'
import { Request } from '@lumina/api'
import {
  Box,
  Button,
  CircularProgress,
  styled,
  Typography,
} from '@mui/material'
import { LuminaDialog } from 'modules/utils/LuminaDialog'
import { LuminaErrorText } from 'modules/utils/LuminaErrorText'

const PREFIX = 'ReturnToSubmissionQueue-Dialog'

interface Props {
  id: number
  open: boolean
  onClose: () => void
  scriptRefetch: () => void
  requestRefetch: () => void
  setOpen: (open: boolean) => void
}

const classes = {
  compensation: `${PREFIX}-compensation`,
  compensationText: `${PREFIX}-compensationText`,
  buttonBox: `${PREFIX}-buttonBox`,
  accept: `${PREFIX}-accept`,
  close: `${PREFIX}-close`,
}

interface ReturnRequestToQueueMutation {
  request: Pick<Request, 'id'>
}

const RETURN_TO_SUBMISSION_QUEUE = gql`
  mutation Mutation($where: RequestWhereUniqueInput!) {
    returnRequestToSubmissionQueue(where: $where) {
      id
    }
  }
`

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
    marginRight: '0.75rem',
  },
}))

export const ReturnToSubmissionQueueDialog = ({
  id,
  onClose,
  open,
  setOpen,
  scriptRefetch,
  requestRefetch,
}: Props) => {
  const [returnRequest, { loading, error }] =
    useMutation<ReturnRequestToQueueMutation>(RETURN_TO_SUBMISSION_QUEUE)

  const handleClick = async () => {
    await returnRequest({
      variables: {
        where: {
          id,
        },
      },
    })
    setOpen(false)
    await Promise.all([scriptRefetch(), requestRefetch()])
  }
  return (
    <LuminaDialog
      onClose={onClose}
      open={open}
      title="Return Script To Submission Queue?"
      width="sm"
      align={'top'}
    >
      {error ? <LuminaErrorText>Something went wrong!</LuminaErrorText> : ''}
      <Typography fontSize={'0.875rem'}>
        You will not receive payment for this script. It will be returned to the
        Submission Queue for another scripter to accept. Returning multiple
        scripts to the queue may incur a penalty.
      </Typography>
      <StyledButtonBox className={classes.buttonBox}>
        <Button
          disabled={loading}
          className={classes.close}
          onClick={handleClick}
        >
          {loading ? (
            <CircularProgress color="primary" size={'1rem'} />
          ) : (
            'Return to the Queue'
          )}
        </Button>
        <Button
          disabled={loading}
          className={classes.accept}
          onClick={() => setOpen(false)}
        >
          Keep Working
        </Button>
      </StyledButtonBox>
    </LuminaDialog>
  )
}
