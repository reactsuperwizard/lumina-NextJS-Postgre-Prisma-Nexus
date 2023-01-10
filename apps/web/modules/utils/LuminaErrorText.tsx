import { Typography } from '@mui/material'

interface Props {
  children: React.ReactNode
}
export const LuminaErrorText = ({ children }: Props) => {
  return (
    <Typography
      variant="subtitle1"
      textAlign={'center'}
      fontSize={'1rem'}
      color={'#ED4F32'}
    >
      {children}
    </Typography>
  )
}
