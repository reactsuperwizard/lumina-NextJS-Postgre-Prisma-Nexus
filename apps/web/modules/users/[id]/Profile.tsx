import React from 'react'

import { styled } from '@mui/material/styles'

import { gql } from '@apollo/client'

import { CardContent, Card } from '@mui/material'
import { Skeleton } from '@mui/material'

import { LiveField } from 'modules/utils'

import { User, UserWhereUniqueInput } from '@lumina/api'

const PREFIX = 'Profile'

const classes = {
  input: `${PREFIX}-input`,
  form: `${PREFIX}-form`,
}

const StyledCard = styled(Card)(({ theme }) => ({
  [`& .${classes.input}`]: {
    backgroundColor: 'white',
  },

  [`& .${classes.form}`]: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
}))

interface IProps {
  user?: User
}

const UPDATE_ME = (
  field: string,
) => gql`mutation updateMe($where: UserWhereUniqueInput!, $data: UserUpdateInput!, ) {
  resource: updateMe(where: $where, data: $data) {
    id, ${field}
  }
}`

export const Profile = ({ user }: IProps) => {
  const firstName: keyof User = 'firstName'
  const lastName: keyof User = 'lastName'
  const email: keyof User = 'email'

  const where: UserWhereUniqueInput = {
    authId: user?.authId,
  }

  return (
    <StyledCard>
      <CardContent>
        <form className={classes.form} noValidate>
          {user ? (
            <LiveField
              field={firstName}
              label="First Name"
              where={where}
              defaultValue={user?.firstName || ''}
              customMutation={UPDATE_ME}
            />
          ) : (
            <Skeleton variant="text" />
          )}
          {user ? (
            <LiveField
              field={lastName}
              label="Last Name"
              where={where}
              defaultValue={user?.lastName || ''}
              customMutation={UPDATE_ME}
            />
          ) : (
            <Skeleton variant="text" />
          )}
          {user ? (
            <LiveField
              field={email}
              label="Email"
              where={where}
              defaultValue={user?.email || ''}
              customMutation={UPDATE_ME}
              disabled
            />
          ) : (
            <Skeleton variant="text" />
          )}
        </form>
      </CardContent>
    </StyledCard>
  )
}
