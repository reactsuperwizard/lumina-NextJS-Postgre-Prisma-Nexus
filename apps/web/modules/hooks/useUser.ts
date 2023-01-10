import { useContext } from 'react'
import { UserContext } from 'modules/providers/user'

export const useUser = () => useContext(UserContext)!
