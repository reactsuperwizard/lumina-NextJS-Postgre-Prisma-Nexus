import { useContext } from 'react'
import { GtagContext } from 'modules/providers'

export const useGtag = () => useContext(GtagContext)!
