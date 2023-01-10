import React from 'react'

import { styled } from '@mui/material/styles'

import { useQuery } from '@apollo/client'

import Link from 'next/link'

import { QueryTotalCustomersArgs } from '@lumina/api'
import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'

import { GET_CUSTOMERS } from './GET_CUSTOMERS'

import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import invert from 'invert-color'
import { Stats } from './Stats'

const PREFIX = 'NewCustomers'

const classes = {
  list: `${PREFIX}-list`,
  a: `${PREFIX}-a`,
  icon: `${PREFIX}-icon`,
  number: `${PREFIX}-number`,
}

const Root = styled('div')(({ theme }) => {
  const color = theme.palette.success.main

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

// 30 days, hours, minutes, seconds, milliseconds
const priorByDays = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

export const NewCustomers = () => {
  const variables = {
    where: { createdAt: { gt: priorByDays } },
  }

  const { data, loading } = useQuery<
    { totalCustomers: { count: number } },
    QueryTotalCustomersArgs
  >(GET_CUSTOMERS, {
    variables,
  })

  if (loading) {
    return <CircularProgress></CircularProgress>
  }

  if (data) {
    const icon = <AccountBalanceIcon className={classes.icon} />
    return (
      <Root>
        <Link
          href={{
            pathname: '/admin/customers',
            query: {
              args: encodeURIComponent(JSON.stringify({ ...variables })),
            },
          }}
        >
          <a className={classes.a}>
            <Stats
              title="Customers"
              value={data?.totalCustomers.count}
              icon={icon}
            ></Stats>
            {/*  <List className={classes.list}>
              <ListItem>
                <ListItemIcon>
                  <BathtubIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    className={classes.number}
                    component="span"
                    variant="h2"
                  >
                    {data?.totalCustomers.count}{' '}
                  </Typography>
                  <Typography component="span" variant="h4">
                    new customers in last 30 days.
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>*/}
          </a>
        </Link>
      </Root>
    )
  }
  return null
}
