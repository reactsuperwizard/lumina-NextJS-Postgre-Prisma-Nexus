import { FunctionComponent, useEffect } from 'react'

import { useAuth0, useTenant } from 'modules/hooks'
// import { gql, useMutation } from '@apollo/client'

// const CREATE_LOGIN_HISTORY = gql`
//   mutation createLoginHistory($data: LoginHistoryCreateInput!) {
//     createOneLoginHistory(data: $data) {
//       userId
//       loggedInAt
//     }
//   }
// `
// This route serves as a callback for Auth0 after successful auth
// For fringe cases where user travel's direct to url
// 1. this component will force login with redirect if user is NOT logged in
// 2. will redirect to first tenant if user is logged in but tries to visit /auth
const Auth: FunctionComponent = () => {
  const { isAuthenticated, isInitializing, loginWithRedirect, user } =
    useAuth0()

  const { redirectToCustomer } = useTenant()
  // const [createLoginHistory] = useMutation(CREATE_LOGIN_HISTORY)
  useEffect(() => {
    // redirect from auth.lumina.co
    if (isInitializing) return
    // handle fringe cases where user is not authenticated and travels directly to route
    if (!isAuthenticated) {
      loginWithRedirect()
    }
    // handle fringe case where user is authed but travels directly to /auth
    if (isAuthenticated) {
      // createLoginHistory({
      //   variables: {
      //     data: {
      //       user: { connect: { email: user?.email } },
      //       loggedInAt: new Date(),
      //     },
      //   },
      // })
      redirectToCustomer()
    }
  }, [isAuthenticated])

  return null
}

export default Auth
