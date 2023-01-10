import React, { useState } from 'react'

import { LinearProgress } from '@mui/material'
import { alpha } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

import VimeoPlayer from 'react-player/vimeo'
import { isMouseEvent, isTouchEvent } from '../utils'

const useStyles = makeStyles({
  progressBarContainer: {
    margin: '0 10px',
    width: '100%',
    cursor: 'hand',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '3px',
  },
  progressBar: {
    borderRadius: '2px',
    height: '25px',
    '& .MuiLinearProgress-bar1Buffer': {
      transition: 'transform 0.02s linear',
      backgroundColor: alpha('#fff', 0.9),
    },
    '& .MuiLinearProgress-bar2Buffer': {
      backgroundColor: alpha('#fff', 0.2),
    },
    '& .MuiLinearProgress-dashedColorPrimary': {
      backgroundImage: 'none',
    },
  },
})

interface Props {
  background: string
  progress: number // 0-1
  buffer: number // 0-1
  doShowToolbar: () => void
  seekTo: VimeoPlayer['seekTo']
  playing: boolean
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  setProgress: React.Dispatch<React.SetStateAction<number>>
}

export const ProgressBar = ({
  playing,
  progress,
  buffer,
  background,
  seekTo,
  setPlaying,
  setProgress,
}: Props) => {
  const classes = useStyles()
  const [seeking, setSeeking] = useState(false)
  const [playingTimeout, setPlayingTimeout] = useState<null | NodeJS.Timeout>(
    null,
  )

  const onSeekStart = (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
  ) => {
    // prevent event propogating to onClick interactions above
    event.stopPropagation()
    setSeeking(true)
    onSeekInteraction(event)
  }

  // seek interaction on
  const onSeekInteraction = (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (playingTimeout) {
      clearTimeout(playingTimeout)
    }
    const currentTarget = event.currentTarget
    const boundingRect = currentTarget.getBoundingClientRect()
    let location
    if (isMouseEvent(event)) {
      location = event.clientX - boundingRect.x
    }
    if (isTouchEvent(event)) {
      location = event.touches[0].clientX - boundingRect.x
    }
    if (location) {
      const _seekTo = Math.max(0, Math.min(location / boundingRect.width, 1))
      // if the video was playing stop in temporarily
      if (playing) {
        setPlaying(false)
        const timer = setTimeout(() => {
          setPlaying(true)
        }, 100)
        setPlayingTimeout(timer)
      }

      setProgress(_seekTo * 100)
      seekTo(_seekTo)
    }
  }

  const onSeekEnd = (
    _event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
  ) => {
    setSeeking(false)
  }

  const cancelEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
  }

  return (
    <div
      onClick={cancelEvent}
      className={classes.progressBarContainer}
      onMouseDown={onSeekStart}
      onMouseMove={seeking ? onSeekInteraction : undefined}
      onMouseUp={onSeekEnd}
      onTouchStart={onSeekStart}
      onTouchMove={onSeekInteraction}
    >
      <LinearProgress
        variant="buffer"
        value={progress}
        valueBuffer={buffer}
        className={classes.progressBar}
        style={{ background }}
      />
    </div>
  )
}
