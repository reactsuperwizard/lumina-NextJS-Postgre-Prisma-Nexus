import fetch, { Headers } from 'node-fetch'

export const loginUser = async (email: string, password: string) => {
  const body = new URLSearchParams()
  body.append('grant_type', 'password')
  body.append('username', email)
  body.append('password', password)
  body.append('scope', 'openid profile email')
  body.append('client_id', process.env.AUTH0_CLIENT_ID as string)
  body.append('client_secret', process.env.AUTH0_CLIENT_SECRET as string)

  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  }

  const loginRes = await fetch(
    `https://${process.env.AUTH0_DOMAIN}.auth0.com/oauth/token`,
    requestOptions,
  )
  const response = await loginRes.json()
  return response
}
