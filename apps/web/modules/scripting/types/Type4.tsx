import { Layer } from '@lumina/render/src/Script/Script'
import { Box } from '@mui/material'
import { TextInput } from '../components'

interface Props {
  showBottom?: boolean
  gradientBorder?: boolean
  boxColorLayer: Layer
  descriptionColorLayer: Layer
  textColorLayer: Layer
  backgroundLayer: Layer
  headingLayer: Layer
  descriptionLayer: Layer
}

export const Type4 = ({
  showBottom,
  gradientBorder,
  backgroundLayer,
  boxColorLayer,
  textColorLayer,
  descriptionColorLayer,
  headingLayer,
  descriptionLayer,
}: Props) => {
  const imageUrl = `url(${backgroundLayer.url})`
  const imageBackground = gradientBorder
    ? `linear-gradient(to bottom, rgba(255,255,255,0) 80%, rgba(255,255,255,1)), ${imageUrl}`
    : `${imageUrl}`
  return (
    <Box
      sx={{
        width: '100%',
        height: '405px',
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          flex: 7,
          backgroundColor: 'yellow',
          background: imageBackground,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      ></Box>
      <Box
        sx={{
          flex: 4,
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          m: 'auto',
          placeContent: 'center',
        }}
      >
        <Box
          sx={{
            mt: -4,
            mb: 1,
            width: '400px',
            mx: 'auto',
            backgroundColor: boxColorLayer.value,
            py: 1,
            px: 2,
          }}
        >
          <TextInput
            placeholder="Title"
            size={'xl'}
            color={textColorLayer.value}
            name="Title"
            defaultValue={headingLayer.value}
          />
        </Box>
        <Box sx={{ my: 'auto', width: '100%' }}>
          <TextInput
            placeholder="Main description"
            name="Main description"
            multiline
            size={'lg'}
            defaultValue={descriptionLayer.value}
            color={descriptionColorLayer.value}
          />
        </Box>
        {showBottom ? (
          <Box sx={{ my: 1, width: 300, mx: 'auto' }}>
            <TextInput
              placeholder="Slide notes"
              name="Slide notes"
              size={'xs'}
              color={'#3b3d68'}
            />
          </Box>
        ) : (
          ''
        )}
      </Box>
    </Box>
  )
}
