import React, { FunctionComponent, useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { MainAppBar } from './MainAppBar'
import { ILayout } from './Types'
import { Box } from '@mui/material'
import { MainNavBar } from './MainNavBar'
import { Copyright } from './Copyright'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'

const PREFIX = 'Main'

const classes = {
  portalBody: `${PREFIX}-portalBody`,
  container: `${PREFIX}-container`,
  mainContainer: `${PREFIX}-mainContainer`,
  bodyPadding: `${PREFIX}-bodyPadding`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.portalBody}`]: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginTop: 18,
      borderRadius: '25px 0 0 0',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '-1.7rem',
      paddingTop: '1.7rem',
      borderRadius: '25px 0 0 0',
    },
  },

  [`& .${classes.container}`]: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },

  [`&.${classes.mainContainer}`]: {
    backgroundColor: '#ececec',
    minHeight: '100vh',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    cursor: 'default',
  },

  [`& .${classes.bodyPadding}`]: {
    padding: '1rem',
    [theme.breakpoints.up('sm')]: {
      padding: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      padding: '2.5rem',
    },
  },
}))

export const Main: FunctionComponent<ILayout> = ({ children }: ILayout) => {
  const router = useRouter()
  const matchesSmallerScreen = useMediaQuery('(max-width:959px)')
  const [orderPageColor, setOrderPageColor] = useState('white')

  useEffect(() => {
    if (
      router.pathname.split('/')[2] === 'orders' &&
      !router.query.id &&
      matchesSmallerScreen
    ) {
      setOrderPageColor('#ececec')
    } else {
      setOrderPageColor('white')
    }
  }, [router, matchesSmallerScreen])

  return (
    <Root className={classes.mainContainer}>
      <MainAppBar></MainAppBar>
      <div className={classes.container}>
        <MainNavBar />
        <div
          style={{ backgroundColor: orderPageColor }}
          className={classes.portalBody}
        >
          <div className={classes.bodyPadding}>
            {children}
            <Box mt={8}>
              <Copyright />
            </Box>
          </div>
        </div>
      </div>
    </Root>
  )
}
