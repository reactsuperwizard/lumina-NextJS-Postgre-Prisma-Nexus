import React from 'react'

export interface IGtagContext {
  gtag: Gtag.Gtag | null
}

export const GtagContext = React.createContext<IGtagContext | null>(null)
