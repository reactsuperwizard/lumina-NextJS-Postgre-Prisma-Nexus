import useMediaQuery from '@mui/material/useMediaQuery'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

type TabLabelProps = {
  activeTab: string
  value: string
  text: string
  onlySmallerScreen?: boolean
}
const PREFIX = 'MainNavBar'

const classes = {
  labelWrap: `${PREFIX}-labelWrap`,
  tabLabel: `${PREFIX}-tabLabel`,
  activeTab: `${PREFIX}-activeTab`,
  customIndicator: `${PREFIX}-customIndicator`,
  indicatorActive: `${PREFIX}-indicatorActive`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled(Box)(({ theme }) => ({
  [`& .${classes.customIndicator}`]: {
    backgroundColor: theme.palette.secondary.dark,
    height: '0.25rem',
    width: '0',
    marginTop: '0.25rem',
    marginLeft: '0',
    borderRadius: '20px',
    transition: 'width 0.5s',
  },

  [`& .${classes.indicatorActive}`]: {
    width: '2.2rem',
  },

  [`& .${classes.tabLabel}`]: {
    textTransform: 'capitalize',
    fontSize: '19px',
  },

  [`& .${classes.activeTab}`]: {
    color: 'white',
    fontWeight: 600,
    opacity: 1,
  },

  [`&.${classes.labelWrap}`]: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    // Added
    // paddingLeft: '2rem',
  },
}))

export const TabLabel = ({
  activeTab,
  value,
  text,
  onlySmallerScreen,
}: TabLabelProps) => {
  const matchesSmallerScreen = useMediaQuery('(max-width:959px)')
  return (
    <Root className={!matchesSmallerScreen ? classes.labelWrap : ''}>
      <span
        className={`${classes.tabLabel} ${
          activeTab === value ? classes.activeTab : ''
        }`}
      >
        {text}
      </span>
      {!onlySmallerScreen && !matchesSmallerScreen && (
        <Box
          className={`${classes.customIndicator} ${
            activeTab === value ? classes.indicatorActive : ''
          }`}
        />
      )}
    </Root>
  )
}
