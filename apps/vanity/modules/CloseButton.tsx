import React from 'react'
import { Fade, IconButton } from '@mui/material'
import { CloseSharp, ExpandMore } from '@mui/icons-material'

interface Props {
  show: boolean
  open: boolean
  toggle: () => void
}

export const CloseButton = ({ show, open, toggle }: Props) => {
  return (
    <Fade in={show} timeout={1000}>
      <IconButton
        aria-label="close"
        style={{
          position: 'absolute',
          right: '2rem',
          top: '1rem',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.2)',
          zIndex: 150000,
        }}
        onClick={toggle}
        size="large">
        {open ? <CloseSharp /> : <ExpandMore />}
      </IconButton>
    </Fade>
  );
}
