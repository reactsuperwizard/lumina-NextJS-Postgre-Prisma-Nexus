import React from 'react'
import { styled } from '@mui/material/styles'
import { Theme } from '@mui/material/styles'
import { useRouter } from 'next/router'

import {
  Paper,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { ParsedUrlQueryInput } from 'querystring'

const PREFIX = 'ScriptEditLayout'

const classes = {
  success: `${PREFIX}-success`,
  paper: `${PREFIX}-paper`,
  tooltip: `${PREFIX}-tooltip`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.success}`]: {
    backgroundColor: theme.palette.success.main,
  },

  [`& .${classes.paper}`]: {
    margin: `${theme.spacing(3)} auto`,
    padding: theme.spacing(5),
    boxShadow: 'none !important',
  },

  [`& .${classes.tooltip}`]: {
    background: theme.palette.info.main,
    fontSize: 14,
    color: '#FFFFFF',
  },
}))

export const ScriptEditLayout = ({
  title,
  loadingIcon,
  scriptDetails,
  globals,
  slides,
  buttonsAndModals,
}: {
  title: string
  loadingIcon: React.ReactNode
  scriptDetails: React.ReactNode
  globals: React.ReactNode
  slides: React.ReactNode
  buttonsAndModals: React.ReactNode
}) => {
  const router = useRouter()

  const globalsOpen = router.query.globalsOpen === 'true'
  const slidesOpen = router.query.slidesOpen === 'true'

  const makeToggleExpand = (isGlobalToggle: boolean) => () => {
    const newQuery: ParsedUrlQueryInput = { ...router.query }
    if (isGlobalToggle) newQuery.globalsOpen = !globalsOpen
    if (!isGlobalToggle) newQuery.slidesOpen = !slidesOpen
    router.replace(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <Root>
      <Box m={4}>
        <Box my={2} display="flex" justifyContent="space-between">
          <Typography variant="h4">{title}</Typography>
          {loadingIcon}
        </Box>
        <Paper className={classes.paper} square>
          {scriptDetails}
        </Paper>
        <Paper>
          <Accordion
            className={classes.paper}
            expanded={globalsOpen}
            onChange={makeToggleExpand(true)}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">Global Variables</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Accordian already applies a padding of 1 - so, really the padding here is 4 = 3 + 1 */}
              <Box px={3}>
                <Grid container spacing={1}>
                  {globals}
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Paper>

        <Paper>
          <Accordion
            className={classes.paper}
            expanded={slidesOpen}
            onChange={makeToggleExpand(false)}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">Slides</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box px={3}>
                <Grid container spacing={1}>
                  {slides}
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Paper>
        <Box my={2}>{buttonsAndModals}</Box>
      </Box>
    </Root>
  )
}
