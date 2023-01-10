import React, { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles'

import { Box, Button } from '@mui/material'
import { Alarm, CheckCircle } from '@mui/icons-material'
const PREFIX = 'ServerStatus'

const classes = {
  typography: `${PREFIX}-typography`,
  successIcon: `${PREFIX}-successIcon`,
  failIcon: `${PREFIX}-failIcon`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.typography}`]: {
    color: theme.palette.primary.contrastText,
  },

  [`& .${classes.successIcon}`]: {
    color: theme.palette.success.main,
    verticalAlign: 'middle',
  },

  [`& .${classes.failIcon}`]: {
    color: theme.palette.error.main,
    verticalAlign: 'middle',
  },
}))

export const ServerStatus = ({ open }: { open: boolean }) => {
  const [status, setStatus] = useState(true)

  // http://localhost:4000/.well-known/apollo/server-health
  // will always return an error in development, since requests to http from https are
  // a no go
  // therefore, only request to next.api or api
  let endpoint = 'https://api.lumina.co/.well-known/apollo/server-health'
  if (process.env.LUMINA_API_ENDPOINT === 'https://next.api.lumina.co') {
    endpoint = 'https://next.api.lumina.co/.well-known/apollo/server-health'
  }

  const checkStatus = async () => {
    try {
      const res = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const message = await res.json()
      if (res.status === 200 && message.status === 'pass') {
        setStatus(true)
      } else {
        setStatus(false)
      }
    } catch (e) {
      setStatus(false)
    }
  }

  useEffect(() => {
    checkStatus()
    const interval = setInterval(() => {
      checkStatus()
    }, 20000)
    return () => clearInterval(interval)
  }, [])

  return (
    <StyledBox p={2}>
      <a target="_blank" rel="noreferrer" href={endpoint}>
        <Button
          variant="contained"
          color="primary"
          endIcon={
            open &&
            (status ? (
              <CheckCircle className={classes.successIcon} />
            ) : (
              <Alarm className={classes.failIcon} />
            ))
          }
          style={{ minWidth: 0 }}
        >
          {open ? (
            'Server Status'
          ) : status ? (
            <CheckCircle className={classes.successIcon} fontSize="small" />
          ) : (
            <Alarm className={classes.failIcon} fontSize="small" />
          )}
        </Button>
      </a>
    </StyledBox>
  )
}
