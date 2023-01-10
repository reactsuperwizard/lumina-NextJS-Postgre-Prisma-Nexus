import React, { useState } from 'react'
import { ApolloQueryResult, OperationVariables } from '@apollo/client'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Tooltip,
  styled,
} from '@mui/material'
import { Build, FileCopy, Movie, Save } from '@mui/icons-material'
import { Render as RenderType } from '@lumina/api'
import { VideoDetailDialog } from 'modules/admin/Components'
import { CloneScriptDialog } from './CloneScriptDialog'
import { GetScriptQuery } from '../../queries/GET_SCRIPT'
import {
  DeleteScript,
  DownloadScriptButton,
  RenderButton,
  UpDownButton,
} from './Buttons'

const PREFIX = 'ButtonsAndModals'

const classes = {
  success: `${PREFIX}-success`,
  paper: `${PREFIX}-paper`,
  tooltip: `${PREFIX}-tooltip`,
  loadingDiv: `${PREFIX}-loadingDiv`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const StyledGrid = styled(Grid)(({ theme }) => ({
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

  [`& .${classes.loadingDiv}`]: {
    width: '7rem',
    maxHeight: '2rem',
    display: 'inline-block',
    textAlign: 'center',
  },
  [`& .MuiGrid-root`]: {
    display: 'flex',
  },
}))

interface Props {
  data:
    | {
        script: GetScriptQuery
      }
    | undefined
  rendersData:
    | {
        renders: RenderType[]
      }
    | undefined
  refetchRenders: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<
    ApolloQueryResult<{
      renders: RenderType[]
    }>
  >
  loadingRenders: boolean
  scriptId: string
  isDirty: boolean
  isValid: boolean
  updating: boolean
  success: boolean
  customerUpdated?: boolean
  handleSubmit: () => Promise<(() => void) | undefined>
  repair: () => void
}

export const ButtonsAndModals = ({
  data,
  scriptId,
  isDirty,
  updating,
  success,
  handleSubmit,
  isValid,
  loadingRenders,
  rendersData,
  refetchRenders,
  repair,
  customerUpdated,
}: Props) => {
  const [cloneScriptDialogue, setCloneScriptDialogue] = useState(false)
  const [openVideoView, setOpenVideoView] = useState(false)

  return (
    <>
      <StyledGrid
        container
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item>
          <Box component="span" mx={1}>
            {updating ? (
              <span className={classes.loadingDiv}>
                <CircularProgress size="2rem" />
              </span>
            ) : (
              <>
                <Tooltip
                  title={!isDirty ? 'Make some changes and then save!' : ''}
                  classes={{
                    tooltip: classes.tooltip,
                  }}
                  placement="top"
                  leaveDelay={0}
                  enterDelay={500}
                >
                  <span>
                    <Button
                      disabled={!isDirty && !customerUpdated}
                      className={success ? classes.success : ''}
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={handleSubmit}
                      startIcon={<Save />}
                    >
                      {success ? 'Saved' : 'save'}
                    </Button>
                  </span>
                </Tooltip>
              </>
            )}
          </Box>
          <Box component="span" mx={1}>
            {refetchRenders && (
              <RenderButton
                classes={classes}
                scriptIsValid={isValid}
                scriptIsDirty={isDirty}
                key="render-button"
                refetchRenders={refetchRenders}
                scriptId={+scriptId}
                renders={rendersData?.renders}
                rendersLoading={loadingRenders}
              />
            )}
          </Box>
          <Box component="span" mx={1}>
            <Tooltip
              title={isDirty ? 'Save the script before you clone it. ;-)' : ''}
              classes={{
                tooltip: classes.tooltip,
              }}
              placement="top"
              leaveDelay={0}
              enterDelay={500}
            >
              <span>
                <Button
                  onClick={() => {
                    setCloneScriptDialogue(true)
                  }}
                  disabled={isDirty}
                  startIcon={<FileCopy />}
                  size="large"
                  color="primary"
                  variant="outlined"
                >
                  Clone
                </Button>
              </span>
            </Tooltip>
          </Box>
          <Box component="span" mx={1}>
            <Tooltip
              title={
                isDirty ? 'Save the script before you download it. ;-)' : ''
              }
              classes={{
                tooltip: classes.tooltip,
              }}
              placement="top"
              leaveDelay={0}
              enterDelay={500}
            >
              <span>
                <DownloadScriptButton
                  globals={data?.script?.globals}
                  layers={data?.script?.layers}
                  slides={data?.script?.slides}
                  scriptId={scriptId}
                  isDirty={isDirty}
                />
              </span>
            </Tooltip>
          </Box>
          {cloneScriptDialogue && data?.script && (
            <CloneScriptDialog
              script={data?.script}
              cancel={() => setCloneScriptDialogue(false)}
              open={cloneScriptDialogue}
            />
          )}
          {data?.script?.video?.vimeoId && (
            <Box component="span" mx={1}>
              <Button
                onClick={() => setOpenVideoView(true)}
                disabled={isDirty}
                startIcon={<Movie />}
                size="large"
                color="primary"
                variant="outlined"
              >
                View
              </Button>
            </Box>
          )}
          {data?.script?.video?.vimeoId && (
            <VideoDetailDialog
              open={openVideoView}
              vimeoId={data.script.video.vimeoId}
              handleClose={() => setOpenVideoView(false)}
              ready={data.script.video.checkReady || false}
            />
          )}
          {data?.script?.id && (
            <>
              <Box component="span" mx={1}>
                <Button
                  size="large"
                  variant="outlined"
                  color="primary"
                  disabled={isDirty}
                  onClick={repair}
                  startIcon={<Build />}
                >
                  Fix
                </Button>
              </Box>
              <Box component="span" mx={1}>
                <UpDownButton id={data.script.id} />
              </Box>
              <Box component="span" mx={1}>
                <UpDownButton id={data.script.id} up />
              </Box>
            </>
          )}
        </Grid>
        <Grid item>
          <DeleteScript scriptId={+scriptId} />
        </Grid>
      </StyledGrid>
    </>
  )
}
