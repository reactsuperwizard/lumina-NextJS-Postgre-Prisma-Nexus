import React, { FunctionComponent, useEffect, useState } from 'react'
import { styled } from '@mui/system'
import { Paper, Tabs, Tab, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useTenant } from 'modules/hooks'
import useMediaQuery from '@mui/material/useMediaQuery'
import { UserList } from 'modules/portal/sidebar/UserList'
import { TabLabel } from './TabLabel'
import { InviteTeammatesButton } from 'modules/portal/components/InviteTeammatesButton'
import { InviteEmailType } from '@lumina/api'
const PREFIX = 'MainNavBar'

const classes = {
  float: `${PREFIX}-float`,
  menuContainer: `${PREFIX}-menuContainer`,
  menuTabs: `${PREFIX}-menuTabs`,
  indicator: `${PREFIX}-indicator`,
  flexContainer: `${PREFIX}-flexContainer`,
  spacerDiv: `${PREFIX}-spacerDiv`,
  tabFont: `${PREFIX}-tabFont`,
  hideTab: `${PREFIX}-hideTab`,
  noPadding: `${PREFIX}-noPadding`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.float}`]: {
    position: 'fixed',
    height: '100%',
    marginTop: '-8.5rem',
    top: '-18px',
  },

  [`& .${classes.menuContainer}`]: {
    backgroundColor: theme.palette.primary.dark,
    [theme.breakpoints.up('md')]: {
      borderRadius: '0px 25px 0px 0px',
      marginTop: 18,
      width: '226px',
      marginRight: 14,
      boxShadow: 'none',
      padding: '1rem 0rem',
      height: '100%',
    },
    [theme.breakpoints.down('md')]: {
      borderRadius: '0px 0px 20px 20px',
      maxHeight: '4rem',
      position: 'relative',
      zIndex: 1,
      padding: '1rem 0 1rem 0',
    },
  },

  [`& .${classes.menuTabs}`]: {
    color: 'white',
    padding: '11px 1rem 0 1.5rem',
    // paddingTop: '11px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '0',
      marginTop: '-1.5rem',
    },
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      textAlign: 'center',
    },
  },

  [`& .${classes.indicator}`]: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  [`& .${classes.hideTab}`]: {
    display: 'none',
  },

  [`& .${classes.flexContainer}`]: {
    justifyContent: 'space-evenly',
    alignItems: 'left',
  },

  [`& .${classes.spacerDiv}`]: {
    width: '226px',
    marginRight: 14,
  },

  [`& .${classes.tabFont}`]: {
    fontWeight: 500,
    color: 'white',
    opacity: 0.7,
    paddingLeft: 0,
  },

  [`& .Mui-selected`]: {
    color: 'white',
    fontWeight: 600,
    opacity: 1,
  },

  [`& .${classes.noPadding}`]: {
    padding: 0,
  },
}))

export const MainNavBar: FunctionComponent = () => {
  const { isLuminaAdmin } = useTenant()

  const matchesSmallerScreen = useMediaQuery('(max-width:959px)')
  const [value, setValue] = useState('videos')
  const [scrolling, setScrolling] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const router = useRouter()
  const query = router.query
  const tenant: string = query?.portal?.toString()
  const guidesExist = false

  useEffect(
    () => setValue(router.pathname.split('/')[2] || 'videos'),
    [router.pathname],
  )

  // Changes styling based on scroll event.
  useEffect(() => {
    function onScroll() {
      const currentPosition = window.pageYOffset
      if (currentPosition >= 116) {
        setScrolling(true)
      } else if (currentPosition < 114) {
        setScrolling(false)
      }
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollTop])

  const handleChange = (_: any, newValue: string) => {
    router.push(`/${tenant}/${newValue}`)
    setValue(newValue)
  }

  return (
    <Root>
      {!matchesSmallerScreen && (
        <div className={scrolling ? classes.spacerDiv : ''} />
      )}
      <Paper
        className={`${classes.menuContainer} ${
          scrolling && !matchesSmallerScreen ? classes.float : ''
        }`}
        style={
          scrolling
            ? {
                borderRadius: '0px',
              }
            : {}
        }
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          orientation={matchesSmallerScreen ? 'horizontal' : 'vertical'}
          classes={{
            indicator: classes.indicator,
            flexContainer: classes.flexContainer,
          }}
          TabIndicatorProps={{
            style: {
              marginBottom: '6px',
              height: 3,
              borderRadius: '20px',
            },
          }}
          className={classes.menuTabs}
          // className={`${classes.menuTabs} ${
          //   scrolling && !matchesSmallerScreen ? classes.noPadding : ''
          // }`}
        >
          <Tab
            className={classes.tabFont}
            onClick={() => router.push(`/${tenant}/videos`)}
            label={<TabLabel activeTab={value} value="videos" text="Videos" />}
            value="videos"
          />
          <Tab
            className={classes.tabFont}
            onClick={() => router.push(`/${tenant}/academy`)}
            label={
              <TabLabel activeTab={value} value="academy" text="Academy" />
            }
            value="academy"
          />

          <Tab
            className={isLuminaAdmin ? classes.tabFont : classes.hideTab}
            onClick={(event) => {
              event.stopPropagation()
              event.preventDefault()
              open(`${window.location.origin}/admin`, '_blank')
            }}
            label={
              <TabLabel
                activeTab={value}
                value="admin"
                text="Admin "
                onlySmallerScreen
              />
            }
            value="admin"
          />
          {guidesExist ? <Tab label="Guides" value="guides" /> : undefined}
        </Tabs>
        {/* Replace router.pathname with isUserScripter */}
        {!matchesSmallerScreen && !router.pathname.includes('scripting') && (
          <UserList />
        )}
        {!matchesSmallerScreen && (
          <Box m={'1rem 1.5rem'}>
            <InviteTeammatesButton
              inviteText="They'll get an email to join your team on Lumina"
              type={InviteEmailType.HomePage}
            />
          </Box>
        )}
      </Paper>
    </Root>
  )
}
