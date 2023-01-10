import React from 'react'
import { styled } from '@mui/material/styles'
import { IconButton, Badge, Avatar } from '@mui/material'
import { useAuth0 } from 'modules/hooks'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { QueryUserArgs, User } from '@lumina/api'

const PREFIX = 'ProfileButton'

const classes = {
  avatarIcon: `${PREFIX}-avatarIcon`,
  badge: `${PREFIX}-badge`,
}

const StyledIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  padding: '0.6rem 0.55rem 0.6rem 0.13rem',
  borderRadius: '50%',
  [`& .${classes.badge}`]: {
    top: '0rem',
    left: '-1px',
  },
  [`& .${classes.avatarIcon}`]: {
    width: '1.9rem',
    height: '1.9rem',
    marginLeft: '0.6rem',
  },
}))

const GET_USER = gql`
  query User($where: UserWhereUniqueInput!) {
    me(where: $where) {
      id
      avatar
    }
  }
`

export const ProfileButton = () => {
  const router = useRouter()
  const { user } = useAuth0()

  const { data } = useQuery<{ me: Pick<User, 'id' | 'avatar'> }, QueryUserArgs>(
    GET_USER,
    {
      variables: {
        where: { email: user?.email },
      },
      skip: !user,
    },
  )

  const handleProfile = () => {
    router.push('/users/[id]', `/users/${data?.me?.id}`)
  }
  return (
    <StyledIconButton onClick={handleProfile} size="large">
      <Badge badgeContent={0} color="secondary" className={classes.badge}>
        <Avatar
          alt="Avatar"
          src={data?.me.avatar}
          className={classes.avatarIcon}
        />
      </Badge>
    </StyledIconButton>
  )
}
