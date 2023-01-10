import CancelIcon from '@mui/icons-material/Cancel'
import { styled, Drawer, Box, Typography, IconButton } from '@mui/material'

interface Props {
  open: boolean
  children: React.ReactNode
  anchor: 'left' | 'top' | 'right' | 'bottom'
  onClose: () => void
  title: string
}

const PREFIX = 'Lumina-Drawer'

const classes = {
  paper: `${PREFIX}-paper`,
  padding: `${PREFIX}-padding`,
  box: `${PREFIX}-box`,
  closeButton: `${PREFIX}-closeButton`,
}

const StyledDrawer = styled(Drawer)(() => ({
  [`& .${classes.paper}`]: {
    width: '45%',
    padding: '1.875rem',
  },
  [`& .${classes.padding}`]: {
    padding: '1.875rem',
  },
  [`& .${classes.box}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '1.875rem',
  },
  [`& .${classes.closeButton}`]: {
    color: '#CCCCCC',
    fontSize: '1.75rem',
  },
}))
export const LuminaDrawer = ({
  children,
  open,
  anchor,
  onClose,
  title,
}: Props) => {
  return (
    <StyledDrawer
      open={open}
      anchor={anchor}
      onClose={() => {
        onClose()
      }}
      PaperProps={{
        className: classes.paper,
      }}
    >
      <Box className={classes.box}>
        <Typography fontSize={'1.625rem'} fontWeight={'bold'}>
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CancelIcon fontSize="inherit" />
        </IconButton>
      </Box>
      {children}
    </StyledDrawer>
  )
}
