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

const PREFIX = 'FormError-Dialog'

interface Props {
  open: boolean
  onClose: () => void
  setOpen: (open: boolean) => void
}

const classes = {
  buttonBox: `${PREFIX}-buttonBox`,
  accept: `${PREFIX}-accept`,
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
}))

export const FormErrorDialog = ({ onClose, open, setOpen }: Props) => {
  return (
    <LuminaDialog
      onClose={onClose}
      open={open}
      title="Video cannot be Rendered"
      width="sm"
      align={'top'}
    >
      <Typography fontSize={'0.875rem'}>
        There is missing content, images, and/or audio from the script. Please
        complete all fields before rendering.
      </Typography>
      <StyledButtonBox className={classes.buttonBox}>
        <Button className={classes.accept} onClick={() => setOpen(false)}>
          Okay
        </Button>
      </StyledButtonBox>
    </LuminaDialog>
  )
}
