import React from 'react'
import { Box, Slide, styled } from '@mui/material'

const PREFIX = 'VideoBox'

const classes = {
  fullWidth: `${PREFIX}-fullWidth`,
  maxWrap: `${PREFIX}-maxWrap`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.fullWidth}`]: {
    background:
      'linear-gradient(0.25turn, rgba(0, 0, 0, 0.18) , rgba(0, 0, 0, 0.08) , rgba(0, 0, 0, 0.18)), linear-gradient(1turn, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.18) 10%,  transparent 100%)',
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    borderBottom: '1px solid lightgrey',
  },
  [`& .${classes.maxWrap}`]: {
    display: 'block',
    width: '100%',
    maxWidth: '800px',
  },
}))

export const VideoBox = ({
  children,
  open,
}: {
  children: React.ReactNode
  open: boolean
}) => {
  return (
    <StyledBox id="video">
      <Slide appear={true} direction="down" in={open}>
        <Box width="100%" className={classes.fullWidth}>
          <Box id="video-max-wrap" className={classes.maxWrap}>
            <Box id="video-aspect-wrap" hidden={!open}>
              {children}
            </Box>
          </Box>
        </Box>
      </Slide>
    </StyledBox>
  )
}
