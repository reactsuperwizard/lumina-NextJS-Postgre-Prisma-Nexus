import { IdToken } from '@auth0/auth0-spa-js'
import { TenantsPayload } from '@lumina/api'

interface NoUnexpectedKeys {
  [key: string]: never
}

export type Auth0User = Omit<IdToken, '__raw'> &
  TenantsPayload &
  NoUnexpectedKeys
