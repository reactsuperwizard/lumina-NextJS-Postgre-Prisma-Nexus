import React, { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles';

import { DocumentNode, gql, useMutation } from '@apollo/client'
import {
  CircularProgress,
  InputAdornment,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import { Done } from '@mui/icons-material'

const PREFIX = 'LiveSelect';

const classes = {
  select: `${PREFIX}-select`,
  workingDiv: `${PREFIX}-workingDiv`,
  doneIcon: `${PREFIX}-doneIcon`,
  adornmentWrap: `${PREFIX}-adornmentWrap`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.select}`]: {
    '& .MuiSelect-select:focus': {
      backgroundColor: 'rgba(0,0,0,0) !important',
    },
  },
  [`& .${classes.workingDiv}`]: {
    width: '1.5rem',
    height: '1.5rem',
  },
  [`& .${classes.doneIcon}`]: {
    color: '#02BD1A',
  },
  [`& .${classes.adornmentWrap}`]: {
    paddingRight: '2rem',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  [`& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input`]:
    {
      padding: '10.5px 10px',
    },
})

export interface LiveSelectProps {
  resource?: 'User' | 'Order' | 'Request' | 'Video' | 'Customer' // ...
  field: string // field to update
  where: unknown // where clause for value being updated
  label?: string // label for input
  defaultValue?: any // existing value
  validators?: any[]
  customMutation?: (field: string) => DocumentNode
  dense?: boolean
  required?: boolean
  options: Array<{ label: string; value: any; disabled?: boolean }>
}

export const LiveSelect = ({
  resource,
  where,
  defaultValue,
  field,
  customMutation,
  dense = false,
  required = true,
  options,
}: LiveSelectProps) => {


  const [value, setValue] = useState(defaultValue)
  const [formState, setFormState] = useState<
    null | 'warn' | 'error' | 'success'
  >(null)
  const [stage, setStage] = useState<'clean' | 'dirty' | 'loading' | 'success'>(
    'clean',
  )
  if (process.env.NODE_ENV !== 'production') {
    if (customMutation && resource) {
      throw new Error(
        '"resource" is not used when providing a custom "mutation" to <LiveSelect/>.',
      )
    }
  }
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
    if ((value || value === false) && stage === 'dirty') {
      // TODO apply validators in order
      // then

      doMutation({
        variables: {
          where,
          data: {
            [field]: { set: value },
          },
        },
      })
    }
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

  const handleChange = (
    e: SelectChangeEvent<{
      name?: string | undefined
      value: unknown
    }>,
  ) => {
    setStage('dirty')
    setValue(e.target.value)
  }

  return (
    (<Root>
      <Select
        variant="outlined"
        className={classes.select}
        required={required}
        margin={dense ? 'dense' : undefined}
        id={`select ${field}`}
        name={`select ${field}`}
        fullWidth
        value={value}
        onChange={handleChange}
        error={formState === 'error'}
        endAdornment={
          stage === 'loading' || stage === 'success' ? (
            <div className={`MuiSelect-select ${classes.adornmentWrap}`}>
              <InputAdornment position="start">
                {stage === 'loading' ? (
                  <div className={classes.workingDiv}>
                    <CircularProgress size="1.5rem" />
                  </div>
                ) : (
                  <Done className={classes.doneIcon} />
                )}
              </InputAdornment>
            </div>
          ) : undefined
        }
      >
        {options.map((option) => (
          <MenuItem
            value={option.value}
            key={option.label}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Root>)
  );
}
