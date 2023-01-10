import React from 'react'
import { styled } from '@mui/material/styles'
import { Card, CardContent } from '@mui/material'
import { OptOutSwitch } from '../../admin/Components/OptOutSwitch'
const PREFIX = 'Settings'

const classes = {
  form: `${PREFIX}-form`,
  input: `${PREFIX}-input`,
}

const StyledCard = styled(Card)(({ theme }) => ({
  [`& .${classes.form}`]: {
    width: '100%',
    marginTop: theme.spacing(3),
  },

  [`& .${classes.input}`]: {
    backgroundColor: 'white',
  },
}))

export const Settings = () => {
  return (
    <StyledCard>
      <CardContent>
        <OptOutSwitch />
      </CardContent>
    </StyledCard>
  )
}
