import React from 'react'
import { TableCell } from '@mui/material'
import { ClickableTableRow } from './ClickableTableRow'
import { RowData } from './RowData'

export const ConnectedTableRow = ({
  id,
  connectedType,
  columns,
  value,
}: {
  id: number
  connectedType: string
  columns: string[]
  value: any
}) => {
  const formatValue = (value: any, column: string) =>
    column === 'createdAt' || column === 'updatedAt'
      ? new Date(value).toLocaleString('en-US')
      : value

  return (
    <>
      <ClickableTableRow
        typeAndIdUrl={`${connectedType}/${value.id}`}
        id={value.id || id}
      >
        <RowData columns={columns} value={value}></RowData>
      </ClickableTableRow>
    </>
  )
}
