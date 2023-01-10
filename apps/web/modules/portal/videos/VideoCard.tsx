import React from 'react'
import {
  Typography,
  Card,
  Box,
  styled,
  Badge,
  BadgeProps,
  Grid,
} from '@mui/material'
import NewLogo from '../../../public/sparkles-solid.svg'

import { useRouter } from 'next/router'

import { Video, Request, RequestStatus, Maybe } from '@lumina/api'

import { useState } from 'react'
import { VideoThumbnail } from '../components/VideoThumbnail'
import { Skeleton } from '@mui/material'

import inProgress from '../public/in-progress-lg.png'
import pending from '../public/pending-lg.png'

const PREFIX = 'VideoCard'

const classes = {
  wrapperDiv: `${PREFIX}-wrapperDiv`,
  thumbnailOuterWrap: `${PREFIX}-thumbnailOuterWrap`,
  thumbnailInnerWrap: `${PREFIX}-thumbnailInnerWrap`,
  thumbnailCard: `${PREFIX}-thumbnailCard`,
  thumbnailCrop: `${PREFIX}-thumbnailCrop`,
  hoveredCard: `${PREFIX}-hoveredCard`,
  title: `${PREFIX}-title`,
  subtitle: `${PREFIX}-subtitle`,
  mainBody: `${PREFIX}-mainBody`,
  badge: `${PREFIX}-badge`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.wrapperDiv}`]: {
    position: 'relative',
    width: '100%',
  },

  [`& .${classes.thumbnailOuterWrap}`]: {
    padding: '56.25% 0 0 0',
    position: 'relative',
  },
  [`& .${classes.badge}`]: {
    width: '50px',
    backgroundColor: '#FFCE00',
  },

  [`& .${classes.thumbnailInnerWrap}`]: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },

  [`& .${classes.thumbnailCard}`]: {
    borderRadius: 15,
    width: '98%',
    margin: '1%',
    transition: 'width 0.25s, margin 0.25s',
    border: '1px solid lightgrey',
  },

  [`& .${classes.thumbnailCrop}`]: {
    margin: '0 0 -7px',
  },

  [`& .${classes.hoveredCard}`]: {
    width: '100%',
    margin: 0,
  },

  [`& .${classes.title}`]: {
    width: '100%',
    textAlign: 'left',
    padding: '0.75rem 1rem 0 0.25rem',
  },

  [`& .${classes.subtitle}`]: {
    marginTop: '-3px',
    color: 'darkgrey',
  },

  [`&.${classes.mainBody}`]: {
    width: '100%',
    maxWidth: '37rem',
    cursor: 'pointer',
  },
  '&:hover + .MuiBadge-badge': {
    marginTop: '1.15rem',
    marginRight: '1.2rem',
  },
}))
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    justifyContent: 'flex-start',
    width: '3.5rem',
    backgroundColor: '#FFCE00',
    marginTop: '1.25rem',
    marginRight: '1.3rem',
    transition: 'margin 0.25s',
  },
  '& .MuiGrid-root': {
    paddingTop: '0.5px',
  },
}))
export const VideoCard = ({
  video,
  request,
  onClick,
}: {
  video?: Pick<Video, 'id' | 'vimeoId' | 'createdAt' | 'name' | 'thumbnail'>
  request?: Pick<
    Request,
    'id' | 'status' | 'createdAt' | 'jobTitle' | 'orderId'
  >
  onClick?: (vimeoId: Maybe<number> | undefined) => void
}) => {
  const router = useRouter()
  const query = router.query
  const slug: string = query?.portal?.toString().toLowerCase()
  const [hover, setHover] = useState(false)
  const result = (
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <Grid item>
        <img src={NewLogo} alt="New Logo" width="10" height="10" color="#000" />
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" fontSize="0.6rem" ml={'2px'}>
          NEW!
        </Typography>
      </Grid>
    </Grid>
  )

  return (
    <StyledBadge
      badgeContent={result}
      invisible={
        !(
          new Date(video?.createdAt) >
          new Date(new Date().setDate(new Date().getDate() - 30))
        )
      }
    >
      <StyledBox
        className={classes.mainBody}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          if (onClick) return onClick(video?.vimeoId)
          if (video) router.push(`/${slug}/videos/${video.id}`)
          if (request) router.push(`/${slug}/orders/${request.orderId}`)
        }}
      >
        <Box className={classes.wrapperDiv}>
          <Box className={classes.thumbnailOuterWrap}>
            <Box className={classes.thumbnailInnerWrap}>
              <Card
                elevation={hover ? 6 : 0}
                className={`${classes.thumbnailCard} ${
                  hover && classes.hoveredCard
                }`}
              >
                <Box className={classes.thumbnailOuterWrap}>
                  <Box className={classes.thumbnailInnerWrap}>
                    {video || request ? (
                      <Box className={classes.thumbnailCrop}>
                        {video && (
                          <VideoThumbnail
                            imageUrl={video.thumbnail || undefined}
                            vimeoId={video.vimeoId}
                          />
                        )}
                        {request && (
                          <VideoThumbnail
                            imageUrl={
                              request.status === RequestStatus.Draft
                                ? pending
                                : inProgress
                            }
                          />
                        )}
                      </Box>
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        animation="wave"
                      />
                    )}
                  </Box>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
        <Box className={classes.title}>
          <Typography variant="body1">
            {video ? (
              video.name
            ) : request ? (
              request.jobTitle
            ) : (
              <Skeleton variant="text" animation="wave" />
            )}
          </Typography>
          <Typography variant="body2" className={classes.subtitle}>
            {video ? (
              new Date(video.createdAt).toLocaleString('en-US').split(',')[0]
            ) : request ? (
              new Date(request.createdAt).toLocaleString('en-US').split(',')[0]
            ) : (
              <Skeleton variant="text" animation="wave" />
            )}
          </Typography>
        </Box>
      </StyledBox>
    </StyledBadge>
  )
}
