import React from 'react'

import { Container, Grid, Paper, Typography, Box, styled } from '@mui/material'
import { NewCustomers } from './NewCustomers'
import { SubmittedRequests } from './SubmittedRequests'
import { InProgressRequests } from './InProgressRequests'
import { NewVideos } from './NewVideos'
import { NewUsers } from './NewUsers'
import { DailyActiveUsers } from './DailyActiveUsers'
import { MonthlyActiveUsers } from './MonthlyActiveUsers'
import { RatedVideos } from './RatedVideos'

const PREFIX = 'Dashboard'

const classes = {
  radius: `${PREFIX}-radius`,
}

const StyledContainer = styled(Container)(({ theme }) => ({
  [`& .${classes.radius}`]: {
    borderRadius: '0.75rem',
  },
}))

export const Dashboard = () => {
  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid container>
          <Box>
            <Typography variant="h2">Dashboard</Typography>
          </Box>
        </Grid>
        <Grid container spacing={2}>
          <Grid container spacing={1}>
            <Box mx={2} px={2} mt={2} pt={2} mb={0} pb={0}>
              <Typography variant="h6" color="#808080">
                Live
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Paper elevation={2} className={classes.radius}>
              <Box m={1} p={1}>
                <InProgressRequests />
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={2} className={classes.radius}>
              <Box m={1} p={1}>
                <SubmittedRequests />
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={2} className={classes.radius}>
              <Box m={1} p={1}>
                <RatedVideos />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Grid container>
          <Box my={1}>
            <Typography variant="h6" color="#808080">
              Last 30 days
            </Typography>
          </Box>
        </Grid>

        <Grid container mb={2} spacing={2}>
          <Grid item>
            <Paper elevation={2} className={classes.radius}>
              <Box m={1} p={1}>
                <NewCustomers />
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={2} className={classes.radius}>
              <Box m={1} p={1}>
                <MonthlyActiveUsers />
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={2} className={classes.radius}>
              <Box m={1} p={1}>
                <Typography>
                  <NewUsers />
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={2} className={classes.radius}>
              <Box m={1} p={1}>
                <Typography>
                  <NewVideos />
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <DailyActiveUsers />
      </Grid>
    </StyledContainer>
  )
}
