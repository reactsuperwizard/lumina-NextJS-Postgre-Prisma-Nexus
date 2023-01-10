import React, { useState } from 'react'

import { styled } from '@mui/material/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  FormControlLabel,
  Switch,
} from '@mui/material/'

import { Toolbar } from './Toolbar'
import { LuminaTableHead } from './LuminaTableHead'
import { LuminaTableCell } from './LuminaTableCell'
import { SkeletonRows } from 'modules/utils'

import type { OrderByParam, QueryArgs, RequiredQueryArgs } from './ResourceList'
import { ClickableTableRow } from '../ClickableTableRow'

const PREFIX = 'LuminaTable'

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  table: `${PREFIX}-table`,
  visuallyHidden: `${PREFIX}-visuallyHidden`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    width: '100%',
  },

  [`& .${classes.paper}`]: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.table}`]: {
    minWidth: 750,
  },

  [`& .${classes.visuallyHidden}`]: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}))

interface Props {
  page: number
  count: number // total number of records, useful for pagination
  rows: any[]
  columns: string[]
  connectedColumns: { [column: string]: string }
  orderByColumns: string[]
  title: string // Title of the table: e.g. Users, Orders, etc.
  take: number
  orderBy: OrderByParam[]
  loading: boolean
  handleUpdateArgs: (newArg: QueryArgs) => void
  handlePerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  handleChangePage: (event: unknown, newPage: number) => void
  args: RequiredQueryArgs
  chipKeyNameMapping?: { [column: string]: string }
}

export const LuminaTable = ({
  rows,
  columns,
  connectedColumns,
  orderByColumns,
  title,
  take,
  handlePerPage,
  handleUpdateArgs,
  handleChangePage,
  orderBy,
  count,
  page,
  loading,
  args,
  chipKeyNameMapping,
}: Props) => {
  const [selected, setSelected] = useState<number[]>([])
  const [dense, setDense] = useState(false)

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  const isSelected = (id: number) => selected.indexOf(id) !== -1

  const emptyRows = take - (rows?.length || 0)
  const rowsPerPage = [5]
  if (count > 5) {
    rowsPerPage.push(10)
  }
  if (count > 10) {
    rowsPerPage.push(25)
  }
  if (count > 25) {
    rowsPerPage.push(100)
  }
  return (
    <Root className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar
          loading={loading}
          title={title}
          numSelected={selected.length}
          args={args}
          handleUpdateArgs={handleUpdateArgs}
          chipKeyNameMapping={chipKeyNameMapping}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <LuminaTableHead
              orderByColumns={orderByColumns}
              columns={columns}
              connectedColumns={connectedColumns}
              classes={classes}
              numSelected={selected.length}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              handleUpdateArgs={handleUpdateArgs}
              rowCount={take}
            />
            <TableBody>
              {loading || !rows ? (
                <SkeletonRows rowCount={take} cellCount={columns.length + 2} />
              ) : (
                rows.map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <ClickableTableRow
                      typeAndIdUrl={`${title.toLowerCase()}s/${row.id}`}
                      id={row.id}
                      isItemSelected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row.id}
                      </TableCell>
                      {columns.map((column) => {
                        return (
                          <LuminaTableCell
                            key={`${row.id}-${column.toString()}`}
                            column={column.toString()}
                            value={row[column]}
                            connectedColumns={connectedColumns}
                          />
                        )
                      })}
                    </ClickableTableRow>
                  )
                })
              )}
              {emptyRows > 0 &&
                !loading &&
                Array(emptyRows)
                  .fill(null)
                  .map((_, i) => (
                    <TableRow
                      style={{ height: dense ? 33 : 53 }}
                      key={`empty-${i}`}
                    >
                      <TableCell
                        colSpan={columns.length + 2}
                        key={`empty-cell-${i}`}
                      />
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPage}
          component="div"
          count={count || 0}
          rowsPerPage={take}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handlePerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Squash Rows"
      />
    </Root>
  )
}
