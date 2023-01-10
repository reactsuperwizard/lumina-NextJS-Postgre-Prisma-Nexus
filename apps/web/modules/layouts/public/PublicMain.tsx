import React, { FunctionComponent, useState } from 'react'
import { styled } from '@mui/material/styles'
import { ILayout } from '../Types'
import CssBaseline from '@mui/material/CssBaseline'
import { Container } from '@mui/material'

const PREFIX = 'PublicMain'

const classes = {
  root: `${PREFIX}-root`,
  appBarSpacer: `${PREFIX}-appBarSpacer`,
  content: `${PREFIX}-content`,
  container: `${PREFIX}-container`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
  },

  [`& .${classes.appBarSpacer}`]: theme.mixins.toolbar,

  [`& .${classes.content}`]: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'default',
  },

  [`& .${classes.container}`]: {},
}))

export const PublicMain: FunctionComponent<ILayout> = ({
  children,
}: ILayout) => {
  return (
    <Root className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.container}>
          <div>{children}</div>
        </Container>
      </main>
    </Root>
  )
}
