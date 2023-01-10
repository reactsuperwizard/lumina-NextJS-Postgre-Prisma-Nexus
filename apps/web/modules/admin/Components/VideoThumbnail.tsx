import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
const PREFIX = 'VideoThumbnail';

const classes = {
  wrapperDiv: `${PREFIX}-wrapperDiv`,
  noThumbnailWrap: `${PREFIX}-noThumbnailWrap`,
  placeholder: `${PREFIX}-placeholder`
};

const Root = styled('div')({
  [`&.${classes.wrapperDiv}`]: {
    position: 'relative',
    width: '100%',
    backgroundColor: 'darkgrey',
  },
  [`& .${classes.noThumbnailWrap}`]: {
    padding: '56.25% 0 0 0',
    position: 'relative',
    backgroundColor: 'darkgrey',
  },
  [`& .${classes.placeholder}`]: {
    width: '100%',
    minHeight: '100%',
  },
});

interface Props {
  vimeoId?: number | null | undefined
  imageUrl?: string
}

export const VideoThumbnail = (props: Props) => {
  const { vimeoId, imageUrl } = props
  const [url, setUrl] = useState<string | null>(imageUrl || null)


  useEffect(() => {
    if (vimeoId && !url) {
      const newUrl = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}`
      fetch(newUrl)
        .then(async (response) => {
          await response
          return response.json()
        })
        .then(
          (data) => {
            if (data?.thumbnail_url) setUrl(data.thumbnail_url)
          },
          (error) => {
            console.error(
              `Unable to load thumbnail for Vimeo video ${vimeoId}\nError: ${error}`,
            )
          },
        )
        .catch((error: any) => console.error(error))
    }
  }, [vimeoId])

  useEffect(() => {
    if (imageUrl) setUrl(imageUrl)
  }, [imageUrl])

  return (
    <Root className={classes.wrapperDiv}>
      {url ? (
        <img src={url} alt={`Video-${vimeoId}`} style={{ width: '100%' }} />
      ) : (
        <div className={classes.noThumbnailWrap}>
          <div className={classes.placeholder}></div>
        </div>
      )}
    </Root>
  );
}
