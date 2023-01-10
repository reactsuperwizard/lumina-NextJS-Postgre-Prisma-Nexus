import { Card, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import { VideoThumbnail } from './VideoThumbnail'

const PREFIX = 'SingleVideoThumbnail'

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
    width: '100%',
    maxWidth: '37rem',
    cursor: 'pointer',
    padding: '1.25rem',
    borderRadius: '1.25rem',
    ['&:hover']: {
      backgroundColor: '#9A30DE14',
      borderColor: '#9A30DE',
    },
  },
}))

interface Props {
  label: string
  hover: boolean
  onClick: () => void
  setHover: (state: boolean) => void
  color?: string
}
export const SingleVideoThumbnailButton = ({
  label,
  hover,
  setHover,
  onClick,
  color,
}: Props) => {
  return (
    <StyledBox
      className={classes.mainBody}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick()}
    >
      <VideoThumbnail />
      <Box className={classes.title}>
        <Typography align="center" variant="body1">
          {label}
        </Typography>
      </Box>
    </StyledBox>
  )
}
