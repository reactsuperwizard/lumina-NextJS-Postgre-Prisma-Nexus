import React from 'react'

import { useMediaQuery, styled } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const PREFIX = 'PoweredBy'

const classes = {
  phoneWrap: `${PREFIX}-phoneWrap`,
  mainWrap: `${PREFIX}-mainWrap`,
  logoImage: `${PREFIX}-logoImage`,
  mobileLogoImage: `${PREFIX}-mobileLogoImage`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.phoneWrap}`]: {
    position: 'relative',
    height: '100%',
    width: '30px',
    margin: '0 7px',
    padding: '5px 0',
    transition: 'margin 0.2s, width 0.2s',
    '&:hover': {
      margin: '-2px 5px',
      width: '26px',
    },
  },
  [`& .${classes.mainWrap}`]: {
    position: 'relative',
    height: '28px',
    width: '88px',
    padding: '5px 6px',
    transition: 'height 0.2s, width 0.2s, margin 0.2s',
    '&:hover': {
      padding: '5px 5px',
      margin: '-2px',
      height: '32px',
      width: '92px',
    },
  },
  [`& .${classes.logoImage}`]: {
    position: 'relative',
    padding: '0px',
    display: 'block',
    width: '100%',
    height: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  [`& .${classes.mobileLogoImage}`]: {
    position: 'relative',
    padding: '0px',
    display: 'block',
    width: '80%',
  },
}))

export const PoweredBy = ({
  logoSrc,
  iconSrc,
  href,
}: {
  logoSrc: string // path to image file for logo
  iconSrc: string // path to image file for icon
  href: string // redirect when logo is clicked
}) => {
  const theme = useTheme()
  const isPhone = useMediaQuery(theme.breakpoints.down('md'))
  // make sure that video doesn't start playing after someone clicks powered by logo
  const cancelEvents = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation()
  }

  return (
    <Root>
      {isPhone ? (
        <div onClick={cancelEvents} className={classes.phoneWrap}>
          <a
            href={href}
            // eslint-disable-next-line react/jsx-no-target-blank
            target="_blank"
          >
            <img
              // objectFit="contain"
              src={iconSrc}
              // layout="fill"
              alt="Powered By Lumina"
              className={classes.mobileLogoImage}
            />
          </a>
        </div>
      ) : (
        <div onClick={cancelEvents} className={classes.mainWrap}>
          <a
            href={href}
            // eslint-disable-next-line react/jsx-no-target-blank
            target="_blank"
          >
            <img
              src={logoSrc}
              alt="Powered By Lumina"
              className={classes.logoImage}
            />
          </a>
        </div>
      )}
    </Root>
  )
}
