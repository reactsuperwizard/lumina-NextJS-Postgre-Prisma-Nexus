import React, { useEffect, useState } from 'react'

import { PlausibleContext } from './PlausibleContext'

// TL;DR, we are trying to do things with Plausible that it is not meant to do.  Better to use a vendor for event analytics (probably Mixpanel) - but in the meantime,
// here is the work around:
// The provider will silently load Plausible.  Since plausible is used for events on the front end, this is generally fine and avoids
// a bunch of plausible if plausible && blah blah blah
// If you want to use Plausible in providers, where it may not yet be attached, use the isPlausibleLoaded property, to make sure that
// Plausible has been bootstrapped.

export const PlausibleProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const [isPlausibleLoaded, setIsPlausibleLoaded] = useState(false)

  let plausible = () =>
    console.error('You are trying to use plausible before it is loaded')

  if (global.window && (window as any).plausible)
    plausible = (window as any).plausible

  useEffect(() => {
    if (global.window) {
      if ((window as any).plausible) setIsPlausibleLoaded(true)
    }
  }, [plausible])

  return (
    <PlausibleContext.Provider
      value={{
        isPlausibleLoaded,
        videoDownload: plausible,
        socialShare: plausible,
        linkShare: plausible,
        licenseDialog: plausible,
        termsConditionsLink: plausible,
        inactiveCustomerViewsVideo: plausible,
        inactiveCustomerLoginToPortal: plausible,
        portalActivated: plausible,
        signUpButtonClicked: plausible,
        signUpPageVisit: plausible,
        plgAddNewCustomer: plausible,
        plgAddExistingCustomer: plausible,
        inviteTeammateDialogOpen: plausible,
        inviteTeammateSent: plausible,
        requestNewVideoButtonClick: plausible,
      }}
    >
      {children}
    </PlausibleContext.Provider>
  )
}
