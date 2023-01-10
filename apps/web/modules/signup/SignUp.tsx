import React, { useEffect, useState } from 'react'
import { Paper, styled, Typography, Box } from '@mui/material'
import bgBlur from 'public/BgBlur.png'
import { gql, useMutation } from '@apollo/client'
import { UserSignUpAndToken } from '@lumina/api'
import { useRouter } from 'next/router'
import { useAuth0, usePlausible } from 'modules/hooks'
import { setToken } from 'modules/utils'
import { EventNames } from 'modules/providers/plausible/Constants'
import { SignupBox } from './SignupBox'

const PREFIX = 'SignUp'

const classes = {
  headerText: `${PREFIX}-headerText`,
  box: `${PREFIX}-box`,
  title: `${PREFIX}-title`,
}

const Root = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  width: '37%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    minWidth: '100%',
  },
}))
const FormContainer = styled('div')(({ theme }) => ({
  paddingLeft: '3.5rem',
  paddingTop: '8rem',
  [theme.breakpoints.down('md')]: {
    margin: '0 auto',
  },

  [`& .${classes.headerText}`]: {
    fontWeight: 'bolder',
    fontSize: '2.33rem',
    wordSpacing: '-3px',
    color: theme.palette.primary.dark,
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
    },
  },
}))

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.box}`]: {
    flex: 1,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`& .${classes.title}`]: {
    width: '50%',
    color: '#fff',
    fontSize: '2.5rem',
    fontWeight: '800',
    textAlign: 'center',
  },
}))

const CREATE_AUTH0_USER = gql`
  mutation UserSignUp(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    userSignUp(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      email
      accessToken
      expiresIn
      expiresAt
      decodedToken
    }
  }
`

export const SignUp = () => {
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const auth0User = useAuth0()
  const { signUpButtonClicked, signUpPageVisit } = usePlausible()

  const [addAuth0User, { loading }] = useMutation<{
    userSignUp: Pick<
      UserSignUpAndToken,
      'accessToken' | 'idToken' | 'expiresIn' | 'expiresAt' | 'decodedToken'
    >
  }>(CREATE_AUTH0_USER)

  const createUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    setCreating(true)
    const addAuth0Result = await addAuth0User({
      variables: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
      },
      context: {
        headers: {
          operation: 'signup',
        },
      },
    })

    setToken(
      addAuth0Result.data?.userSignUp.accessToken as string,
      addAuth0Result.data?.userSignUp.idToken as string,
      addAuth0Result.data?.userSignUp.expiresIn as number,
      addAuth0Result.data?.userSignUp.expiresAt as number,
      addAuth0Result.data?.userSignUp.decodedToken,
    )
    await auth0User.initAuth0(false)
    signUpButtonClicked(EventNames.SIGNUP_BUTTON_CLICK)
    setCreating(false)
    router.push(`/setupCustomer`)
    return true
  }

  useEffect(() => {
    signUpPageVisit(EventNames.SIGNUP_PAGE_VISIT)
  }, [])

  return (
    <Paper
      sx={{
        backgroundImage: `linear-gradient(to bottom, rgba(9, 10, 63, 0.75), rgba(9, 10, 63, 0.75)),
         url(${bgBlur})`,
        width: '100%',
        height: '100vh',
        display: 'flex',
      }}
    >
      <Root>
        <FormContainer>
          <Typography className={classes.headerText} variant="h4">
            Let's get started!
          </Typography>
          <Box sx={{ paddingRight: '20%' }}>
            <SignupBox submit={createUser} loading={creating} title="Sign Up" />
          </Box>
        </FormContainer>
      </Root>
      <StyledBox className={classes.box}>
        <Typography variant="h3" className={classes.title}>
          Create beautiful
          <br /> job ads in seconds.
        </Typography>
      </StyledBox>
    </Paper>
  )
}
