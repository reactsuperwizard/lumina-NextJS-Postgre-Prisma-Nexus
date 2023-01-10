import React from 'react'
import { useRouter } from 'next/router'
import { Menu, MenuItem, TableRow } from '@mui/material'

const initialState = {
  mouseX: null,
  mouseY: null,
}

export const ClickableTableRow = ({
  id,
  children,
  typeAndIdUrl,
  isItemSelected,
}: {
  id: number
  children: React.ReactNode
  typeAndIdUrl: string
  isItemSelected?: boolean
}) => {
  const router = useRouter()

  const makeOnClick = (blank?: boolean) => {
    return (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault()
      event.stopPropagation()
      if (blank) {
        window.open(
          `${window.location.href.split('admin')[0]}admin/${typeAndIdUrl}`,
          '_blank',
        )
        setMouse(initialState)
        return
      }
      router.push(`/admin/${typeAndIdUrl}`)
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

  const makeMenuOnClick = () => {
    const _onClick = makeOnClick(true)
    const menuOnClick: React.MouseEventHandler<HTMLLIElement> = (
      event: React.MouseEvent<Element, MouseEvent>,
    ) => {
      const _event = event as React.MouseEvent<HTMLDivElement>
      return _onClick(_event)
    }
    return menuOnClick
  }

  return (
    <>
      <TableRow
        onClick={makeOnClick()}
        onContextMenu={handleContext}
        hover
        key={`row-${id}`}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        selected={isItemSelected}
        style={{
          cursor: 'pointer',
        }}
      >
        {children}
      </TableRow>
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
        <MenuItem onClick={makeMenuOnClick()}>Open in New Tab</MenuItem>
      </Menu>
    </>
  )
}
