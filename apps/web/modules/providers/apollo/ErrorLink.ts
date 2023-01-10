import { onError } from '@apollo/client/link/error'
import { IAuth0Context } from '../auth/Auth0Context'

export const ErrorLink = (
  loginWithRedirect: IAuth0Context['loginWithRedirect'],
) =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const { message, locations, path, extensions } of graphQLErrors) {
        switch (extensions?.code) {
          case 'UNAUTHENTICATED':
            loginWithRedirect()
            break
          case 'FORBIDDEN':
            break
        }
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations,
          )}, Path: ${JSON.stringify(path)}`,
        )
      }
    }
    if (networkError) console.error(`[Network error]: ${networkError}`)
  })
