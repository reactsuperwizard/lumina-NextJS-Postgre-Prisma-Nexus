import jwt, { JwtPayload } from 'jsonwebtoken'

export const decodeToken = (idToken: string) => {
  const token = jwt.decode(idToken, { complete: true })
  const encoded = idToken?.split('.')
  const { iss, exp, iat, aud, ...user } = token?.payload as JwtPayload

  const decodedToken = {
    claims: token?.payload,
    header: token?.header,
    encoded: {
      header: encoded[0],
      payload: encoded[1],
      signature: encoded[2],
    },
    user,
  }

  return { decodedToken, exp }
}
