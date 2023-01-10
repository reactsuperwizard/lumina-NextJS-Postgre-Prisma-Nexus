import { useEffect } from 'react'
import { useAuth0 } from 'modules/hooks'

export default () => {
  const { logout } = useAuth0()

  useEffect(() => {
    logout({ returnTo: window.location.origin })
  }, [])

  return null
}
