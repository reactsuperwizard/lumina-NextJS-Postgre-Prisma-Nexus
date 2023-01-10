import React, { useState } from 'react'

import { styled } from '@mui/material/styles'

import {
  Typography,
  Container,
  Paper,
  Tabs,
  Tab as MuiTab,
  Grid,
} from '@mui/material'

import { useAuth0 } from 'modules/hooks'

import { Profile } from './Profile'
import { Settings } from './Settings'
import { Accounts } from './Accounts'
import { useRouter } from 'next/router'
import { ApolloError, gql, useQuery } from '@apollo/client'
import { User, QueryUserArgs } from '@lumina/api'
import { NextComponentType } from 'next'
import { ChangeAvatarDialog } from './components/ChangeAvatarDialog'

const PREFIX = 'Tab'

const classes = {
  paper: `${PREFIX}-paper`,
  profileContainer: `${PREFIX}-profileContainer`,
  profilePicture: `${PREFIX}-profilePicture`,
  profileTabs: `${PREFIX}-profileTabs`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.paper}`]: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  [`& .${classes.profileContainer}`]: {
    width: '100px',
    height: '100px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%',
  },

  [`& .${classes.profilePicture}`]: {
    display: 'inline',
    margin: '0 auto',
    height: '100%',
    width: 'auto',
    cursor: 'pointer',
  },
  [`& .${classes.profileTabs}`]: {
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: '0.5rem 3rem',
    marginBottom: '20px',
    marginTop: '20px',
  },
}))

const GET_USER = gql`
  query me($where: UserWhereUniqueInput!) {
    me(where: $where) {
      id
      authId
      firstName
      lastName
      email
      avatar
    }
  }
`
interface INameProps {
  user?: User | null
  loading: boolean
  error?: ApolloError
}
const Name = ({ user, loading, error }: INameProps) => {
  if (loading) {
    return <>...</>
  }
  if (error) {
    return <>Looks like there was an error. Try refreshing the page!</>
  }
  if (user) {
    return (
      <>
        {user.firstName} {user.lastName}
      </>
    )
  }
  if (user === null) {
    return <>User not found!</>
  }
  return null
}
export const Tab: NextComponentType = () => {
  const [openChangeAvatarDialog, setOpenChangeAvatarDialog] = useState(false)
  const router = useRouter()
  const tab = router.query.tab

  const id = parseInt((router.query.id as string) || 'NaN')

  const { data, loading, error } = useQuery<{ me: User }, QueryUserArgs>(
    GET_USER,
    {
      variables: {
        where: { id },
      },
      skip: !id,
    },
  )

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: any,
  ) => {
    router.push({
      pathname: router.pathname,
      query: { id, tab: newValue },
    })
  }

  return (
    <>
      <Container component="main" maxWidth="lg">
        <Grid alignItems="center" justifyContent="center" container spacing={8}>
          <StyledGrid item sm={6}>
            <div className={classes.paper}>
              <div
                onClick={() => setOpenChangeAvatarDialog(true)}
                className={classes.profileContainer}
              >
                <img src={data?.me.avatar} className={classes.profilePicture} />
              </div>
              <ChangeAvatarDialog
                open={openChangeAvatarDialog}
                close={() => setOpenChangeAvatarDialog(false)}
              />
              <Typography
                component="h1"
                variant="h5"
                style={{ color: '#10014E' }}
              >
                <Name user={data?.me} loading={loading} error={error} />
              </Typography>
            </div>
          </StyledGrid>
        </Grid>
        <Grid alignItems="center" justifyContent="center" container spacing={4}>
          <StyledGrid item sm={6}>
            <Paper className={classes.profileTabs}>
              <Tabs
                value={tab || false}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                centered
                variant="fullWidth"
              >
                <MuiTab value="profile" label="Profile" />
                <MuiTab value="settings" label="Settings" />
                <MuiTab value="accounts" label="Accounts" />
              </Tabs>
            </Paper>
          </StyledGrid>
        </Grid>
        <Grid alignItems="center" justifyContent="center" container spacing={4}>
          <Grid item sm={6}>
            {tab === 'profile' ? <Profile user={data?.me} /> : null}
            {tab === 'settings' ? <Settings /> : null}
            {tab === 'accounts' ? <Accounts /> : null}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
