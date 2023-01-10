import React from 'react'
import { TableCell, Chip, Box } from '@mui/material'
import { ConnectedChip } from '../ConnectedChip'
import { Scalars } from '@lumina/api'
import { VimeoChip } from '../VimeoChip'

interface Props {
  value: any | string
  column: string
  connectedColumns: { [column: string]: string }
}

export const LuminaTableCell = ({ value, column, connectedColumns }: Props) => {
  const lookup = connectedColumns[column]
  const valueArray = Array.isArray(value) ? value : [value]

  const formatDate = (value: Scalars['DateTime']) => {
    if (value === null && column === 'lastLogin') {
      return 'Has not logged in'
    } else {
      return new Date(value).toLocaleString('en-US')
    }
  }

  if (lookup) {
    return (
      <TableCell key={`table-cell-${column}-${value?.toString()}`}>
        {valueArray.map((v: any, i: number) => {
          const id = v?.id
          if (!id) return null
          if (i === 3) {
            return <Chip size="small" label="..." key={`${id}...`} />
          }
          if (i > 3) {
            return null
          }
          return (
            <ConnectedChip
              id={id}
              resourceName={column}
              label={v[lookup]}
              key={`connected-chip-${id}`}
            />
          )
        })}
      </TableCell>
    )
  }
  const dateFormattedValue =
    column === 'createdAt' ||
    column === 'updatedAt' ||
    column === 'completedAt' ||
    column === 'lastLogin'
      ? formatDate(value)
      : null
  const vimeoChip = column === 'vimeoId' ? <VimeoChip vimeoId={value} /> : null
  return (
    <TableCell key={`${column}-${value}`}>
      {dateFormattedValue || vimeoChip || value}
    </TableCell>
  )
}
