import { Table, TableCell, TableRow } from '@mui/material'
import { Skeleton } from '@mui/material';
import React from 'react'

interface ISkeletonRow {
  rowCount: number
  cellCount: number
}

export const SkeletonRows = ({
  rowCount,
  cellCount,
}: ISkeletonRow): JSX.Element => {
  const makeCountArray = (count: number): Array<number> => {
    const countArray: Array<number> = []
    for (let i = 0; i < count; i++) countArray.push(i)
    return countArray
  }

  return (
    <>
      {makeCountArray(rowCount).map((r) => (
        <TableRow key={`skeletonRow${r}`}>
          {makeCountArray(cellCount).map((c) => (
            <TableCell key={`skeletonCell${r}${c}`}>
              <Skeleton />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
