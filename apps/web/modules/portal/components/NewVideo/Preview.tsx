import {
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from '@mui/material'
import RectangleIcon from '@mui/icons-material/Rectangle'
import TimerIcon from '@mui/icons-material/Timer'
import { TemplateDetails, TemplateTypes } from './interface'
import { Player } from '@lumina/player'

const PREFIX = 'Preview'

const classes = {
  tabGrid: `${PREFIX}-tabGrid`,
  previewBox: `${PREFIX}-previewBox`,
  templateDetails: `${PREFIX}-templateDetails`,
  templateSubtitle: `${PREFIX}-templateSubtitle`,
  templateSubtitle2: `${PREFIX}-templateSubtitle2`,
  templateInfo: `${PREFIX}-templateInfo`,
  buttonStyle: `${PREFIX}-buttonStyle`,
  listItem: `${PREFIX}-listItem`,
  listMenu: `${PREFIX}-listMenu`,
  listText: `${PREFIX}-listText`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.tabGrid}`]: {
    display: 'flex',
    padding: '0.5rem 1rem',
    width: '100%',
  },
  [`& .${classes.previewBox}`]: {
    height: 'auto',
    width: '100%',
    maxHeight: '380px',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
    },
  },
  [`& .${classes.templateDetails}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  [`& .${classes.templateSubtitle}`]: {
    color: '#333333',
    fontWeight: 'bold',
  },
  [`& .${classes.templateSubtitle2}`]: {
    color: '#333333',
    fontSize: '0.75rem',
    display: 'inline',
    marginLeft: '5px',
  },
  [`& .${classes.templateInfo}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '2rem',
  },
  [`& .${classes.buttonStyle}`]: {
    backgroundColor: '#852ABF',
    color: 'white',
    width: '10rem',
    alignSelf: 'flex-end',
    marginTop: '1rem',
  },
  [`& .${classes.listItem}`]: {
    padding: 0,
  },
  [`& .${classes.listMenu}`]: {
    minWidth: 0,
    marginRight: '0.3rem',
    color: '#000',
  },
  [`& .${classes.listText}`]: {
    margin: 0,
    fontSize: '0.75rem',
    color: '#000',
  },
}))

interface Props {
  template: TemplateDetails
  handlePreviewSelection: (template: TemplateDetails) => void
}

export const Preview = ({ handlePreviewSelection, template }: Props) => {
  return (
    <StyledBox
      sx={{ display: 'flex', flexDirection: 'column' }}
      className={classes.tabGrid}
    >
      {template.vimeoId ? (
        <Box width="100%">
          <Player
            poweredBy={{
              logoSrc: '/Negative@3x.png',
              iconSrc: '/Negative@3xIcon.png',
              href: 'https://www.lumina.co',
            }}
            vimeoId={Number(template.vimeoId)}
            responsive
          />
        </Box>
      ) : (
        <Box
          component="img"
          className={classes.previewBox}
          alt={template.name}
          src={template.imageUrl}
        ></Box>
      )}
      <Box className={classes.templateDetails}>
        <Typography variant="subtitle1" className={classes.templateSubtitle}>
          {template.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            minWidth: '30%',
          }}
        >
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.listMenu}>
              <RectangleIcon
                sx={{ fontSize: '0.75rem', transform: 'rotate(180deg)' }}
              />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listText }}>
              {template.orientation}
            </ListItemText>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.listMenu}>
              <TimerIcon sx={{ fontSize: '0.75rem' }} />
            </ListItemIcon>

            <ListItemText classes={{ primary: classes.listText }}>
              {template.duration} seconds
            </ListItemText>
          </ListItem>
        </Box>
      </Box>
      <Typography variant="subtitle2" sx={{ color: '#757575' }}>
        {template.description}
      </Typography>
      {[TemplateTypes.Approved, TemplateTypes.Default].includes(
        template.status,
      ) && (
        <Button
          className={classes.buttonStyle}
          onClick={() => handlePreviewSelection(template)}
        >
          Use Template
        </Button>
      )}
    </StyledBox>
  )
}
