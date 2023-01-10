import React, { FunctionComponent } from 'react'
import { styled } from '@mui/material/styles'
import { ILayout } from './Types'
import { Box, Link, Typography } from '@mui/material'

import { Logo } from './Logo'

const PREFIX = 'SignIn'

const classes = {
  portalBody: `${PREFIX}-portalBody`,
  copyRight: `${PREFIX}-copyRight`,
}

const Root = styled('div')({
  [`& .${classes.portalBody}`]: {
    // backgroundColor: '#F0EFEF',
    // height: '1000px',
  },
  [`& .${classes.copyRight}`]: {
    marginBottom: '2rem',
  },
})

function Copyright() {
  return (
    <div className={classes.copyRight}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.midashealth.co/">
          Lumina
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  )
}

export const SignIn: FunctionComponent<ILayout> = ({ children }: ILayout) => {
  return (
    <Root>
      <Logo darkBackground={true} />
      <div className={classes.portalBody}>{children}</div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Root>
  )
}
