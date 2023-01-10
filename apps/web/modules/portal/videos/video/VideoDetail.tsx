import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Player } from '@lumina/player'
import { useRouter } from 'next/router'
import {
  Box,
  Snackbar,
  Button,
  useMediaQuery,
  Paper,
  Typography,
  Rating,
  CircularProgress,
} from '@mui/material'
import {
  Code,
  SystemUpdateAlt,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Link,
} from '@mui/icons-material/'
import { Alert } from '@mui/material'
import { DownloadDialog } from '../../../utils'

import { VideoQuery } from '.'
import { usePlausible, useTenant, useUser } from 'modules/hooks'
import { EventNames } from 'modules/providers/plausible/Constants'
import { ProducerImage } from '../ProducerImage'
import { ActivateCustomerDialog } from '../../components/ActivateCustomer'
import { EditScript } from '../../components/CustomerEditScript/EditScript'
import { EditScriptSubmitDialog } from '../../components/CustomerEditScript/EditScriptSubmitDialog'
import CloseIcon from '@mui/icons-material/Close'
import { RevisionDialog } from './RevisionDialog'
import { ScheduleDialog } from './ScheduleDialog'
import { gql, useMutation } from '@apollo/client'
import { copyToClipboard } from 'modules/utils/copyToClipboard'
import { InviteEmailType, Video } from '@lumina/api'
import { InviteTeammatesButton } from 'modules/portal/components/InviteTeammatesButton'

const PREFIX = 'VideoDetail'

const classes = {
  container: `${PREFIX}-container`,
  buttonDiv: `${PREFIX}-buttonDiv`,
  inactiveButtons: `${PREFIX}-inactiveButtons`,
  actionButton: `${PREFIX}-actionButton`,
  luminaActionButton: `${PREFIX}-luminaActionButton`,
  facebookIconButton: `${PREFIX}-facebookIconButton`,
  linkedInIconButton: `${PREFIX}-linkedInIconButton`,
  twitterIconButton: `${PREFIX}-twitterIconButton`,
  orderButton: `${PREFIX}-orderButton`,
  licenseButton: `${PREFIX}-licenseButton`,
  boxPadding: `${PREFIX}-boxPadding`,
  producerImageContainer: `${PREFIX}-producerImageContainer`,
  smallScreenProducerImageContainer: `${PREFIX}-smallScreenProducerImageContainer`,
  icon: `${PREFIX}-icon`,
  ratingFloat: `${PREFIX}-ratingFloat`,
  hide: `${PREFIX}-hide`,
  videoOverlayRating: `${PREFIX}-videoOverlayRating`,
  dismissWrap: `${PREFIX}-dismissWrap`,
  ratingWrap: `${PREFIX}-ratingWrap`,
}

const Root = styled('div')(({ theme }) => ({
  '@keyframes slideRight': {
    '0%': {
      opacity: 0,
      transform: 'scale(0)',
    },
    '100%': {
      opacity: 1,
      transform: `scale(1)`,
    },
  },
  [`&.${classes.container}`]: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    maxWidth: '82em',
    columnGap: '2rem',
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 17em',
    },
    position: 'relative',
  },

  [`& .${classes.buttonDiv}`]: {
    display: 'grid',
    margin: 'auto',
    columnGap: '1em',
    gridTemplateColumns: '1fr',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr',
      marginTop: '-0.7em',
    },
  },
  [`& .${classes.actionButton}`]: {
    textTransform: 'capitalize',
    margin: '.72em 0',
    minWidth: '15rem',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '15rem',
    },
  },
  [`& .${classes.dismissWrap}`]: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000BF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`& .${classes.ratingWrap}`]: {
    display: 'flex',
    alignItems: 'center',
    opacity: '0.8',
    mt: '1rem',
  },

  [`& .${classes.luminaActionButton}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: 'theme.palette.secondary.main',
      backgroundColor: '#9c00f0',
    },
  },

  [`& .${classes.facebookIconButton}`]: {
    backgroundColor: '#4267B2',
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: '#467bbd',
    },
  },

  [`& .${classes.linkedInIconButton}`]: {
    backgroundColor: '#0077b5',
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: '#0294c4',
    },
  },

  [`& .${classes.twitterIconButton}`]: {
    backgroundColor: '#1DA1F2',
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: '#28b0fa',
    },
  },

  [`& .${classes.orderButton}`]: {
    color: theme.palette.primary.light,
    '&:hover': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.light,
    },
    '& span': {
      margin: '-1px',
    },
    borderColor: theme.palette.primary.light,
  },

  [`& .${classes.licenseButton}`]: {
    backgroundColor: '#ff9800',
    color: 'white',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#e58231',
    },
  },

  [`& .${classes.boxPadding}`]: {
    padding: '1rem 0 0',
  },

  [`& .${classes.producerImageContainer}`]: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
    gridColumn: '1 / 1',
  },

  [`& .${classes.smallScreenProducerImageContainer}`]: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '2rem',
    alignItems: 'center',
  },
  [`& .${classes.icon}`]: {
    color: '#fff',
    fontSize: '1.2rem',
  },
  [`& .${classes.hide}`]: {
    height: 0,
  },
  [`& .${classes.ratingFloat}`]: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    zIndex: '10',
    backgroundColor: '#090A3F',
    color: '#fff',
    padding: '5px 1rem',
    borderRadius: '50px',
    display: 'flex',
    '&:hover > #rating': {
      display: 'flex',
      animation: `slideRight 0.5s`,
    },
  },
  [`& .${classes.videoOverlayRating}`]: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    position: 'absolute',
    top: '0.5rem',
    left: '0.5rem',
    color: '#fff',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))

interface IVideoDetailProps {
  video: VideoQuery
}

const UPDATE_VIDEO_RATING = gql`
  mutation Mutation($data: VideoUpdateInput!, $where: VideoWhereUniqueInput!) {
    updateOneVideo(data: $data, where: $where) {
      id
    }
  }
`

export const VideoDetail = ({ video }: IVideoDetailProps) => {
  const [embedCode, setEmbedCode] = useState('')
  const [embedOpen, setEmbedOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [shareLinkOpen, setShareLinkOpen] = useState(false)
  const [licensingOpen, setLicensingOpen] = useState(false)
  const [activateToEnableOpen, setActivateToEnableOpen] = useState(false)
  const [submitScriptOpen, setSubmitScriptOpen] = useState(false)
  const [videoClicked, setVideoClicked] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [revisionOpen, setRevisionOpen] = useState(false)
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [ratingSet, setRatingSet] = useState(false)
  const lg = useMediaQuery('(min-width:1280px)')
  const vanityUrl = process.env.VANITY_URL_ENDPOINT
  const router = useRouter()
  const { linkShare, socialShare, inactiveCustomerViewsVideo } = usePlausible()
  const { active, name, email, isPaid } = useTenant()
  const { id } = useUser()

  const getEmbedCode = (embedCode: string) => setEmbedCode(embedCode)
  const [updateRatingMutation, { error, loading }] =
    useMutation<{ video: Pick<Video, 'id'> }>(UPDATE_VIDEO_RATING)
  // Plausible analytics - checks to see if an inactive user clicks the video
  const sendInactiveCustomerViewsVideo = () => {
    if (!active && !videoClicked) {
      inactiveCustomerViewsVideo(EventNames.INACTIVE_CUSTOMER_VIEWS_VIDEO, {
        props: {
          customer: name || '',
          page: location.pathname,
          active: active,
          email: email,
        },
      })
      setVideoClicked(true)
    }
  }
  useEffect(() => {
    if (video.rating) {
      setRatingSet(true)
    }
  }, [video])

  const handleRatingChange = async (value: number | undefined | null) => {
    if (video.rating) return
    setRating(value || 0)
    await updateRatingMutation({
      variables: {
        where: {
          id: video.id,
        },
        data: {
          rating: {
            set: value,
          },
        },
      },
    })

    if (!error) {
      // video.rating = value
      setRatingSet(true)
      if (value! > 3) {
        setScheduleOpen(true)
      } else {
        setRevisionOpen(true)
      }
      setShowRating(false)
    } else setRating(0)
  }
  const makeSocialCallback =
    (platform: 'Linkedin' | 'Facebook' | 'Twitter') => () => {
      let socialUrl = ''
      switch (platform) {
        case 'Linkedin':
          socialUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${vanityUrl}/${video.hash}`
          break
        case 'Facebook':
          socialUrl = `https://www.facebook.com/sharer/sharer.php?u=${vanityUrl}/${video.hash}`
          break
        case 'Twitter':
          socialUrl = `http://www.twitter.com/share?url=${vanityUrl}/${video.hash}`
          break
      }
      try {
        socialShare(EventNames.SOCIAL_SHARE, {
          props: {
            videoId: video.id,
            page: location.pathname,
            email: email,
            platform,
          },
        })
      } catch (error) {
        console.error(error)
      }
      const left = screen.width / 2 - 500 / 2
      const top = screen.height / 2 - 500 / 2
      window.open(socialUrl, '', `width=500,height=500,top=${top},left=${left}`)
    }

  return (
    <>
      <Root className={classes.container}>
        {id == video?.request?.submittedBy?.id && !isPaid && !ratingSet && (
          <Box className={classes.ratingFloat}>
            <Rating
              onChange={(_, value) => {
                handleRatingChange(value)
              }}
              classes={{
                icon: `${classes.icon}`,
              }}
              id="rating"
              // className={showStars ? '' : classes.hide}
              sx={{ display: 'none' }}
              value={rating}
              readOnly={Boolean(rating)}
            />
            <Typography ml="5px" pr="0.5rem" fontSize={'0.8rem'}>
              {loading
                ? 'Thanks for the feedback!'
                : 'How do you like the video?'}
            </Typography>
            {loading && <CircularProgress size={20} color="inherit" />}
          </Box>
        )}
        <Box className={classes.boxPadding}>
          <Paper
            onClick={sendInactiveCustomerViewsVideo}
            elevation={2}
            sx={{ position: 'relative' }}
          >
            <Player
              responsive={true}
              getEmbedCode={getEmbedCode}
              vimeoId={video.vimeoId as number}
              events={{
                onComplete: (args) => {
                  const offset = Math.ceil(
                    ((100 - args?.progress!) / 100) * args.videoDuration,
                  )
                  if (id == video.request.submittedBy?.id) {
                    setTimeout(() => {
                      setShowRating(true)
                    }, offset * 1000)
                  }
                },
              }}
            />
            {showRating && !isPaid && !ratingSet && (
              <Box className={classes.dismissWrap}>
                <Box>
                  {/* <ReplayIcon />
                <Typography p="0.5rem" color={'#fff'}>
                  Replay
                </Typography> */}
                  <Box
                    className={classes.videoOverlayRating}
                    onClick={() => {
                      setShowRating(false)
                    }}
                  >
                    <CloseIcon sx={{ color: '#fff' }} />
                    <span>Dismiss</span>
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography color={'#fff'} pr="0.5rem">
                      {loading
                        ? 'Thanks for the feedback!'
                        : 'How do you like the video?'}
                    </Typography>
                    {loading && (
                      <CircularProgress size={24} style={{ color: '#fff' }} />
                    )}
                  </Box>
                  <Rating
                    onChange={(_, value) => {
                      handleRatingChange(value)
                    }}
                    classes={{ icon: `${classes.icon}` }}
                    value={rating}
                    readOnly={Boolean(rating)}
                  />
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
        <Box className={classes.boxPadding} component="div">
          <div className={`${classes.buttonDiv}`}>
            {isPaid && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                title="SHARE LINK"
                className={`${classes.actionButton} ${classes.luminaActionButton}`}
                style={{ textTransform: 'none' }}
                onClick={() => {
                  copyToClipboard(
                    `${vanityUrl}/${video.hash}`,
                    setShareLinkOpen,
                  )
                  linkShare(EventNames.LINK_SHARE, {
                    props: {
                      videoId: video.id,
                      page: location.pathname,
                      email: email,
                    },
                  })
                }}
                startIcon={<Link />}
              >
                Get Shareable Link
              </Button>
            )}
            {video.downloads && isPaid && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                title="DOWNLOAD VIDEO"
                className={`${classes.actionButton} ${classes.luminaActionButton}`}
                onClick={() => setDownloadOpen(true)}
                startIcon={<SystemUpdateAlt />}
              >
                Download Video
              </Button>
            )}
            {isPaid ? (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  title="COPY EMBED CODE"
                  className={`${classes.actionButton} ${classes.luminaActionButton}`}
                  onClick={() => copyToClipboard(embedCode, setEmbedOpen)}
                  startIcon={<Code />}
                >
                  Copy Embed Code
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  title="SHARE TO FACEBOOK"
                  className={`${classes.actionButton} ${classes.facebookIconButton}`}
                  onClick={makeSocialCallback('Facebook')}
                  startIcon={<FacebookIcon />}
                >
                  Share to Facebook
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  title="SHARE TO LINKEDIN"
                  className={`${classes.actionButton} ${classes.linkedInIconButton}`}
                  onClick={makeSocialCallback('Linkedin')}
                  startIcon={<LinkedInIcon />}
                >
                  Share to LinkedIn
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  title="SHARE TO TWITTER"
                  className={`${classes.actionButton} ${classes.twitterIconButton}`}
                  onClick={makeSocialCallback('Twitter')}
                  startIcon={<TwitterIcon />}
                >
                  Share to Twitter
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  title="GO TO ORDER"
                  className={`${classes.actionButton} ${classes.orderButton}`}
                  onClick={() => {
                    router.push(
                      `/${router.query.portal}/orders/${video?.orderId}`,
                    )
                  }}
                >
                  Go to Order #{`${video?.orderId}`}
                </Button>
              </>
            ) : (
              <>
                <InviteTeammatesButton type={InviteEmailType.Video} />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  title="SHARE TO LINKEDIN"
                  className={`${classes.actionButton} ${classes.linkedInIconButton}`}
                  onClick={makeSocialCallback('Linkedin')}
                  startIcon={<LinkedInIcon />}
                >
                  Share to LinkedIn
                </Button>
              </>
            )}
          </div>
          {!lg && (
            <div className={classes.smallScreenProducerImageContainer}>
              <ProducerImage producerId={video.producerId} />
              {ratingSet && (
                <Box className={classes.ratingWrap}>
                  <Typography sx={{ fontSize: '0.9rem' }}>
                    <strong>You Rated:</strong>
                  </Typography>
                  <Rating
                    sx={{ paddingLeft: '0.5rem' }}
                    readOnly
                    value={video.rating || rating}
                  ></Rating>
                </Box>
              )}
            </div>
          )}
        </Box>
        {lg && (
          <div className={classes.producerImageContainer}>
            <ProducerImage producerId={video.producerId} />
            {ratingSet && (
              <Box className={classes.ratingWrap}>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  <strong>You Rated:</strong>
                </Typography>
                <Rating
                  sx={{ paddingLeft: '0.5rem' }}
                  readOnly
                  value={video.rating || rating}
                ></Rating>
              </Box>
            )}
          </div>
        )}
        <ActivateCustomerDialog
          open={licensingOpen}
          close={() => setLicensingOpen(false)}
        />
        <EditScriptSubmitDialog
          open={submitScriptOpen}
          close={() => setSubmitScriptOpen(false)}
        />
        <ScheduleDialog
          open={scheduleOpen}
          onClose={() => setScheduleOpen(false)}
          title={
            rating > 3
              ? 'We’re happy you loved your video!'
              : 'Schedule your revision'
          }
          description={
            rating > 3
              ? 'Schedule a meeting with our sales team to learn about our unlimited subscription.'
              : ''
          }
        />
        <RevisionDialog
          open={revisionOpen}
          onClose={() => setRevisionOpen(false)}
          title="We want you to love your video!"
          openCalendar={() => {
            setRevisionOpen(false)
            setScheduleOpen(true)
          }}
        />
        {video.downloads ? (
          <DownloadDialog
            open={downloadOpen}
            onClose={() => setDownloadOpen(false)}
            links={video.downloads}
            videoId={video.id}
          />
        ) : undefined}
        <Snackbar
          open={embedOpen}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={1500}
          onClose={() => setEmbedOpen(false)}
        >
          <Alert severity="success">Embed code copied to clipboard</Alert>
        </Snackbar>
        <Snackbar
          open={shareLinkOpen}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={1500}
          onClose={() => setShareLinkOpen(false)}
        >
          <Alert severity="success">Link copied to clipboard</Alert>
        </Snackbar>
        {/* <Snackbar
          open={activateToEnableOpen}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={3000}
          onClose={() => setActivateToEnableOpen(false)}
        >
          <Alert severity="warning">Activate license to enable</Alert>
        </Snackbar> */}
      </Root>
      {video.canRevise && (
        <div>
          <EditScript
            scriptLayers={video.scriptLayers}
            scriptId={video.scriptId}
            customerId={video?.customerId}
            setSubmitScriptOpen={setSubmitScriptOpen}
          />
        </div>
      )}
    </>
  )
}
