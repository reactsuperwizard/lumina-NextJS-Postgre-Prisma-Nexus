import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Main } from 'modules/layouts/Main'
import { Videos } from 'modules/portal/videos'
import { useAuth0 } from 'modules/hooks'

export const HomePage = () => {
  const router = useRouter()
  const slug = router.query?.portal
  const { user } = useAuth0()

  useEffect(() => {
    if (!slug || !user) return
    router.push(`./${slug.toString().toLowerCase()}/videos`)
  }, [slug, user])

  return <Videos />
}

HomePage.Layout = Main

export default HomePage
