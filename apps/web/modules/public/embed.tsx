import { gql, useQuery } from '@apollo/client'
import { Video } from '@lumina/api'
import { Player } from '@lumina/player'
import { Box, Skeleton, styled, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const PREFIX = 'Embed'

const classes = {
  gridList: `${PREFIX}-gridList`,
  videoBox: `${PREFIX}-videoBox`,
  skeleton: `${PREFIX}-skeleton`,
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const StyledBox = styled(Box)(() => ({
  [`&.${classes.gridList}`]: {
    width: '100%',
    height: '100%',
    padding: '0',
    margin: '0',
  },
  [`& .carousel-container`]: {
    maxHeight: '250px',
  },
  [`& .${classes.videoBox}`]: {
    maxHeight: '250px',
    margin: '5px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },
  [`& .${classes.skeleton}`]: {
    borderRadius: '5px',
    margin: '0px 5px',
    width: '100%',
  },
}))

const GET_VIMEO_IDS = gql`
  query getVideos($where: VideoWhereInput) {
    videos(where: $where) {
      vimeoId
    }
  }
`

interface VideosQuery extends Pick<Video, 'vimeoId'> {}

export const Embed = () => {
  const [vimeoIds, setVimeoIds] = useState<number[]>([])
  const router = useRouter()
  const videoIds =
    router.query.videoId &&
    (router.query.videoId as string).split(',').map((ele) => Number(ele))

  const {
    data: videosQuery,
    loading,
    error,
  } = useQuery<{ videos: VideosQuery[] }>(GET_VIMEO_IDS, {
    variables: { where: { id: { in: videoIds } } },
    skip: !videoIds || videoIds.length === 0,
  })

  useEffect(() => {
    if (videosQuery?.videos)
      setVimeoIds(videosQuery.videos?.map((vid) => vid.vimeoId!))
  }, [videosQuery])

  return (
    <StyledBox className={classes.gridList}>
      {(!videoIds || videoIds?.length == 0) && !loading && (
        <Typography>No videos to show</Typography>
      )}
      {error && (
        <Typography>Something went wrong fetching the videos</Typography>
      )}
      {!loading && !error && (
        <Carousel
          responsive={responsive}
          partialVisible
          containerClass="carousel-container"
          autoPlay={true}
          autoPlaySpeed={300000}
        >
          {vimeoIds?.map((id) => (
            <Box key={id} className={classes.videoBox}>
              <Player
                poweredBy={{
                  logoSrc: '/Negative@3x.png',
                  iconSrc: '/Negative@3xIcon.png',
                  href: 'https://www.lumina.co',
                }}
                vimeoId={Number(id)}
                responsive
              />
            </Box>
          ))}
        </Carousel>
      )}
      {loading && (
        <Box sx={{ display: 'flex' }}>
          <Skeleton
            variant="rectangular"
            className={classes.skeleton}
            height={230}
          />
        </Box>
      )}
    </StyledBox>
  )
}
