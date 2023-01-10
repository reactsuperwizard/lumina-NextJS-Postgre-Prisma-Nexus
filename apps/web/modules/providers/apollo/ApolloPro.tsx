import React, { useEffect, useRef, useState } from 'react'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  from,
  HttpLink,
  ApolloLink,
} from '@apollo/client'

import { useAuth0 } from 'modules/hooks'

import { ErrorLink } from './ErrorLink'

// eslint-disable-next-line import/no-unresolved
import { createUploadLink } from 'apollo-upload-client'

const httpLink = () =>
  // createUploadLink may cause problems... Check here first.
  createUploadLink({
    uri: process.env.LUMINA_API_ENDPOINT,
  }) as unknown as HttpLink

export const ApolloPro = ({ children }: { children: React.ReactElement }) => {
  const {
    getTokenSilently,
    isAuthenticated,
    isInitializing,
    loginWithRedirect,
  } = useAuth0()
  const [apolloClient, setApolloClient] = useState<ApolloClient<any> | null>(
    null,
  )
  const [token, setToken] = useState<string>()
  const ref = useRef<string>()
  ref.current = token
  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = ref.current
    // if (
    //   token &&
    //   operation.operationName != 'Login' &&
    //   operation.operationName != 'ForgotPassword'
    // )
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token,
      },
    }))

    return forward(operation)
  })

  useEffect(() => {
    const initClient = async () => {
      let token: null | string = null
      // const headers: any = {}
      if (isAuthenticated) {
        // Use Apollo for unauthenticated calls
        // only Auth0 will fail if user is not authenticated
        token = (await getTokenSilently()) as string
        setToken(`Bearer ${token}`)
        // headers.Authorization = `Bearer ${token}`
      }
      const apolloClient = new ApolloClient({
        link: from([ErrorLink(loginWithRedirect), authMiddleware, httpLink()]),
        cache: new InMemoryCache(),
      })
      setApolloClient(apolloClient)
    }
    if (!apolloClient && !isInitializing) {
      initClient()
    }
  }, [isInitializing])

  useEffect(() => {
    const getToken = async () => {
      const token = (await getTokenSilently()) as string
      setToken(`Bearer ${token}`)
    }
    if (isAuthenticated) {
      getToken()
    }
  }, [isAuthenticated])

  if (apolloClient)
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
  return null
}
