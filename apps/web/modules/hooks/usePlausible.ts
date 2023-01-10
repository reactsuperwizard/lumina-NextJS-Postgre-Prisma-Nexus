import { useContext } from 'react'
import { PlausibleContext } from 'modules/providers'

export const usePlausible = () => useContext(PlausibleContext)!
