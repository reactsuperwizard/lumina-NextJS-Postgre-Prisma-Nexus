import React from 'react'
import Head from 'next/head'

const { NEXT_PUBLIC_PLAUSIBLE_DOMAIN } = process.env

if (!NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
  throw new Error(
    'Environment variable for NEXT_PUBLIC_PLAUSIBLE_DOMAIN does not exist.',
  )
}

export const PlausibleProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  return (
    <>
      <Head>
        {/* Plausible */}

        <script
          defer
          data-domain={NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/plausible.outbound-links.js"
        />
      </Head>
      {children}
    </>
  )
  // return (
  //   <PlausibleContext.Provider
  //     value={{
  //       videoEvent: plausible,
  //     }}
  //   >
  //     {children}
  //   </PlausibleContext.Provider>
  // )
}
