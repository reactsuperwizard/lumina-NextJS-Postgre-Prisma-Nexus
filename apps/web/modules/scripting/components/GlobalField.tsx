import { useState } from 'react'
import { Layer } from '@lumina/render/src/Script/Script'
import { FieldError, useFormContext, useWatch } from 'react-hook-form'

import { ColorizeTwoTone, Image, Label, MusicNote } from '@mui/icons-material'
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { AudioModal } from 'modules/admin/Components/AudioModal'
import { ColorObject } from 'modules/admin/Components/ColorPicker'
import { ColorPickerModal2 } from 'modules/admin/Components/ColorPickerModal2'
import { ImageModal } from 'modules/admin/Components/ImageModal'
import { HelperText } from 'modules/admin/scripts/ScriptEdit/Resources'
import { MediaModal } from './MediaModal'
import { Asset } from '@lumina/api'
import { AudioPlayer2 } from 'modules/admin/Components/AudioPlayer2'

interface Props {
  global: string
  layer: Layer
  aeNames: boolean
  mode: 'master' | 'script'
  updateForm: () => void
}

const PREFIX = 'GlobalField'

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
    fontSize: 14,
    '&.Mui-error:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
    '.Mui-disabled': {
      '-webkit-text-fill-color': '#0A0A0A !important',
    },
  },

  [`& .${classes.warnLabel}`]: {
    fontWeight: 'bold',
    color: '#0A0A0A',
    fontSize: 14,
    '&.Mui-error': { color: theme.palette.secondary.main },
    '&.Mui-error .MuiInputLabel-asterisk': {
      color: theme.palette.secondary.main,
    },
  },
}))

const GlobalField = ({ global, layer, mode, updateForm }: Props) => {
  const { fieldType, scriptVariable } = layer
  const { register, formState, setValue } = useFormContext()
  const [textColorInput, setTextColorInput] = useState(
    layer.fieldType === 'color' ? layer.value : '',
  )
  const [validColor, setValidColor] = useState(true)
  const [url, setUrl] = useState(layer.url)
  const [id, setId] = useState(layer.id)
  const [name, setName] = useState(layer.name)
  const [dialogOpen, setDialogOpen] = useState(false)
  const layerName = global

  const validateColor = (value: string) => {
    const isValid = /^#[0-9A-F]{6}$/i.test(value)
    if (isValid != validColor) setValidColor(isValid)
    return isValid
  }

  let value: string | undefined,
    error: FieldError | undefined,
    minLength,
    maxLength: number | undefined,
    lineLength: number | undefined,
    rows: any,
    color: string

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

  const handleChangeColor = (color: ColorObject) => {
    if (color) {
      setValue(`layers.${layerName}.value`, color.hex, { shouldDirty: true })
      setTextColorInput(color.hex)
      setValidColor(true)
      if (mode === 'master') {
        updateForm()
      }
    }
  }
  switch (layer.fieldType) {
    case 'audio':
    case 'image':
      error =
        mode === 'script'
          ? (formState.errors.layers?.[layerName]?.id as FieldError)
          : undefined
      break
    case 'color':
      value = layer.value
      color = useWatch({
        name: `layers.${layerName}.value`,
        defaultValue: value,
      })
      error =
        mode === 'script'
          ? (formState.errors.layers?.[layerName]?.value as FieldError)
          : undefined
      break
    case 'textArea':
      minLength = layer.minLength
      maxLength = layer.maxLength
      lineLength = layer.lineLength
      if (maxLength && lineLength) {
        rows = Math.floor(maxLength / lineLength)
      }
      value = layer.value
      error =
        mode === 'script'
          ? (formState.errors.layers?.[layerName]?.value as FieldError)
          : undefined
      break
    case 'text':
      minLength = layer.minLength
      maxLength = layer.maxLength
      value = layer.value
      error =
        mode === 'script'
          ? (formState.errors.layers?.[layerName]?.value as FieldError)
          : undefined
      break
    case 'select':
      value = layer.value
      error =
        mode === 'script'
          ? (formState.errors.layers?.[layerName]?.value as FieldError)
          : undefined
      break
    default:
      throw new Error('This field type is not defined by @lumina/render!')
  }
  return (
    <Grid zeroMinWidth item xs={12}>
      <Root>
        {fieldType === 'color' && (
          <>
            <InputLabel
              error={!!error}
              className={classes.warnLabel}
              required={true}
              style={{ paddingBottom: '10px' }}
            >
              {layer.scriptVariable || ''}
            </InputLabel>
            <ColorPickerModal2
              title={title}
              changeColor={handleChangeColor}
              color={color!}
            >
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
                sx={{
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
                  if (mode === 'master') {
                    updateForm()
                  }
                }}
                endAdornment={<ColorizeTwoTone />}
                error={!!error}
                fullWidth
                disabled
              />
            </ColorPickerModal2>
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
        {(fieldType === 'image' || fieldType === 'audio') && (
          <>
            <InputLabel
              error={!!error}
              className={classes.warnLabel}
              required={true}
              style={{ paddingBottom: '10px' }}
            >
              {layer.scriptVariable || ''}
            </InputLabel>
            {url && fieldType == 'image' && (
              <Box>
                <img
                  src={url}
                  style={{
                    maxHeight: '3rem',
                    maxWidth: '10rem',
                    display: 'block',
                  }}
                />
                <Box sx={{ my: '0.5rem' }}>
                  <Typography fontSize={'0.875rem'} color="#0A0A0A">
                    {name} (ID: {id})
                  </Typography>
                </Box>
              </Box>
            )}
            {url && fieldType == 'audio' && (
              <Box>
                <AudioPlayer2 src={url} />
                <Box sx={{ my: '0.5rem' }}>
                  <Typography fontSize={'0.875rem'} color="#0A0A0A">
                    {name} (ID: {id})
                  </Typography>
                </Box>
              </Box>
            )}
            <Box sx={{ display: 'flex' }}>
              <Button
                variant="text"
                color="primary"
                startIcon={fieldType === 'image' ? <Image /> : <MusicNote />}
                onClick={() => setDialogOpen(true)}
              >
                Select New {fieldType === 'image' ? 'Image' : 'Audio'}
              </Button>
              <OutlinedInput
                className={classes.warnInput}
                inputRef={register({
                  required: true,
                  // setValueAs: (value) => value.replace(/\D/g, '').trim(),
                })}
                value={id ? JSON.stringify({ id, name, url }) : ''}
                name={`layers.${layerName}.id`}
                error={!!error}
                fullWidth
                style={{ width: '1px', visibility: 'hidden' }}
                type="hidden"
              />
            </Box>
            <HelperText layerName={layerName} required={true} error={error} />
          </>
        )}
        <Grid zeroMinWidth item>
          <div>
            {(fieldType === 'audio' || fieldType === 'image') && (
              <MediaModal
                open={dialogOpen}
                setOpen={setDialogOpen}
                assetType={fieldType}
                onSelect={(asset: Pick<Asset, 'id' | 'name' | 'url'>) => {
                  setUrl(asset.url)
                  setName(asset.name!)
                  setId(String(asset.id))
                  setValue(
                    `layers.${layerName}.id`,
                    JSON.stringify({
                      id: asset.id,
                      name: asset.name,
                      url: asset.url,
                    }),
                    {
                      shouldDirty: true,
                    },
                  )
                  if (mode === 'master') {
                    updateForm()
                  }
                }}
              />
            )}
          </div>
        </Grid>
      </Root>
    </Grid>
  )
}

export default GlobalField
