import { useEffect } from 'react'

import { useRouter } from 'next/router'

export const UserPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(`${router.pathname}/profile`, `${router.asPath}/profile`, {
      shallow: true,
    })
  }, [])

  return null
}

export default UserPage
