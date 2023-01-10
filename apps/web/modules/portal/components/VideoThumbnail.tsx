import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
const PREFIX = 'VideoThumbnail';

const classes = {
  wrapperDiv: `${PREFIX}-wrapperDiv`,
  noThumbnailWrap: `${PREFIX}-noThumbnailWrap`,
  placeholder: `${PREFIX}-placeholder`,
  image: `${PREFIX}-image`,
  show: `${PREFIX}-show`
};

const Root = styled('div')({
  [`&.${classes.wrapperDiv}`]: {
    position: 'relative',
    width: '100%',
    backgroundColor: 'white',
  },
  [`& .${classes.noThumbnailWrap}`]: {
    padding: '56.25% 0 0 0',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  [`& .${classes.placeholder}`]: {
    width: '100%',
    minHeight: '100%',
  },
  [`& .${classes.image}`]: {
    width: '100%',
    opacity: '0',
    transition: 'opacity 0.2s',
  },
  [`& .${classes.show}`]: {
    opacity: '1 !important',
  },
});

interface Props {
  vimeoId?: number | null | undefined
  imageUrl?: string
}

export const VideoThumbnail = (props: Props) => {
  const { vimeoId, imageUrl } = props
  const [url, setUrl] = useState<string | null>(imageUrl || null)
  const [loaded, setLoaded] = useState(false)


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
      {url && (
        <img
          src={url}
          onLoad={() => setLoaded(true)}
          alt={`Video-${vimeoId}`}
          className={`${classes.image} ${loaded ? classes.show : ''}`}
        />
      )}
      {!imageUrl && (
        <div className={classes.noThumbnailWrap}>
          <div className={classes.placeholder}></div>
        </div>
      )}
    </Root>
  );
}
