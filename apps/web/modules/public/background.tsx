import styled from '@emotion/styled'
import { Box } from '@mui/material'
import bgBlur from 'public/BgBlur.png'

interface Props {
  children: React.ReactNode
}

const PREFIX = 'Background'

const classes = {
  box: `${PREFIX}-box`,
}
const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.box}`]: {
    backgroundImage: `linear-gradient(to bottom, rgba(9, 10, 63, 0.75), rgba(9, 10, 63, 0.75)),
      url(${bgBlur})`,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}))
export const Background = ({ children }: Props) => (
  <StyledBox className={classes.box}>{children}</StyledBox>
)
