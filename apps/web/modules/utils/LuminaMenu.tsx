import { Paper, styled, SxProps, Theme } from '@mui/material'
import { useEffect } from 'react'

const PREFIX = 'LuminaMenu'

const classes = {
  filter: `${PREFIX}-filter`,
}

const Root = styled(Paper)(() => ({
  [`&.${classes.filter}`]: {
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    color: '#00000080',
    padding: 0,
  },
}))

interface Props {
  showMenu: boolean | undefined
  id: string // id of the container with position 'relative'
  setShowMenu: (showMenu: boolean) => void
  children: React.ReactNode
  sx?: SxProps<Theme>
}

export const LuminaMenu = ({
  showMenu,
  setShowMenu,
  children,
  id,
  sx,
}: Props) => {
  const handleOutsideClick = (e: MouseEvent) => {
    const textBoxEle = document.querySelector(id)
    if (textBoxEle?.contains(e?.target as Node)) {
      return
    }
    setShowMenu(false)
  }

  useEffect(() => {
    document.removeEventListener('click', handleOutsideClick)
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return showMenu ? (
    <Root sx={sx} className={classes.filter} elevation={3}>
      {children}
    </Root>
  ) : (
    <></>
  )
}
