import { styled } from '@mui/system'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  data: {
    isValid: boolean
    text: string
  }
}

const Error = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#B528281F',
  color: '#9B2121',
  gap: theme.spacing(1),
  padding: '4px 12px',
  borderRadius: 16,
  svg: {
    color: 'white',
    borderRadius: '100%',
    backgroundColor: '#9B2121',
    padding: 4,
    width: 20,
    height: 20,
  },
}))

const Success = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#28803B1F',
  color: '#226E33',
  gap: theme.spacing(1),
  padding: '4px 12px',
  borderRadius: 16,
  svg: {
    color: 'white',
    borderRadius: '100%',
    backgroundColor: '#226E33',
    padding: 4,
    width: 20,
    height: 20,
  },
}))

const ValidationInfo = ({ data }: Props) => {
  if (data.isValid)
    return (
      <Success>
        <CheckIcon />
        <strong>{data.text}</strong>
      </Success>
    )
  return (
    <Error>
      <CloseIcon />
      <strong>{data.text}</strong>
    </Error>
  )
}

export default ValidationInfo
