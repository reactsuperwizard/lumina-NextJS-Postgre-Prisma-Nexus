import {
  Box,
  styled,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material'
import { DialogRow } from './TableRow'

const PREFIX = 'Compensation'

const classes = {
  compensation: `${PREFIX}-compensation`,
  compensationText: `${PREFIX}-compensationText`,
  buttonBox: `${PREFIX}-buttonBox`,
  accept: `${PREFIX}-accept`,
  close: `${PREFIX}-close`,
}

const StyledBox = styled(Box)(() => ({
  [`&.${classes.compensation}`]: {
    paddingTop: '2rem',
  },
  [`& .${classes.compensationText}`]: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
  },
}))

interface Props {
  baseCompensation: number
  bonusCompensation: number
}
export const Compensation = ({
  baseCompensation,
  bonusCompensation,
}: Props) => {
  return (
    <StyledBox className={classes.compensation}>
      <Typography className={classes.compensationText}>COMPENSATION</Typography>
      <TableContainer component={Box}>
        <Table>
          <TableBody>
            <DialogRow
              title="Base Compensation:"
              body={String(baseCompensation)}
            />
            <DialogRow title="Bonus:" body={String(bonusCompensation)} />
          </TableBody>
        </Table>
      </TableContainer>
    </StyledBox>
  )
}
