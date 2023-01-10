import React from 'react'
import { Auth0User } from './Auth0User'

import {
  // PopupLoginOptions,
  RedirectLoginOptions,
  GetTokenWithPopupOptions,
  GetTokenSilentlyOptions,
  LogoutOptions,
  getIdTokenClaimsOptions,
  RedirectLoginResult,
  IdToken,
} from '@auth0/auth0-spa-js/dist/typings'

export interface IAuth0Context {
  user: Auth0User | null
  isAuthenticated: boolean | null
  isInitializing: boolean // make sure auth0 client is initialized
  // isRedirecting: boolean // allow handling of redirects at component level, e.g. /auth  and /, etc.
  // isFirstLogin: boolean | null // provide context information for onboarding, or other prompts at first login
  // handleRedirectCallback(): Promise<RedirectLoginResult>
  // getIdTokenClaims(o?: getIdTokenClaimsOptions): Promise<IdToken>
  loginWithRedirect(o?: string): void
  getTokenSilently(o?: GetTokenSilentlyOptions): Promise<string | undefined>
  // getTokenWithPopup(o?: GetTokenWithPopupOptions): Promise<string | undefined>
  logout(o?: LogoutOptions): void
  initAuth0(newLogin: boolean): Promise<void>
}

export const Auth0Context = React.createContext<IAuth0Context | null>(null)
