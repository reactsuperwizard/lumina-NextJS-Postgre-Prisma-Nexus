import React from 'react'

import { alpha } from '@mui/material/styles'
import { Pause, PlayArrow } from '@mui/icons-material'
import { IconButton, styled } from '@mui/material'

const PREFIX = 'PlayControl'

const classes = {
  root: `${PREFIX}-root`,
  playArrowBox: `${PREFIX}-playArrowBox`,
}
const greyCorner = alpha('#808080', 0.6)
const greyBody = alpha('#808080', 0.3)

const blackCorner = alpha('#000', 0.6)
const blackBody = alpha('#000', 0.3)
const Root = styled('div')({
  margin: '0 10px',
  borderRadius: '2px',
  width: '70px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [`& .${classes.root}`]: {
    color: '#fff',
    background: `linear-gradient(90deg, ${blackCorner}, ${blackBody})`,
    borderRadius: '2px',
    height: '100%',
    '&:hover': {
      color: 'black',
      background: `linear-gradient(90deg, ${greyCorner}, ${greyBody})`,
      opacity: 0.7,
    },
    transitionProperty: 'none',
  },
})

interface Props {
  playing: boolean
  doPause: () => void
  doPlay: () => void
}

export const PlayControl = ({ doPlay, doPause, playing }: Props) => {
  return (
    <Root>
      {playing ? (
        <IconButton
          disableRipple={true}
          className={classes.root}
          onClick={doPause}
          size="large"
        >
          <Pause style={{ fontSize: '30px' }} />
        </IconButton>
      ) : (
        <IconButton
          disableRipple={true}
          className={classes.root}
          onClick={doPlay}
          size="large"
        >
          <PlayArrow style={{ fontSize: '30px' }} />
        </IconButton>
      )}
    </Root>
  )
}
