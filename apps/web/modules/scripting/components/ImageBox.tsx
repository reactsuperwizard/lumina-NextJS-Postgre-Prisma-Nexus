import { Box } from '@mui/material'
interface Props {
  url: string
}

export const ImageBox = ({ url }: Props) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%',
      }}
    ></Box>
  )
}
