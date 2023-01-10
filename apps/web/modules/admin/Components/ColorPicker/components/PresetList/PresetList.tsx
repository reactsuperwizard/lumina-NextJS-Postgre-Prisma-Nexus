import React, { useState, useEffect, useCallback } from 'react'

import { RgbColor, Color } from '../../types'
import ColorList from '../ColorList/ColorList'

type PresetListProps = {
  colors: Color[]
  onClick: (color: RgbColor) => void
  currentColor: RgbColor
}

const PresetList = ({ colors, onClick, currentColor }: PresetListProps) => {
  const [localColors, setLocalColors] = useState<RgbColor[]>([])

  useEffect(() => {
    const local = JSON.parse(
      window.localStorage.getItem('rpc-presets') || '[]',
    ) as RgbColor[]

    setLocalColors(local)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('rpc-presets', JSON.stringify(localColors))
  }, [localColors])

  const addPreset = useCallback(() => {
    setLocalColors((prev) => [...prev, currentColor])
  }, [colors, currentColor])

  return (
    <ColorList
      onClick={onClick}
      colors={[...colors, ...localColors]}
      onAdd={addPreset}
    />
  )
}

export default React.memo(PresetList) as typeof PresetList
