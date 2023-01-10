import { gql, useApolloClient } from '@apollo/client'
import React, { useEffect } from 'react'

import { useAuth0 } from 'modules/hooks'

import { GtagContext } from './GtagContext'

import { User } from '@lumina/api'

const GET_USER = gql`
  query me($email: String!) {
    me(where: { email: $email }) {
      id
    }
  }
`

export const GtagProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const gtag = window.gtag

  const { user } = useAuth0()
  const client = useApolloClient()

  useEffect(() => {
    if (user) {
      const { email } = user
      const getUser = async () => {
        const { data, error } = await client.query<{ me: Pick<User, 'id'> }>({
          query: GET_USER,
          variables: { email },
        })
        if (error) console.error(error)
        gtag('config', process.env.GA_TRACKING_ID as string, {
          user_id: data.me.id,
        })
      }
      setTimeout(() => {
        getUser()
      }, 100)
    }
  }, [user])

  return (
    <GtagContext.Provider value={{ gtag }}>{children}</GtagContext.Provider>
  )
}
