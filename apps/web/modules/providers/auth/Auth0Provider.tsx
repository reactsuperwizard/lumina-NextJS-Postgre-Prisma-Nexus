/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect } from 'react'

import createAuth0Client from '@auth0/auth0-spa-js'

import {
  Auth0Client,
  RedirectLoginOptions,
  GetTokenWithPopupOptions,
  GetTokenSilentlyOptions,
  LogoutOptions,
  getIdTokenClaimsOptions,
  RedirectLoginResult,
} from '@auth0/auth0-spa-js/dist/typings'

import config from './config.json'

import { Auth0Context } from './Auth0Context'
import { Auth0User } from './Auth0User'
import Router, { useRouter } from 'next/router'
import { clearToken } from 'modules/utils'

export interface AppState {
  returnTo?: string
  firstLogin?: 'true'
}

interface IAuth0ProviderOptions {
  children: React.ReactElement
}

export const Auth0Provider = ({ children }: IAuth0ProviderOptions) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  // const [isFirstLogin, setIsFirstLogin] = useState<boolean | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  // const [isRedirecting, setIsRedirecting] = useState(false)
  const [user, setUser] = useState<Auth0User | null>(null)
  const [auth0Client, setAuth0Client] = useState<Auth0Client>()
  // A function that routes the user to the right place
  // after login
  // const onRedirectCallback = async (
  //   router: NextRouter,
  //   appState?: AppState,
  // ) => {
  //   const { firstLogin, returnTo } = appState || {}
  //   const url = returnTo || window.location.pathname
  //   if (firstLogin && firstLogin === 'true') {
  //     setIsFirstLogin(true)
  //   }
  //   setIsRedirecting(true)

  //   await router.replace(url)
  // }

  const isPublicPath = () => {
    return ['/embed', '/signin', '/signup', '/templates'].some((route) =>
      router.pathname.includes(route),
    )
  }

  const initAuth0 = async (newLogin: boolean): Promise<void> => {
    setIsInitializing(true)
    setIsAuthenticated(false)
    const { domain, client_id, audience } = config
    const auth0FromHook = await createAuth0Client({
      client_id,
      domain,
      audience,
      redirect_uri: `${window.location.origin}/auth`,
      cacheLocation: 'localstorage',
    })
    setAuth0Client(auth0FromHook)
    // if (window.location.search.includes('code=')) {
    //   let { appState }: RedirectLoginResult = {}
    //   try {
    //     ;({ appState } = await auth0FromHook.handleRedirectCallback())
    //     // const foo = await auth0FromHook.handleRedirectCallback()
    //   } finally {
    //     await onRedirectCallback(router, appState)
    //   }
    // }
    const authed = await auth0FromHook.isAuthenticated()
    if (authed) {
      if (process.env.ENV !== 'production') {
        auth0FromHook.getTokenSilently().then((token) => {
          console.info(`Bearer ${token}`)
          console.info(process.env.LUMINA_API_ENDPOINT)
        })
      }
      const userProfile: Auth0User = await auth0FromHook.getUser()
      setIsAuthenticated(true)
      setUser(userProfile)
      setIsInitializing(false)
      if (newLogin) {
        fetch(process.env.LUMINA_API_ENDPOINT as string, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `mutation createLoginHistory($data: LoginHistoryCreateInput!) {
            createOneLoginHistory(data: $data) {
              userId
              loggedInAt
              }
            }`,
            variables: {
              data: {
                user: { connect: { email: userProfile?.email } },
                loggedInAt: new Date(),
              },
            },
          }),
        }).then()
      }
    } else {
      setIsInitializing(false)
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    if (isPublicPath()) {
      setIsInitializing(false)
      return
    }
    if (auth0Client) return
    initAuth0(true)
  }, [])

  useEffect(() => {
    // TEMPORARY
    // ADD ROUTE LEVEL LOGIC TO HANDLE PUBLIC VS. PRIVATE ROUTES
    if (isInitializing) return
    if (!user && !isPublicPath()) {
      // const appState: AppState = { returnTo: window.location.href }
      loginWithRedirect()
    }
  }, [isInitializing])

  // const handleRedirectCallback = async () => {
  //   setIsInitializing(true)

  //   const result = await auth0Client!.handleRedirectCallback()
  //   const userProfile = await auth0Client!.getUser()
  //   setIsInitializing(false)
  //   setIsAuthenticated(true)
  //   setUser(userProfile)

  //   return result
  // }

  const loginWithRedirect = (to?: string) => {
    if (window.location.href.includes('/signin')) {
      return
    }
    if (!to) to = window.location.href.replace(window.location.origin, '')
    clearToken()
    Router.replace({ pathname: '/signin', query: { to } })
  }
  // auth0Client!.loginWithRedirect(options)

  const getTokenSilently = (options?: GetTokenSilentlyOptions) =>
    auth0Client!.getTokenSilently(options)

  const logout = async (o?: LogoutOptions) => {
    auth0Client!.logout(o)
    clearToken()
    // router.replace('/signin')
  }

  // const getIdTokenClaims = (options?: getIdTokenClaimsOptions) =>
  //   auth0Client!.getIdTokenClaims(options)

  // const getTokenWithPopup = (options?: GetTokenWithPopupOptions) =>
  //   auth0Client!.getTokenWithPopup(options)

  return (
    <Auth0Context.Provider
      value={{
        user,
        isAuthenticated,
        isInitializing,
        // isFirstLogin,
        // isRedirecting,
        loginWithRedirect,
        logout,
        getTokenSilently,
        // handleRedirectCallback,
        // getIdTokenClaims,
        // getTokenWithPopup,
        initAuth0,
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
