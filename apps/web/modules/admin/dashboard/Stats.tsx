import { styled, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
interface Props {
  title: string
  value: number
  icon: React.ReactNode
}

const PREFIX = 'Stats'

const classes = {
  root: `${PREFIX}-root`,
}

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [`& .${classes.root}`]: {
    padding: '0.5rem',
    textAlign: 'center',
  },
}))

export const Stats = ({ title, value, icon }: Props) => {
  return (
    <Root>
      <Box pr={1}>{icon}</Box>
      <Box className={`${classes.root}`}>
        <Typography variant="subtitle1" color="#696969">
          {title}
        </Typography>
        <Typography fontSize={'2.3rem'} fontWeight="700">
          {value}
        </Typography>
      </Box>
    </Root>
  )
}
