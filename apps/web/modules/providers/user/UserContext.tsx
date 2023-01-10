import React from 'react'

export interface IUserContext {
  freeRequestId: number
  hasFreeRequest: boolean
  email: string
  firstName: string
  lastName: string
  avatar: string
  isUserActive: boolean
  id: number
  loading: boolean
  isApproved: boolean
  refresh: (email: string) => Promise<void>
}

export const UserContext = React.createContext<IUserContext | null>(null)
