import { Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { VideoThumbnail } from '../VideoThumbnail'
import { AnimatedThumbnailProps } from './AnimatedThumbnail'

const useStyles = makeStyles((theme: Theme) => ({
  '@keyframes slideRight': {
    from: { top: 0, right: '10%', bottom: '20%', left: '15%' },
    to: { top: '-5%', right: '5%', bottom: '25%', left: '20%' },
    time: '3.5seconds',
  },
  aspectWrap: {
    width: '100%',
    height: '0',
    paddingBottom: '56.25%',
    position: 'relative',
    marginLeft: '5%',
  },
  wrapImageBottom: {
    position: 'absolute',
    border: '4px solid white',
    top: 0,
    right: '10%',
    bottom: '20%',
    left: '10%',
    transition: 'top 0.5s, bottom 0.5s, left 0.5s, right 0.5s',
  },
  hoverWrapImageBottom: {
    top: '-5%',
    right: '5%',
    bottom: '25%',
    left: '20%',
  },
  wrapImageTop: {
    position: 'absolute',
    border: '4px solid white',
    top: '20%',
    right: '20%',
    bottom: 0,
    left: 0,
    transition: 'top 0.5s, bottom 0.5s, left 0.5s, right 0.5s',
  },
  hoverWrapImageTop: {
    top: '25%',
    right: '25%',
    bottom: '-5%',
    left: '-5%',
  },
  wrapImageMiddle: {
    position: 'absolute',
    border: '4px solid white',
    top: '10%',
    right: '15%',
    bottom: '10%',
    left: '5%',
  },
  imageBorder: {
    height: '100%',
    width: '100%',
    border: '1px solid lightgrey',
    overflow: 'hidden',
  },
}))

export const Stack = ({
  isHovered,
  vimeoIdList,
  urlList,
}: AnimatedThumbnailProps) => {
  const [hasThree, setHasThree] = useState(false)
  const [id1, setId1] = useState<number | undefined>()
  const [id2, setId2] = useState<number | undefined>()
  const [id3, setId3] = useState<number | undefined>()
  const [url1, setUrl1] = useState<string | undefined>()
  const [url2, setUrl2] = useState<string | undefined>()
  const [url3, setUrl3] = useState<string | undefined>()

  const classes = useStyles()

  useEffect(() => {
    const _hasThree =
      (vimeoIdList && vimeoIdList.length > 2) || (urlList && urlList.length > 2)
    if (vimeoIdList) {
      setId1(vimeoIdList[0])
      if (_hasThree) setId2(vimeoIdList[1])
      setId3(_hasThree ? vimeoIdList[2] : vimeoIdList[1])
    }
    if (urlList) {
      setUrl1(urlList[0])
      if (_hasThree) setUrl2(urlList[1])
      setUrl3(_hasThree ? urlList[2] : urlList[1])
    }
    if (_hasThree) setHasThree(true)
  }, [vimeoIdList, urlList])

  return (
    <Box className={classes.aspectWrap}>
      <Box
        className={`${classes.wrapImageBottom} ${
          isHovered ? classes.hoverWrapImageBottom : ''
        }`}
      >
        <Box className={classes.imageBorder}>
          <VideoThumbnail vimeoId={id3} imageUrl={url3} />
        </Box>
      </Box>

      {hasThree && (
        <Box className={classes.wrapImageMiddle}>
          <Box className={classes.imageBorder}>
            <VideoThumbnail vimeoId={id2} imageUrl={url2} />
          </Box>
        </Box>
      )}
      <Box
        className={`${classes.wrapImageTop} ${
          isHovered ? classes.hoverWrapImageTop : ''
        }`}
      >
        <Box className={classes.imageBorder}>
          <VideoThumbnail vimeoId={id1} imageUrl={url1} />
        </Box>
      </Box>
    </Box>
  )
}
