import React from 'react'

import { FormHelperText, Typography } from '@mui/material'

import { FieldError, useWatch } from 'react-hook-form'

interface Props {
  error: FieldError | undefined
  required: boolean
  layerName: string
  minLength?: number
  maxLength?: number
  lineLength?: number
  rows?: number
  lines?: number
}

const FC = ({
  error,
  layerName,
  minLength,
  maxLength,
  lineLength,
  lines,
}: Props) => {
  const scriptVariable = useWatch({
    name: `layers.${layerName}.scriptVariable`,
  })
  // const scriptVariable = watch(`layers.${layerName}.scriptVariable`)
  const fieldName = scriptVariable ? scriptVariable : layerName
  // const fieldName = layerName

  let warnMessage

  if (error?.type) {
    switch (error.type) {
      case 'required':
        warnMessage = `${fieldName} is required for rendering.`
        break
      case 'minLength':
        warnMessage = `${fieldName} must be greater than ${minLength} characters for rendering.`
        break
      case 'maxLength':
        if (lineLength) {
          warnMessage = `${fieldName} should not exceed ${
            maxLength! / lineLength
          } lines.`
          break
        }
        warnMessage = `${fieldName} should not exceed approx. ${Math.round(
          maxLength! / 0.75,
        )} characters for rendering.`
        break
      default:
        throw new Error('Users need a real warning message for this type!')
    }
    return (
      <FormHelperText component="div">
        <Typography color="secondary" component="span">
          {warnMessage}
        </Typography>
      </FormHelperText>
    )
  }
  const message = []
  if (lineLength) {
    message.push(`Each line will be approx. ${lineLength} characters.`)
  }
  if (lines) {
    message.push(`Maximum ${lines} lines.`)
  }
  if (!lineLength && maxLength) {
    message.push(
      `Maximum length of this field is approx ${maxLength}-${Math.floor(
        maxLength / 0.75,
      )}`,
    )
  }
  if (message) {
    return <FormHelperText component="div">{message.join(' ')}</FormHelperText>
  }
  return null
}

export const HelperText = React.memo(FC)
