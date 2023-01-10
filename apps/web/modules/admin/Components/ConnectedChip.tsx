import React from 'react'
import { useRouter } from 'next/router'
import { Chip, Box, Menu, MenuItem } from '@mui/material'

const initialState = {
  mouseX: null,
  mouseY: null,
}

export const ConnectedChip = ({
  id,
  resourceName,
  label,
}: {
  id: number
  resourceName: string
  label?: string
}) => {
  const router = useRouter()

  const resourcePath = `${
    router.pathname.split('/')[1]
  }/${resourceName.toLowerCase()}${
    resourceName.slice(-1) != 's' ? 's' : ''
  }/${id.toString()}`

  const makeOnClick = (id: number, blank?: boolean) => {
    return (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault()
      event.stopPropagation()
      if (blank) {
        window.open(
          `${window.location.href.split('admin')[0]}${resourcePath}`,
          '_blank',
        )
        setMouse(initialState)
        return
      }
      router.push(`/${resourcePath}`)
    }
  }

  const [mouse, setMouse] = React.useState<{
    mouseX: null | number
    mouseY: null | number
  }>(initialState)

  const handleContext = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setMouse({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    })
  }

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setMouse(initialState)
  }

  const makeMenuOnClick = (id: number) => {
    const _onClick = makeOnClick(id, true)
    const menuOnClick: React.MouseEventHandler<HTMLLIElement> = (
      event: React.MouseEvent<Element, MouseEvent>,
    ) => {
      const _event = event as React.MouseEvent<HTMLDivElement>
      return _onClick(_event)
    }
    return menuOnClick
  }

  return (
    <Box
      component="a"
      key={`box-${id}`}
      mx={0.06}
      onClick={makeOnClick(id)}
      onContextMenu={handleContext}
      style={{ cursor: 'context-menu' }}
    >
      <Chip
        color="primary"
        key={`chip-${id}`}
        label={label || id}
        style={{ maxWidth: '14rem', cursor: 'pointer' }}
      />
      <Menu
        keepMounted
        open={mouse.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          mouse.mouseY !== null && mouse.mouseX !== null
            ? { top: mouse.mouseY, left: mouse.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={makeMenuOnClick(id)}>Open in New Tab</MenuItem>
      </Menu>
    </Box>
  )
}
