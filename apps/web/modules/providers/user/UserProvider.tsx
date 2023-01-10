import { gql, useApolloClient, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'

import { useAuth0 } from 'modules/hooks'

import { UserContext } from './UserContext'

import { User } from '@lumina/api'

const GET_USER = gql`
  query me($email: String!) {
    me(where: { email: $email }) {
      id
      freeRequestId
      hasFreeRequest
      email
      firstName
      lastName
      avatar
      isUserActive
      isApproved
    }
  }
`
interface UserData {
  me: Pick<
    User,
    | 'id'
    | 'freeRequestId'
    | 'hasFreeRequest'
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'avatar'
    | 'isUserActive'
    | 'isApproved'
  >
}
export const UserProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useAuth0()
  // const [userData, setUserData] = useState<UserData>()
  const [firstName, setFirstName] = useState('')
  const [freeRequestId, setFreeRequestId] = useState<number>()
  const [hasFreeRequest, setHasFreeRequest] = useState<boolean>()
  const [email, setEmail] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [avatar, setAvatar] = useState<string>('')
  const [isUserActive, setIsUserActive] = useState<boolean>()
  const [isApproved, setIsApproved] = useState<boolean>()
  const [id, setId] = useState<number>()
  const [getUserData] = useLazyQuery<UserData>(GET_USER)
  useEffect(() => {
    if (user) {
      const { email } = user
      setTimeout(() => {
        getUser(email)
      }, 100)
    }
  }, [user])

  const getUser = async (email: string) => {
    setLoading(true)
    const { data } = await getUserData({
      variables: { email },
    })
    setFirstName(data?.me.firstName!)
    setFreeRequestId(data?.me.freeRequestId!)
    setHasFreeRequest(data?.me.hasFreeRequest!)
    setEmail(data?.me.email!)
    setLastName(data?.me.lastName!)
    setAvatar(data?.me.avatar!)
    setIsUserActive(data?.me.isUserActive!)
    setIsApproved(data?.me.isApproved!)
    setId(data?.me.id)
    // setUserData(userData)
    setLoading(false)
    // if (error) console.error(error)
    return
  }
  return (
    <UserContext.Provider
      value={{
        firstName: firstName!,
        freeRequestId: freeRequestId!,
        hasFreeRequest: hasFreeRequest!,
        email: email!,
        lastName: lastName!,
        avatar: avatar!,
        isUserActive: isUserActive!,
        id: id!,
        isApproved: isApproved!,
        refresh: async (email: string) => {
          await getUser(email)
        },
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
