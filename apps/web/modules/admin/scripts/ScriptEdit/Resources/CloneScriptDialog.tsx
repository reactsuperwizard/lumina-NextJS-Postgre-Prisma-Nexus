import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Box,
  Button,
  CircularProgress,
  styled,
} from '@mui/material'
import { CloseSharp } from '@mui/icons-material'
import {
  FindRequestById,
  GetRequestQuery,
} from '../../../Components/ResourceById'
import { useRouter } from 'next/router'
import { ScriptCreateInput } from '@lumina/api'
import { useApolloClient, useMutation } from '@apollo/client'
import {
  CREATE_SCRIPT,
  CreateScriptMutation,
  GetScriptQuery,
  GetFlavorQuery,
  GET_FLAVOR,
} from '../../queries'

const PREFIX = 'CloneScriptDialog'

const classes = {
  title: `${PREFIX}-title`,
  closeButton: `${PREFIX}-closeButton`,
  tableBox: `${PREFIX}-tableBox`,
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.title}`]: {
    marginTop: theme.spacing(1),
  },

  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  [`& .${classes.tableBox}`]: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
}))

interface Props {
  order?: any
  script: { __typename?: string } & GetScriptQuery
  name?: any
  open: boolean
  cancel: () => void
}
export const CloneScriptDialog = ({ script, open, cancel }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const client = useApolloClient()
  const [request, setRequest] = useState<GetRequestQuery | null>(null)

  const [createScript] = useMutation<CreateScriptMutation>(CREATE_SCRIPT)

  const onSuccess = (id: number) => {
    cancel()
    router.push(`./${id}`)
  }
  const cloneScript = async () => {
    if (!request) return
    // inherit newest data from flavors in case text length requirements change, etc.
    // the implies layerNames will not change, slightly dangerours
    // DOES NOT SUPPORT LAYER NAME CHANGES
    const { data } = await client.query<GetFlavorQuery>({
      query: GET_FLAVOR,
      variables: { name: script.flavor },
    })
    const layers: any = {}
    Object.keys(data.flavor.layers).forEach((l) => {
      const flavorLayer = data.flavor.layers[l]
      const scriptVariable =
        script.layers[l]?.scriptVariable || flavorLayer.scriptVariable || ''
      const scriptLayer = {
        ...script.layers[l],
        ...flavorLayer,
        scriptVariable,
      }
      if (script.layers[l].id) scriptLayer.id = script.layers[l].id
      if (script.layers[l].value) scriptLayer.value = script.layers[l].value
      layers[l] = scriptLayer
    })

    const name = `${request.jobTitle} |#| ${new Date().toLocaleString('en-US')}`
    const clonedScript: ScriptCreateInput = {
      order: { connect: { id: request.order.id } },
      name,
      layers,
      globals: data.flavor.globals,
      slides: data.flavor.slides,
      flavor: script.flavor,
      request: { connect: { id: request.id } },
    }

    const producerId = script.producer?.id
    if (producerId) {
      clonedScript.producer = { connect: { id: producerId } }
    }

    try {
      setLoading(true)
      const { data } = await createScript({
        variables: { data: clonedScript },
      })
      const id = data?.script.id
      if (!id) throw new Error('Script could not be cloned.')
      onSuccess(id)
      setLoading(false)
    } catch (e) {
      if (process.env.ENV !== 'production') {
        console.error(e)
      }
    }
  }

  const handleClose = () => {
    setRequest(null)
    cancel()
  }

  if (!open) {
    return null
  }

  return (
    <StyledDialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle>
        <Typography variant="h5" className={classes.title}>
          Clone Script
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
          size="large"
        >
          <CloseSharp />
        </IconButton>
      </DialogTitle>
      <Box className={classes.tableBox}>
        <FindRequestById request={request} setRequest={setRequest} />
        <br />
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            size="large"
            variant="contained"
            color="primary"
            disabled={!request}
            onClick={cloneScript}
          >
            Clone
          </Button>
        )}
      </Box>
    </StyledDialog>
  )
}
