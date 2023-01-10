import { Layer } from '@lumina/render/src/Script/Script'
import { Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { TextInput } from '../components'

interface Props {
  ctaLayer: Layer
}
export const Outro1 = ({ ctaLayer }: Props) => {
  const { register } = useFormContext()
  return (
    <Box sx={{ width: '60%' }}>
      <TextInput
        placeholder={ctaLayer.scriptVariable}
        defaultValue={ctaLayer.value}
        name={`layers.${ctaLayer.name}.value`}
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
  )
}
