import React, { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles'

import { DocumentNode, gql, useMutation } from '@apollo/client'
import { SelectChangeEvent, Typography } from '@mui/material'
import { MultiSelect } from 'modules/admin/Components/MultiSelect'

const Root = styled('div')({})

export interface LiveMultiSelectProps {
  resource?: 'User' | 'Order' | 'Request' | 'Video' | 'Customer' // ...
  field: string // field to update
  where: unknown // where clause for value being updated
  label?: string // label for input
  selectedValues: string[] | undefined // existing value
  values: string[] // existing value
  validators?: any[]
  customMutation?: (field: string) => DocumentNode
  dense?: boolean
  title: string
  required?: boolean
}

export const LiveMultiSelect = ({
  resource,
  where,
  selectedValues,
  title,
  field,
  values,
  customMutation,
}: LiveMultiSelectProps) => {
  const [value, setValue] = useState(selectedValues)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
  const [stage, setStage] = useState<'clean' | 'dirty' | 'loading' | 'success'>(
    'clean',
  )

  const UPDATE_RESOURCE =
    (customMutation && customMutation(field)) ||
    gql`mutation updateOne${resource}($where: ${resource}WhereUniqueInput!, $data: ${resource}UpdateInput!, ) {
    resource: updateOne${resource}(where: $where, data: $data) {
      id, ${field}
    }
  }`

  const [doMutation, { loading, error, data }] = useMutation(UPDATE_RESOURCE)

  // set stage to clean during first render
  useEffect(() => {
    setStage('clean')
  }, [])

  // set stage to loading as soon as query is fired
  useEffect(() => {
    if (loading) {
      setStage('loading')
    }
  }, [loading])

  // fire mutation if there is a changed value, if input has been edited
  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    const timeout = setTimeout(() => {
      if ((value || value === false) && stage === 'dirty') {
        // TODO apply validators in order
        // then
        doMutation({
          variables: {
            where,
            data: {
              [field]: { set: value.map((val) => val.split(' - ')[0]) },
            },
          },
        })
      }
    }, 1000)
    setTimeoutId(timeout)
  }, [value])

  // clean up state after successful mutation
  useEffect(() => {
    if (!loading && !error && data) {
      setStage('success')
      setTimeout(() => {
        setStage('clean')
      }, 2000)
    }
  }, [data])

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value: newVal },
    } = event
    setValue([...new Set(newVal)])
    setStage('dirty')
  }
  const handleDelete = (deletedValue: string) => {
    const filteredValue = value?.filter((val) => val !== deletedValue)
    setValue(filteredValue)
    setStage('dirty')
  }

  return (
    <Root>
      <Typography variant="subtitle1">{title}:</Typography>
      <MultiSelect
        selectedValues={value}
        values={values}
        handleDelete={handleDelete}
        handleChange={handleChange}
      />
    </Root>
  )
}
