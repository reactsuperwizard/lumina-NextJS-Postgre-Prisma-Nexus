import React, { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'

import { QueryRenderArgs, Render, RenderStatus } from '@lumina/api'

import { LinearProgressWithLabel } from 'modules/admin/Components'
import { GetRenderQuery, GET_RENDER } from '../../../queries'



export const RenderingCompletion = ({ render }: { render: Render }) => {
  const [color, setColor] = useState<'primary' | 'secondary'>('primary')

  const skip =
    render.status !== RenderStatus.Queued &&
    render.status !== RenderStatus.Rendering

  const { data, loading, stopPolling } = useQuery<
    { render: GetRenderQuery },
    QueryRenderArgs
  >(GET_RENDER, {
    variables: {
      where: { id: render.id },
    },
    skip,
    pollInterval: 1000,
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
