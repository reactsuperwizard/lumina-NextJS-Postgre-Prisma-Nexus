import { Typography } from '@mui/material'

interface Props {
  children: React.ReactNode
}

export const LuminaHeader = ({ children }: Props) => {
  return (
    <Typography sx={{ fontSize: '2rem', fontWeight: '700' }}>
      {children}
    </Typography>
  )
}
