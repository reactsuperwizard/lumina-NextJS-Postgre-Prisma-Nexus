import React, { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles'

import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  OutlinedInput,
  Box,
  Chip,
} from '@mui/material'

const Root = styled('div')({})

export interface MultiSelectProps {
  selectedValues: string[] | undefined // existing value
  values: string[] // existing value
  handleChange: (event: SelectChangeEvent<string[]>) => void
  handleDelete: (value: string) => void
}

export const MultiSelect = ({
  selectedValues,
  values,
  handleChange,
  handleDelete,
}: MultiSelectProps) => {
  return (
    <Root>
      <FormControl sx={{ width: '100%' }}>
        <Select
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected: string[]) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: string) => (
                <Chip
                  key={value}
                  label={value}
                  onMouseDown={(event) => event.stopPropagation()}
                  onDelete={() => handleDelete(value)}
                />
              ))}
            </Box>
          )}
        >
          {values?.map((name: string) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Root>
  )
}
