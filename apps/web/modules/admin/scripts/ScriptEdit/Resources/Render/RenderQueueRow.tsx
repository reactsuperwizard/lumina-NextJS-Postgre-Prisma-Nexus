import React from 'react'
import { TableCell, TableRow } from '@mui/material'

import { toDateTimeString } from 'modules/admin/utils'

import { RenderingCompletion } from './RenderingCompletion'

import { Render } from '@lumina/api'

export const RenderQueueRow = ({ render }: { render: Render }) => {
  return (
    <TableRow key={render.id}>
      <TableCell component="th" scope="row">
        {toDateTimeString(render.queuedAt)}
      </TableCell>
      <TableCell component="th" scope="row">
        {toDateTimeString(render.updatedAt)}
      </TableCell>
      <TableCell component="th" scope="row">
        {`Render status: ${render.status}`}
      </TableCell>
      <TableCell component="th" scope="row">
        <RenderingCompletion render={render} />
      </TableCell>
    </TableRow>
  )
}
