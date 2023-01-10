import { Card } from '@mui/material'
import { Box, styled } from '@mui/system'
import { VideoLogo } from 'modules/utils/VideoLogo'
const PREFIX = 'VideoThumbnail'

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
    borderRadius: '0.5rem',
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

export const VideoThumbnail = () => {
  return (
    <StyledBox className={classes.wrapperDiv}>
      <Box className={classes.thumbnailOuterWrap}>
        <Box className={classes.thumbnailInnerWrap}>
          <Card className={classes.thumbnailCard}>
            <Box className={classes.thumbnailOuterWrap}>
              <Box className={classes.thumbnailInnerWrap}>
                <Box sx={{ width: '0.9rem', opacity: '50%' }}>
                  <VideoLogo color="#9A30DE" />
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </StyledBox>
  )
}
