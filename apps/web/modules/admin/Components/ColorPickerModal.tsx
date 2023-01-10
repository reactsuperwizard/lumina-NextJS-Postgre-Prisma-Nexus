import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Button, Paper, Box, Grid, Typography } from '@mui/material'
import { CloseSharp, ColorizeTwoTone, DragIndicator } from '@mui/icons-material'

import invert from 'invert-color'

import ColorPicker, { ColorObject } from './ColorPicker/ColorPicker'

import Draggable from 'react-draggable'

const PREFIX = 'ColorPickerModal';

const classes = {
  colorButton: `${PREFIX}-colorButton`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.colorButton}`]: {
    padding: '10px 25px',
    lineHeight: 1.45,
    marginTop: '2rem',
  },
});

interface Props {
  color?: string
  changeColor: (color: ColorObject) => void
  title?: string
}

export const ColorPickerModal = ({ color, changeColor, title }: Props) => {
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
    (<Root>
      <Button
        className={classes.colorButton}
        style={{
          backgroundColor: color ? color : undefined,
          color: invertedColor ? invertedColor : undefined,
        }}
        color={!color ? 'primary' : undefined}
        variant="contained"
        onClick={toggleOpen}
        endIcon={<ColorizeTwoTone />}
      >
        Color
      </Button>
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
            <Draggable cancel="#picker" defaultPosition={{ x: 200, y: -100 }}>
              <Box p={3} style={{ cursor: 'move' }}>
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
                  <Box style={{ cursor: 'auto' }} id="picker">
                    <ColorPicker color={color} onChange={changeColor} hideAlpha />
                  </Box>
                </Paper>
              </Box>
            </Draggable>
          </div>
        </div>
      ) : null}
    </Root>)
  );
}
