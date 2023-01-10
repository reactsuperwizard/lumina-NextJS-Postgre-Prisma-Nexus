import React, { FunctionComponent, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { ILayout } from '../Types'
import { Theme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Container } from '@mui/material'
import { AdminDrawer } from './AdminDrawer'
import { ProfileButton } from './ProfileButton'
import { useAuth0 } from 'modules/hooks'
import { PermissionsRole } from '@lumina/api'

const PREFIX = 'AdminMain'

const classes = {
  root: `${PREFIX}-root`,
  appBarSpacer: `${PREFIX}-appBarSpacer`,
  content: `${PREFIX}-content`,
  container: `${PREFIX}-container`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
  },

  [`& .${classes.appBarSpacer}`]: theme.mixins.toolbar,

  [`& .${classes.content}`]: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#F0EFEF',
  },

  [`& .${classes.container}`]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingRight: '2rem',
  },
}))

export const AdminMain: FunctionComponent<ILayout> = ({
  children,
}: ILayout) => {
  const { user, loginWithRedirect } = useAuth0()
  const [open, setOpen] = useState(true)
  const [hover, setHover] = useState(false)
  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)
  useEffect(() => {
    if (
      !user?.['https://lumina.com/tenants']?.lumina?.role?.includes(
        PermissionsRole.Admin,
      )
    )
      loginWithRedirect(window.location.href)
  }, [])
  return (
    <Root className={classes.root}>
      <CssBaseline />
      <ProfileButton />
      <AdminDrawer
        open={open || hover}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        setHover={setHover}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <div>{children}</div>
        </Container>
      </main>
    </Root>
  )
}
