import React from 'react'
import { TableCell, TableRow } from '@mui/material'

import { toDateTimeString } from 'modules/admin/utils'

import { RenderingCompletion } from './RenderingCompletion'

import { Render } from '@lumina/api'
import { ConnectedChip } from 'modules/admin/Components'

export const RenderQueueRow = ({ render }: { render: Render }) => {
  return (
    <TableRow key={render.id}>
      <TableCell component="th" scope="row">
        <ConnectedChip id={render.script.id} resourceName="script" />
      </TableCell>
      <TableCell component="th" scope="row">
        {toDateTimeString(render.queuedAt)}
      </TableCell>
      <TableCell component="th" scope="row">
        {toDateTimeString(render.updatedAt)}
      </TableCell>
      <TableCell component="th" scope="row">
        {render.status.toUpperCase()}
      </TableCell>
      <TableCell component="th" scope="row">
        <RenderingCompletion render={render} />
      </TableCell>
    </TableRow>
  )
}
