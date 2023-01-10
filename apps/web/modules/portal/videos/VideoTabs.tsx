import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { BadgeLumina } from 'modules/utils/Badge'
const PREFIX = 'VideoTabs'

const classes = {
  tabBox: `${PREFIX}-tabBox`,
  hide: `${PREFIX}-hide`,
  tab: `${PREFIX}-tab`,
  activeTab: `${PREFIX}-activeTab`,
  tabGrid: `${PREFIX}-tabGrid`,
  tabSpacer: `${PREFIX}-tabSpacer`,
  selectItem: `${PREFIX}-selectItem`,
  select: `${PREFIX}-select`,
}

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  fontSize: '15px',
}))

const StyledSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  fontSize: '15px',
  margin: '2rem 0 1.5rem',
  borderRadius: '0.5rem',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}))

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.tabBox}`]: {
    padding: '0.5rem 0 0',
    marginBottom: '1.5rem',
    overflow: 'hidden',
    opacity: '1',
    transition:
      'height 0.25s, margin-bottom 0.25s, opacity 0.25s, transform 0.25s',
    height: '100%',
  },
  [`& .${classes.hide}`]: {
    height: '0px',
    opacity: '0',
    marginBottom: '0px',
    paddingTop: '2.5rem',
  },
  [`& .${classes.tab}`]: {
    padding: '0.5rem 0.5rem 0.25rem',
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // minWidth: '10.4rem',
  },
  [`& .${classes.activeTab}`]: {
    borderBottom: `4px solid ${theme.palette.primary.main}`,
  },

  [`& .${classes.tabGrid}`]: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      gridTemplateColumns: '9rem 12.5rem 12.5rem 1fr',
      padding: '1.5rem 0 0',
    },
  },

  [`& .${classes.tabSpacer}`]: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
  },

  [`& .${classes.select}`]: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    margin: '2rem 0 1.5rem',
    borderRadius: '0.5rem',
    [`& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input`]:
      {
        paddingTop: '0.6rem',
        paddingBottom: '0.6rem',
      },
  },
}))
interface Props {
  completedOnClick: () => void
  inProgressOnClick: () => void
  draftOnClick: () => void
  tabState: 'completed' | 'inProgress' | 'draft'
  inProgressCount: number
  draftCount: number
  completedCount: number
}
export const VideoTabs = ({
  completedOnClick,
  inProgressOnClick,
  draftOnClick,
  tabState,
  inProgressCount,
  draftCount,
  completedCount,
}: Props) => {
  const [hide, setHide] = useState(true)

  useEffect(() => {
    const _hide = !draftCount && !inProgressCount
    if (_hide !== hide) setHide(_hide)
  }, [inProgressCount, draftCount])

  const selectOnChange = (e: SelectChangeEvent<unknown>) => {
    switch (e.target.value as string) {
      case 'completed':
        completedOnClick()
        break
      case 'inProgress':
        inProgressOnClick()
        break
      default:
        draftOnClick()
        break
    }
  }

  return (
    <Root>
      <Box className={`${classes.tabBox} ${hide ? classes.hide : ''}`}>
        <StyledSelect
          variant="outlined"
          fullWidth
          value={tabState}
          onChange={selectOnChange}
          className={`${classes.select} ${classes.selectItem}`}
        >
          <StyledMenuItem value={'completed'}>Completed</StyledMenuItem>
          <StyledMenuItem value={'inProgress'}>In Production</StyledMenuItem>
          <StyledMenuItem value={'draft'}>Pending Approval</StyledMenuItem>
        </StyledSelect>
        <div className={classes.tabGrid}>
          <div
            className={`${classes.tab} ${
              tabState === 'completed' && classes.activeTab
            }`}
            onClick={completedOnClick}
          >
            Completed
          </div>
          {inProgressCount > 0 && (
            <div
              className={`${classes.tab} ${
                tabState === 'inProgress' && classes.activeTab
              }`}
              onClick={inProgressOnClick}
            >
              In Progress <BadgeLumina>{inProgressCount}</BadgeLumina>
            </div>
          )}
          {draftCount > 0 && (
            <div
              className={`${classes.tab} ${
                tabState === 'draft' && classes.activeTab
              }`}
              onClick={draftOnClick}
            >
              Pending Approval <BadgeLumina>{draftCount}</BadgeLumina>
            </div>
          )}
          {inProgressCount === 0 && <div className={classes.tabSpacer} />}
          {draftCount === 0 && <div className={classes.tabSpacer} />}
          <div className={classes.tabSpacer} />
        </div>
      </Box>
    </Root>
  )
}
