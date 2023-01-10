import React from 'react'

import { styled } from '@mui/material/styles'

import { Render as RenderType } from '@lumina/api'

import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@mui/material'
import { RenderQueueRow } from './RenderQueueRow'

const PREFIX = 'RenderQueue'

const classes = {
  head: `${PREFIX}-head`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => {
  return {
    [`& .${classes.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  }
})

export const RenderQueue = ({ renders }: { renders: RenderType[] }) => {
  return (
    <Root>
      {renders.length > 0 ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>Script</TableCell>
              <TableCell className={classes.head}>Queued At</TableCell>
              <TableCell className={classes.head}>Updated At</TableCell>
              <TableCell className={classes.head}>Status</TableCell>
              <TableCell className={classes.head}>Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {new Array<any>()
              .concat(renders)
              .sort((a: RenderType, b: RenderType) =>
                a.updatedAt < b.updatedAt ? 1 : -1,
              )
              .map((r: any) => {
                return <RenderQueueRow key={r.id} render={r} />
              })}
          </TableBody>
        </Table>
      ) : null}
    </Root>
  )
}
