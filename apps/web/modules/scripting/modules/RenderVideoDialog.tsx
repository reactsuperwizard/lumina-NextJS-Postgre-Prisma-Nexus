import { gql, useMutation } from '@apollo/client'
import { MutationCreateOneRenderArgs, Request } from '@lumina/api'
import {
  Box,
  Button,
  CircularProgress,
  styled,
  Typography,
} from '@mui/material'
import {
  CreateRenderMutation,
  CREATE_RENDER,
} from 'modules/admin/scripts/queries'
import { LuminaDialog } from 'modules/utils/LuminaDialog'
import { LuminaErrorText } from 'modules/utils/LuminaErrorText'

const PREFIX = 'ReturnToSubmissionQueue-Dialog'

interface Props {
  id: number
  open: boolean
  setOpen: (open: boolean) => void
  refetch: () => void
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
    marginRight: '0.75rem',
  },
  [`& .${classes.close}`]: {
    textTransform: 'none',
  },
}))

export const RenderVideoDialog = ({ id, open, setOpen, refetch }: Props) => {
  const [createRender, { loading, error }] = useMutation<
    {
      queuedRender: CreateRenderMutation
    },
    MutationCreateOneRenderArgs
  >(CREATE_RENDER)

  const handleClose = () => {
    if (loading) return
    setOpen(false)
  }

  const handleClick = async () => {
    const variables = {
      data: { script: { connect: { id } } },
    }
    await createRender({ variables })
    setOpen(false)
    await refetch()
  }

  return (
    <LuminaDialog
      onClose={handleClose}
      open={open}
      title="Render Video?"
      width="sm"
      align={'top'}
    >
      {error ? <LuminaErrorText>Something went wrong!</LuminaErrorText> : ''}
      <Typography fontSize={'0.875rem'}>
        The script will not be editable while rendering. Videos render in the
        order they were added to your queue.
      </Typography>
      <StyledButtonBox className={classes.buttonBox}>
        <Button
          disabled={loading}
          className={classes.accept}
          onClick={handleClick}
        >
          {loading ? (
            <CircularProgress color="primary" size={'1rem'} />
          ) : (
            'Render'
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
