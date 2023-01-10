import { Box, Button, styled, Typography } from '@mui/material'
import notification from 'public/Notification@4x.png'
import videoPlaylist from 'public/VideoPlaylist@4x.png'

const tutorial = [
  {
    text: "You pick the template and we'll do the heavy lifting.",
    action: 'Explore Templates',
    icon: videoPlaylist,
  },
  {
    text: "Great job! You'll get an email when your video is ready.",
    action: 'Done',
    icon: notification,
  },
]

interface Props {
  stage: number
  handleStepChange: (stage: number) => void
}

const PREFIX = 'tutorial'

const classes = {
  box: `${PREFIX}-box`,
  title: `${PREFIX}-title`,
  button: `${PREFIX}-button`,
}
const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.box}`]: {
    backgroundColor: '#fff',
    padding: '2rem',
    textAlign: 'center',
    width: '40%',
    borderRadius: '30px',
    [theme.breakpoints.down('md')]: {
      marginTop: '3rem',
      width: '90%',
      height: '65%',
    },
  },
  [`& .${classes.title}`]: {
    fontSize: '1.5rem',
    fontWeight: '600',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  },
  [`& .${classes.button}`]: {
    backgroundColor: '#e89e50',
    color: '#fff',
    width: '70%',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1.2rem',
    '&:hover': {
      backgroundColor: '#e89e50',
      color: '#fff',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  },
}))

export const Tutorial = ({ stage, handleStepChange }: Props) => {
  return (
    <StyledBox className={classes.box}>
      <Typography className={classes.title}>{tutorial[stage].text}</Typography>
      <Box>
        <img src={tutorial[stage].icon} alt={tutorial[stage].action} />
      </Box>
      <Button
        className={classes.button}
        onClick={() => handleStepChange(stage)}
      >
        {tutorial[stage].action}
      </Button>
    </StyledBox>
  )
}
