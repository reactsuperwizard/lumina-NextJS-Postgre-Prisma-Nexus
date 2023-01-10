import React, { useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'

import {
  Button,
  Tooltip,
  DialogTitle,
  Typography,
  DialogActions,
  Dialog,
  IconButton,
  DialogContent,
  styled
} from '@mui/material'
import { CloseSharp, OndemandVideo } from '@mui/icons-material'

import { CircularProgress } from '@mui/material'

import {
  MutationCreateOneRenderArgs,
  MutationDeleteOneRenderArgs,
  Render as RenderType,
  RenderStatus,
} from '@lumina/api'

import type { RefetchRenders } from '../..'

import {
  CREATE_RENDER,
  DELETE_RENDER,
  CreateRenderMutation,
  DeleteRenderMutation,
} from '../../../queries'

const PREFIX = 'RenderButton'

const localClasses = {
  closeButton: `${PREFIX}-closeButton`,
  loadingDiv: `${PREFIX}-loadingDiv`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${localClasses.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  [`& .${localClasses.loadingDiv}`]: {
    width: '8.5rem',
    maxHeight: '2rem',
    display: 'inline-block',
    textAlign: 'center',
  },
}))

interface Props {
  refetchRenders: RefetchRenders
  scriptId?: number
  text?: string
  scriptIsValid: boolean
  scriptIsDirty: boolean
  classes: Record<'success' | 'tooltip', string>
  renders?: RenderType[]
  rendersLoading: boolean
}

export const RenderButton = ({
  renders,
  rendersLoading,
  classes,
  refetchRenders,
  scriptId,
  text,
  scriptIsValid,
  scriptIsDirty,
}: Props) => {
  const [working, setWorking] = useState(false)
  const [open, setOpen] = useState(false)
  const [queuedRender, setQueuedRender] = useState<RenderType | null>(null)
  const [renderingRender, setRenderingRender] = useState<RenderType | null>(
    null,
  )
  const [createRender] = useMutation<
    {
      queuedRender: CreateRenderMutation
    },
    MutationCreateOneRenderArgs
  >(CREATE_RENDER)
  const [deleteRender] = useMutation<
    {
      deleteOneRender: DeleteRenderMutation
    },
    MutationDeleteOneRenderArgs
  >(DELETE_RENDER)

  useEffect(() => {
    if (!renders || renders.length === 0) return
    const queuedRender = renders.find((r) => r.status === RenderStatus.Queued)
    if (queuedRender) {
      setQueuedRender(queuedRender)
    } else {
      setQueuedRender(null)
    }
    const renderingRender = renders.find(
      (r) => r.status === RenderStatus.Rendering,
    )
    if (renderingRender) {
      setRenderingRender(renderingRender)
    } else {
      setRenderingRender(null)
    }
  }, [renders])

  const handleQueue = async (_e: React.MouseEvent<HTMLButtonElement>) => {
    setWorking(true)
    const variables = {
      data: { script: { connect: { id: scriptId } } },
    }

    await createRender({ variables })
    refetchRenders()

    setWorking(false)
    handleClose()
  }

  const handleDeq = async (_e: React.MouseEvent<HTMLButtonElement>) => {
    setWorking(true)
    const variables = {
      where: { id: queuedRender?.id },
    }

    // const { data } = await deleteRender({ variables })
    await deleteRender({ variables })
    await refetchRenders()
    setWorking(false)
    handleClose()
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getTooltipTitle = () => {
    if (!scriptIsValid) {
      return 'All fields must pass validation before you render!'
    }
    if (scriptIsDirty) {
      return 'Save script before you render!'
    }
    return ''
  }
  const shouldDisableRender =
    !scriptIsValid || scriptIsDirty || !!renderingRender || rendersLoading

  return (
    <Root>
      {working && (
        <span className={localClasses.loadingDiv}>
          <CircularProgress size="2rem" />
        </span>
      )}
      {queuedRender && !working && (
        <Button
          onClick={handleOpen}
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<OndemandVideo />}
        >
          Dequeue
        </Button>
      )}
      {!queuedRender && !working && (
        <Tooltip
          title={getTooltipTitle()}
          classes={{
            tooltip: classes.tooltip,
          }}
          placement="bottom"
          leaveDelay={0}
          enterDelay={500}
        >
          <span>
            <Button
              disabled={shouldDisableRender}
              onClick={handleQueue}
              variant="contained"
              color="primary"
              size="large"
              startIcon={<OndemandVideo />}
            >
              {text ? text : 'Render'}
            </Button>
          </span>
        </Tooltip>
      )}
      {open && (
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>
            <Typography variant="h5">Update Queue</Typography>
            <IconButton
              className={localClasses.closeButton}
              aria-label="close"
              onClick={handleClose}
              size="large"
            >
              <CloseSharp />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography color="textPrimary">
              Your script is already queued.
              <br />
              <br />
              If it{"'"}s not ready to render, feel free to dequeue.
            </Typography>
          </DialogContent>
          <DialogActions>
            {working && <CircularProgress />}
            {!working && (
              <>
                <Button variant="contained" color="primary" onClick={handleDeq}>
                  Dequeue
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Nevermind
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      )}
    </Root>
  )
}
