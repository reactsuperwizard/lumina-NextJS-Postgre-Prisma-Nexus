import React, { useState } from 'react'

import { Fade, IconButton, Slider, styled } from '@mui/material'

import { alpha } from '@mui/material/styles';

import { VolumeOff, VolumeUp } from '@mui/icons-material'

const PREFIX = 'VolumeControl'

const classes = {
  button: `${PREFIX}-button`,
  volumeBox: `${PREFIX}-volumeBox`,
  sliderContainer: `${PREFIX}-sliderContainer`,
  sliderWrapper: `${PREFIX}-sliderWrapper`,
  slider: `${PREFIX}-slider`,
}

const StyledSlider = styled(Slider)({
    color: alpha('#1b1d1d', 0.8),
    width: 8,
    '& .MuiSlider-thumb': {
      color: alpha('#242424', 0.9),
      width: 22,
      height: 8,
      borderRadius: '20%',
    },
    '& .MuiSlider-track': {
      width: 4,
      borderRadius: 4,
    },
    '& .MuiSlider-rail': {
      width: 4,
      borderRadius: 4,
    },
})

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.button}`]: {
    color: '#fff',
  },
  [`& .${classes.volumeBox}`]: {
    height: '100%',
    borderRadius: '0 0 0 2px',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '000',
    textAlign: 'center',
    color: '#fff',
    '&:hover, .MuiIconButton-root': {
      backgroundColor: 'transparent',
    },
  },
  [`& .${classes.sliderContainer}`]: {
    position: 'relative',
  },
  [`& .${classes.sliderWrapper}`]: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 10,
    position: 'absolute',
    height: 100,
    bottom: 10,
    width: '40px',
    textAlign: 'center',
  },

}))


interface Props {
  doShowToolbar: () => void
  doAdjustVolume: (value: number) => void
  doToggleVolume: () => void
  volume: number
}

export const VolumeControl = ({
  doAdjustVolume,
  doToggleVolume,
  doShowToolbar,
  volume,
}: Props) => {

  const [showSlider, setShowSlider] = useState(false)
  const [sliderTimeout, setSliderTimeout] = useState<null | NodeJS.Timeout>(
    null,
  )

  const doShowSlider = () => {
    setShowSlider(true)
    if (sliderTimeout) {
      clearTimeout(sliderTimeout)
      setSliderTimeout(null)
    }
  }

  const doHideSlider = () => {
    const timer = setTimeout(() => {
      setShowSlider(false)
    }, 1000)
    setSliderTimeout(timer)
  }

  const handleOnClick = () => {
    doToggleVolume()
    doShowToolbar()
    setShowSlider(true)
  }

  const handleAdjustSlider = (
    // eslint-disable-next-line @typescript-eslint/ban-types
    event: React.ChangeEvent<{}>,
    value: number | number[],
  ) => {
    event.preventDefault()
    doAdjustVolume(value as number)
    doShowToolbar()
  }

  const cancelEvents = (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation()
  }

  return (
    <Root onClick={cancelEvents}>
      <div style={{ height: '100%' }}>
        <Fade in={showSlider}>
          <div className={classes.sliderContainer}>
            <div className={classes.sliderWrapper}>
              <StyledSlider
                onMouseMove={doShowSlider}
                onMouseLeave={doHideSlider}
                className={classes.slider}
                value={volume * 100}
                onChange={() => handleAdjustSlider}
                onChangeCommitted={doHideSlider}
                orientation="vertical"
              />
            </div>
          </div>
        </Fade>
      </div>
      <div className={classes.volumeBox}>
        <IconButton
          className={classes.button}
          onMouseEnter={doShowSlider}
          onMouseLeave={doHideSlider}
          onClick={handleOnClick}
          disableRipple={true}
          size="large">
          {volume === 0 ? (
            <VolumeOff style={{ fontSize: '30px' }} />
          ) : (
            <VolumeUp style={{ fontSize: '30px' }} />
          )}
        </IconButton>
      </div>
    </Root>
  );
}
