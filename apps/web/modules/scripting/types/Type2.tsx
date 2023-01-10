import { Box, styled } from '@mui/material'
import { TextInput } from '../components'
import { useFormContext } from 'react-hook-form'
import { Layer } from '@lumina/render/src/Script/Script'

const PREFIX = 'Type2'

const classes = {
  box: `${PREFIX}-box`,
  imageBox: `${PREFIX}-imageBox`,
  center: `${PREFIX}-center`,
}
const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.box}`]: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '100%',
  },
  [`& .${classes.imageBox}`]: {
    flex: 1,
    paddingLeft: '0.5rem',
    paddingTop: '0.75rem',
  },
  [`& .${classes.center}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export const Type2 = ({
  layers,
  brandLayer,
  logoLayer,
  locationLayer,
}: {
  layers: { layerName: string; layer: Layer }[]
  brandLayer: Layer
  logoLayer: Layer
  locationLayer: Layer
}) => {
  const { register } = useFormContext()
  return (
    <StyledBox
      sx={{
        width: '100%',
        height: '405px',
        borderStyle: 'solid',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${layers[0].layer.url})`,
          filter: 'grayscale(100%)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        },
      }}
    >
      <Box className={classes.box}>
        <Box className={classes.imageBox}>
          <img
            style={{ maxHeight: '3.5rem', maxWidth: '12rem' }}
            src={logoLayer.url}
          ></img>
        </Box>
        <Box
          sx={{
            flex: 1,
            backgroundColor: brandLayer.value,
            padding: '24px',
            pb: '16px',
          }}
        >
          <TextInput
            placeholder={layers[1].layer.scriptVariable}
            defaultValue={layers[1].layer.value}
            name={`layers.${layers[1].layerName}.value`}
            textAlign="left"
            color="#fff"
            size={'xxl'}
            inputRef={register({
              required: true,
              setValueAs: (value) => value.trim(),
            })}
          />
          <TextInput
            defaultValue={layers[2].layer.value}
            placeholder={layers[2].layer.scriptVariable}
            name={`layers.${layers[2].layerName}.value`}
            textAlign="left"
            color="#fff"
            size={'xxl'}
            inputRef={register({
              required: true,
              setValueAs: (value) => value.trim(),
            })}
          />
          <Box className={classes.center}>
            <img src={locationLayer.url} style={{ width: 50, height: 50 }} />
            <TextInput
              defaultValue={layers[3].layer.value}
              placeholder={layers[3].layer.scriptVariable}
              name={`layers.${layers[3].layerName}.value`}
              textAlign="left"
              color="#ffffff90"
              size={'xxl'}
              inputRef={register({
                required: true,
                setValueAs: (value) => value.trim(),
              })}
            />
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}></Box>
      </Box>
    </StyledBox>
  )
}
