import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  Button,
  Paper,
  Box,
  Typography,
  CircularProgress,
  TextField,
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { QueryUserArgs, User } from '@lumina/api'

const PREFIX = 'NewUser'

const classes = {
  formBox: `${PREFIX}-formBox`,
  findRequest: `${PREFIX}-findRequest`,
  saveButton: `${PREFIX}-saveButton`,
  userFormInput: `${PREFIX}-userFormInput`,
  userFormSelectLabel: `${PREFIX}-userFormSelectLabel`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.formBox}`]: {
    padding: '1.5rem',
  },
  [`& .${classes.findRequest}`]: {
    margin: '1.5rem 0 0.5rem',
  },
  [`& .${classes.saveButton}`]: {
    marginTop: '1.5rem',
  },
  [`& .${classes.userFormInput}`]: {
    margin: '1.5rem 0 1.5rem',
    width: 300,
    display: 'block',
  },
  [`& .${classes.userFormSelectLabel}`]: {
    marginTop: '1.5rem',
    display: 'block',
  },
})

const CREATE_USER = gql`
  mutation createOneUser($data: UserCreateInput!) {
    user: createOneUser(data: $data) {
      id
    }
  }
`

const FIND_MATCH = gql`
  query user($where: UserWhereUniqueInput!) {
    user: user(where: $where) {
      id
    }
  }
`

const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const NewUser = () => {
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [isInUse, setIsInUse] = useState(false)
  const [isProperlyFormatted, setIsProperlyFormatted] = useState(true)
  const [validate, setValidate] = useState(false)

  const [addUser] = useMutation<{ user: Pick<User, 'id'> }>(CREATE_USER)

  const { data: userQuery, refetch } = useQuery<{ user: User }, QueryUserArgs>(
    FIND_MATCH,
    {
      variables: { where: { email: email } },
      skip: !validate,
    },
  )

  const createUser = async () => {
    if (!email) return
    setCreating(true)
    const result = await addUser({
      variables: {
        data: {
          firstName,
          lastName,
          email,
        },
      },
    })
    setCreating(false)
    const newId = result.data?.user?.id
    router.push(`./${newId}`)
  }

  const updateEmail = (newValue: string) => {
    const properlyFormatted = emailReg.test(String(email).toLowerCase())
    if (validate) setIsProperlyFormatted(properlyFormatted)
    if (validate && properlyFormatted) refetch()
    setEmail(newValue.toLowerCase())
  }

  useEffect(() => {
    if (!validate) return
    const isValid = !(userQuery && typeof userQuery?.user?.id === 'number')
    setIsInUse(!isValid)
  }, [userQuery])

  return (
    <Root>
      <Paper>
        <Box className={classes.formBox}>
          <Typography variant="h4">Create User</Typography>
          <TextField
            variant="outlined"
            className={classes.userFormInput}
            margin="dense"
            color="primary"
            fullWidth
            error={isInUse || !isProperlyFormatted}
            helperText={
              isInUse
                ? 'Email is already in use'
                : !isProperlyFormatted
                ? 'Must be a valid email'
                : undefined
            }
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
            onBlur={() => setValidate(true)}
            label="Email"
          />
          <TextField
            variant="outlined"
            className={classes.userFormInput}
            margin="dense"
            color="primary"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            label="First Name"
          />
          <TextField
            variant="outlined"
            className={classes.userFormInput}
            margin="dense"
            color="primary"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
          />
          {creating ? (
            <CircularProgress />
          ) : (
            <Button
              className={classes.saveButton}
              disabled={!email}
              variant="contained"
              color="secondary"
              startIcon={<Save />}
              onClick={createUser}
            >
              Save
            </Button>
          )}
        </Box>
      </Paper>
    </Root>
  )
}
