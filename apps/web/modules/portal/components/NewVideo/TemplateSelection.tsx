import React from 'react'
import {
  Box,
  Button,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import TimerIcon from '@mui/icons-material/Timer'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import LockIcon from '@mui/icons-material/Lock'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { TemplateDetails, TemplateTypes } from './interface'
import RectangleIcon from '@mui/icons-material/Rectangle'
import { useEffect, useState } from 'react'
import { TemplateFlavor } from '@lumina/api'
const PREFIX = 'TemplateSelection'

const classes = {
  tab: `${PREFIX}-tab`,
  activeTab: `${PREFIX}-activeTab`,
  tabGrid: `${PREFIX}-tabGrid`,
  tabSpacer: `${PREFIX}-tabSpacer`,
  modal: `${PREFIX}-modal`,
  template: `${PREFIX}-template`,
  unlocked: `${PREFIX}-unlocked`,
  modalButton: `${PREFIX}-modalButton`,
  imageDiv: `${PREFIX}-imageDiv`,
  templateSubtitle: `${PREFIX}-templateSubtitle`,
  center: `${PREFIX}-center`,
  listItem: `${PREFIX}-listItem`,
  listMenu: `${PREFIX}-listMenu`,
  listText: `${PREFIX}-listText`,
  unlockText: `${PREFIX}-unlockText`,
  card: `${PREFIX}-card`,
  templateGrid: `${PREFIX}-templateGrid`,
  templateName: `${PREFIX}-templateName`,
  box: `${PREFIX}-box`,
  zeroFlex: `${PREFIX}-zeroFlex`,
  blur: `${PREFIX}-blur`,
  centerText: `${PREFIX}-centerText`,
  expand: `${PREFIX}-expand`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.box}`]: {
    width: '100%',
  },
  [`& .${classes.tab}`]: {
    padding: '0.5rem 1rem 0.25rem',
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    textAlign: 'center',
  },
  [`& .${classes.expand}`]: {
    flex: 1,
  },
  [`& .${classes.activeTab}`]: {
    borderBottom: `4px solid black`,
  },
  [`& .${classes.zeroFlex}`]: {
    flex: 'none',
  },
  [`& .${classes.centerText}`]: {
    justifyContent: 'center',
  },

  [`& .${classes.tabGrid}`]: {
    display: 'none',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      padding: '0 1rem 0.5rem 1rem',
      width: '100%',
    },
  },
  [`& .${classes.modal}`]: {
    height: 174,
    maxWidth: 350,
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    width: '100%',
  },
  [`& .${classes.template}`]: {
    opacity: 0,
    backgroundColor: '#00000040',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '&:hover': {
      opacity: 100,
      borderRadius: '10px',
    },
    [theme.breakpoints.down('md')]: {
      opacity: 100,
    },
  },
  [`& .${classes.unlocked}`]: {
    backgroundColor: '#F3F8EF',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5rem',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#50812C',
    fontSize: '0.9rem',
  },
  [`& .${classes.unlockText}`]: {
    color: '#757575',
    fontSize: '0.75rem',
    marginLeft: '10px',
  },
  [`& .${classes.modalButton}`]: {
    backgroundColor: '#9A30DE',
    color: 'white',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#852ABF',
    },
  },
  [`& .${classes.card}`]: {
    paddingTop: '0.5rem !important',
    paddingBottom: '0.5rem',
  },
  [`& .${classes.blur}`]: {
    opacity: '0.7',
  },
  [`& .${classes.templateGrid}`]: {
    padding: '1rem',
    marginTop: 0,
    paddingTop: 0,
    overflow: 'scroll',
    height: '65vh',
  },
  [`& .${classes.templateName}`]: {
    color: '#333333',
    fontWeight: 'bold',
    lineHeight: '150%',
  },
  [`& .${classes.imageDiv}`]: {
    height: 174,
    maxWidth: 350,
    width: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  [`& .${classes.tabSpacer}`]: {
    flex: 1,
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
  },
  [`& .${classes.templateSubtitle}`]: {
    color: '#333333',
    fontSize: '0.75rem',
    display: 'inline',
    marginLeft: '5px',
  },
  [`& .${classes.center}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`& .${classes.center}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  userTemplate: TemplateDetails[]
  handleTemplateSelection: (template: TemplateDetails) => void
  handlePreview: (template: TemplateDetails) => void
  handleUnlock: (template: TemplateDetails) => Promise<boolean>
  marketingFlow?: boolean
}

interface CategoryCountMap {
  name: string
  count: number
}

const isTemplateUsable = (status: TemplateTypes): boolean => {
  return [TemplateTypes.Approved, TemplateTypes.Default].includes(status)
}
export const TemplateSelection = ({
  userTemplate,
  handleTemplateSelection,
  handleUnlock,
  handlePreview,
  marketingFlow,
}: Props) => {
  const [categories, setCategories] = useState<CategoryCountMap[]>([])
  const [filteredTemplates, setFilteredTemplates] =
    useState<TemplateDetails[]>(userTemplate)
  const [selectedTab, setSelectedTab] = useState('')
  const [showRequested, setShowRequested] = useState<string>()

  useEffect(() => {
    userTemplate.sort((a, b) => {
      if (a.status === b.status) return b.duration - a.duration
      else return a.status - b.status
    })
    const categoriesMap: Record<string, number> = {}
    for (const template of userTemplate) {
      categoriesMap[template.category] = categoriesMap[template.category]
        ? categoriesMap[template.category] + 1
        : 1
    }
    const categories = Object.keys(categoriesMap)
    const uniqueCategories: CategoryCountMap[] = []
    for (const category of categories) {
      uniqueCategories.push({ name: category, count: categoriesMap[category] })
    }
    uniqueCategories.sort((_a, _b) => {
      return _b.count - _a.count
    })
    setCategories(uniqueCategories)
  }, [])

  const unlockTemplate = async (template: TemplateDetails) => {
    const isSuccess = await handleUnlock(template)
    if (isSuccess) {
      setShowRequested(template.id)
      setTimeout(() => {
        setShowRequested(undefined)
      }, 3000)
    }
  }
  const handleTabClick = (category: string) => {
    setSelectedTab(category)
    if (!category) setFilteredTemplates(userTemplate)
    else
      setFilteredTemplates(
        userTemplate?.filter((template) => template.category === category),
      )
  }
  return (
    <StyledBox className={classes.box}>
      <div
        className={`${classes.tabGrid} ${
          marketingFlow ? classes.centerText : ''
        }`}
      >
        <div
          className={`${classes.tab} ${
            selectedTab == '' ? classes.activeTab : ''
          } ${marketingFlow ? classes.expand : ''}`}
          onClick={() => handleTabClick('')}
        >
          All Templates
        </div>
        {categories.length > 1 &&
          categories.map((category) => (
            <div
              className={`${classes.tab} ${
                selectedTab === category.name ? classes.activeTab : ''
              } ${marketingFlow ? classes.expand : ''}`}
              key={category.name}
              onClick={() => {
                handleTabClick(category.name)
              }}
            >
              {category.name}
            </div>
          ))}

        {!marketingFlow && <div className={classes.tabSpacer} />}
      </div>
      <Grid container spacing={3} className={classes.templateGrid}>
        {filteredTemplates.map((template) => (
          <Grid
            key={template.id}
            item
            xs={12}
            md={6}
            className={`${classes.card}`}
          >
            <Box sx={{ maxWidth: 350, position: 'relative' }}>
              <Box
                className={`${classes.imageDiv} ${
                  isTemplateUsable(template.status) ? '' : classes.blur
                }`}
              >
                <Box
                  component="img"
                  alt={template.name}
                  src={template.imageUrl}
                  className={classes.imageDiv}
                ></Box>
              </Box>
              <Box
                className={`${classes.modal}  ${
                  showRequested == template.id
                    ? classes.unlocked
                    : classes.template
                }`}
              >
                {showRequested == template.id ? (
                  <>
                    <Box>
                      <CheckCircleIcon fontSize={'large'} />
                    </Box>
                    <Box>We’ll follow up with you to unlock this template!</Box>
                  </>
                ) : (
                  <>
                    <Button
                      className={classes.modalButton}
                      startIcon={<VisibilityIcon />}
                      onClick={() => handlePreview(template)}
                    >
                      Preview
                    </Button>
                    {isTemplateUsable(template.status) ? (
                      <Button
                        className={classes.modalButton}
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => {
                          handleTemplateSelection(template)
                        }}
                      >
                        Use Template
                      </Button>
                    ) : (
                      <Button
                        className={classes.modalButton}
                        startIcon={<LockOpenIcon />}
                        onClick={() => unlockTemplate(template)}
                      >
                        Unlock
                      </Button>
                    )}
                  </>
                )}
              </Box>
              <Typography
                variant="subtitle1"
                className={`${classes.templateName} ${
                  isTemplateUsable(template.status) ? '' : classes.blur
                }`}
              >
                {template.status == TemplateTypes.Locked ||
                template.status == TemplateTypes.Requested ? (
                  <>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon className={classes.listMenu}>
                        <LockIcon sx={{ fontSize: '1rem' }} />
                      </ListItemIcon>
                      <ListItemText
                        classes={{
                          primary: classes.templateName,
                          root: classes.zeroFlex,
                        }}
                      >
                        {template.name}
                      </ListItemText>
                      {template.status == TemplateTypes.Requested && (
                        <ListItemText classes={{ primary: classes.unlockText }}>
                          Unlock Requested
                        </ListItemText>
                      )}
                    </ListItem>
                  </>
                ) : (
                  // <LockIcon fontSize="small" />
                  template.name
                )}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
                className={`${
                  isTemplateUsable(template.status) ? '' : classes.blur
                }`}
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

              <Typography variant="subtitle2" sx={{ color: '#757575' }}>
                {template.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  )
}
