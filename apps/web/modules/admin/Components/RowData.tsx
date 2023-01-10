import React from 'react'
import { TableCell } from '@mui/material'

export const RowData = ({
  columns,
  value,
}: {
  columns: string[]
  value: any
}) => {
  const formatValue = (value: any, column: string) =>
    column === 'createdAt' || column === 'updatedAt'
      ? new Date(value).toLocaleString('en-US')
      : value

  return (
    <>
      {columns.map((column, index: number) => {
        const keyArray = column.split('.')
        const extractedValue = keyArray[1]
          ? value?.[keyArray[0]]?.[keyArray[1]] || ' '
          : value[column]
        return (
          <TableCell key={index + extractedValue + column + '-cell'}>
            {formatValue(extractedValue, column) || ''}
          </TableCell>
        )
      })}
    </>
  )
}
