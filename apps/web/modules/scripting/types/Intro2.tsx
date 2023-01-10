import { Box, Button } from '@mui/material'
import { Logo } from 'modules/layouts/Logo'

interface Props {
  buttonOnSide: boolean
}
export const Intro2 = ({ buttonOnSide }: Props) => {
  return (
    <Box
      sx={{
        width: '720px',
        height: '405px',
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: buttonOnSide ? 'row' : 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Logo darkBackground={true}></Logo>
      <Box>
        <Button
          sx={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: '#00003c',
            padding: '8px 12px',
            textTransform: 'none',
            '&:hover': {
              color: '#fff',
              backgroundColor: '#00003c',
            },
          }}
        >
          Apply Now
        </Button>
      </Box>
    </Box>
  )
}
