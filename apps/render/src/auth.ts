import { AuthenticationClient, TokenResponse } from 'auth0'

const auth0 = new AuthenticationClient({
  domain: 'dev-2fat32cy.auth0.com',
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
})

export const getToken = async (): Promise<string> => {
  try {
    if (!process.env.AUTH0_AUDIENCE)
      throw new Error('Check your .env.local file for AUTH0_AUDIENCE')

    const {
      access_token,
      token_type,
    }: TokenResponse & { scope?: string } = await auth0.clientCredentialsGrant({
      audience: process.env.AUTH0_AUDIENCE,
    })
    return `${token_type} ${access_token}`
  } catch (e) {
    throw e
  }
}
