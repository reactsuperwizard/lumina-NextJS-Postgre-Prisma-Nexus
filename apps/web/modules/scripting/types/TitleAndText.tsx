import { Layer } from '@lumina/render/src/Script/Script'
import { Box } from '@mui/material'
import { TextInput } from '../components'
import { useFormContext } from 'react-hook-form'

interface Props {
  titleLayer: Layer
  descriptionLayer: Layer
  titleColorLayer: Layer
  descriptionColorLayer: Layer
}
export const TitleAndText = ({
  titleLayer,
  descriptionLayer,
  titleColorLayer,
  descriptionColorLayer,
}: Props) => {
  const { register } = useFormContext()
  return (
    <Box
      sx={{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        rowGap: 3,
      }}
    >
      <Box>
        <TextInput
          placeholder={titleLayer.scriptVariable}
          defaultValue={titleLayer.value}
          name={`layers.${titleLayer.name}.value`}
          textAlign="left"
          color={titleColorLayer.value}
          size={'xl'}
          fontWeight={'bold'}
          inputRef={register({
            required: true,
            setValueAs: (value: string) => value.trim(),
          })}
        />
      </Box>
      <Box>
        <TextInput
          placeholder={descriptionLayer.scriptVariable}
          defaultValue={descriptionLayer.value}
          name={`layers.${descriptionLayer.name}.value`}
          textAlign="left"
          fontWeight={'normal'}
          color={descriptionColorLayer.value}
          size={'lg'}
          maxRows={3}
          multiline
          inputRef={register({
            required: true,
            setValueAs: (value: string) => value.trim(),
          })}
        />
      </Box>
    </Box>
  )
}
