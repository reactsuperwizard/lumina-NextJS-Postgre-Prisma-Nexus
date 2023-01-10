import React from 'react'

import { SignIn as SignInLayout } from 'modules/layouts/SignIn'
import { SignIn } from 'modules/signin/SignIn'

export const SignInPage = () => {
  return <SignIn></SignIn>
}

SignInPage.Layout = SignInLayout

export default SignInPage
