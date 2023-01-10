import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Draggable from 'react-draggable'
import { Button, Paper, Box, Grid, Typography } from '@mui/material'
import { CloseSharp, DragIndicator } from '@mui/icons-material'

import invert from 'invert-color'

import ColorPicker, { ColorObject } from './ColorPicker/ColorPicker'

const PREFIX = 'ColorPickerModal2'

const classes = {
  colorButton: `${PREFIX}-colorButton`,
  colorButtonContainer: `${PREFIX}-colorButtonConatiner`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  [`& .${classes.colorButton}`]: {
    padding: '10px 25px',
    lineHeight: 1.45,
  },
  [`& .${classes.colorButtonContainer}`]: {
    cursor: 'pointer',
  },
})

interface Props {
  color?: string
  changeColor: (color: ColorObject) => void
  title?: string
}

export const ColorPickerModal2: React.FC<Props> = ({
  color,
  changeColor,
  title,
  children,
}) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  let invertedColor: string | null = null

  if (color) {
    // make sure color is valid before attempting to invert
    // otherwise invertion throws
    const re = /[0-9A-Fa-f]{6}/g
    if (re.test(color)) {
      invertedColor = invert(color, {
        black: '#000000',
        white: '#ffffff',
        threshold: 0.3,
      })
    }
  }

  return (
    <Root>
      <Grid
        container
        onClick={toggleOpen}
        className={classes.colorButtonContainer}
      >
        <Grid item display={'flex'}>
          <Button
            className={classes.colorButton}
            style={{
              backgroundColor: color ? color : undefined,
              color: invertedColor ? invertedColor : undefined,
            }}
            color={!color ? 'primary' : undefined}
            variant="contained"
          ></Button>
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
      {open ? (
        <div
          style={{
            position: 'relative',
            zIndex: 4000,
          }}
        >
          <div
            style={{
              position: 'absolute',
              height: 0,
            }}
          >
            <Draggable cancel="#picker2" defaultPosition={{ x: 0, y: 0 }}>
              <Box pt={1} style={{ cursor: 'move' }}>
                <Paper>
                  <Box p={1} pt={1} mb={1} display="flex">
                    <Grid container>
                      <Grid item xs={2} onClick={toggleOpen}>
                        <CloseSharp
                          color="primary"
                          style={{ cursor: 'pointer', margin: '0 0.25rem' }}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        {title && (
                          <Typography color="textSecondary">{title}</Typography>
                        )}
                      </Grid>
                      <Grid item xs={1}>
                        <DragIndicator color="primary" />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    style={{
                      cursor: 'auto',
                      display: 'flex',
                      placeContent: 'center',
                    }}
                    id="picker2"
                  >
                    <ColorPicker
                      color={color}
                      onChange={changeColor}
                      hideAlpha
                    />
                  </Box>
                </Paper>
              </Box>
            </Draggable>
          </div>
        </div>
      ) : null}
    </Root>
  )
}
