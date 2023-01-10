import React from 'react'
import { styled } from '@mui/system'
import { Typography, Button, Theme, Box } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'

const PREFIX = 'DetailsHeader'

const classes = {
  backButton: `${PREFIX}-backButton`,
  titleContainer: `${PREFIX}-titleContainer`,
  header: `${PREFIX}-header`,
  subTitle: `${PREFIX}-subTitle`,
  dash: `${PREFIX}-dash`,
  layoutGrid: `${PREFIX}-layoutGrid`,
  actionButton: `${PREFIX}-actionButton`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.backButton}`]: {
    textTransform: 'capitalize',
    fontSize: 16,
    padding: '8px 1px',
  },

  [`& .${classes.titleContainer}`]: {
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
    },
  },

  [`& .${classes.header}`]: {
    fontWeight: 600,
  },

  [`& .${classes.subTitle}`]: {
    fontWeight: 300,
    fontSize: 15,
    paddingLeft: '0.6rem',
  },

  [`& .${classes.dash}`]: {
    padding: '0 1rem 0 1rem',
    fontWeight: 'bold',
  },

  [`&.${classes.layoutGrid}`]: {
    display: 'grid',
    columnGap: '1rem',
    gridTemplateColumns: '1fr',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 9rem',
    },
  },

  [`& .${classes.actionButton}`]: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-start',
      padding: 0,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '2rem',
    },
  },
}))

interface Props {
  title?: string
  children?: React.ReactNode
  actionButton?: React.ReactNode
}

export const DetailsHeader = (props: Props) => {
  const router = useRouter()
  const matchesSmallerScreen = useMediaQuery('(max-width:959px)')
  const { title, children, actionButton } = props
  return (
    <Root className={classes.layoutGrid}>
      <Box sx={{ display: 'flex' }}>
        {!matchesSmallerScreen && (
          <Button
            className={classes.backButton}
            size="large"
            color="primary"
            startIcon={<ArrowBack />}
            onClick={() => router.back()}
          />
        )}
        <div className={classes.titleContainer}>
          <Typography variant="h4" className={classes.header}>
            {title}
          </Typography>
          {/* {!matchesSmallerScreen && (
            <div className={classes.dash}>&ndash;&ndash;&ndash;</div>
          )} */}
          <Typography className={classes.subTitle} variant="h6">
            {children}
          </Typography>
        </div>
      </Box>
      {actionButton && (
        <div className={classes.actionButton}>{actionButton}</div>
      )}
    </Root>
  )
}
