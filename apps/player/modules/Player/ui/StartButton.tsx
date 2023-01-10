import React from 'react'
import { IconButton, Fade, styled } from '@mui/material'
import { alpha } from '@mui/material/styles';
import { PlayArrow } from '@mui/icons-material'



const PREFIX = 'StartButton'

const classes = {
  button: `${PREFIX}-button`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
      borderRadius: '8px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      color: 'white',
      background: `linear-gradient(90deg, ${alpha('#000', 0.6)}, ${alpha('#000', 0.3)})`,
      '& button': {
            fontSize: '3em',
    [theme.breakpoints.up('sm')]: {
      fontSize: '6em',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '6em',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '8em',
    },
        padding: '0 0.3em 0 0.3em',
      },
      '&:hover': {
        color: 'black',
        background: `linear-gradient(90deg, ${alpha('#808080', 0.6)}, ${alpha('#808080', 0.3)})`,
      },
    [`& .${classes.button}`]: {
      color: 'white',
      borderRadius: '8px',
      '&:hover': {
        color: 'black',
      },
    },
  }))


interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  started: boolean
}

export const StartButton = ({
  onClick,
  started,
}: Props) => {

  return (
    <Fade in={!started} unmountOnExit>
      <Root
        
      >
        <IconButton
          className={classes.button}
          onClick={onClick}
          disableRipple={true}
          size="large">
          <PlayArrow fontSize="inherit" />
        </IconButton>
      </Root>
    </Fade>
  );
}
