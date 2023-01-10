import { Box } from '@mui/material'
import { AudioPlayer2 } from 'modules/admin/Components/AudioPlayer2'
import waves from '../../../public/Waves.png'

interface Props {
  url: string
}
export const AudioBox = ({ url }: Props) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100px',
        backgroundImage: `url(${waves})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box sx={{ width: '25%' }}>
        <AudioPlayer2 src={url} />
      </Box>
    </Box>
  )
}
