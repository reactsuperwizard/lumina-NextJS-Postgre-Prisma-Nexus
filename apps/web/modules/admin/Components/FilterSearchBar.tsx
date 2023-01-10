import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'

import { Grid, TextField } from '@mui/material'

import { useDebounce } from 'modules/utils'
import { useRouter } from 'next/router'

interface Props {
  setTerm: Dispatch<SetStateAction<string | null>>
  filterLabel?: string
  searchTerm: string
  debounce?: number
  connectedColumns?: { [column: string]: string }
}

export const FilterSearchBar = ({
  setTerm,
  filterLabel,
  searchTerm,
  debounce = 750,
  connectedColumns,
}: Props) => {
  const [value, setValue] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (router.query.args) {
      const { where } = JSON.parse(
        decodeURIComponent(router.query.args as string),
      )
      const searchSubTerm = where?.[searchTerm]
      let defaultSearchTerm
      if (connectedColumns?.[searchTerm]) {
        const nestedKey = connectedColumns?.[searchTerm].split('.')
        defaultSearchTerm = where
        for (let i = 0; i < nestedKey.length; i++) {
          const key = nestedKey[i]
          defaultSearchTerm = defaultSearchTerm
            ? defaultSearchTerm[key]
            : undefined
        }
        defaultSearchTerm = defaultSearchTerm?.contains
      } else defaultSearchTerm = searchSubTerm?.contains
      setValue(defaultSearchTerm || '')
    } else {
      setValue('')
    }
  }, [router.query.args])

  const debouncedValue = useDebounce(value, debounce)

  useEffect(() => {
    if (debouncedValue !== '' && !debouncedValue) return
    setTerm(debouncedValue)
  }, [debouncedValue])

  return (
    <Grid item sm={3}>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label={filterLabel}
        variant="standard"
        fullWidth
      />
    </Grid>
  )
}
