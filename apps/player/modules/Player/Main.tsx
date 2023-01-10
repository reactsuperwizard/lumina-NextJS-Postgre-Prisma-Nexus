import React, { useState, useRef, useEffect } from 'react'

import ReactPlayer from 'react-player/vimeo'

import { CircularProgress, Fade, styled } from '@mui/material'
import { alpha } from '@mui/material/styles'

import { StartButton } from './ui/StartButton'
import { MutedIndicator } from './ui/MutedIndicator'

import { useEvents, Events, VideoEventParams } from './events'

import {
  PoweredBy,
  VolumeControl,
  ProgressBar,
  Fullscreen,
  PlayControl,
} from './toolbar'

import { isMobile } from './utils'

const blackCorner = alpha('#000', 0.6)
const blackBody = alpha('#000', 0.3)
const transparentBlackBackground = `linear-gradient(90deg, ${blackCorner}, ${blackBody})`

const rightControlsBlackCorner = alpha('#000', 0.7)
const rightControlsBlackBody = alpha('#000', 0.1)
const rightControlsBackground = `linear-gradient(42deg, ${rightControlsBlackCorner}, ${rightControlsBlackBody} 80%)`

const PREFIX = 'Main'

const classes = {
  root: `${PREFIX}-root`,
  playerWrapper: `${PREFIX}-playerWrapper`,
  show: `${PREFIX}-show`,
  bufferIndication: `${PREFIX}-bufferIndication`,
  playerEventTarget: `${PREFIX}-playerEventTarget`,
  toolbarContainer: `${PREFIX}-toolbarContainer`,
  toolbar: `${PREFIX}-toolbar`,
  button: `${PREFIX}-button`,
  rightControls: `${PREFIX}-rightControls`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`& .${classes.playerWrapper}`]: {
    height: '100%',
    width: '100%',
    maxWidth: 'calc(177.778vh)',
    maxHeight: 'calc(56.25vw)',
    position: 'absolute',
    top: 0,
    opacity: '0',
    transition: 'opacity 0.1s',
  },
  [`& .${classes.show}`]: {
    opacity: '1',
  },
  [`& .${classes.bufferIndication}`]: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'grey',
  },
  [`& .${classes.playerEventTarget}`]: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  [`& .${classes.toolbarContainer}`]: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '5px',
  },
  [`& .${classes.toolbar}`]: {
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    padding: '5px',
  },
  [`& .${classes.button}`]: {
    color: '#fff',
  },
  [`& .${classes.rightControls}`]: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 5px',
    height: '100%',
    background: rightControlsBackground,
  },
}))

interface Props {
  vimeoId: number
  autoplay?: boolean
  poweredBy?: {
    href: string // redirect on logo click
    logoSrc: string // source of logo file to display
    iconSrc: string // source of icon file to display
  }
  previewOnly?: boolean // useful for only showing vimeo thumbnail
  onClick?: () => void // can be used to override the behavior of the player -- e.g. onClick={goToAnotherPage}
  responsive?: boolean // set the player to be responsive to boudning divs
  getEmbedCode?: (embedCode: string) => void // an object that will receive the embed code for the current player
  events?: Events
  getCurrentTime?: (currentTime: number) => void
}

export const Main = ({
  responsive,
  autoplay = false,
  vimeoId,
  poweredBy = {
    logoSrc: '/Negative@3x.png',
    iconSrc: '/Negative@3xIcon.png',
    href: 'https://www.lumina.co',
  },
  onClick: onClickOverride,
  previewOnly,
  getEmbedCode,
  events,
  getCurrentTime,
}: Props) => {
  const playerWrapper = useRef<null | HTMLDivElement>(null)

  const [reactPlayer, setReactPlayer] = useState<null | ReactPlayer>(null)

  const [staticEventParams, setStaticEventParams] = useState<null | Pick<
    VideoEventParams,
    'videoUrl' | 'videoProvider' | 'videoDuration' | 'videoTitle'
  >>(null)
  // abstrated analytics hook so that event analytics can easily be different things in different places down the road
  // that will still hook into the player events in the proper way
  const _events = useEvents(events)

  useEffect(() => {
    if (getEmbedCode) {
      getEmbedCode(
        `<iframe title="lumina-player" src="https://p.lmna.io/${vimeoId}" frameborder="0" allowfullscreen></iframe>`,
      )
    }
  }, [])

  // useful for style an interactions based on the user clicking the entire target area
  // true if the mouse is over the player target area
  const [active, setActive] = useState(false)

  // player started for the first time
  const [started, setStarted] = useState(autoplay)
  // playing, or !playing is "paused"
  const [playing, setPlaying] = useState(autoplay)
  // progress of playing the video
  const [progress, setProgress] = useState(0)
  // amount of video loaded
  const [buffer, setBuffer] = useState(0)
  // number between 0 and 1
  const [volume, setVolume] = useState(autoplay ? 0 : 0.5)
  // save the volume of the player BEFORE a user clicks the mute button
  // so that if they unclick it, it doesn't go to 0
  const [savedVolume, setSavedVolume] = useState<null | number>(
    autoplay ? 0.5 : null,
  )

  // is the toolbar showing?
  const [showToolbar, setShowToolbar] = useState(false)

  // is the video buffering?
  const [buffering, setBuffering] = useState(false)

  const [loaded, setLoaded] = useState(false)
  // manage the hide toolbar timeout event so it can be canceled if need be
  const [hideToolBarTimeout, setHideToolBarTimeout] =
    useState<null | NodeJS.Timeout>(null)

  const handleOnReady = async () => {
    if (!reactPlayer) {
      console.warn('React Player was not set to state before ready state.')
      return
    }
    const vimeoPlayer = reactPlayer?.getInternalPlayer()

    if (!vimeoPlayer) {
      console.error('Vimeo player cannot be found from reactPlayer.')
      return
    }
    // on mobile, give volume a 1 since volume is controlled by the device natively
    // get the default volume of the vimeo player
    // or give it a good ol 50% for the user to ensure they hear us
    if (isMobile()) {
      autoplay ? setVolume(0) : setVolume(1)
    } else {
      autoplay ? setVolume(0) : setVolume(0.5)
    }

    const videoTitle: string = await vimeoPlayer?.getVideoTitle()
    const videoUrl: string = `${vimeoId}`
    const videoDuration: number = await vimeoPlayer?.getDuration()
    const videoProvider = 'vimeo'
    const _staticEventParams = {
      videoTitle,
      videoUrl,
      videoProvider,
      videoDuration,
    }
    setStaticEventParams(_staticEventParams)

    _events.onLoad(_staticEventParams)
    setLoaded(true)
  }

  // player event listeners
  // progress has changed!
  const handleOnProgress = ({
    playedSeconds,
    played,
    loaded,
  }: {
    playedSeconds: number
    played: number
    loaded: number
    loadedSeconds: number
  }) => {
    // skip initial load of progress
    if (playedSeconds === 0) return
    // only let react-player handle progress if the vid is playing
    if (!playing) return
    const _progress = played * 100
    setProgress(_progress)
    if (getCurrentTime) getCurrentTime(playedSeconds)
    setBuffer(loaded * 100)
    _events.onProgress({ ...staticEventParams!, progress: _progress })
  }
  // video is over!
  const handleOnEnded = () => {
    reactPlayer?.seekTo(0)
    setBuffering(false)
    doShowToolbar()
  }

  // for mobile, where device controls player - make sure our UI matches
  const handleOnPlay = () => {
    if (playing) {
      setBuffering(false)
      return
    }
    setPlaying(true)
  }
  // for mobile, where device controls player - make sure our UI matches
  const handleOnPause = () => {
    if (!playing) return
    setPlaying(false)
  }
  // end player event listeners

  // Things that manage how it works
  const doStart = async () => {
    setPlaying(true)
    setStarted(true)
    _events.onStart({ ...staticEventParams!, videoCurrentTime: 0 })
  }

  const doPlay = () => {
    if (!started) setStarted(true)
    if (!buffering) setBuffering(true)
    setPlaying(true)
  }

  const doPause = () => {
    setBuffering(false)
    setPlaying(false)
  }

  const doAdjustVolume = (value: number) => {
    const _volume = (value as number) / 100
    setVolume(_volume)
  }

  // mute the volume of the video and store the current volume for unmuting
  const doToggleVolume = () => {
    if (volume === 0 && savedVolume) {
      setVolume(savedVolume)
      return
    }
    if (volume > 0) {
      setSavedVolume(volume)
      setVolume(0)
      return
    }
    if (process.env.NODE_ENV === 'development') {
      console.error('Volume is not being handled properly.')
    }
  }

  // remove toolbar after 2.5 seconds on all interactions where it is shown
  const doShowToolbar = () => {
    if (hideToolBarTimeout) {
      clearTimeout(hideToolBarTimeout)
    }
    const timer = setTimeout(() => {
      doHideToolbar()
    }, 2500)
    setHideToolBarTimeout(timer)
    setShowToolbar(true)
  }

  const doHideToolbar = () => setShowToolbar(false)

  // end Things that manage how it works

  // top level interactions applied to entire player area
  const onMove = (
    _event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!started) return
    doShowToolbar()
  }

  const onOver = (
    _event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
  ) => {
    document.body.style.cursor = 'pointer'
    if (!active) setActive(true)
  }

  const onOut = (
    _event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!active) return
    setActive(false)
  }

  const onClick = () => {
    if (!started) {
      doStart()
    }
    if (playing) {
      doPause()
      doShowToolbar()
    }
    if (!playing) {
      doPlay()
    }
  }
  // end top level interactions applied to entire player area
  if (!vimeoId) {
    return null
  }

  return (
    <Root
      className={classes.root}
      style={
        responsive
          ? {
              padding: '56.25% 0 0 0',
              position: 'relative',
            }
          : undefined
      }
      tabIndex={0}
    >
      <div
        onClickCapture={onClickOverride}
        ref={playerWrapper}
        className={`${classes.playerWrapper} ${loaded ? classes.show : ''}`}
      >
        {buffering && (
          <div className={classes.bufferIndication}>
            <CircularProgress style={{ color: 'grey' }} size={70} />
          </div>
        )}
        <ReactPlayer
          light={previewOnly && !started}
          playIcon={
            <StartButton
              started={started}
              onClick={doStart} // doesn't do anything, use onClickPreview
            />
          }
          ref={(_reactPlayer) => setReactPlayer(_reactPlayer)}
          volume={volume}
          progressInterval={50}
          onBuffer={() => {
            setBuffering(true)
          }}
          onReady={handleOnReady}
          onProgress={handleOnProgress}
          onEnded={handleOnEnded}
          onPause={handleOnPause}
          onPlay={handleOnPlay}
          playing={playing}
          controls={false}
          height="100%"
          width="100%"
          url={`https://vimeo.com/${vimeoId}`}
        />
        <div
          className={classes.playerEventTarget}
          onClick={onClick}
          onMouseOver={onOver}
          onMouseMove={onMove}
          onMouseOut={onOut}
          onTouchStart={onMove}
          onTouchMove={onMove}
        >
          <div className={classes.toolbarContainer}>
            <Fade in={showToolbar} timeout={300}>
              <div className={classes.toolbar}>
                <PlayControl
                  doPause={doPause}
                  doPlay={doPlay}
                  playing={playing}
                />
                <ProgressBar
                  doShowToolbar={doShowToolbar}
                  background={transparentBlackBackground}
                  progress={progress}
                  buffer={buffer}
                  playing={playing}
                  setPlaying={setPlaying}
                  setProgress={setProgress}
                  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                  seekTo={reactPlayer?.seekTo!}
                />
                <div className={classes.rightControls}>
                  <VolumeControl
                    volume={volume}
                    doShowToolbar={doShowToolbar}
                    doAdjustVolume={doAdjustVolume}
                    doToggleVolume={doToggleVolume}
                  />
                  <Fullscreen playerWrapper={playerWrapper.current} />
                  {poweredBy && <PoweredBy {...poweredBy} />}
                </div>
              </div>
            </Fade>
            <MutedIndicator
              background={transparentBlackBackground}
              started={started}
              volume={volume}
              toolbarShowing={showToolbar}
            />
          </div>
        </div>

        <StartButton started={started} onClick={doStart} />
      </div>
    </Root>
  )
}
