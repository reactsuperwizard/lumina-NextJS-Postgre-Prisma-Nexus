import { HighlightOffRounded } from '@mui/icons-material'
import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  styled,
  Typography,
} from '@mui/material'

const PREFIX = 'Dialog'

const classes = {
  closeButton: `${PREFIX}-closeButton`,
  dialog: `${PREFIX}-dialog`,
  title: `${PREFIX}-title`,
  description: `${PREFIX}-description`,
  body: `${PREFIX}-body`,
  scrollPaper: `${PREFIX}-scrollPaper`,
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.dialog}`]: {
    padding: '1rem',
    borderRadius: '20px',
    // width: '40%',
  },
  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
  },
  [`& .${classes.title}`]: {
    fontWeight: 'bold',
    padding: 0,
    paddingRight: '1rem',
    fontSize: '1.5rem',
  },
  [`& .${classes.description}`]: {
    fontSize: '0.8rem',
    padding: '1.5rem',
  },
  [`& .${classes.scrollPaper}`]: {
    alignItems: 'baseline',
  },
  [`& .${classes.body}`]: {
    padding: '1.5rem',
    paddingTop: 0,
    overflow: 'auto',
  },
}))
interface Props {
  title: string
  description?: string
  open: boolean
  onClose: () => void
  children: React.ReactNode
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'top' | null
}

export const LuminaDialog = ({
  title,
  open,
  onClose,
  children,
  description,
  width,
  align,
}: Props) => {
  return (
    <StyledDialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
      maxWidth={width}
      classes={{
        paper: classes.dialog,
        scrollPaper: align === 'top' ? classes.scrollPaper : '',
      }}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="large"
        >
          <HighlightOffRounded fontSize="large" />
        </IconButton>
        <Typography className={classes.title}>{title}</Typography>
      </DialogTitle>
      {description && (
        <Typography className={classes.description}>{description}</Typography>
      )}
      <Box className={classes.body}>{children}</Box>
    </StyledDialog>
  )
}
