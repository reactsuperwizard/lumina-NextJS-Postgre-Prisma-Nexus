import fetch, { Headers } from 'node-fetch'

export const forgotPassword = async (email: string) => {
  var headers = new Headers()
  headers.append('Content-Type', 'application/json')

  var raw = JSON.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    email,
    connection: 'Username-Password-Authentication',
  })

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
  }

  const res = await fetch(
    `https://${process.env.AUTH0_DOMAIN}.auth0.com/dbconnections/change_password`,
    requestOptions,
  )
  const response = await res.text()
  return response
}
