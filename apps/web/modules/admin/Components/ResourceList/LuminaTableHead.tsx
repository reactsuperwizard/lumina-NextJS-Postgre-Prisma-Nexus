import React from 'react'

import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  // Checkbox,
} from '@mui/material'

import { LuminaResourceOrderByInput, SortOrder } from '@lumina/api'
import type {
  QueryArgs,
  OrderByParam,
  ConnectedOrderBy,
  ScalarOrderBy,
} from './ResourceList'

interface TableHeadProps {
  columns: string[]
  connectedColumns: { [column: string]: string }
  orderByColumns: string[]
  classes: any
  numSelected: number
  handleUpdateArgs: (newArg: QueryArgs) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  orderBy: OrderByParam[]
  rowCount: number
}

export const LuminaTableHead = ({
  connectedColumns,
  classes,
  // onSelectAllClick,
  orderBy,
  orderByColumns,
  // numSelected,
  // rowCount,
  handleUpdateArgs,
  columns,
}: TableHeadProps) => {
  const currentOrderBy = orderBy[0]

  const handleOrderBy = (column: string) => {
    let newOrderByParam: OrderByParam
    const isCurrent = column in currentOrderBy
    const isConnectedColumn = column in connectedColumns

    // handle connected columns with nested order by
    if (isConnectedColumn) {
      // base nested order by on whatever parameter is used for connected column
      // e.g. Customer.name
      const sortParam = connectedColumns[column]
      if (isCurrent) {
        const castedOrderBy = currentOrderBy as ConnectedOrderBy
        const newDirection =
          castedOrderBy[column]![sortParam]! === SortOrder.Desc
            ? SortOrder.Asc
            : SortOrder.Desc
        newOrderByParam = { [column]: { [sortParam]: newDirection } }
      } else {
        newOrderByParam = { [column]: { [sortParam]: SortOrder.Desc } }
      }
    } else {
      if (isCurrent) {
        const castedOrderBy = currentOrderBy as ScalarOrderBy
        const newDirection =
          castedOrderBy[column] === SortOrder.Desc
            ? SortOrder.Asc
            : SortOrder.Desc
        newOrderByParam = { [column]: newDirection }
      } else {
        newOrderByParam = { [column]: SortOrder.Desc }
      }
    }

    handleUpdateArgs({ orderBy: [newOrderByParam!] })
  }

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell> */}
        <TableCell>
          <TableSortLabel
            active={!!currentOrderBy?.id}
            direction={(currentOrderBy?.id as SortOrder) || undefined}
            onClick={() => handleOrderBy('id')}
          >
            Id
            {currentOrderBy?.id ? (
              <span className={classes.visuallyHidden}>
                {currentOrderBy.id === 'desc'
                  ? 'sorted descending'
                  : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
        {columns.map((column) => {
          const isOrderByColumn = orderByColumns.includes(column)
          const formattedColumn = `${column
            .toString()
            .charAt(0)
            .toUpperCase()}${column
            .toString()
            .replace(/([A-Z])/g, ' $1')
            .slice(1)}`
          if (isOrderByColumn) {
            let sortDirection
            const isConnectedColumn = column in connectedColumns
            if (isConnectedColumn) {
              const castedOrderBy = currentOrderBy as ConnectedOrderBy
              const sortParam = connectedColumns[column]
              sortDirection = castedOrderBy?.[column]?.[sortParam] || false
            } else {
              const castedOrderBy = currentOrderBy as ScalarOrderBy
              sortDirection = castedOrderBy[column] || false
            }

            return (
              <TableCell
                key={column.toString()}
                onClick={(e) => {
                  e.preventDefault()
                  handleOrderBy(column as keyof LuminaResourceOrderByInput)
                }}
                sortDirection={sortDirection}
              >
                <TableSortLabel
                  active={!!sortDirection}
                  direction={sortDirection || undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    handleOrderBy(column as keyof LuminaResourceOrderByInput)
                  }}
                >
                  {formattedColumn}
                  {sortDirection ? (
                    <span className={classes.visuallyHidden}>
                      {sortDirection === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
          }
          return (
            <TableCell key={column.toString()}>{formattedColumn}</TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  );
}
