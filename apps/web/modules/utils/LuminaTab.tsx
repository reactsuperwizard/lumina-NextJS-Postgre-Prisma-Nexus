import { Box, styled, Typography } from '@mui/material'
import { BadgeLumina } from './Badge'

const PREFIX = 'LuminaTab'

const classes = {
  box: `${PREFIX}-box`,
  active: `${PREFIX}-active`,
  typo: `${PREFIX}-typo`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.box}`]: {
    display: 'flex',
    padding: '0.5rem 1rem',
    borderBottom: `3px solid transparent`,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: `${theme.palette.primary.main}10`,
    },
  },
  [`&.${classes.active}`]: {
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    fontWeight: 'bold',
  },
  [`& .${classes.typo}`]: {
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
  },
}))

interface Props {
  children: React.ReactNode
  id: string
  count?: number
  active?: boolean
  onClick?: (id: string) => void
}

export const LuminaTab = ({ children, count, active, id, onClick }: Props) => {
  const handleClick = () => {
    if (onClick) onClick(id)
    return
  }
  return (
    <StyledBox
      className={`${classes.box} ${active ? classes.active : ''}`}
      onClick={() => handleClick()}
    >
      <Box className={classes.typo} fontSize={'0.9rem'} fontWeight="medium">
        {children} {count! > 0 && <BadgeLumina>{count}</BadgeLumina>}
      </Box>
    </StyledBox>
  )
}
