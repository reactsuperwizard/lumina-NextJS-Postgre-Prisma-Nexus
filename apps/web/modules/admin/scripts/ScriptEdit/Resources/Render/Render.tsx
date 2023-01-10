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
  renders?: RenderType[]
  loading?: boolean
}

export const Render = ({ renders, loading }: Props) => {
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
          <Typography variant="h5">Renders</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renders && renders.length > 0 && <RenderQueue renders={renders} />}
          {renders && renders.length === 0 && !loading && (
            <Typography component="div">No renders just yet.</Typography>
          )}
          {loading && <CircularProgress />}
        </AccordionDetails>
      </Accordion>
    </>
  )
}
