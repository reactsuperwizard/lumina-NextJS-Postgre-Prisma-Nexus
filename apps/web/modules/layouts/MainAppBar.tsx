import React, { FunctionComponent, useState } from 'react'
import { styled } from '@mui/system'
import { useAuth0, useTenant } from 'modules/hooks'
import { gql, useQuery } from '@apollo/client'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Typography,
  Avatar,
} from '@mui/material/'
import { Logo } from './Logo'
import { useRouter } from 'next/router'
import {
  ExitToApp,
  PermIdentity,
  AccountCircle,
  Menu as MenuIcon,
  Subscriptions,
} from '@mui/icons-material'
import { QueryUserArgs, User, Customer, QueryCustomerArgs } from '@lumina/api'
import { NewVideoButton } from '../portal/components/NewVideo'

const PREFIX = 'MainAppBar'

const classes = {
  toolBar: `${PREFIX}-toolBar`,
  grow: `${PREFIX}-grow`,
  appBar: `${PREFIX}-appBar`,
  sectionDesktop: `${PREFIX}-sectionDesktop`,
  sectionMobile: `${PREFIX}-sectionMobile`,
  dropdownText: `${PREFIX}-dropdownText`,
  dropdownMenuItem: `${PREFIX}-dropdownMenuItem`,
  requestButton: `${PREFIX}-requestButton`,
  buttonContainer: `${PREFIX}-buttonContainer`,
  customerName: `${PREFIX}-customerName`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const StyledMenu = styled(Menu)(({ theme }) => ({
  [`& .${classes.dropdownText}`]: {
    marginRight: '1rem',
  },

  [`& .${classes.dropdownMenuItem}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 2rem',
  },
}))
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.toolBar}`]: {
    padding: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  [`& .${classes.grow}`]: {
    flexGrow: 1,
  },

  [`& .${classes.appBar}`]: {
    backgroundColor: theme.palette.primary.dark,
  },

  [`& .${classes.sectionDesktop}`]: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      padding: '0.8rem 1.5rem 0.8rem 1.5rem',
      '&:hover': {
        backgroundColor: '#350CA3',
        cursor: 'pointer',
      },
    },
  },

  [`& .${classes.sectionMobile}`]: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  [`& .${classes.requestButton}`]: {
    margin: '0 auto',
    width: '9.5rem',
    [theme.breakpoints.up('md')]: {
      marginLeft: '1.5rem',
    },
  },

  [`& .${classes.buttonContainer}`]: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      textAlign: 'center',
    },
  },

  [`& .${classes.customerName}`]: {
    margin: 'auto',
    textTransform: 'capitalize',
  },
}))

const GET_USER = gql`
  query User($where: UserWhereUniqueInput!) {
    me(where: $where) {
      id
      avatar
      firstName
    }
  }
`

export const MainAppBar: FunctionComponent = () => {
  const { isAuthenticated, user, logout } = useAuth0()
  const { tenant } = useTenant()
  const matchesSmallerScreen = useMediaQuery('(max-width:959px)')
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState(null)

  const isMenuOpen = Boolean(anchorEl)

  const { data } = useQuery<
    { me: Pick<User, 'id' | 'avatar' | 'firstName'> },
    QueryUserArgs
  >(GET_USER, {
    variables: {
      where: { email: user?.email },
    },
    skip: !user,
  })

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {
    router.push('/users/[id]', `/users/${data?.me?.id}`)
    setAnchorEl(null)
    handleMenuClose()
  }

  const handleLogout = () => {
    logout({ returnTo: window.location.origin })
  }

  const handleOrders = () => {
    router.push(`/@${tenant}/orders`)
    setAnchorEl(null)
    handleMenuClose()
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <StyledMenu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile} className={classes.dropdownMenuItem}>
        <Typography
          variant="h6"
          color="primary"
          className={classes.dropdownText}
        >
          Profile
        </Typography>
        <PermIdentity color="primary" />
      </MenuItem>
      <MenuItem onClick={handleOrders} className={classes.dropdownMenuItem}>
        <Typography
          variant="h6"
          color="primary"
          className={classes.dropdownText}
        >
          Orders
        </Typography>
        <Subscriptions color="primary" />
      </MenuItem>
      <MenuItem onClick={handleLogout} className={classes.dropdownMenuItem}>
        <Typography
          variant="h6"
          color="primary"
          className={classes.dropdownText}
        >
          Logout
        </Typography>
        <ExitToApp color="primary" />
      </MenuItem>
    </StyledMenu>
  )

  return (
    <Root>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Logo />
          {/* {((matchesSmallerScreen &&
            (!router.query.id || router.pathname.split('/')[2] !== 'orders')) ||
            (router.query.id &&
              router.pathname.split('/')[2] === 'videos')) && (
            <div className={classes.buttonContainer}>
              <div className={classes.requestButton}>
                <NewVideoButton
                  refetch={async () => {
                    if (
                      router.pathname.split('/')[2] === 'orders' &&
                      !router.query.id
                    )
                      window.location.reload()
                  }}
                />
              </div>
            </div>
          )} */}
          <div className={classes.grow} />
          <div
            onClick={handleProfileMenuOpen}
            className={classes.sectionDesktop}
          >
            <Typography className={classes.customerName} variant="subtitle1">
              {data?.me.firstName}
            </Typography>
            <Avatar
              alt="Avatar"
              src={data?.me.avatar}
              sx={{ width: '2.5rem', height: '2.5rem', marginLeft: '10px' }}
            />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              size="large"
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {isAuthenticated ? renderMenu : null}
    </Root>
  )
}
