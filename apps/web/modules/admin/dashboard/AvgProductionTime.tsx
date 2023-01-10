import React, { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles';

import { useQuery } from '@apollo/client'

import Link from 'next/link'

import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
  Select,
  MenuItem,
} from '@mui/material'

import { CardGiftcardTwoTone } from '@mui/icons-material'
import invert from 'invert-color'

import { AVG_REQUEST_COMPLETION } from './AVG_REQUEST_COMPLETION'

import type {
  AvgRequestCompletionQuery,
  AvgRequestCompletionResults,
} from './AVG_REQUEST_COMPLETION'

const PREFIX = 'AvgProductionTime';

const classes = {
  interactive: `${PREFIX}-interactive`,
  a: `${PREFIX}-a`,
  icon: `${PREFIX}-icon`,
  number: `${PREFIX}-number`
};

const StyledList = styled(List)((
  {
    theme
  }
) => {
  const color = theme.palette.info.main

  return {
    [`& .${classes.interactive}`]: {
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
  };
});

enum Options {
  Trailing30,
  Trailing90,
  ThisMonth,
  LastMonth,
  ThisYear,
}

export const AvgProductionTime = () => {
  const [start, setStart] = useState<Date | null>(null)
  const [end, setEnd] = useState<Date | null>(null)

  const [selection, setSelection] = useState(Options.Trailing30)

  useEffect(() => {
    const rightNow = new Date()
    const year = rightNow.getFullYear()
    const month = rightNow.getMonth()

    switch (selection) {
      case Options.Trailing30:
        setStart(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
        setEnd(rightNow)
        break
      case Options.Trailing90:
        setStart(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000))
        setEnd(rightNow)
        break
      case Options.ThisMonth:
        setStart(new Date(year, month, 1))
        setEnd(rightNow)
        break
      case Options.LastMonth:
        setStart(new Date(year, month - 1, 1))
        setEnd(new Date(year, month, 0))
        break
      case Options.ThisYear:
        setStart(new Date(year, 0, 1))
        setEnd(rightNow)
        break
      default:
        throw new Error()
    }
  }, [selection])


  const { data, loading } = useQuery<
    AvgRequestCompletionResults,
    AvgRequestCompletionQuery
  >(AVG_REQUEST_COMPLETION, {
    skip: !end || !start,
    variables: { end: end as Date, start: start as Date },
  })

  if (loading) {
    return <CircularProgress></CircularProgress>
  }

  if (data) {
    const hours =
      Math.round((data?.time / (1000 * 60 * 60) + Number.EPSILON) * 10) / 10
    const days =
      Math.round((data?.time / (1000 * 60 * 60 * 24) + Number.EPSILON) * 10) /
      10
    return (
      <StyledList>
        <ListItem>
          <ListItemText>
            <em>
              All requests <b>completed</b> in a given timeperiod.
            </em>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CardGiftcardTwoTone className={classes.icon} />
          </ListItemIcon>
          <ListItemText>
            <Select
              value={selection}
              onChange={(e) => setSelection(e.target.value as Options)}
            >
              <MenuItem value={Options.Trailing30}>Last 30 Days</MenuItem>
              <MenuItem value={Options.Trailing90}>Last 90 Days</MenuItem>
              <MenuItem value={Options.ThisMonth}>This Month</MenuItem>
              <MenuItem value={Options.LastMonth}>Last Month</MenuItem>
              <MenuItem value={Options.ThisYear}>This Year</MenuItem>
            </Select>
          </ListItemText>
        </ListItem>
        <Link
          href={{
            pathname: '/admin/requests',
          }}
        >
          <a className={classes.a}>
            <ListItem className={classes.interactive}>
              <ListItemText>
                <Typography
                  className={classes.number}
                  component="span"
                  variant="h2"
                >
                  {hours}{' '}
                </Typography>
                <Typography component="span" variant="h4">
                  Hrs to produce.
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem className={classes.interactive}>
              <ListItemText>
                <Typography
                  className={classes.number}
                  component="span"
                  variant="h2"
                >
                  {days}{' '}
                </Typography>
                <Typography component="span" variant="h4">
                  Days to produce.
                </Typography>
              </ListItemText>
            </ListItem>
          </a>
        </Link>
      </StyledList>
    );
  }
  return null
}
