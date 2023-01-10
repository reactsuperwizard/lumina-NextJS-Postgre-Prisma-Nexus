import { Card, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import { VideoThumbnail } from './VideoThumbnail'

const PREFIX = 'StackedVideoThumbnail'

const classes = {
  requestButton: `${PREFIX}-requestButton`,
  closeButton: `${PREFIX}-closeButton`,
  addIcon: `${PREFIX}-addIcon`,
  wrapperDiv: `${PREFIX}-wrapperDiv`,
  thumbnailOuterWrap: `${PREFIX}-thumbnailOuterWrap`,
  thumbnailInnerWrap: `${PREFIX}-thumbnailInnerWrap`,
  thumbnailCard: `${PREFIX}-thumbnailCard`,
  thumbnailCrop: `${PREFIX}-thumbnailCrop`,
  hoveredCard: `${PREFIX}-hoveredCard`,
  title: `${PREFIX}-title`,
  subtitle: `${PREFIX}-subtitle`,
  mainBody: `${PREFIX}-mainBody`,
  videoCallIcon: `${PREFIX}-videoCallIcon`,
  aspectWrap: `${PREFIX}-aspectWrap`,
  wrapImageBottom: `${PREFIX}-wrapImageBottom`,
  hoverWrapImageBottom: `${PREFIX}-hoverWrapImageBottom`,
  hoverWrapImageTop: `${PREFIX}-hoverWrapImageTop`,
  wrapImageTop: `${PREFIX}-wrapImageTop`,
  wrapImageMiddle: `${PREFIX}-wrapImageMiddle`,
  imageBorder: `${PREFIX}-imageBorder`,
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

  [`& .${classes.thumbnailInnerWrap}`]: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  [`& .${classes.thumbnailCard}`]: {
    borderRadius: 15,
    width: '98%',
    margin: '1%',
    transition: 'width 0.25s, margin 0.25s',
    border: '2px dashed #9A30DE80',
    // ['&:hover']: {
    //   backgroundColor: '#9A30DE14',
    //   borderColor: '#9A30DE',
    // },
  },

  [`& .${classes.thumbnailCrop}`]: {
    margin: '0 0 -7px',
  },

  [`& .${classes.hoveredCard}`]: {
    backgroundColor: '#9A30DE14',
    borderColor: '#9A30DE',
  },

  [`& .${classes.title}`]: {
    width: '100%',
    textAlign: 'left',
    padding: '1.25rem',
  },

  [`& .${classes.subtitle}`]: {
    marginTop: '-3px',
    color: 'darkgrey',
  },

  [`&.${classes.mainBody}`]: {
    width: '6rem',
    // maxWidth: '37rem',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    ['&:hover']: {
      backgroundColor: '#9A30DE14',
      borderColor: '#9A30DE',
    },
  },

  [`& .${classes.aspectWrap}`]: {
    // width: '100%',
    height: '0',
    paddingBottom: '56.25%',
    position: 'relative',
    marginLeft: '5%',
  },
  [`& .${classes.wrapImageBottom}`]: {
    position: 'absolute',
    // border: '4px solid white',
    top: 0,
    right: '10%',
    bottom: '20%',
    left: '10%',
    transition: 'top 0.5s, bottom 0.5s, left 0.5s, right 0.5s',
  },
  [`& .${classes.hoverWrapImageBottom}`]: {
    // top: '-5%',
    right: '5%',
    // bottom: '25%',
    left: '20%',
  },
  [`& .${classes.wrapImageTop}`]: {
    position: 'absolute',
    // border: '4px solid white',
    top: '20%',
    right: '20%',
    bottom: 0,
    left: 0,
    transition: 'top 0.5s, bottom 0.5s, left 0.5s, right 0.5s',
  },
  [`& .${classes.hoverWrapImageTop}`]: {
    // top: '25%',
    right: '25%',
    // bottom: '-5%',
    left: '-5%',
  },
  [`& .${classes.wrapImageMiddle}`]: {
    position: 'absolute',
    // border: '4px solid white',
    top: '10%',
    right: '15%',
    bottom: '10%',
    left: '5%',
  },
  [`& .${classes.imageBorder}`]: {
    height: '100%',
    width: '100%',
  },
}))

interface Props {
  label: string
  // hover: boolean
  onClick: () => void
  // setHover: (state: boolean) => void
  // color?: string
}
export const StackedVideoThumbnail = ({
  label,
  // hover,
  // setHover,
  onClick,
}: // color,
Props) => {
  return (
    <StyledBox
      className={classes.mainBody}
      // onMouseEnter={() => setHover(true)}
      // onMouseLeave={() => setHover(false)}
      onClick={() => onClick()}
    >
      {/* <VideoThumbnail /> */}
      <Box className={classes.aspectWrap}>
        <Box
          className={
            classes.wrapImageBottom
            //  hover ? classes.hoverWrapImageBottom : ''
          }
        >
          <Box className={classes.imageBorder}>
            <VideoThumbnail />
          </Box>
        </Box>

        <Box className={classes.wrapImageMiddle}>
          <Box className={classes.imageBorder}>
            <VideoThumbnail />
          </Box>
        </Box>

        <Box
          className={
            classes.wrapImageTop
            // hover ? classes.hoverWrapImageTop : ''
          }
        >
          <Box className={classes.imageBorder}>
            <VideoThumbnail />
          </Box>
        </Box>
      </Box>
      {/* <Box className={classes.title}>
        <Typography align="center" variant="body1">
          {label}
        </Typography>
      </Box> */}
    </StyledBox>
  )
}
