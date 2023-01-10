import { Box, TextField } from '@mui/material'
import { Logo } from 'modules/layouts/Logo'
import LocationOnIcon from '@mui/icons-material/LocationOn'
export const T6Slide1 = () => {
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
        <TextField
          // To be made dynamic
          placeholder="Tag Line"
          variant="outlined"
          inputProps={{
            style: {
              fontSize: '32px',
              fontWeight: 'bold',
              padding: 0,
              textAlign: 'center',
            },
            // To be made dynamic
            maxLength: 17,
          }}
        />
      </Box>
      <Box sx={{ width: '570px', flex: 2, alignSelf: 'center' }}>
        <TextField
          placeholder="Position"
          variant="outlined"
          inputProps={{
            style: {
              fontSize: '29px',
              padding: 0,
              textAlign: 'center',
            },
            maxLength: 20,
          }}
          fullWidth
        />
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
        <TextField
          variant="outlined"
          placeholder="Location"
          inputProps={{
            style: {
              padding: `2px 5px`,
              fontSize: '1rem',
            },
            maxLength: 20,
          }}
          fullWidth
        />
      </Box>
    </Box>
  )
}
