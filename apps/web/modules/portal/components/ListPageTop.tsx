import React from 'react'
import { Box, styled } from '@mui/system'
import {
  Typography,
  OutlinedInput,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { Search } from '@mui/icons-material/'
import type { ObservableQuery } from '@apollo/client'

import { NewVideoButton } from './NewVideo'
import { Filter } from '../videos/Filter'
import { HighlightOffRounded } from '@mui/icons-material'
import { LuminaMenu } from 'modules/utils/LuminaMenu'

const PREFIX = 'ListPageTop'

const classes = {
  inputRoot: `${PREFIX}-inputRoot`,
  textTitle: `${PREFIX}-textTitle`,
  pageNameContainer: `${PREFIX}-pageNameContainer`,
  customerNameContainer: `${PREFIX}-customerNameContainer`,
  topDiv: `${PREFIX}-topDiv`,
  hideOnMobile: `${PREFIX}-hideOnMobile`,
  filter: `${PREFIX}-filter`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.inputRoot}`]: {
    color: 'inherit',
    backgroundColor: 'white',
    width: '100%',
    height: '2.5rem',
    borderRadius: 8,
    flex: 1,
  },

  [`& .${classes.textTitle}`]: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
  },

  [`& .${classes.pageNameContainer}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 3,
  },

  [`& .${classes.customerNameContainer}`]: {
    color: '#888888',
    fontWeight: 300,
  },
  [`& .${classes.filter}`]: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    display: 'flex',
    padding: '1rem',
    flexDirection: 'column',
    color: '#00000080',
  },

  [`&.${classes.topDiv}`]: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      columnGap: '2rem',
    },
  },

  [`& .${classes.hideOnMobile}`]: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      minWidth: '9.5rem',
    },
  },
}))

interface Props {
  title: string
  search: string
  setSearch: (searchString: string) => void
  refetch?: ObservableQuery['refetch']
  customerName?: string | null | undefined
  setMyVideos?: (myVideos: boolean) => void
  myVideos?: boolean
  setShowFilters?: (showFilter: boolean) => void
  showFilters?: boolean
}

export const ListPageTop = ({
  title,
  customerName,
  search,
  setSearch,
  refetch,
  setMyVideos,
  myVideos,
  showFilters,
  setShowFilters,
}: Props) => {
  const checkBoxFilterFunction = () => {
    setMyVideos!(!myVideos)
    setShowFilters!(false)
  }
  return (
    <Root className={classes.topDiv}>
      <div className={classes.pageNameContainer}>
        <Typography className={classes.textTitle} variant="h4">
          {title}
          {customerName ? (
            <Typography
              className={classes.customerNameContainer}
              component="div"
              variant="h4"
              display="inline"
            >
              {` - ${customerName}`}
            </Typography>
          ) : (
            ''
          )}
        </Typography>
      </div>
      <Box
        id="text-box"
        sx={{ position: 'relative' }}
        onClick={() => setShowFilters!(true)}
      >
        <OutlinedInput
          placeholder={`Search ${title}`}
          classes={{
            root: classes.inputRoot,
          }}
          value={search}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(event.target.value)
          }
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
          endAdornment={
            <>
              <Filter
                showFilter={showFilters!}
                setShowFilter={setShowFilters!}
              ></Filter>
            </>
          }
        />
        {showFilters && (
          <LuminaMenu
            showMenu={showFilters}
            setShowMenu={setShowFilters!}
            id="#text-box"
            sx={{ width: '100%', padding: '1rem !important' }}
          >
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    inputProps={{ 'aria-label': 'My Videos' }}
                    checked={myVideos}
                    onChange={checkBoxFilterFunction}
                  />
                }
                label="My Videos"
              />
            </Box>
          </LuminaMenu>
        )}
      </Box>
    </Root>
  )
}
