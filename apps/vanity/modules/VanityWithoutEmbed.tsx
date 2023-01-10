import React from 'react'

import { Box, styled } from '@mui/material'
import { Player } from '../../player/dist'
import Image from 'next/image'
import { Typography } from '@mui/material'
import { usePlausible } from './Plausible'

const PREFIX = 'VanityWithoutEmbed'

const classes = {
  fixedBackground: `${PREFIX}-fixedBackground`,
  gradientWrap: `${PREFIX}-gradientWrap`,
  videoMaxWrap: `${PREFIX}-videoMaxWrap`,
  videoAspectWrap: `${PREFIX}-videoAspectWrap`,
  buttonWrap: `${PREFIX}-buttonWrap`,
  applyNowButton: `${PREFIX}-applyNowButton`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.fixedBackground}`]: {
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    zIndex: -1,
  },
  [`& .${classes.gradientWrap}`]: {
    padding: 0,
    width: '100vw',
    minHeight: '100vh',
    background:
      'linear-gradient(0.25turn, rgba(0, 0, 0, 0.18) , rgba(0, 0, 0, 0.08) , rgba(0, 0, 0, 0.18)), linear-gradient(1turn, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.18) 10%,  transparent 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    cursor: 'default',
  },
  [`& .${classes.videoMaxWrap}`]: {
    display: 'block',
    width: '100%',
    maxWidth: '900px',
    flexBasis: '100%',
  },
  [`& .${classes.videoAspectWrap}`]: {
    width: '100%',
    backgroundColor: 'darkgrey',
  },
  [`& .${classes.buttonWrap}`]: {
    paddingTop: '3rem',
    width: '100%',
    flexBasis: '100%',
    textAlign: 'center',
  },
  [`& .${classes.applyNowButton}`]: {
    backgroundColor: '#10014E',
    color: 'white',
    height: '2.5rem',
    padding: '1rem',
    minWidth: '8rem',
    margin: 'auto',
    textAlign: 'center',
    borderRadius: '0.5rem',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1rem',
    cursor: 'pointer',
  },
}))

export const VanityWithoutEmbed = ({
  vimeoId,
  jobUrl,
  isValidHttpUrl,
  vanityButtonText,
}: {
  vimeoId: number
  jobUrl: string
  isValidHttpUrl: boolean
  vanityButtonText: string
}) => {
  const { applyNow } = usePlausible()
  const handleApplyNow = () => {
    applyNow({ props: { vimeoId: `${vimeoId}`, page: location.pathname } })
    window.open(jobUrl, '_blank')
  }

  return (
    <Root>
      <div className={classes.fixedBackground}>
        <Image
          alt="Background"
          src="/tile.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <Box className={classes.gradientWrap}>
        <Box id="video-max-wrap" className={classes.videoMaxWrap}>
          <Box id="video-aspect-wrap" className={classes.videoAspectWrap}>
            {vimeoId ? <Player responsive={true} vimeoId={vimeoId} /> : null}
          </Box>
        </Box>

        {isValidHttpUrl && (
          <Box className={classes.buttonWrap}>
            <div className={classes.applyNowButton} onClick={handleApplyNow}>
              <Typography
                style={{
                  letterSpacing: `${
                    vanityButtonText?.toLowerCase() === 'rsvp' ? '1.5px' : ''
                  }`,
                }}
              >
                {vanityButtonText.trim().length === 0
                  ? 'Apply now'
                  : vanityButtonText}
              </Typography>
            </div>
          </Box>
        )}
      </Box>
    </Root>
  )
}
