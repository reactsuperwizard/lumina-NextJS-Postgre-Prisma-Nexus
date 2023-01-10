import { Box, styled } from '@mui/system'

interface Props {
  children: React.ReactNode
}

const StyledBox = styled(Box)(({ theme }) => ({
  color: '#fff',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  fontSize: '0.6rem',
  fontWeight: 700,
  justifyContent: 'center',
  alignItems: 'center',
  width: '1.5rem',
  height: '1.5rem',
  display: 'flex',
  marginLeft: '0.5rem',
}))
export const BadgeLumina = ({ children }: Props) => {
  return <StyledBox>{children}</StyledBox>
}
