import { FunctionComponent, useEffect } from 'react'

import { useAuth0, useTenant } from 'modules/hooks'

const Home: FunctionComponent = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  const { redirectToCustomer } = useTenant()

  useEffect(() => {
    if (isAuthenticated) {
      redirectToCustomer()
    }
    // TEMP
    if (!isAuthenticated) {
      loginWithRedirect()
    }
  }, [isAuthenticated])

  return null
}

export default Home
