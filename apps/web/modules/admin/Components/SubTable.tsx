import React from 'react'
import { styled } from '@mui/system'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  createStyles,
} from '@mui/material'
import { useRouter } from 'next/router'
import { ConnectedTableRow } from './ConnectedTableRow'
import { RowData } from './RowData'

const PREFIX = 'StyledTableCell'

const classes = {
  head: `${PREFIX}-head`,
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  [`& .${classes.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}))

export const SubTable = ({
  columns,
  labels,
  values,
  connectedType,
  complete,
  nonclickableRow,
}: {
  columns: string[]
  labels?: string[]
  values: { [key: string]: any }[]
  connectedType: string
  complete?: boolean
  nonclickableRow?: boolean
}) => {
  const router = useRouter()
  return (
    <StyledTableContainer style={{ padding: complete ? '0' : '2rem' }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead key="table-head">
          <TableRow key="header-row">
            {columns.map((column, i) => (
              <TableCell
                key={column.toString() + i + '-header'}
                style={{ minWidth: 170 }}
                classes={{
                  head: classes.head,
                }}
              >
                {labels ? labels[i] : column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody key="table-body">
          {values[0] &&
            values.map((value: any, i: number) => {
              return nonclickableRow ? (
                <TableRow>
                  <RowData columns={columns} value={value}></RowData>
                </TableRow>
              ) : (
                <ConnectedTableRow
                  connectedType={connectedType}
                  value={value}
                  columns={columns}
                  id={i}
                  key={`row-${value.id || i}`}
                />
              )
            })}

          {values.length > 4 && !complete && (
            <TableRow key={`full-view-button-row`}>
              <TableCell
                colSpan={columns.length}
                key={`full-view-button-${connectedType}`}
              >
                <Button
                  fullWidth
                  onClick={() =>
                    router.push(`./${router.query.id}/${connectedType}`)
                  }
                >
                  View all
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}
