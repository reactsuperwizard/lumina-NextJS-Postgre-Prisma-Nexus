import React from 'react'
import { Chip } from '@mui/material'
import { RequiredQueryArgs, ConnectedOrderBy } from './ResourceList'

interface Props {
  chipKey: string
  removeFilter: (key: string) => void
  args: RequiredQueryArgs
  chipKeyNameMapping?: { [column: string]: string }
}

export const FilterChip = ({
  chipKey,
  removeFilter,
  args,
  chipKeyNameMapping,
}: Props) => {
  const makeChipLabel = (key: string): string => {
    let label = key
    switch (true) {
      case key === 'orderBy':
        const orderByDetail = args.orderBy?.[0]
        if (orderByDetail) {
          let k: keyof typeof orderByDetail
          for (k in orderByDetail) {
            if (typeof orderByDetail[k] === 'string') {
              label += `: ${k} = ${orderByDetail[k]}`
            }
            if (typeof orderByDetail[k] === 'object') {
              const nestedFilter = orderByDetail[
                k
              ] as unknown as ConnectedOrderBy
              const sortParam = Object.keys(nestedFilter)[0]
              const direction = nestedFilter[sortParam]
              label += `: ${k} ${sortParam} = ${direction}`
            }
          }
        }
        break
      case key.includes('where.'):
        const subKey = key.replace('where.', '')
        const whereDetail = { [subKey]: args.where[subKey] }
        if (whereDetail) {
          let k: keyof typeof whereDetail
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          for (k in whereDetail) {
            // Check if key exisits in chipKeyNameMapping - Used for nested columns
            if (chipKeyNameMapping && chipKeyNameMapping[k]) {
              k = chipKeyNameMapping[k]
            }
            const splitOnCapital = k.replace(/([A-Z])/g, ' $1')
            const upper =
              splitOnCapital.charAt(0).toUpperCase() + splitOnCapital.slice(1)
            label = ' search ' + upper
          }
        } else {
          removeFilter('where')
        }
        break
      case key === 'take':
        label = 'results per page'
        break
      default:
        break
    }
    return label
  }

  return (
    <Chip
      color="secondary"
      label={makeChipLabel(chipKey)}
      onDelete={() => removeFilter(chipKey)}
      style={{ margin: '0 0.25rem' }}
    />
  )
}
