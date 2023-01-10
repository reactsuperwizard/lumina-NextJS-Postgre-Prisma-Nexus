import React, { useEffect, useState } from 'react'

import { gql, useQuery } from '@apollo/client'

import { QueryRenderArgs, Render, RenderStatus } from '@lumina/api'

import { LinearProgressWithLabel } from 'modules/admin/Components'
// import { GetRenderQuery, GET_RENDER } from '../../../queries'

export type GetRenderQuery = Pick<Render, 'id' | 'progress' | 'status'>

export const GET_RENDER = gql`
  query render($where: RenderWhereUniqueInput!) {
    render(where: $where) {
      id
      progress
      status
    }
  }
`

export const RenderingCompletion = ({ render }: { render: Render }) => {
  const [color, setColor] = useState<'primary' | 'secondary'>('primary')

  const skip =
    render.status !== RenderStatus.Queued &&
    render.status !== RenderStatus.Rendering

  const pollInterval = render.status === RenderStatus.Rendering ? 1000 : 20000

  const { data, loading, stopPolling } = useQuery<
    { render: GetRenderQuery },
    QueryRenderArgs
  >(GET_RENDER, {
    variables: {
      where: { id: render.id },
    },
    skip,
    pollInterval,
  })

  useEffect(() => {
    if (!data?.render?.progress) return
    switch (color) {
      case 'primary':
        setColor('secondary')
        break
      case 'secondary':
        setColor('primary')
        break
    }
  }, [data?.render?.progress])

  useEffect(() => {
    if (data?.render?.status === ('completed' as RenderStatus)) {
      setColor('secondary')
      stopPolling()
    }
  }, [data?.render?.status])

  if (loading) {
    return null
  }
  if (data && data.render?.progress) {
    return (
      <LinearProgressWithLabel color={color} value={data.render.progress} />
    )
  }
  if (render.progress) {
    return <LinearProgressWithLabel color={color} value={render.progress} />
  }
  return null
}
