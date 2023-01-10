import { Layer } from '@lumina/render/src/Script/Script'
import { Box } from '@mui/material'

interface Props {
  backgroundColor: Layer
  brandColorLayer: Layer
  iconLayer: Layer
  children: React.ReactNode
}

export const Type8 = ({
  backgroundColor,
  brandColorLayer,
  iconLayer,
  children,
}: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '405px',
        borderStyle: 'solid',
        display: 'flex',
        textAlign: 'center',
        backgroundColor: backgroundColor.value,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          padding: '65px 0',
          overflow: 'hidden',
          width: '45%',
          textAlign: 'center',
          color: '#fff',
          '&::before': {
            position: 'absolute',
            content: '""',
            top: 0,
            left: '-70%',
            height: '200%',
            paddingLeft: '150%',
            backgroundImage: `linear-gradient(to left, ${brandColorLayer.value}, rgba(255,255,255,1))`,
            border: '10px solid #fff',
            borderRadius: '50%',
            transform: 'translateY(-23%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '60%',
            position: 'relative',
          }}
        >
          <img style={{ height: '4.5rem' }} src={iconLayer.url}></img>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          rowGap: 1,
          paddingRight: '1rem',
          flex: 1,
          alignItems: 'flex-start',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
