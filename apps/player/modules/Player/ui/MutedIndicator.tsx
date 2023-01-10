import React from 'react'
import { Fade } from '@mui/material'
import { VolumeOff } from '@mui/icons-material'

interface Props {
  toolbarShowing: boolean
  started: boolean
  volume: number // between 0 and 1
  background: string
}

// Indicates that volume is off in video, when toolbar is not showing so user knows to turn volume on
export const MutedIndicator = ({
  toolbarShowing,
  volume,
  started,
  background,
}: Props) => {
  return (
    <Fade
      in={!toolbarShowing && volume === 0 && started}
      timeout={{ enter: 300, exit: 0 }}
      mountOnEnter
      unmountOnExit
    >
      <div
        style={{
          position: 'absolute',
          right: '5px',
          bottom: '5px',
          borderRadius: '0 0 0 2px',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background,
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <VolumeOff
          style={{
            fontSize: '30px',
          }}
        />
      </div>
    </Fade>
  )
}
