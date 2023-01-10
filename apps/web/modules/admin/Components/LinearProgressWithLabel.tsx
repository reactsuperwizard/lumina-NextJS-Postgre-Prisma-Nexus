/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const LinearProgressWithLabel = ({
  value,
  valueBuffer = 10,
}: LinearProgressProps) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress
          variant="buffer"
          value={value}
          valueBuffer={valueBuffer}
        />
      </Box>
      <Box minWidth={35}>
        {value ? (
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            value,
          )}%`}</Typography>
        ) : null}
      </Box>
    </Box>
  )
}
