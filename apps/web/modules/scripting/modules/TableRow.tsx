import { styled, TableCell, TableRow } from '@mui/material'

const PREFIX = 'TableRow'

const classes = {
  row: `${PREFIX}-row`,
  compensationText: `${PREFIX}-compensationText`,
  leftCell: `${PREFIX}-leftCell`,
  rightCell: `${PREFIX}-rightCell`,
}

const StyledTableRow = styled(TableRow)(() => ({
  [`& .${classes.row}`]: {
    '&:last-child td, &:last-child th': { border: 0 },
  },
  [`& .${classes.compensationText}`]: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
  },
  [`& .${classes.leftCell}`]: {
    paddingLeft: 0,
    fontWeight: 500,
    fontSize: '0.875rem',
  },
  [`& .${classes.rightCell}`]: {
    fontWeight: 500,
    fontSize: '0.875rem',
  },
}))

interface Props {
  title: string
  body: React.ReactNode
}

export const DialogRow = ({ title, body }: Props) => {
  return (
    <StyledTableRow key={title} className={classes.row}>
      <TableCell
        component="th"
        scope="row"
        width="30%"
        className={classes.leftCell}
      >
        {title}
      </TableCell>
      <TableCell align="left" className={classes.rightCell}>
        {body}
      </TableCell>
    </StyledTableRow>
  )
}
