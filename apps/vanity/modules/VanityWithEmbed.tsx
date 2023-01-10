import React, { useState, useEffect } from 'react'

import { Box, styled } from '@mui/material'
import { CloseButton } from '../modules/CloseButton'
import { VideoBox } from '../modules/VideoBox'
import { Player } from '../../player/dist'

const PREFIX = 'VanityWithEmbed'

const classes = {
  iframe: `${PREFIX}-iframe`,
  nameBox: `${PREFIX}-nameBox`,
  timerBox: `${PREFIX}-timerBox`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.iframe}`]: {
    width: '100%',
    minHeight: `30vh`,
    background: 'white',
    border: 'none',
  },
  [`& .${classes.nameBox}`]: {
    textAlign: 'center',
    padding: '2rem 2rem',
  },
  [`& .${classes.timerBox}`]: {
    padding: 0,
    width: '100vw',
  },
}))

export const VanityWithEmbed = ({
  vimeoId,
  jobUrl,
  isValidHttpUrl,
  name,
}: {
  vimeoId: number
  jobUrl: string
  isValidHttpUrl: boolean
  name?: string
}) => {
  const [vidDiv, setVidDiv] = useState<HTMLElement | null>(null)
  const [postingDiv, setPostingDiv] = useState<HTMLIFrameElement | null>(null)
  const [open, setOpen] = useState(true)
  const [hideClose, setHideClose] = useState(false)
  const [hideCloseTimer, setHideCloseTimer] = useState<NodeJS.Timeout | null>(
    null,
  )

  useEffect(() => {
    setDivElements()
  }, [])

  useEffect(() => {
    resetTimer()
    return () => {
      if (hideCloseTimer) clearTimeout(hideCloseTimer)
    }
  }, [])

  const setDivElements = async () => {
    const _vidDiv = await document.getElementById('video')
    const _postingDiv = (await document.getElementById(
      'posting',
    )) as HTMLIFrameElement
    setVidDiv(_vidDiv)
    setPostingDiv(_postingDiv)
  }

  useEffect(() => {
    if (postingDiv) {
      postingDiv.style.height = `${
        window.innerHeight - (vidDiv?.offsetHeight || 0) - 18
      }px`
    }
  }, [vidDiv, postingDiv, open])

  const resetTimer = () => {
    if (hideClose) setHideClose(false)
    if (hideCloseTimer) clearTimeout(hideCloseTimer)
    setHideCloseTimer(
      setTimeout(() => {
        if (open) setHideClose(true)
      }, 3000),
    )
  }

  return (
    <StyledBox
      className={classes.timerBox}
      onMouseMove={resetTimer}
      onMouseOver={resetTimer}
      onMouseOut={resetTimer}
    >
      <CloseButton
        open={open}
        show={!hideClose}
        toggle={() => setOpen(!open)}
      />
      <VideoBox open={open}>
        <div
          style={{
            backgroundColor: 'darkgrey',
          }}
        >
          {vimeoId ? <Player responsive={true} vimeoId={vimeoId} /> : null}
        </div>
      </VideoBox>
      <Box style={{ overflowY: 'auto' }}>
        {jobUrl && isValidHttpUrl ? (
          <iframe className={classes.iframe} src={jobUrl} id="posting" />
        ) : (
          <Box className={classes.nameBox}>
            <h1>{name}</h1>
          </Box>
        )}
      </Box>
    </StyledBox>
  )
}
