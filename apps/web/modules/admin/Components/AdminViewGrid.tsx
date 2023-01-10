import React, { ReactNode } from 'react'

import { Box, Container, Grid, Typography } from '@mui/material'

interface Props {
  children: ReactNode
  searchBar?: ReactNode
  heading: string
}

export const AdminViewGrid = ({ children, heading, searchBar }: Props) => {
  return (
    <Container maxWidth="xl">
      <Box my={2} margin="0 1rem">
        <Box>
          <Grid justifyContent="space-between" container>
            <Grid item sm={5}>
              <Typography variant="h2">{heading}</Typography>
            </Grid>
            {searchBar}
          </Grid>
        </Box>
        <Box my={2}>
          <Grid justifyContent="center" container>
            <Grid item sm={12}>
              {children}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
