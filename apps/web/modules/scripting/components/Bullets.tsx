import { Layer } from '@lumina/render/src/Script/Script'
import { Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { TextInput } from './common'
import { Size } from './common/TextInput'

type Props = {
  colorMode?: 'blue' | 'light-blue'
  textColorLayer: Layer
  titleColorLayer: Layer
  bulletsLayer: Layer
  bulletTextSize?: Size
  bulletSize?: number
  flex: number
  backgroundColor: string
  withTitle?: boolean
  children?: any
  layers: { layerName: string; layer: Layer }[]
}
const Bullets = ({
  flex,
  backgroundColor,
  textColorLayer,
  bulletsLayer,
  titleColorLayer,
  bulletTextSize = 'xxl',
  bulletSize = 50,
  withTitle,
  children,
  layers,
}: Props) => {
  // colorMode === 'blue' ? ['#191e52', '#191e52'] : ['#2599f6', '#191e52']

  const bullets = withTitle ? layers.slice(1, layers.length) : layers
  const { register } = useFormContext()
  return (
    <Box
      sx={{
        flex,
        display: 'flex',
        backgroundColor,
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: 2,
          rowGap: 3,
          my: 'auto',
          width: '100%',
        }}
      >
        {withTitle ? (
          <TextInput
            multiline
            placeholder={layers[0].layer.scriptVariable}
            name={`layers.${layers[0].layerName}.value`}
            defaultValue={layers[0].layer.value}
            textAlign="left"
            size={'xxl'}
            color={titleColorLayer.value}
            inputRef={register({
              required: true,
              setValueAs: (value) => value.trim(),
            })}
          />
        ) : (
          ''
        )}
        {children}
        {bullets.map(({ layer, layerName }, index) => (
          <Box
            sx={{ display: 'flex', columnGap: 1, alignItems: 'center' }}
            key={index}
          >
            <img
              src={bulletsLayer.url}
              style={{ width: bulletSize, height: bulletSize }}
            />
            <TextInput
              multiline
              placeholder={layer.scriptVariable}
              defaultValue={layer.value}
              name={`layers.${layerName}.value`}
              textAlign="left"
              size={bulletTextSize}
              color={textColorLayer.value}
              inputRef={register({
                required: true,
                setValueAs: (value) => value.trim(),
              })}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Bullets
