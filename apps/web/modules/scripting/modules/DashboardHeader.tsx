import { Box, styled } from '@mui/material'
import { LuminaTab } from 'modules/utils/LuminaTab'
import { useState } from 'react'
import {
  ALL_SCRIPTS_TAB,
  MY_SCRIPTS_TAB,
  SUBMISSION_QUEUE_TAB,
  TypeScriptingTab,
} from './constants'

const PREFIX = 'Scripting-Dashboard-Header'

const classes = {
  box: `${PREFIX}-box`,
  extend: `${PREFIX}-extend`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.box}`]: {
    display: 'flex',
    borderBottom: '1px solid #D9D9D9',
    marginRight: '0.5rem',
  },

  [`& .${classes.extend}`]: {
    flex: 1,
  },
}))

interface Props {
  submissionQueueCount: number
  myScriptCount: number
  active: TypeScriptingTab
  setActiveTab: (id: TypeScriptingTab) => void
}

export const DashboardHeader = ({
  submissionQueueCount,
  myScriptCount,
  setActiveTab,
  active,
}: Props) => {
  const handleClick = (id: TypeScriptingTab) => {
    setActiveTab(id)
  }
  return (
    <StyledBox className={classes.box}>
      <LuminaTab
        id={SUBMISSION_QUEUE_TAB}
        count={submissionQueueCount}
        active={active === SUBMISSION_QUEUE_TAB}
        onClick={(id: string) => handleClick(id as TypeScriptingTab)}
      >
        Submission Queue
      </LuminaTab>
      <LuminaTab
        id={MY_SCRIPTS_TAB}
        count={myScriptCount}
        active={active === MY_SCRIPTS_TAB}
        onClick={(id: string) => handleClick(id as TypeScriptingTab)}
      >
        My Scripts
      </LuminaTab>
      <LuminaTab
        id={ALL_SCRIPTS_TAB}
        active={active === ALL_SCRIPTS_TAB}
        onClick={(id: string) => handleClick(id as TypeScriptingTab)}
      >
        All Scripts
      </LuminaTab>
      <Box className={classes.extend}></Box>
    </StyledBox>
  )
}
