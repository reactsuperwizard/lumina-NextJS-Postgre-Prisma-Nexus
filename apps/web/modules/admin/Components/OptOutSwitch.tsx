import React from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation, useQuery } from '@apollo/client'
import { User, QueryUserArgs } from '@lumina/api'
import { Switch, FormControlLabel, FormGroup } from '@mui/material'

const GET_USER = gql`
  query User($where: UserWhereUniqueInput!) {
    me(where: $where) {
      optOut
      id
    }
  }
`

const OPT_OUT_USER = gql`
  mutation updateMe($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    user: updateMe(where: $where, data: $data) {
      optOut
      id
    }
  }
`
export const OptOutSwitch = () => {
  const router = useRouter()
  const id = parseInt((router.query.id as string) || 'NaN')
  const { data, refetch } = useQuery<{ me: User }, QueryUserArgs>(GET_USER, {
    variables: {
      where: { id },
    },
  })

  const [updateUserOptOut] =
    useMutation<{ user: Pick<User, 'optOut'> }>(OPT_OUT_USER)

  const handleOptOutChange = (event: any) => {
    const updateOptOutData = !event.target.checked
    updateUserOptOut({
      variables: {
        data: { optOut: { set: updateOptOutData } },
        where: { id: id },
      },
    })
    refetch()
  }

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={data?.me.optOut ? false : true}
              onChange={(event) => handleOptOutChange(event)}
              inputProps={{ 'aria-label': 'controlled' }}
              color="secondary"
            />
          }
          label={`Email Notifications: ${data?.me.optOut ? 'OFF' : 'ON'}`}
        />
      </FormGroup>
    </>
  )
}
