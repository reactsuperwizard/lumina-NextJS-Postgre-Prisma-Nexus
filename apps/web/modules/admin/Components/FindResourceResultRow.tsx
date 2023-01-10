import { TableCell, TableRow } from '@mui/material'
import React from 'react'

export const FindResourceResultRow = (props: {
  width?: string
  label: string
  value: any
}) => {
  const { width, label, value } = props
  return (
    <TableRow>
      <TableCell
        align="left"
        style={{ width: `${width ? width : '110px'}`, paddingRight: '0' }}
      >
        {label}
      </TableCell>
      <TableCell align="left">
        <strong>{value.toString()}</strong>
      </TableCell>
    </TableRow>
  )
}
