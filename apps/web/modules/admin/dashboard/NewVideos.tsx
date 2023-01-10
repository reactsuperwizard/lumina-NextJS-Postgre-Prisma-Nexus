import React from 'react'

import { styled } from '@mui/material/styles'

import { useQuery } from '@apollo/client'

import Link from 'next/link'

import { QueryTotalVideosArgs } from '@lumina/api'
import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'

import { GET_VIDEOS } from './GET_VIDEOS'

import invert from 'invert-color'
import VideocamIcon from '@mui/icons-material/Videocam'
import { Stats } from './Stats'

const PREFIX = 'NewVideos'

const classes = {
  list: `${PREFIX}-list`,
  a: `${PREFIX}-a`,
  icon: `${PREFIX}-icon`,
  number: `${PREFIX}-number`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.list}`]: {
    '&:hover': {
      '& $icon': {
        color: invert(theme.palette.secondary.light),
      },
      '& $number': {
        color: invert(theme.palette.secondary.light),
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
    color: theme.palette.secondary.dark,
    fontSize: '5rem',
  },

  [`& .${classes.number}`]: {
    color: theme.palette.secondary.light,
  },
}))

// 30 days, hours, minutes, seconds, milliseconds
const priorByDays = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

export const NewVideos = () => {
  const variables = {
    where: { createdAt: { gt: priorByDays } },
  }

  const { data, loading } = useQuery<
    { totalVideos: { count: number } },
    QueryTotalVideosArgs
  >(GET_VIDEOS, {
    variables,
  })

  if (loading) {
    return <CircularProgress></CircularProgress>
  }

  if (data) {
    const icon = <VideocamIcon className={classes.icon} />
    return (
      <Root>
        <Link
          href={{
            pathname: '/admin/videos',
            query: {
              args: encodeURIComponent(JSON.stringify({ ...variables })),
            },
          }}
        >
          <a className={classes.a}>
            <Stats
              title="Videos"
              value={data?.totalVideos.count}
              icon={icon}
            ></Stats>
            {/* <List className={classes.list}>
              <ListItem>
                <ListItemIcon>
                  <FavoriteTwoTone className={classes.icon} />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    className={classes.number}
                    component="span"
                    variant="h2"
                  >
                    {data?.totalVideos.count}{' '}
                  </Typography>
                  <Typography component="span" variant="h4">
                    new videos in last 30 days.
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
