import React, { useState } from 'react'

import { styled } from '@mui/material/styles'

import { useFormContext, FieldError, useWatch } from 'react-hook-form'

import {
  Grid,
  InputLabel,
  Theme,
  TextField,
  OutlinedInput,
  FormHelperText,
  Typography,
  Select,
  MenuItem,
} from '@mui/material'

import { Layer } from '@lumina/render/src/Script/Script'

import { AudioModal } from '../../../Components/AudioModal'
import { ImageModal } from '../../../Components/ImageModal'
import { ColorObject } from '../../../Components/ColorPicker/ColorPicker'

// import { ColorField } from './ColorField'
import { HelperText } from './HelperText'
import { ColorPickerModal } from '../../../Components/ColorPickerModal'

const PREFIX = 'LayerFields'

const classes = {
  gridContainer: `${PREFIX}-gridContainer`,
  gridItem: `${PREFIX}-gridItem`,
  inputTitle: `${PREFIX}-inputTitle`,
  warnInput: `${PREFIX}-warnInput`,
  warnLabel: `${PREFIX}-warnLabel`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.gridContainer}`]: {
    padding: '15px',
    marginBottom: '1px',
  },

  [`& .${classes.gridItem}`]: {
    margin: '1rem 0 1rem 0',
  },

  [`& .${classes.inputTitle}`]: {
    paddingBottom: '10px',
  },

  [`& .${classes.warnInput}`]: {
    '&.Mui-error:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
  },

  [`& .${classes.warnLabel}`]: {
    '&.Mui-error': { color: theme.palette.secondary.main },
    '&.Mui-error .MuiInputLabel-asterisk': {
      color: theme.palette.secondary.main,
    },
  },
}))

interface Props {
  layer: Layer
  layerName: string
  aeNames: boolean
}

const FC = ({ layerName, layer, aeNames }: Props) => {
  const [textColorInput, setTextColorInput] = useState(
    layer.fieldType === 'color' ? layer.value : '',
  )
  const [altTemplateInput, setAltTemplateInput] = useState(
    layer.fieldType === 'select' ? layer.value : '',
  )
  const [validColor, setValidColor] = useState(true)
  const { register, formState, setValue } = useFormContext()
  let value: string | undefined,
    id,
    error: FieldError | undefined,
    minLength,
    maxLength: number | undefined,
    lineLength: number | undefined,
    rows: any,
    color: string

  const handleChangeColor = (color: ColorObject) => {
    if (color) {
      setValue(`layers.${layerName}.value`, color.hex, { shouldDirty: true })
      setTextColorInput(color.hex)
      setValidColor(true)
    }
  }

  switch (layer.fieldType) {
    case 'audio':
    case 'image':
      id = layer.id
      error = formState.errors.layers?.[layerName]?.id as FieldError
      break
    case 'color':
      value = layer.value
      color = useWatch({
        name: `layers.${layerName}.value`,
        defaultValue: value,
      })
      error = formState.errors.layers?.[layerName]?.value as FieldError
      break
    case 'textArea':
      minLength = layer.minLength
      maxLength = layer.maxLength
      lineLength = layer.lineLength
      if (maxLength && lineLength) {
        rows = Math.floor(maxLength / lineLength)
      }
      value = layer.value
      error = formState.errors.layers?.[layerName]?.value as FieldError
      break
    case 'text':
      minLength = layer.minLength
      maxLength = layer.maxLength
      value = layer.value
      error = formState.errors.layers?.[layerName]?.value as FieldError
      break
    case 'select':
      value = layer.value
      error = formState.errors.layers?.[layerName]?.value as FieldError
      break
    default:
      throw new Error('This field type is not defined by @lumina/render!')
  }

  const title: string =
    useWatch({
      name: `layers.${layerName}.scriptVariable`,
    }) || layerName

  const assetId: string =
    useWatch({
      name: `layers.${layerName}.id`,
    }) ||
    id ||
    ''

  const { fieldType, scriptVariable } = layer

  const validateColor = (value: string) => {
    const isValid = /^#[0-9A-F]{6}$/i.test(value)
    if (isValid != validColor) setValidColor(isValid)
    return isValid
  }

  return (
    <Root>
      <Grid container className={classes.gridContainer} spacing={6}>
        {aeNames && (
          <Grid item>
            <InputLabel className={classes.inputTitle}>
              AE Layer Name
            </InputLabel>
            <TextField
              disabled
              value={layerName}
              fullWidth
              variant="outlined"
            />
          </Grid>
        )}
        <Grid zeroMinWidth item>
          <InputLabel
            htmlFor={`layers.${layerName}.scriptVariable`}
            className={classes.inputTitle}
          >
            Script Variable Name
          </InputLabel>
          <OutlinedInput
            id={`layers.${layerName}.scriptVariable`}
            defaultValue={scriptVariable}
            name={`layers.${layerName}.scriptVariable`}
            inputRef={register()}
            fullWidth
          />
        </Grid>
        <Grid zeroMinWidth item>
          {fieldType === 'text' && (
            <>
              <InputLabel
                error={!!error}
                className={classes.warnLabel}
                required={true}
                style={{ paddingBottom: '10px' }}
              >
                Value
              </InputLabel>
              <OutlinedInput
                className={classes.warnInput}
                style={{
                  width: maxLength ? `${maxLength + 4}ch` : undefined,
                }}
                defaultValue={value || ''}
                name={`layers.${layerName}.value`}
                inputRef={register({
                  required: true,
                  minLength: minLength || undefined,
                  setValueAs: (value) => value.trim(),
                })}
                error={!!error}
              />
              <HelperText
                layerName={layerName}
                required
                error={error}
                maxLength={maxLength}
                lineLength={lineLength}
              />
            </>
          )}
          {fieldType === 'color' && (
            <>
              <InputLabel
                error={!!error}
                className={classes.warnLabel}
                required={true}
                style={{ paddingBottom: '10px' }}
              >
                Value
              </InputLabel>
              <OutlinedInput
                disabled
                className={classes.warnInput}
                style={{ display: 'none' }}
                defaultValue={value || ''}
                name={`layers.${layerName}.value`}
                inputRef={register({ required: true })}
                error={!!error}
                fullWidth
              />
              <OutlinedInput
                className={classes.warnInput}
                style={{
                  width: maxLength ? `${maxLength + 2}ch` : undefined,
                }}
                value={textColorInput}
                onChange={(e) => {
                  const newColor = e.target.value
                  setTextColorInput(newColor)
                  if (validateColor(newColor)) {
                    setValue(`layers.${layerName}.value`, newColor, {
                      shouldDirty: true,
                    })
                  }
                }}
                error={!!error}
                fullWidth
              />
              <FormHelperText component="div">
                <Typography color="secondary">
                  {validColor ? '' : 'Must be valid hex color'}
                </Typography>
              </FormHelperText>
              <HelperText
                layerName={layerName}
                required
                error={error}
                maxLength={maxLength}
                lineLength={lineLength}
              />
            </>
          )}
          {fieldType === 'textArea' && (
            <>
              <InputLabel
                error={!!error}
                className={classes.warnLabel}
                required={true}
                style={{ paddingBottom: '10px' }}
              >
                Value
              </InputLabel>
              <OutlinedInput
                className={classes.warnInput}
                style={{
                  width: lineLength ? `${lineLength + 4}ch` : undefined,
                }}
                inputProps={{
                  id: `${layerName}-text-area`,
                  style: {
                    width: lineLength ? `${lineLength + 2}ch` : undefined,
                  },
                }}
                defaultValue={value || ''}
                name={`layers.${layerName}.value`}
                inputRef={register({
                  required: true,
                  minLength: minLength || undefined,
                  setValueAs: (value) => value.trim(),
                })}
                error={!!error}
                multiline
                maxRows={rows || undefined}
              />
              <HelperText
                error={error}
                required
                layerName={layerName}
                minLength={minLength}
                maxLength={maxLength}
                lineLength={lineLength}
                lines={rows}
              />
            </>
          )}
          {(fieldType === 'image' || fieldType === 'audio') && (
            <>
              <InputLabel
                error={!!error}
                className={classes.warnLabel}
                required={true}
                style={{ paddingBottom: '10px' }}
              >
                Asset Source
              </InputLabel>
              <OutlinedInput
                className={classes.warnInput}
                inputRef={register({
                  required: true,
                  setValueAs: (value) => value.replace(/\D/g, '').trim(),
                })}
                defaultValue={id || ''}
                name={`layers.${layerName}.id`}
                error={!!error}
                fullWidth
              />
              <HelperText layerName={layerName} required={true} error={error} />
            </>
          )}
          {fieldType === 'select' && (
            <>
              <InputLabel
                error={!!error}
                className={classes.warnLabel}
                required={true}
                style={{ paddingBottom: '10px' }}
              >
                Selected Value
              </InputLabel>
              <Select
                name={`layers.${layerName}.value`}
                {...register(`layers.${layerName}.value`)}
                onChange={(event) => {
                  setValue(`layers.${layerName}.value`, event.target.value, {
                    shouldDirty: true,
                  })
                  setAltTemplateInput(`${event.target.value}`)
                }}
                variant="outlined"
                required={true}
                id={`select ${layerName}`}
                fullWidth
                value={altTemplateInput}
              >
                {(layer.options || [''])?.map((option) => (
                  <MenuItem value={option} key={`${option} option`}>
                    {option.split('.')[0]}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        </Grid>
        <Grid zeroMinWidth item>
          <div>
            {fieldType === 'audio' && (
              <AudioModal
                key={`${title}-audioModal`}
                id={assetId}
                title={title}
              />
            )}
            {fieldType === 'image' && <ImageModal id={assetId} title={title} />}
            {fieldType === 'color' && (
              <ColorPickerModal
                title={title}
                changeColor={handleChangeColor}
                color={color!}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </Root>
  )
}
export const LayerFields = React.memo(FC)
