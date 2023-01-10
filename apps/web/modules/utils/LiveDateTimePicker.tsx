import React, { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { DocumentNode, gql, useMutation } from '@apollo/client'
import { CircularProgress, TextField, Box, Typography } from '@mui/material'
import { Done } from '@mui/icons-material'
import { DateTimePicker } from '@mui/x-date-pickers'

interface IProps {
  resource:
    | 'User'
    | 'Order'
    | 'Request'
    | 'Video'
    | 'Customer'
    | 'Asset'
    | 'Folder'
    | 'Script'
    | 'Platform'
  field: string // field to update
  where: unknown // where clause for value being updated
  label: string // label for input
  defaultValue?: Date | undefined | null // existing value
  customMutation?: (field: string) => DocumentNode
  customer?: boolean
}

export const LiveDateTimePicker = ({
  resource,
  where,
  defaultValue,
  label,
  field,
  customMutation,
  customer = false,
}: IProps) => {
  if (!resource && !where && !field) {
    throw new Error('Missing required fields for LiveDateTimePicker.')
  }

  const [helpMessage, setHelpMessage] = useState<null | string>(null)
  const [value, setValue] = useState(defaultValue)
  const intialValue = defaultValue
  const [formState, setFormState] = useState<
    null | 'warn' | 'error' | 'success'
  >(null)
  const [stage, setStage] = useState<
    null | 'clean' | 'dirty' | 'loading' | 'success' | 'error'
  >(null)
  if (process.env.NODE_ENV !== 'production') {
    if (customMutation && resource) {
      throw new Error(
        '"resource" is not used when providing a custom "mutation" to <LiveDateTimePicker/>.',
      )
    }
  }
  const UPDATE_RESOURCE =
    (customMutation && customMutation(field!)) ||
    gql`mutation updateOne${
      customer ? 'Customer' : ''
    }${resource}($where: ${resource}WhereUniqueInput!, $data: ${resource}UpdateInput!, ) {
    resource: updateOne${
      customer ? 'Customer' : ''
    }${resource}(where: $where, data: $data) {
      id, ${field}
    }
  }`

  const [doMutation, { loading, error, data }] = useMutation(UPDATE_RESOURCE)

  // set stage to clean during first render
  useEffect(() => {
    setStage('clean')
  }, [])

  // set stage to dirty as soon as it has been edited
  useEffect(() => {
    if (stage === null) return
    setStage('dirty')
  }, [value])

  // set stage to loading as soon as query is fired
  useEffect(() => {
    if (loading) {
      setStage('loading')
    }
  }, [loading])

  // clean up state after successful mutation
  useEffect(() => {
    if (!loading && !error && data) {
      if (helpMessage) setHelpMessage(null)
      setStage('success')
      setTimeout(() => {
        setStage('clean')
      }, 3000)
    }
  }, [data])

  useEffect(() => {
    if (stage === 'clean') {
      setFormState(null)
    }
    if (stage === 'dirty' || stage === 'loading') {
      setFormState('warn')
    }
    if (stage === 'success') {
      setFormState('success')
    }
  }, [stage])

  useEffect(() => {
    if (error && formState !== 'error') {
      setStage('error')
      setFormState('error')
      const errorMessage = error.message.includes('Unique')
        ? 'Value must be unique'
        : error.message
      setHelpMessage(errorMessage)
    }
  }, [error])

  const handleChange = (newDate: Date | undefined | null) => {
    setValue(newDate)
  }

  const onClose = async () => {
    if (value != intialValue)
      await doMutation({
        variables: {
          where,
          data: {
            [field!]: { set: value },
          },
        },
      })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <DateTimePicker
          label={label}
          value={value}
          onChange={handleChange}
          onClose={onClose}
          renderInput={(params) => <TextField {...params} />}
        />
        {loading && <CircularProgress size="1.5rem" />}
        {stage === 'success' && <Done style={{ color: '#02BD1A' }} />}
      </Box>
      {helpMessage && (
        <Typography variant="subtitle2" color={'#'}>
          {helpMessage}
        </Typography>
      )}
    </LocalizationProvider>
  )
}
