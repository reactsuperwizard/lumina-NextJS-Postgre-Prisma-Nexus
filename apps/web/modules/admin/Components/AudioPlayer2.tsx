import React, { useEffect, useState, useRef } from 'react'
import { Button, styled, IconButton } from '@mui/material'
import { PlayArrow } from '@mui/icons-material'
import PauseIcon from '@mui/icons-material/Pause'
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  width: '4.5rem',
  height: '4.5rem',
  borderRadius: '100px',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiButton-startIcon': {
    margin: 0,
  },
}))

interface Props {
  src: string
  mode?: 'circle' | 'square'
}

const useAudio = (src: string) => {
  const audio = useRef<HTMLAudioElement>(new Audio(src))
  const [playing, setPlaying] = useState(false)

  const toggle = () => setPlaying(!playing)

  useEffect(() => {
    playing ? audio.current.play() : audio.current.pause()
  }, [playing])

  useEffect(() => {
    audio.current.addEventListener('ended', () => setPlaying(false))
    return () => {
      audio.current.removeEventListener('ended', () => setPlaying(false))
      audio.current.pause()
    }
  }, [])

  return [playing, toggle] as const
}

export const AudioPlayer2 = ({ src, mode }: Props) => {
  const [playing, toggle] = useAudio(src)
  const getMargin = () => {
    return mode === 'square' ? { marginRight: '0.5rem' } : { margin: 0 }
  }
  const getBackground = () => {
    return mode == 'square'
      ? {
          backgroundColor: 'white',
          color: '#0a1467',
          border: '1px solid #0a1467',
          fontSize: '0.875rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }
      : {
          backgroundColor: '#0a1467',
          color: 'white',
          width: '3.875rem',
          height: '3.875rem',
          borderRadius: '100px',
          fontSize: '1.875rem',
        }
  }
  return (
    <>
      <Button
        sx={{
          ...getBackground(),
          '&:hover': {
            ...getBackground(),
          },
          '& .MuiButton-startIcon': {
            ...getMargin(),
          },
        }}
        startIcon={playing ? <PauseIcon /> : <PlayArrow />}
        onClick={toggle}
      >
        {mode === 'square' && 'Play'}
      </Button>
    </>
  )
}
