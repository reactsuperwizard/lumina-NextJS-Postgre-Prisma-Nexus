import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { Layers } from '@lumina/render/src/Script/Script'
import { LayerFields } from './LayerFields'

interface Props {
  slide: string[]
  i: number
  layers: Layers | undefined
  aeNames: boolean
}

export const Slide = ({ slide, i, layers, aeNames }: Props) => {
  return (
    <React.Fragment key={`slide-${i}`}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Slide {i + 1}</Typography>
      </Grid>

      {slide.map((s) => {
        const layer = layers![s]
        return (
          <Box width={1} key={s} py={1}>
            <Grid container item spacing={3} xs={12}>
              <LayerFields layerName={s} layer={layer} aeNames={aeNames} />
            </Grid>
          </Box>
        )
      })}
    </React.Fragment>
  )
}
