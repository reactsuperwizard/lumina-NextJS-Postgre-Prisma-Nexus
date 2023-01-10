import { Box } from '@mui/material'
import { Logo } from 'modules/layouts/Logo'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { TextInput } from '../components'
export const Intro1 = () => {
  return (
    <Box
      sx={{
        width: '720px',
        height: '405px',
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <Box sx={{ flex: 3 }}></Box>
      <Box sx={{ flex: 2 }}>
        <Logo darkBackground={true}></Logo>
      </Box>
      <Box sx={{ width: '361px', flex: 1, alignSelf: 'center' }}>
        <TextInput placeholder="Tag Line" size={'xxl'} name="Tag Line" />
      </Box>
      <Box sx={{ width: '570px', flex: 2, alignSelf: 'center' }}>
        <TextInput placeholder="Position" size={'lg'} name="Position" />
      </Box>
      <Box
        sx={{
          width: '300px',
          flex: 3,
          alignSelf: 'center',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '5px',
        }}
      >
        <LocationOnIcon />
        <TextInput placeholder="Location" size={'xs'} name="Location" />
      </Box>
    </Box>
  )
}
