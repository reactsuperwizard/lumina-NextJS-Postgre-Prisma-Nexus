import { Box } from '@mui/material'
import { LayerArray } from '../components/SlideTypeMatcher'

type GradientMode = 'white' | 'blue'
type Props = {
  imagePosition?: 'left' | 'right'
  gradientMode?: GradientMode
  children: any
  layers: LayerArray[]
}
const gradients: { [k in GradientMode]: string } = {
  white:
    'linear-gradient(to right, rgba(255,255,255,0) 20%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.95))',
  blue: 'linear-gradient(to right, #050b4700 20%, #050b47FA 70%, #050b47FA)',
}

export const Type3 = ({
  imagePosition,
  gradientMode,
  children,
  layers,
}: Props) => {
  const flexDirection = imagePosition === 'right' ? 'row-reverse' : 'row'
  const imageUrl = `url(${layers[0].layer.url})`
  const backgroundImage = gradientMode
    ? `${gradients[gradientMode]}, ${imageUrl}`
    : `${imageUrl}`
  return (
    <Box
      sx={{
        width: '100%',
        height: '405px',
        position: 'relative',
        borderRadius: '4px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderRadius: '4px',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          height: '100%',
          flexDirection,
        }}
      >
        <Box sx={{ flex: 3, backgroundColor: 'transparent' }}></Box>
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1rem',
          }}
        >
          {children}
        </Box>
        {/* <Box
          sx={{
            flex: 1,
            backgroundColor: '#00003c99',
            padding: '24px',
            pb: '16px',
          }}
        >
          <TextInput
            placeholder="Tag Line"
            textAlign="left"
            color="#fff"
            size={'xxl'}
          />
          <TextInput
            placeholder="Position"
            textAlign="left"
            color="#fff"
            size={'xxl'}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LocationOnIcon style={{ color: '#ffffff90' }} />
            <TextInput
              placeholder="Location"
              textAlign="left"
              color="#ffffff90"
              size={'xxl'}
            />
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}></Box> */}
      </Box>
    </Box>
  )
}
