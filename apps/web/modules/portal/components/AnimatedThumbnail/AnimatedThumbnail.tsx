import React from 'react'
import { Single } from './Single'
import { Stack } from './Stack'

export interface AnimatedThumbnailProps {
  isHovered?: boolean
  vimeoIdList?: number[] | null
  urlList?: string[]
}

export const AnimatedThumbnail = (props: AnimatedThumbnailProps) => {
  const { vimeoIdList, urlList } = props
  return (
    <>
      {(vimeoIdList && vimeoIdList.length > 1) ||
      (urlList && urlList.length > 1)
        ? Stack(props)
        : Single(props)}
    </>
  )
}
