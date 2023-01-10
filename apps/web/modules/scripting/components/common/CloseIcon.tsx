import { styled } from '@mui/system'
import Close from '@mui/icons-material/Close'

const Icon = styled(Close)(({ theme }) => ({
  color: '#666666',
}))

const CloseIcon = () => {
  return <Icon />
}

export default CloseIcon
