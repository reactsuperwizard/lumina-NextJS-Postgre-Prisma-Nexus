import React from 'react'
import { Box, Grid } from '@mui/material'
import { Layer } from '@lumina/render/src/Script/Script'
import { LayerFields } from './LayerFields'

interface Props {
  global: string
  layer: Layer
  aeNames: boolean 
}

export const Global = ({ global, layer, aeNames }: Props) => {
  return (
    <Box key={global} width={1} py={1}>
      <Grid container item spacing={5} xs={12}>
        <LayerFields layerName={global} layer={layer} aeNames={aeNames} />
      </Grid>
    </Box>
  )
}
