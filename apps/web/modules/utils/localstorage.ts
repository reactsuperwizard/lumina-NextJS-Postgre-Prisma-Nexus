import config from '../providers/auth/config.json'

const getKey = (): string => {
  return `@@auth0spajs@@::${config.client_id}::${config.audience}::openid profile email`
}
export const setToken = (
  accessToken: string,
  idToken: string,
  expiresIn: number,
  expiresAt: number,
  decodedToken: any,
) => {
  window.localStorage.setItem(
    getKey(),
    JSON.stringify({
      body: {
        client_id: config.client_id,
        access_token: accessToken,
        audience: config.audience,
        id_token: idToken,
        scope: 'openid profile email',
        expires_in: expiresIn,
        token_type: 'Bearer',
        decodedToken: decodedToken,
      },
      expiresAt: expiresAt,
    }),
  )
}

export const resetTenants = (tenant: any) => {
  const tokenData = JSON.parse(window.localStorage.getItem(getKey()) as string)
  tokenData.body.decodedToken.user['https://lumina.com/tenants'] = tenant
  window.localStorage.setItem(getKey(), JSON.stringify(tokenData))
}

export const clearToken = () => {
  window.localStorage.removeItem(getKey())
}
