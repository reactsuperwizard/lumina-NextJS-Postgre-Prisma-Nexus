import 'cross-fetch/polyfill'
import React, { useEffect } from 'react'

import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../modules/layouts/theme'

import { AppProps } from 'next/app'
import Head from 'next/head'
import bgBlur from 'public/BgBlur.png'
import {
  Auth0Provider,
  TenantProvider,
  GtagProvider,
  ApolloPro,
  PlausibleProvider,
} from 'modules/providers'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { CaptureConsole } from '@sentry/integrations'

import { NextPage } from 'next'
import { NextWebVitalsMetric } from 'next/app'
import { ILayout } from 'modules/layouts/Types'
import { BigErrorSplash } from 'modules/utils/BigErrorSplash'
import { UserProvider } from 'modules/providers/user'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

type PageWithLayout = NextPage & {
  Layout: ILayout | undefined
}

export const reportWebVitals = ({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) => {
  // Use `window.gtag` if you initialized Google Analytics as this example:
  // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js
  // use React GA Everywhere else
  window.gtag('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}

const App = (props: AppProps) => {
  const { Component, pageProps } = props

  const _PageWithLayout: PageWithLayout = Component as PageWithLayout
  const Layout: ILayout | undefined = _PageWithLayout.Layout

  useEffect(() => {
    // Initiate Sentry
    if (process.env.ENV == 'production')
      Sentry.init({
        dsn: 'https://428277ebde2b4450ac8649bf22e3eb43@o1081270.ingest.sentry.io/6088502',
        integrations: [
          new Integrations.BrowserTracing(),
          new CaptureConsole({ levels: ['error'] }),
        ],
        tracesSampleRate: 0.1, // 0.1 = 10% chance of catching errors, 0.9 = 90% chance, etc.
      })

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  // // // // // // // // // // // //
  // // For use in times of crisis //
  // // // // // // // // // // // //
  // // // // // // // // // // // //
  // return (
  //   <>
  //     <CssBaseline />
  //     <BigErrorSplash />
  //   </>
  // )
  // // // // // // // // // // // //

  return (
    <>
      <Head>
        <title>Lumina</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta property="og:url" content="app.lumina.co" />
        <meta property="og:Title" content="Lumina" />
        <meta property="og:image" content={bgBlur} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Lumina is an online platform that lets anyone create and share video job postings in seconds. Play with Lumina for free."
        />
      </Head>
      <Auth0Provider>
        <ApolloPro>
          <UserProvider>
            <GtagProvider>
              <PlausibleProvider>
                <StyledEngineProvider injectFirst>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <TenantProvider>
                      {Layout ? (
                        <Layout>
                          <Component {...pageProps} />
                        </Layout>
                      ) : (
                        <Component {...pageProps} />
                      )}
                    </TenantProvider>
                  </ThemeProvider>
                </StyledEngineProvider>
              </PlausibleProvider>
            </GtagProvider>
          </UserProvider>
        </ApolloPro>
      </Auth0Provider>
      <style jsx>{`
        :global(body) {
          margin: 0;
        }
      `}</style>
    </>
  )
}

export default App
