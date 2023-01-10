import React, { useEffect } from 'react'

import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'

import type { AppProps } from 'next/app'

import theme from '@lumina/web/modules/layouts/theme'
import { PlausibleProvider } from '../modules/Plausible'


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return <>
    <PlausibleProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </PlausibleProvider>
  </>;
}

export default MyApp
