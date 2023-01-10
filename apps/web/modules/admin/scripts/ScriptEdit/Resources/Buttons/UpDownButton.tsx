import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Script } from '@lumina/api'
import { Button } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { useRouter } from 'next/router'

const GET_UP = gql`
  query scripts($id: Int) {
    scripts(where: { id: { gt: $id } }, take: 1, orderBy: { id: asc }) {
      id
    }
  }
`

const GET_DOWN = gql`
  query scripts($id: Int) {
    scripts(where: { id: { lt: $id } }, take: 1, orderBy: { id: desc }) {
      id
    }
  }
`

interface GetScriptsQuery {
  scripts: Pick<Script, 'id'>[]
}

export const UpDownButton = ({ id, up }: { id: number; up?: boolean }) => {
  const router = useRouter()
  const { data } = useQuery<GetScriptsQuery, { id: number }>(
    up ? GET_UP : GET_DOWN,
    { variables: { id } },
  )

  const goToScript = (scriptId?: number) => {
    if (!scriptId) return
    router.push(`/admin/scripts/${scriptId}`)
  }

  return (
    <>
      <Button
        onClick={() => goToScript(data?.scripts?.[0]?.id)}
        disabled={!data?.scripts?.[0]?.id}
        size="large"
        color="secondary"
        variant="contained"
      >
        {up ? <ArrowForward /> : <ArrowBack />}
      </Button>
    </>
  )
}
