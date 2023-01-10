import React from 'react'

import { styled } from '@mui/material/styles'

import Link from 'next/link'

import { useAuth0 } from 'modules/hooks'

import { useQuery, gql } from '@apollo/client'
import {
  Button,
  CircularProgress,
  Typography,
  Avatar,
  Card,
  CardContent,
  Box,
  Grid,
} from '@mui/material'

import { Subscriptions } from '@mui/icons-material'
import { Customer } from '@lumina/api'

const PREFIX = 'Accounts'

const classes = {
  card: `${PREFIX}-card`,
  avatar: `${PREFIX}-avatar`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.card}`]: {
    cursor: 'pointer',
  },

  [`& .${classes.avatar}`]: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const GET_ACCOUNTS = gql`
  query me($authId: String) {
    me(where: { authId: $authId }) {
      customers {
        id
        slug
        name
      }
    }
  }
`

export const Accounts = () => {
  const { user } = useAuth0()
  const { data, loading, error } = useQuery<{
    me: { customers: Pick<Customer, 'id' | 'slug' | 'name'>[] }
  }>(GET_ACCOUNTS, {
    variables: { authId: user?.sub },
  })

  if (loading || error) {
    return (
      <Box m={2}>
        <Grid container justifyContent="center">
          <Grid item>
            {error ? (
              <Typography>
                Hmm. Something has gone wrong. We can{"'"}t load your accounts.
                Get in touch!
              </Typography>
            ) : null}
            {loading ? <CircularProgress /> : null}
          </Grid>
        </Grid>
      </Box>
    )
  }
  if (data) {
    return (
      <Root>
        {data.me.customers.map((customer) => {
          return (
            <Box key={customer.slug} mb={1}>
              <Link href="/[portal]" as={`/${customer.slug}`}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid
                      spacing={3}
                      justifyContent="space-between"
                      alignItems="center"
                      container
                    >
                      <Grid item xs={3}>
                        <Avatar className={classes.avatar} variant="rounded">
                          <Subscriptions fontSize="large" />
                        </Avatar>
                      </Grid>
                      <Grid xs={9} item style={{ textAlign: 'center' }}>
                        <Button variant="outlined" color="primary">
                          {customer.name}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Link>
            </Box>
          )
        })}
      </Root>
    )
  }
  return null
}
