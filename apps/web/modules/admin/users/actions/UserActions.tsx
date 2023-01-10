import React, { useState } from 'react'

import { styled } from '@mui/material/styles'

import { useMutation, gql } from '@apollo/client'

import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Snackbar,
  Theme,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { Alert } from '@mui/material'

import { Send, Link, Delete } from '@mui/icons-material'

import { Mutation, PermissionsRole, Tenants } from '@lumina/api'

import { Role } from './Role'
import { Add } from './Add'
import { Remove } from './Remove'
import { GetUserQuery } from '../User'
import { useRouter } from 'next/router'

const PREFIX = 'UserActions'

const classes = {
  dangerButtonContained: `${PREFIX}-dangerButtonContained`,
  dangerButtonOutlined: `${PREFIX}-dangerButtonOutlined`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.dangerButtonContained}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },

  [`& .${classes.dangerButtonOutlined}`]: {
    '&:hover': {
      borderColor: theme.palette.error.main,
      backgroundColor: alpha(theme.palette.error.light, 0.2),
    },
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
  },
}))

const SEND_ONBOARDING_EMAIL = gql`
  mutation sendOnBoardingEmail($authId: String!) {
    sendOnBoardingEmail(authId: $authId) {
      id
      authId
      tenants
      customers {
        name
        tenant
        id
      }
    }
  }
`

const DELETE_ONE_USER = gql`
  mutation deleteOneUser($where: UserWhereUniqueInput!) {
    user: deleteOneUser(where: $where) {
      id
    }
  }
`

interface Props {
  user?: GetUserQuery
  refetch: () => Promise<void>
}

export const UserActions = ({ user, refetch }: Props) => {
  const router = useRouter()

  if (!user?.id) return null
  const [open, setOpen] = useState(false)
  const [openDeleteUser, setOpenDeleteUser] = useState(false)
  const [openWarn, setOpenWarn] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { authId } = user
  const customers = user?.customers
  const tenants: Tenants = user?.tenants || {}

  const formatRole = (
    role: PermissionsRole | PermissionsRole[] | null | undefined,
  ) => {
    if (!role) return []
    else if (!Array.isArray(role)) return [role]
    else return role
  }
  const [sendOnBoardingEmailMutation, { loading: sendSignUpEmailLoading }] =
    useMutation<Mutation['sendOnBoardingEmail']>(SEND_ONBOARDING_EMAIL)

  const sendOnBoardingEmail = async () => {
    await sendOnBoardingEmailMutation({ variables: { authId } })
    setEmailSent(true)
  }

  const [deleteUser, { loading: deleteUserLoading }] = useMutation<{
    user: { id: number }
  }>(DELETE_ONE_USER)

  const handleClose = () => setOpen(false)

  const handleCloseWarning = () => setOpenWarn(false)

  const handleCloseDeleteUser = () => setOpenDeleteUser(false)

  const handleSignUp = (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const customerTenant = customers?.[0]?.tenant
    if (!customerTenant) {
      setOpen(true)
    } else if (user.onboarding) {
      setOpenWarn(true)
    } else {
      sendOnBoardingEmail()
    }
  }

  const handleDeleteUser = async (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    handleCloseDeleteUser()
    await deleteUser({ variables: { where: { authId } } })
    router.replace('./')
  }

  if (customers) {
    return (
      <Root>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Connect User to a Customer first!'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are permissions currently updating? You must wait for them to
              finished so that the user will be able to access their account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose} color="primary">
              Got it!
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openWarn}
          onClose={handleCloseWarning}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Already signed up!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Looks like that user has already been sent the onboarding email.
              Did you want to send it again?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                handleCloseWarning()
                sendOnBoardingEmail()
              }}
              color="primary"
            >
              Send it again
            </Button>
            <Button
              variant="contained"
              onClick={handleCloseWarning}
              color="secondary"
            >
              Don't send
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDeleteUser}
          onClose={handleCloseDeleteUser}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this user? This cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleDeleteUser}
              className={classes.dangerButtonContained}
            >
              I{"'"}m sure
            </Button>
            <Button variant="outlined" onClick={handleCloseDeleteUser}>
              Nope
            </Button>
          </DialogActions>
        </Dialog>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead style={{ backgroundColor: 'lightgray' }}>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="center">Customer Name</TableCell>
                  <TableCell align="center">Customer Tenant</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center" />
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((c) => (
                  <TableRow key={c.tenant}>
                    <TableCell component="th" scope="row">
                      {c.id}
                    </TableCell>
                    <TableCell align="center">{c.name}</TableCell>
                    <TableCell align="center">{c.tenant}</TableCell>
                    <TableCell align="center">
                      <Role
                        key={`${c.tenant}-role`}
                        customerTenant={c.tenant}
                        authId={user.authId}
                        role={formatRole(tenants[c.tenant]?.role)}
                        refetchCustomers={refetch}
                        reset={() => {}}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Remove
                        customerTenant={c.tenant}
                        authId={user.authId}
                        refetchCustomers={refetch}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <Add refetchCustomers={refetch} authId={user.authId} />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Box my={2} style={{ width: '100%' }}>
          <Grid
            justifyContent="space-between" // Add it here :)
            container
            // style={{ width: '100%' }}
          >
            {' '}
            <Grid item>
              <Box component="span" mr={1}>
                {sendSignUpEmailLoading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSignUp}
                    endIcon={<Send />}
                  >
                    Sign Up a User
                  </Button>
                )}
              </Box>
              {deleteUserLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  className={classes.dangerButtonOutlined}
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpenDeleteUser(true)}
                  endIcon={<Delete />}
                >
                  Delete
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
        <Snackbar
          open={emailSent}
          autoHideDuration={1500}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => setEmailSent(false)}
        >
          <Alert severity="success">Onboarding email sent</Alert>
        </Snackbar>
      </Root>
    )
  }
  return null
}
