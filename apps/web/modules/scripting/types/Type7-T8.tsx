import { Layer } from '@lumina/render/src/Script/Script'
import { Box } from '@mui/material'

interface Props {
  logoLayer: Layer
  backgroundColor: Layer
  brandColorLayer: Layer
  children: React.ReactNode
}

export const Type7 = ({
  logoLayer,
  backgroundColor,
  brandColorLayer,
  children,
}: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '405px',
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        backgroundColor: backgroundColor.value,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '55%',
        }}
      >
        <img style={{ height: '5rem' }} src={logoLayer.url}></img>
      </Box>
      <Box
        sx={{
          position: 'relative',
          padding: '25px 0 95px 0',
          overflow: 'hidden',
          maxWidth: '100%',
          textAlign: 'center',
          color: '#fff',
          '&::before': {
            position: 'absolute',
            content: '""',
            top: 0,
            left: '50%',
            width: '150%',
            paddingTop: '100%',
            height: '0',
            backgroundImage: `linear-gradient(to bottom, ${brandColorLayer.value}, rgba(255,255,255,1))`,
            border: '10px solid #fff',
            borderRadius: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 1,
            alignItems: 'center',
            marginTop: '60px',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
