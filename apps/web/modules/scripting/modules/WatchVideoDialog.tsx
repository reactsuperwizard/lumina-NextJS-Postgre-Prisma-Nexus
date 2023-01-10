import { Player } from '@lumina/player'
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableContainer,
} from '@mui/material'
import { LuminaDrawer } from 'modules/utils/LuminaDrawer'
import { DialogRow } from './TableRow'

const PREFIX = 'WatchVideo-Dialog'

const classes = {
  compensation: `${PREFIX}-compensation`,
  compensationText: `${PREFIX}-compensationText`,
  buttonBox: `${PREFIX}-buttonBox`,
  accept: `${PREFIX}-accept`,
  close: `${PREFIX}-close`,
  container: `${PREFIX}-container`,
  expand: `${PREFIX}-expand`,
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

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.container}`]: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  [`& .${classes.expand}`]: {
    flex: 1,
  },
}))
interface Props {
  vimeoId: number
  renderDate: Date
  open: boolean
  setOpen: (open: boolean) => void
}
export const WatchVideoDialog = ({
  vimeoId,
  renderDate,
  open,
  setOpen,
}: Props) => {
  return (
    <LuminaDrawer
      title={`Watch Video`}
      open={open}
      anchor="right"
      onClose={() => setOpen(false)}
    >
      <StyledBox className={classes.container}>
        <TableContainer component={Box}>
          <Table>
            <TableBody>
              <DialogRow
                title="Last Render:"
                body={
                  new Date(renderDate).toLocaleDateString() +
                  ' ' +
                  new Date(renderDate).toLocaleTimeString()
                }
              />
            </TableBody>
          </Table>
        </TableContainer>
        <Box className={classes.expand}>
          <Player
            poweredBy={{
              logoSrc: '/Negative@3x.png',
              iconSrc: '/Negative@3xIcon.png',
              href: 'https://www.lumina.co',
            }}
            vimeoId={vimeoId}
            responsive
          />
        </Box>
        <StyledButtonBox className={classes.buttonBox}>
          <Button className={classes.accept} onClick={() => setOpen(false)}>
            Okay
          </Button>
        </StyledButtonBox>
      </StyledBox>
    </LuminaDrawer>
  )
}
