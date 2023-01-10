import React from 'react'
import { Layer, Layers } from '@lumina/render/src/Script/Script'
import { Button } from '@mui/material'
import { GetApp } from '@mui/icons-material'

declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean
  }
}

const exportToCsv = (filename: string, rows: string[][]) => {
  const createRow = (row: string[]): string => {
    let _row = []
    for (let i = 0; i < row.length; i++) {
      let valueString = row[i].replace(/"/g, '""')
      if (valueString.search(/("|,|\n)/g) >= 0)
        valueString = '"' + valueString + '"'
      _row.push(valueString)
    }
    return `${_row.join(',')}\n`
  }

  const csvFileArray: string[] = []
  for (let i = 0; i < rows.length; i++) csvFileArray.push(createRow(rows[i]))

  const blob = new Blob([csvFileArray.join('')], {
    type: 'text/csv;charset=utf-8;',
  })

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    const hiddenLink = document.createElement('a')
    if (hiddenLink.download !== undefined) {
      const url = URL.createObjectURL(blob)
      hiddenLink.setAttribute('href', url)
      hiddenLink.setAttribute('download', filename)
      hiddenLink.style.visibility = 'hidden'
      document.body.appendChild(hiddenLink)
      hiddenLink.click()
      document.body.removeChild(hiddenLink)
    }
  }
}

const getLayerValue = (layer: Layer): string =>
  layer.type === 'image' || layer.type === 'audio'
    ? layer.id || ''
    : layer.type === 'data'
    ? layer?.value || ''
    : ''

interface Props {
  globals?: string[]
  layers?: Layers
  slides?: string[][]
  scriptId: string
  isDirty: boolean
}

export const DownloadScriptButton = ({
  globals,
  layers,
  slides,
  scriptId,
  isDirty,
}: Props) => {
  const downloadScript = () => {
    if (!globals || !layers || !slides) return
    const layerArray: string[][] = [['FIELD', 'VARIABLE', 'VALUE']]
    layerArray.push(['', '', ''], ['GLOBALS', '', ''])
    globals.forEach((global) => {
      const _layer = layers?.[global]
      const _variable = _layer.scriptVariable
      const _value = getLayerValue(_layer)
      layerArray.push([global, _variable, _value])
    })
    slides.forEach((slide, index: number) => {
      layerArray.push(['', ''], [`SLIDE #${index + 1}`, ''])
      return slide.forEach((field) => {
        const _layer = layers?.[field]
        const _variable = _layer.scriptVariable
        const _value = getLayerValue(_layer)
        layerArray.push([field, _variable, _value])
      })
    })

    exportToCsv(`script-${scriptId}-download.csv`, layerArray)
  }

  return (
    <Button
      onClick={() => downloadScript()}
      disabled={isDirty || !globals || !layers || !slides}
      startIcon={<GetApp />}
      size="large"
      color="primary"
      variant="outlined"
    >
      Download
    </Button>
  )
}
