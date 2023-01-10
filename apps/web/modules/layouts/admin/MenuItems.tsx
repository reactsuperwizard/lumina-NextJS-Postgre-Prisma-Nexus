import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { ListItemIcon, ListItemText, ListItem } from '@mui/material'
import {
  Dashboard,
  People,
  Theaters,
  Subscriptions,
  Duo,
  Description,
  PermMedia,
  AccountCircle,
  Assignment,
  OndemandVideo,
} from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useAuth0, useTenant } from 'modules/hooks'
import { gql, useQuery } from '@apollo/client'
import { User, QueryUserArgs } from '@lumina/api'

const PREFIX = 'MenuItem'

const classes = {
  root: `${PREFIX}-root`,
  selected: `${PREFIX}-selected`,
  badge: `${PREFIX}-badge`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    borderTop: `1px solid ${theme.palette.primary.dark}`,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    // '&$selected, &$selected:hover': {
    //   color: theme.palette.secondary.contrastText,
    //   backgroundColor: theme.palette.secondary.main,
    //   opacity: '0.9 !important',
    // },
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      opacity: '0.9 !important',
      color: theme.palette.secondary.contrastText,
    },
  },
  [`& .${classes.selected}`]: {
    backgroundColor: `${theme.palette.primary.contrastText} !important`,
    color: `${theme.palette.primary.dark} !important`,
  },
  [`& .${classes.badge}`]: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '0.75rem',
    width: '1.5rem',
    textAlign: 'center',
    marginLeft: '2rem',
  },
}))

const SCRIPT_QUERY = gql`
  query Scripts($where: ScriptWhereInput) {
    scripts(where: $where) {
      id
    }
  }
`

const USER_QUERY = gql`
  query Users($where: UserWhereInput) {
    users(where: $where) {
      id
    }
  }
`

const CUSTOMER_QUERY = gql`
  query Customers($where: CustomerWhereInput) {
    customers(where: $where) {
      id
    }
  }
`

const GET_USER = gql`
  query User($where: UserWhereUniqueInput!) {
    me(where: $where) {
      id
    }
  }
`

export const MenuItem = ({
  children,
  label,
  profile,
  root,
  notificationBadge,
}: {
  children: React.ReactNode
  label: string
  profile?: boolean
  root?: boolean
  notificationBadge?: React.ReactNode
}) => {
  const router = useRouter()
  const { user } = useAuth0()

  const { data } = useQuery<{ me: Pick<User, 'id'> }, QueryUserArgs>(GET_USER, {
    variables: {
      where: { email: user?.email },
    },
    skip: !user,
  })

  const [selected, setSelected] = useState(false)

  useEffect(() => {
    const splitAtAdmin = router.asPath.split('admin/')
    if (splitAtAdmin.length > 1) {
      const pathAfterAdmin = splitAtAdmin[1]
      const activeLocationString = pathAfterAdmin.split('/')[0]
      if (label.toLowerCase() === activeLocationString) {
        return setSelected(true)
      }
    } else {
      if (label.toLowerCase() === 'dashboard') {
        return setSelected(true)
      }
    }
    setSelected(false)
  }, [router])

  return (
    <Root>
      <ListItem
        selected={selected}
        classes={{ root: classes.root, selected: classes.selected }}
        button
        onClick={(e) => {
          e.preventDefault()
          if (profile) {
            router.push('/users/[id]', `/users/${data?.me?.id}`)
          } else if (root) {
            router.push(`/${router.pathname.split('/')[1]}/`)
          } else {
            router.push(
              `/${router.pathname.split('/')[1]}/${label.toLowerCase()}`,
            )
          }
        }}
      >
        <ListItemIcon style={{ color: 'inherit' }}>{children}</ListItemIcon>
        <ListItemText
          sx={{ display: 'flex', alignItems: 'center' }}
          primary={label}
          secondary={notificationBadge}
        />
      </ListItem>
    </Root>
  )
}

export const CustomerMenuItems = () => {
  const { isLuminaAdmin, isLuminaManager } = useTenant()
  return (
    <>
      {(isLuminaAdmin || isLuminaManager) && (
        <MenuItem label="Dashboard" root>
          <Dashboard />
        </MenuItem>
      )}
      <MenuItem label="Profile" profile>
        <AccountCircle />
      </MenuItem>
    </>
  )
}

export const MainMenuItems = () => {
  const { isLuminaAdmin, isLuminaManager } = useTenant()

  const { data, refetch } = useQuery(SCRIPT_QUERY, {
    variables: {
      where: { customerUpdate: { equals: true } },
    },
    skip: !isLuminaAdmin && !isLuminaManager,
  })

  const { data: requestedTemplatePending } = useQuery(CUSTOMER_QUERY, {
    variables: {
      where: {
        requestedTemplates: {
          isEmpty: false,
        },
      },
    },
    skip: !isLuminaAdmin && !isLuminaManager,
  })

  return (
    <div>
      {(isLuminaAdmin || isLuminaManager) && (
        <MenuItem
          label="Customers"
          notificationBadge={
            requestedTemplatePending?.customers?.length > 0 ? (
              <div className={classes.badge}>
                {requestedTemplatePending?.customers?.length}
              </div>
            ) : null
          }
        >
          <People />
        </MenuItem>
      )}
      {(isLuminaAdmin || isLuminaManager) && (
        <MenuItem label="Orders">
          <Subscriptions />
        </MenuItem>
      )}
      <MenuItem label="Requests">
        <Duo />
      </MenuItem>
      <MenuItem
        label="Scripts"
        notificationBadge={
          data?.scripts?.length > 0 ? (
            <div className={classes.badge}>{data?.scripts?.length}</div>
          ) : null
        }
      >
        <Description />
      </MenuItem>
      <MenuItem label="Videos">
        <Theaters />
      </MenuItem>
    </div>
  )
}

export const SecondaryMenuItems = () => {
  const { isLuminaAdmin, isLuminaManager } = useTenant()
  const { data: userApprovalPending } = useQuery(USER_QUERY, {
    variables: {
      where: {
        isApproved: {
          equals: false,
        },
      },
    },
    skip: !isLuminaAdmin && !isLuminaManager,
  })
  return (
    <div>
      <MenuItem label="Production">
        <Assignment />
      </MenuItem>
      <MenuItem label="Assets">
        <PermMedia />
      </MenuItem>
      {(isLuminaAdmin || isLuminaManager) && (
        <MenuItem
          label="Users"
          notificationBadge={
            userApprovalPending?.users?.length > 0 ? (
              <div className={classes.badge}>
                {userApprovalPending?.users?.length}
              </div>
            ) : null
          }
        >
          <People />
        </MenuItem>
      )}
      <MenuItem label="Renders">
        <OndemandVideo />
      </MenuItem>
    </div>
  )
}
