/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Typography,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import { Render as RenderType } from '@lumina/api'

import { RenderQueue } from './RenderQueue'

interface Props {
  queue?: RenderType[]
  completed?: RenderType[]
  loading?: boolean
  loadingCompleted?: boolean
}

export const Render = ({
  queue,
  completed,
  loading,
  loadingCompleted,
}: Props) => {
  const [expanded, setExpanded] = useState(true)

  const handleClick = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <Accordion expanded={expanded} onClick={handleClick}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">Queued / Rendering</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {queue && queue.length > 0 && <RenderQueue renders={queue} />}
          {queue && queue.length === 0 && !loading && (
            <Typography component="div">Nothing at the moment.</Typography>
          )}
          {loading && <CircularProgress />}
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded} onClick={handleClick}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">Completed / Errored</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {completed && completed.length > 0 && (
            <RenderQueue renders={completed} />
          )}
          {completed && completed.length === 0 && !loadingCompleted && (
            <Typography component="div">No renders just yet.</Typography>
          )}
          {loadingCompleted && <CircularProgress />}
        </AccordionDetails>
      </Accordion>
    </>
  )
}
