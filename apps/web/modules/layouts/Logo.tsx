import React, { FunctionComponent, useEffect, useState } from 'react'

import { styled } from '@mui/system'

import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import lumina from 'public/Color_Negative@3x.png'
import luminaIcon from 'public/LuminaIcon.png'
import luminaDark from 'public/Color_Positive.png'
import luminaDarkIcon from 'public/Color_Positive@2x.png'
import { useRouter } from 'next/router'

const PREFIX = 'Logo'

const classes = {
  logoDiv: `${PREFIX}-logoDiv`,
  logo: `${PREFIX}-logo`,
  wrap: `${PREFIX}-wrap`,
}

const Root = styled('a')(({ theme }) => ({
  [`& .${classes.logoDiv}`]: {
    [theme.breakpoints.up('md')]: {
      padding: '1rem',
      paddingLeft: '1.5rem',
      cursor: 'pointer',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '2.5rem',
      textAlign: 'center',
    },
  },

  [`& .${classes.logo}`]: {
    maxHeight: '2.5rem',
  },

  [`& .${classes.wrap}`]: {
    minWidth: '62.1px',
    minHeight: '78.3px',
  },
}))
interface Props {
  darkBackground?: boolean
}

export const Logo = ({ darkBackground }: Props) => {
  const [url, setUrl] = useState('/')

  const router = useRouter()
  const matchesSmallerScreen = useMediaQuery('(max-width:959px)')
  const { portal } = router.query

  useEffect(() => {
    if (portal) setUrl(`/${portal}`)
  }, [portal])

  const handleClick = () => router.push(url)

  const getSrc = () => {
    if (darkBackground)
      return matchesSmallerScreen ? luminaDark : luminaDarkIcon
    return matchesSmallerScreen ? luminaIcon : lumina
  }
  return (
    <Root onClick={handleClick}>
      <div className={classes.wrap}>
        <div className={classes.logoDiv}>
          <img src={getSrc()} alt="Lumina logo" className={classes.logo} />
        </div>
      </div>
    </Root>
  )
}
