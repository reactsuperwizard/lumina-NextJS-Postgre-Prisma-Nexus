/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react'

import { useApolloClient } from '@apollo/client'
import gql from 'graphql-tag'

import { Autocomplete } from '@mui/material';
import { TextField as MuiTextField } from '@mui/material'

import { useDebounce } from 'modules/utils'

export enum QueryField {
  name = 'name',
  email = 'email',
  updatedAt = 'updatedAt',
  jobTitle = 'jobTitle',
}

export enum ReturnField {
  id = 'id',
  name = 'name',
  email = 'email',
  updatedAt = 'updatedAt',
  jobTitle = 'jobTitle',
}

// For use inside of admin
export const LuminaAutocomplete = ({
  resourceName, //e.g. "customer" Order.customer or "template" for Script.template
  queryFields,
  returnFields,
  label,
  getOptionLabel = '',
  onChange,
  initValue,
  customWhereFilter = {},
  fullWidth,
}: {
  resourceName: string
  fieldName: string
  queryFields: QueryField[]
  returnFields: ReturnField[]
  getOptionLabel: string | Function // name of parameter to return from results - or a function to return
  label: string // label the input
  source: string
  parse?: Function
  format?: Function
  onChange: Function
  validate?: Function
  helperText?: 'string'
  initValue?: any
  customWhereFilter?: any
  fullWidth?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  // manages the actual value of the input, which loads by default
  const [value, setValue] = useState(initValue || '')
  // manages the paramter to debounce and use in query
  const [param, setParam] = useState(null)

  const client = useApolloClient()

  const debouncedParam = useDebounce(param, 500)

  useEffect(() => {
    if (!debouncedParam) return
    ;(async () => {
      const where: any = { ...customWhereFilter }
      if (queryFields.length === 1) {
        where[queryFields[0]] = {
          contains: debouncedParam,
          mode: 'insensitive',
        }
      }
      if (queryFields.length > 1) {
        const queries: any = {}
        queryFields.forEach((q: string | number) => {
          queries[q] = { contains: debouncedParam, mode: 'insensitive' }
        })
        where.OR = { ...queries }
      }
      const queryName = `${resourceName.toLowerCase()}s`
      const GET_RESULTS = gql`
        query ${queryName}($where: ${resourceName}WhereInput) {
          ${queryName}(where: $where) {
            ${returnFields.join(' ')}
          }
        }
      `
      const { data } = await client.query({
        query: GET_RESULTS,
        variables: { where },
      })
      setOptions(data[queryName])
    })()
  }, [debouncedParam])

  // when the parameter is changed
  const handleOnInputChange = (event: any, value: any, reason: string) => {
    if (!event || reason === 'reset') {
      return
    }
    const v = event.target.value
    // setValue(v)
    setParam(v)
  }

  // when an option is selected
  const handleOnChange = (event: any, value: any) => {
    let returnValue = value
    if (value === null) {
      returnValue = { id: null }
    }
    // manage Autocomplete input
    setValue(returnValue)
    // hoist value to form
    onChange(returnValue)
  }

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      value={value}
      onChange={handleOnChange}
      onInputChange={handleOnInputChange}
      options={options}
      getOptionLabel={(option: any) => {
        if (!option || !getOptionLabel) return ''
        if (typeof getOptionLabel === 'function') {
          return getOptionLabel(option)
        }
        if (typeof getOptionLabel === 'string') {
          return option[getOptionLabel]
        }
      }}
      style={fullWidth ? {} : { width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      renderInput={(params: any) => {
        return (
          <MuiTextField
            {...params}
            label={label}
            margin="dense"
            variant="outlined"
          />
        )
      }}
    />
  )
}
