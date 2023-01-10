import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import { Drawer, Divider, IconButton, List, Theme } from '@mui/material'
import { ChevronLeft, Menu } from '@mui/icons-material'
import {
  CustomerMenuItems,
  MainMenuItems,
  SecondaryMenuItems,
} from './MenuItems'
import { AdminLogo } from './AdminLogo'
import { ServerStatus } from './ServerStatus'

const PREFIX = 'AdminDrawer'

const classes = {
  drawerPaper: `${PREFIX}-drawerPaper`,
  menuButton: `${PREFIX}-menuButton`,
  menuButtonHidden: `${PREFIX}-menuButtonHidden`,
  drawerPaperClose: `${PREFIX}-drawerPaperClose`,
  toolbarIcon: `${PREFIX}-toolbarIcon`,
  logo: `${PREFIX}-logo`,
  drawerFooter: `${PREFIX}-drawerFooter`,
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  [`& .${classes.drawerPaper}`]: {
    backgroundColor: theme.palette.primary.dark,
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    borderRight: 'none !important',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  [`& .${classes.menuButton}`]: {
    marginRight: '0.65rem',
    color: '#E2E1E1',
    '&:hover, &.Mui-focusVisible': {
      color: theme.palette.primary.dark,
      backgroundColor: '#E2E1E1',
    },
  },

  [`& .${classes.menuButtonHidden}`]: {
    display: 'none',
  },

  [`& .${classes.drawerPaperClose}`]: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },

  [`& .${classes.toolbarIcon}`]: {
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    backgroundColor: theme.palette.primary.dark,
    ...theme.mixins.toolbar,
  },

  [`& .${classes.logo}`]: {
    flexGrow: 1,
  },

  [`& .${classes.drawerFooter}`]: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 10,
  },
}))

const drawerWidth = 240

export const AdminDrawer = ({
  open,
  setHover,
  handleDrawerClose,
  handleDrawerOpen,
}: {
  open: boolean
  handleDrawerOpen: () => void
  handleDrawerClose: () => void
  setHover: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const closeDrawer = () => {
    handleDrawerClose()
    setHover(false)
  }
  return (
    <StyledDrawer
      style={{ borderRight: 'none !important' }}
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        {open ? (
          <>
            <div className={classes.logo}>
              <IconButton onClick={closeDrawer} size="large">
                <AdminLogo />
                <ChevronLeft />
              </IconButton>
            </div>
            <IconButton onClick={closeDrawer} size="large">
              <ChevronLeft style={{ color: '#fff', opacity: '0.8' }} />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              edge="start"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden,
              )}
              size="large"
            >
              <Menu />
            </IconButton>
          </>
        )}
      </div>
      <Divider style={{ backgroundColor: '#fff', opacity: '0.4' }} />
      <List
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <CustomerMenuItems />
      </List>
      <Divider style={{ backgroundColor: '#fff', opacity: '0.4' }} />
      <List
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <MainMenuItems />
      </List>
      <Divider style={{ backgroundColor: '#fff', opacity: '0.4' }} />
      <List
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <SecondaryMenuItems />
      </List>
      {/* <div className={classes.drawerFooter}>
        <ServerStatus open={open} />
      </div> */}
    </StyledDrawer>
  )
}
