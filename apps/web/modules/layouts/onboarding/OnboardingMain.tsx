import React, { FunctionComponent, useEffect, useState } from 'react'
import { ILayout } from '../Types'
import CssBaseline from '@mui/material/CssBaseline'
import { Box, Link, useMediaQuery, styled, useTheme } from '@mui/material'
import { Logo } from '../Logo'
import { useAuth0 } from 'modules/hooks'

const PREFIX = 'OnboardingMain'

const classes = {
  root: `${PREFIX}-root`,
  bg: `${PREFIX}-bg`,
  content: `${PREFIX}-content`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
  },

  [`& .${classes.bg}`]: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '1.75rem',
      zIndex: '10',
    },
  },

  [`& .${classes.content}`]: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#F0EFEF',
  },
}))

export const OnboardingMain: FunctionComponent<ILayout> = ({
  children,
}: ILayout) => {
  const auth0User = useAuth0()
  const [showLogin, setShowLogin] = useState(true)
  const theme = useTheme()
  const isPhone = useMediaQuery(theme.breakpoints.down('md'))
  useEffect(() => {
    if (auth0User.user) {
      setShowLogin(false)
    }
  }, [auth0User])
  return (
    <Root className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Box className={classes.bg}>
          <Logo darkBackground={true} />
          {showLogin && !isPhone && (
            <Link
              color="#FFFFFF"
              href="/signin"
              underline="none"
              fontSize="1.25rem"
            >
              Login
            </Link>
          )}
        </Box>
        <div>{children}</div>
      </main>
    </Root>
  )
}
