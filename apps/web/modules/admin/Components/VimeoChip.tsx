import { Chip } from '@mui/material'
import React from 'react'

export const VimeoChip = ({ vimeoId }: { vimeoId: number }) => {
  if (vimeoId) {
    const vimeoUrl = `https://vimeo.com/${vimeoId}`
    return (
      <Chip
        label={vimeoUrl}
        clickable={true}
        color="primary"
        onClick={(event: React.SyntheticEvent) => {
          event.stopPropagation()
          open(vimeoUrl, '_blank')
        }}
      />
    )
  } else {
    return null
  }
}
