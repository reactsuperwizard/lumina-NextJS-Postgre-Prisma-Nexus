import React, { useEffect } from 'react'

// import { ThemeProvider } from '@mui/material/styles'

// import theme from 'modules/theme'

import type { AppProps } from 'next/app'
import { PlausibleProvider } from 'modules/Plausible'
import { CssBaseline } from '@mui/material'
// import { Analytics } from 'modules/Analytics'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <CssBaseline />
      <PlausibleProvider>
        <Component {...pageProps} />
      </PlausibleProvider>

      <style jsx global>{`
        body {
          background-color: transparent;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  )
}

export default MyApp
