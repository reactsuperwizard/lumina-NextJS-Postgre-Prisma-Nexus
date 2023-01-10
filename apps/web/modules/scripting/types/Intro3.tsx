import { Layer } from '@lumina/render/src/Script/Script'
import { Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { TextInput } from '../components'

interface Props {
  locationLayer: Layer
  locationIconLayer: Layer
  tagLayer: Layer
  postionLayer: Layer
}
export const Intro3 = ({
  locationIconLayer,
  tagLayer,
  postionLayer,
  locationLayer,
}: Props) => {
  const { register } = useFormContext()
  return (
    <>
      <Box sx={{ width: '60%' }}>
        <TextInput
          placeholder={tagLayer.scriptVariable}
          defaultValue={tagLayer.value}
          name={`layers.${tagLayer.name}.value`}
          textAlign="center"
          color="#fff"
          size={'xl'}
          fontWeight={'normal'}
          inputRef={register({
            required: true,
            setValueAs: (value: string) => value.trim(),
          })}
        />
      </Box>
      <Box sx={{ width: '90%' }}>
        <TextInput
          placeholder={postionLayer.scriptVariable}
          defaultValue={postionLayer.value}
          name={`layers.${postionLayer.name}.value`}
          textAlign="center"
          fontWeight={'bold'}
          color="#fff"
          size={'xxl'}
          inputRef={register({
            required: true,
            setValueAs: (value: string) => value.trim(),
          })}
        />
      </Box>
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={locationIconLayer.url}
          style={{ width: 50, height: 50, zIndex: 2 }}
        />
        <TextInput
          placeholder={locationLayer.scriptVariable}
          defaultValue={locationLayer.value}
          name={`layers.${locationLayer.name}.value`}
          textAlign="center"
          fontWeight={'normal'}
          color="#fff"
          size={'xl'}
          inputRef={register({
            required: true,
            setValueAs: (value: string) => value.trim(),
          })}
        />
      </Box>
    </>
  )
}
