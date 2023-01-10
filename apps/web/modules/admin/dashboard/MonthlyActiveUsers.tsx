import React from 'react'

import { styled } from '@mui/material/styles'

import { gql, useQuery } from '@apollo/client'

import Link from 'next/link'

import { CircularProgress } from '@mui/material'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import invert from 'invert-color'
import { Stats } from './Stats'

const PREFIX = 'MAU'

const classes = {
  list: `${PREFIX}-list`,
  a: `${PREFIX}-a`,
  icon: `${PREFIX}-icon`,
  number: `${PREFIX}-number`,
}

const Root = styled('div')(({ theme }) => {
  const color = theme.palette.warning.main

  return {
    [`& .${classes.list}`]: {
      '&:hover': {
        '& $icon': {
          color: invert(color),
        },
        '& $number': {
          color: invert(color),
        },
      },
    },
    [`& .${classes.a}`]: {
      '&:-webkit-any-link': {
        color: 'inherit',
      },
      textDecoration: 'none',
    },
    [`& .${classes.icon}`]: {
      color,
      fontSize: '5rem',
    },
    [`& .${classes.number}`]: {
      color,
    },
  }
})
const MONTHLY_ACTIVE_USERS = gql`
  query MonthlyActiveUsers {
    monthlyActiveUsers {
      monthlyActiveUsers
    }
  }
`
export const MonthlyActiveUsers = () => {
  const { data, loading } =
    useQuery<{ monthlyActiveUsers: { monthlyActiveUsers: number } }>(
      MONTHLY_ACTIVE_USERS,
    )

  if (loading) {
    return <CircularProgress></CircularProgress>
  }

  if (data) {
    const icon = <PersonPinIcon className={classes.icon} />
    return (
      <Root>
        <Link
          href={{
            pathname: '/admin/users',
          }}
        >
          <a className={classes.a}>
            <Stats
              title="Monthly Active Users"
              value={data?.monthlyActiveUsers.monthlyActiveUsers}
              icon={icon}
            ></Stats>
            {/* <List className={classes.list}>
              <ListItem>
                <ListItemIcon>
                  <CachedTwoTone className={classes.icon} />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    className={classes.number}
                    component="span"
                    variant="h2"
                  >
                    {data?.monthlyActiveUsers.monthlyActiveUsers}{' '}
                  </Typography>
                  <Typography component="span" variant="h4">
                    monthly active users.
                  </Typography>
                </ListItemText>
              </ListItem>
            </List> */}
          </a>
        </Link>
      </Root>
    )
  }
  return null
}
