import { TextField } from '@mui/material'
import { styled } from '@mui/system'

const StyledInput = styled(TextField)(() => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    padding: 0,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: '0px',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderWidth: 0,
  },
  '& textarea': {
    lineHeight: '100%',
  },
  backgroundColor: '#0000001f',
  borderStyle: 'dashed',
  borderWidth: '2px',
  outline: 'none',
}))

export type Size = 'xs' | 'md' | 'lg' | 'xl' | 'xxl'
export type Align = 'center' | 'left' | 'right'
export type FontWeight = 'normal' | 'bold'
interface Props {
  defaultValue?: string
  placeholder: string
  name: string
  inputRef?: React.Ref<any>
  multiline?: boolean
  size?: Size
  color?: string
  textAlign?: Align
  fontWeight?: FontWeight
  maxRows?: number
}
type InputType = {
  [k in Size]: Object
}
const inputStyles: InputType = {
  xs: {
    fontSize: 14,
    fontWeight: 400,
  },
  md: { fontSize: 20 },
  lg: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  xl: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  xxl: {
    fontSize: 32,
    fontWeight: 'bold',
  },
}
const multilineSettings = {
  multiline: true,
}

const TextInput = ({
  multiline,
  size = 'md',
  color = 'black',
  textAlign = 'center',
  fontWeight,
  maxRows = 2,
  ...props
}: Props) => {
  return (
    <StyledInput
      {...props}
      key={props.name}
      {...(multiline ? { multiline: true, maxRows } : {})}
      variant="outlined"
      inputProps={{
        style: {
          padding: 0,
          textAlign,
          color,
          ...inputStyles[size],
          fontWeight,
        },
        // To be made dynamic
        // maxLength: 17,
      }}
      style={{
        borderColor: color,
      }}
    />
  )
}

export default TextInput
