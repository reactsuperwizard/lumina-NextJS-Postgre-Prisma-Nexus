import React, { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles'

import { DocumentNode, gql, useMutation } from '@apollo/client'
import {
  CircularProgress,
  TextField,
  Theme,
  InputAdornment,
  Typography,
} from '@mui/material'
import { useDebounce } from './useDebounce'
import { Done } from '@mui/icons-material'

const PREFIX = 'LiveField'

const classes = {
  warn: `${PREFIX}-warn`,
  textFieldSize: `${PREFIX}-textFieldSize`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.warn}`]: {
    '&.MuiTextField-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#F9A825',
      borderWidth: 1.5,
    },
  },
  [`& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input`]: {
    padding: '12px 10px',
  },
}))

interface IProps {
  resource?:
    | 'User'
    | 'Order'
    | 'Request'
    | 'Video'
    | 'Customer'
    | 'Asset'
    | 'Folder'
    | 'Script'
    | 'Platform'
  field?: string // field to update
  where?: unknown // where clause for value being updated
  label?: string // label for input
  defaultValue?: string | number // existing value
  validators?: any[]
  customMutation?: (field: string) => DocumentNode
  dense?: boolean
  required?: boolean
  multiline?: boolean
  customer?: boolean
  debounceTime?: number
  disabled?: boolean
  notes?: string
}

export const LiveField = ({
  disabled,
  resource,
  where,
  defaultValue,
  label,
  field,
  customMutation,
  dense = false,
  required = true,
  multiline = false,
  customer = false,
  debounceTime = 1500,
  notes,
}: IProps) => {
  if (!disabled && !resource && !where && !field) {
    throw new Error(
      'Missing required fields for LiveField, unless it is disabled.',
    )
  }

  const [helpMessage, setHelpMessage] = useState<null | string>(null)
  const [value, setValue] = useState(defaultValue)
  const [formState, setFormState] = useState<
    null | 'warn' | 'error' | 'success'
  >(null)
  const [stage, setStage] = useState<
    null | 'clean' | 'dirty' | 'loading' | 'success' | 'error'
  >(null)
  if (process.env.NODE_ENV !== 'production') {
    if (customMutation && resource) {
      throw new Error(
        '"resource" is not used when providing a custom "mutation" to <LiveField/>.',
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

  const debouncedValue = useDebounce(value, debounceTime)
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

  // fire mutation if there is a debounced value, if input has been edited
  useEffect(() => {
    if (stage === 'dirty' && (debouncedValue || debouncedValue === '')) {
      // TODO apply validators in order
      // then
      const newValue =
        typeof defaultValue === 'number'
          ? parseInt(debouncedValue)
          : debouncedValue

      doMutation({
        variables: {
          where,
          data: {
            [field!]: { set: newValue },
          },
        },
      })
    }
  }, [debouncedValue])

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

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setValue(e.target.value)
  }

  return (
    <Root>
      <TextField
        disabled={disabled}
        variant="outlined"
        className={formState === 'warn' ? classes.warn : undefined}
        required={required}
        margin={dense ? 'dense' : 'normal'}
        id="text"
        name="text"
        label={label}
        fullWidth
        value={value}
        onChange={handleChange}
        error={formState === 'error'}
        multiline={multiline}
        helperText={helpMessage}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {stage === 'loading' ? (
                <CircularProgress size="1.5rem" />
              ) : stage === 'success' ? (
                <Done style={{ color: '#02BD1A' }} />
              ) : (
                []
              )}
            </InputAdornment>
          ),
        }}
      />
      {notes && (
        <Typography fontSize={'0.75rem'} color={'#0A0A0A'}>
          {notes}
        </Typography>
      )}
    </Root>
  )
}
