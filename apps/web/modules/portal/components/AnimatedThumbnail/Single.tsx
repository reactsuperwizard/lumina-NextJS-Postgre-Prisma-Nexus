import { Box, Theme } from '@mui/material'
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import { VideoThumbnail } from '../VideoThumbnail'
import { AnimatedThumbnailProps } from './AnimatedThumbnail'

const PREFIX = 'Single';

const classes = {
  aspectWrap: `${PREFIX}-aspectWrap`,
  wrapImage: `${PREFIX}-wrapImage`,
  hoverWrapImage: `${PREFIX}-hoverWrapImage`,
  imageBorder: `${PREFIX}-imageBorder`
};

const StyledBox = styled(Box)((
  {
    theme
  }
) => ({
  [`&.${classes.aspectWrap}`]: {
    width: '100%',
    height: '0',
    paddingBottom: '56.25%',
    position: 'relative',
  },

  [`& .${classes.wrapImage}`]: {
    position: 'absolute',
    border: '4px solid white',
    top: '5%',
    right: '5%',
    bottom: '5%',
    left: '5%',
    transform: 'rotate(0deg)',
    transition: 'top 0.5s, bottom 0.5s, left 0.5s, right 0.5s, transform 0.5s',
  },

  [`& .${classes.hoverWrapImage}`]: {
    top: '2%',
    right: '2%',
    bottom: '2%',
    left: '2%',
    transform: 'rotate(3deg)',
  },

  [`& .${classes.imageBorder}`]: {
    height: '100%',
    width: '100%',
    border: '1px solid lightgrey',
    overflow: 'hidden',
  }
}));

export const Single = ({
  isHovered,
  vimeoIdList,
  urlList,
}: AnimatedThumbnailProps) => {


  return (
    <StyledBox className={classes.aspectWrap}>
      <Box
        className={`${classes.wrapImage} ${
          isHovered ? classes.hoverWrapImage : ''
        }`}
      >
        <Box className={classes.imageBorder}>
          <VideoThumbnail vimeoId={vimeoIdList?.[0]} imageUrl={urlList?.[0]} />
        </Box>
      </Box>
    </StyledBox>
  );
}
