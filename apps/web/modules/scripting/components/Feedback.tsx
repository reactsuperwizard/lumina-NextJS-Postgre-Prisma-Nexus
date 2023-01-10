import { Layer } from '@lumina/render/src/Script/Script'
import { Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { TextInput } from './common'

type Props = {
  // flex: number
  feedbackLayer: Layer
  feedbackColorLayer: Layer
  authorLayer: Layer
  authorColorLayer: Layer
}

const Feedback = ({
  feedbackLayer,
  feedbackColorLayer,
  authorColorLayer,
  authorLayer,
}: Props) => {
  const { register } = useFormContext()
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 3,
          my: 'auto',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', columnGap: 1, alignItems: 'center' }}>
          <TextInput
            multiline
            placeholder={feedbackLayer.scriptVariable}
            defaultValue={feedbackLayer.value}
            name={`layers.${feedbackLayer.name}.value`}
            size="lg"
            textAlign="left"
            color={feedbackColorLayer.value}
            inputRef={register({
              required: true,
              setValueAs: (value) => value.trim(),
            })}
          />
        </Box>
        <Box sx={{ display: 'flex', columnGap: 1, alignItems: 'center' }}>
          <TextInput
            placeholder={authorLayer.scriptVariable}
            defaultValue={authorLayer.value}
            name={`layers.${authorLayer.name}.value`}
            size="lg"
            textAlign="left"
            color={authorColorLayer.value}
            inputRef={register({
              required: true,
              setValueAs: (value) => value.trim(),
            })}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Feedback
