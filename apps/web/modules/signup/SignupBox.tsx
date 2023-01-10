import { gql, useQuery } from '@apollo/client'
import { QueryUserArgs, User } from '@lumina/api'
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useEffect, useState } from 'react'

interface Props {
  submit: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<boolean>
  loading: boolean
  title: string
}

const FIND_MATCH = gql`
  query user($where: UserWhereUniqueInput!) {
    user: user(where: $where) {
      id
    }
  }
`

const PREFIX = 'SignUpBox'

const classes = {
  textFields: `${PREFIX}-textFields`,
  textLabels: `${PREFIX}-textLabels`,
  labelInputContainer: `${PREFIX}-labelInputContainer`,
  box: `${PREFIX}-box`,
  title: `${PREFIX}-title`,
}

const FormContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    margin: '0 auto',
  },
  [`& .${classes.textFields}`]: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: '85%',
    },
  },
  [`& .${classes.textLabels}`]: {
    fontWeight: 'normal',
    marginTop: '3px',
  },
  [`& .${classes.labelInputContainer}`]: {
    margin: '1.3rem 0',
  },
}))
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#9A30DE',
  color: 'white',
  fontSize: '0.8rem',
  textTransform: 'capitalize',
  [theme.breakpoints.down('md')]: {
    width: '85%',
  },

  ':disabled': {
    color: 'white',
    backgroundColor: '#bb60f5',
  },
  ':hover': {
    backgroundColor: '#9A30DE',
    color: 'white',
    cursor: 'pointer',
  },
}))

const passwordReg =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[!@#$%^&*]).{8,32}$/

const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const SignupBox = ({ submit, loading, title }: Props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const [isInUse, setIsInUse] = useState(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isProperlyFormattedEmail, setIsProperlyFormattedEmail] = useState(true)
  const [isProperlyFormattedPassword, setIsProperlyFormattedPassword] =
    useState(true)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
  const updateEmail = (newValue: string) => {
    const properlyFormatted = emailReg.test(newValue.toLowerCase())
    setIsProperlyFormattedEmail(properlyFormatted)
    if (properlyFormatted) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      const timeout = setTimeout(() => {
        refetch()
      }, 500)
      setTimeoutId(timeout)
    }
    setEmail(newValue.toLowerCase())
  }

  const updatePassword = (newValue: string) => {
    const properlyFormatted = passwordReg.test(String(newValue))
    setIsProperlyFormattedPassword(properlyFormatted)
    setPassword(newValue)
  }

  const { data: userQuery, refetch } = useQuery<{ user: User }, QueryUserArgs>(
    FIND_MATCH,
    {
      variables: { where: { email: email.toLowerCase() } },
      skip: !isProperlyFormattedEmail,
    },
  )

  useEffect(() => {
    const isValid = !(userQuery && typeof userQuery?.user?.id === 'number')
    setIsInUse(!isValid)
  }, [userQuery])

  const isDisabled = (): boolean => {
    return (
      isInUse ||
      !isProperlyFormattedEmail ||
      !isProperlyFormattedPassword ||
      !firstName ||
      !lastName ||
      !email ||
      !password
    )
  }

  return (
    <FormContainer>
      <form onSubmit={() => submit(firstName, lastName, email, password)}>
        <div className={classes.labelInputContainer}>
          <Typography className={classes.textLabels} variant="subtitle1">
            First Name
          </Typography>
          <TextField
            variant="outlined"
            margin="dense"
            color="primary"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            size="small"
            className={classes.textFields}
          ></TextField>
        </div>
        <div className={classes.labelInputContainer}>
          <Typography className={classes.textLabels} variant="subtitle1">
            Last Name
          </Typography>
          <TextField
            variant="outlined"
            margin="dense"
            color="primary"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            size="small"
            className={classes.textFields}
          ></TextField>
        </div>
        <div className={classes.labelInputContainer}>
          <Typography className={classes.textLabels} variant="subtitle1">
            Work Email
          </Typography>
          <TextField
            variant="outlined"
            margin="dense"
            color="primary"
            fullWidth
            error={isInUse || !isProperlyFormattedEmail}
            helperText={
              !isProperlyFormattedEmail
                ? 'Must enter valid email'
                : isInUse
                ? 'Email is already taken'
                : undefined
            }
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
            size="small"
            className={classes.textFields}
          ></TextField>
        </div>
        <div className={classes.labelInputContainer}>
          <Typography className={classes.textLabels} variant="subtitle1">
            Create Password
          </Typography>
          <OutlinedInput
            id="outlined-adornment-password"
            className={classes.textFields}
            type={showPassword ? 'text' : 'password'}
            value={password}
            error={!isProperlyFormattedPassword}
            onChange={(e) => updatePassword(e.target.value)}
            size="small"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {!isProperlyFormattedPassword && (
            <FormHelperText error id="password-error">
              Password must contain at least 8 characters and contain at least 1
              uppercase, 1 lowercase, 1 number and 1 special character
            </FormHelperText>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <StyledButton
            onClick={() => submit(firstName, lastName, email, password)}
            sx={{ width: '33%', marginTop: '10px' }}
            size="large"
            disabled={isDisabled()}
          >
            {loading ? (
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress size={20} color="inherit" />
              </Box>
            ) : (
              title
            )}
          </StyledButton>
        </div>
      </form>
    </FormContainer>
  )
}
