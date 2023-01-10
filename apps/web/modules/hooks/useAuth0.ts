import { useContext } from 'react'
import { Auth0Context } from 'modules/providers'

export const useAuth0 = () => useContext(Auth0Context)!
