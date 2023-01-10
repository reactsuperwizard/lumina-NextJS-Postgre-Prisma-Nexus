import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Button,
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { gql, useMutation } from '@apollo/client'
import { useAuth0, useTenant } from 'modules/hooks'
import { useRouter } from 'next/router'
import { setToken } from 'modules/utils'

const PREFIX = 'SignIn'

const classes = {
  paper: `${PREFIX}-paper`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
  footerContainer: `${PREFIX}-footerContainer`,
}

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      idToken
      expiresIn
      decodedToken
      expiresAt
    }
  }
`

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`
const StyledContainer = styled(Container)(({ theme }) => ({
  [`& .${classes.paper}`]: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('md')]: {
      [`& .css-1mb7ed4`]: {
        padding: 0,
        paddingTop: '1rem',
      },
    },
  },

  [`& .${classes.form}`]: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    paddingTop: '90px',
  },

  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#10014E',
  },
  [`& .${classes.footerContainer}`]: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}))

const StyledFooter = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
}))

export const SignIn = () => {
  const [loginMutation, { error, reset: resetLogin }] = useMutation<{
    login: {
      accessToken: string
      idToken: string
      expiresIn: number
      decodedToken: Record<string, any>
      expiresAt: number
    }
  }>(LOGIN_MUTATION)

  const [forgotPasswordMutation] = useMutation<{
    forgotPassword: {
      message: string
    }
  }>(FORGOT_PASSWORD_MUTATION)
  const auth0User = useAuth0()
  const [email, setEmail] = useState<null | string>(null)
  const [password, setPassword] = useState<null | string>(null)
  const [loggingIn, setLoggingIn] = useState(false)
  const [forgotPasswordMsg, setForgotPasswordMsg] = useState(false)
  const [tab, setTab] = useState('LOGIN')
  const { redirectToCustomer } = useTenant()
  const router = useRouter()

  const reset = (tab: string) => {
    setEmail('')
    setPassword('')
    setTab(tab)
    setLoggingIn(false)
    setForgotPasswordMsg(false)
    resetLogin()
  }

  const handleSubmit = async () => {
    try {
      if (tab == 'LOGIN') {
        if (!email || !password) return
        setLoggingIn(true)
        const result = await loginMutation({
          variables: {
            email,
            password,
          },
          context: {
            headers: {
              operation: 'login',
            },
          },
        })
        setLoggingIn(false)

        setToken(
          result.data?.login.accessToken as string,
          result.data?.login.idToken as string,
          result.data?.login.expiresIn as number,
          result.data?.login.expiresAt as number,
          result.data?.login.decodedToken,
        )
        await auth0User.initAuth0(true)

        if (router.query.to) router.push(router.query.to as string)
        else redirectToCustomer()
      } else {
        if (!email) return
        setLoggingIn(true)
        await forgotPasswordMutation({
          variables: {
            email,
          },
          context: {
            headers: {
              operation: 'forgetPassword',
            },
          },
        })
        reset('LOGIN')
        setForgotPasswordMsg(true)
      }
    } catch (err) {
      setLoggingIn(false)
    }
  }
  return (
    <StyledContainer maxWidth="xs">
      <div className={classes.paper}>
        <Box p={5}>
          {error && tab == 'LOGIN' && (
            <Typography color={'#ed5249'} fontWeight={500}>
              Invalid Email or Password
            </Typography>
          )}
          {forgotPasswordMsg && (
            <Typography fontWeight={500}>
              We've emailed the instructions to your email
            </Typography>
          )}
        </Box>
        {loggingIn ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email || ''}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              autoFocus
            />
            {tab == 'LOGIN' && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password || ''}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                autoComplete="current-password"
              />
            )}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.submit}
            >
              {tab == 'LOGIN' ? 'Sign In' : 'Send Email'}
            </Button>
            <Grid container className={classes.footerContainer}>
              {tab == 'LOGIN' && (
                <>
                  <Grid item xs>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => reset('FORGOT_PASSWORD')}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </>
              )}
              {tab == 'FORGOT_PASSWORD' && (
                <Grid item>
                  <Link href="#" variant="body2" onClick={() => reset('LOGIN')}>
                    {'Back to login'}
                  </Link>
                </Grid>
              )}
            </Grid>
          </form>
        )}
      </div>
    </StyledContainer>
  )
}
