import React from 'react'
import TuneIcon from '@mui/icons-material/Tune'
import { Box, styled } from '@mui/material'

const PREFIX = 'Filter'

const classes = {
  inputRoot: `${PREFIX}-inputRoot`,
}

const Root = styled(Box)(() => ({
  [`&.${classes.inputRoot}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ':hover': {
      cursor: 'pointer',
    },
  },
}))

interface Props {
  showFilter: boolean
  setShowFilter: (showFilter: boolean) => void
}
export const Filter = ({ showFilter, setShowFilter }: Props) => {
  return (
    <Root className={classes.inputRoot}>
      <TuneIcon
        onClick={() => {
          setShowFilter(!showFilter)
        }}
      ></TuneIcon>
    </Root>
  )
}
