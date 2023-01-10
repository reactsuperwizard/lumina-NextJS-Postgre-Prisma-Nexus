import React, { useEffect, useState } from 'react'

import screenfull from 'screenfull'

import { IconButton, styled } from '@mui/material'

import {
  Fullscreen as FullscreenIcon,
  FullscreenExit,
} from '@mui/icons-material'

const PREFIX = 'FullScreen'

const classes = {
  button: `${PREFIX}-button`,
  fullScreenBox: `${PREFIX}-fullScreenBox`,
  fullScreen: `${PREFIX}-fullScreen`,
  fullScreenIcon: `${PREFIX}-fullScreenIcon`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.button}`]: {
    color: '#fff',
  },

  [`& .${classes.fullScreenBox}`]: {
    width: '40px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  [`& .${classes.fullScreen}`]: {
    textAlign: 'center',
    '&:hover, .MuiIconButton-root': {
      backgroundColor: 'transparent',
    },
  },

  [`& .${classes.fullScreenIcon}`]: {
    transition: 'font-size 0.2s',
    fontSize: '30px',
    '&:hover': { fontSize: '35px' },
  },
}))


interface Props {
  playerWrapper: HTMLDivElement | null
}

export const Fullscreen = ({ playerWrapper }: Props) => {

  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    if (screenfull.isEnabled) {
      const callback = () => {
        if (screenfull.isEnabled && screenfull.isFullscreen) {
          setFullscreen(true)
          return
        }
        setFullscreen(false)
      }
      screenfull.on('change', callback)
      return () => {
        if (screenfull.isEnabled) {
          screenfull.off('change', callback)
        }
      }
    }
  }, [screenfull.isEnabled])

  const doFullScreen = async () => {
    if (!fullscreen && screenfull.isEnabled && playerWrapper) {
      await screenfull.request(playerWrapper)
    }
  }

  const doRegularScreen = async () => {
    if (fullscreen && screenfull.isEnabled) {
      await screenfull.exit()
      setFullscreen(false)
    }
  }
  const cancelEvents = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation()
  }
  return (
    <Root className={classes.fullScreen} onClick={cancelEvents}>
      <div className={classes.fullScreenBox}>
        {fullscreen ? (
          <IconButton
            disableRipple={true}
            onClick={doRegularScreen}
            className={classes.button}
            size="large">
            <FullscreenExit className={classes.fullScreenIcon} />
          </IconButton>
        ) : (
          <IconButton
            disableRipple={true}
            onClick={doFullScreen}
            className={classes.button}
            size="large">
            <FullscreenIcon className={classes.fullScreenIcon} />
          </IconButton>
        )}
      </div>
    </Root>
  );
}
