import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useApolloClient, useMutation, gql, useQuery } from '@apollo/client'
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Theme,
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'
import { CloseSharp } from '@mui/icons-material'
import { useRouter } from 'next/router'
import {
  FindResourceResultRow,
  LuminaAutocomplete,
  QueryField,
  ReturnField,
} from '../Components'
import { GetRequestQuery } from './Request'
import { GetRequestQuery as ProductionGetRequestQuery } from '../production/queries'
import { FindScriptById, GetScriptQuery } from '../Components/ResourceById'
import { ScriptCreateInput, Script, TemplateFlavor } from '@lumina/api'
import { Flavor } from '@lumina/render/src/flavors'

const PREFIX = 'AddScriptDialog'

const classes = {
  title: `${PREFIX}-title`,
  closeButton: `${PREFIX}-closeButton`,
  tableBox: `${PREFIX}-tableBox`,
  resultDiv: `${PREFIX}-resultDiv`,
  findScript: `${PREFIX}-findScript`,
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

  [`& .${classes.resultDiv}`]: {
    padding: '0 0 1.5rem 0',
    maxWidth: '400px',
  },

  [`& .${classes.findScript}`]: {
    margin: '1.5rem 0 0.5rem',
  },
}))

interface CreateScriptMutation {
  script: Pick<Script, 'id'>
}

const CREATE_SCRIPT = gql`
  mutation createScript($data: ScriptCreateInput!) {
    script: createScript(data: $data) {
      id
    }
  }
`

interface GetFlavorQuery {
  flavor: Flavor
}

const GET_FLAVOR = gql`
  query flavor($name: TemplateFlavor!) {
    flavor(name: $name)
  }
`

interface Props {
  open: boolean
  cancel: () => void
  request: GetRequestQuery | ProductionGetRequestQuery
}
export const AddScriptDialog = ({ open, cancel, request }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const client = useApolloClient()
  const [producer, setProducer] = useState<GetRequestQuery | null>(null)
  const [script, setScript] = useState<GetScriptQuery | null>(null)
  const [flavor, setFlavor] = useState<null | TemplateFlavor>(null)
  const [clone, setClone] = useState(false)

  const [createScript] = useMutation<CreateScriptMutation>(CREATE_SCRIPT)

  const onSuccess = (id: number) => {
    cancel()
    router.push(`/admin/scripts/${id}`)
  }
  const makeCloneScriptVariables = (
    script: GetScriptQuery,
    data: GetFlavorQuery,
  ): ScriptCreateInput => {
    const layers: any = {}
    const name = `${request.jobTitle} |#| ${new Date().toLocaleString('en-US')}`
    Object.keys(data.flavor.layers).forEach((l) => {
      const flavorLayer = data.flavor.layers[l]
      const scriptVariable =
        script.layers[l]?.scriptVariable || flavorLayer.scriptVariable || ''
      const scriptLayer = {
        ...flavorLayer,
        ...script.layers[l],
        scriptVariable,
      }
      layers[l] = scriptLayer
    })
    return {
      order: { connect: { id: request.order.id } },
      name,
      layers,
      globals: data.flavor.globals,
      slides: data.flavor.slides,
      flavor: script?.flavor,
      request: { connect: { id: request.id } },
    }
  }

  const makeCreateScriptVariables = (
    data: GetFlavorQuery,
  ): ScriptCreateInput => {
    if (!request) {
      throw Error("There is no request.  This shouldn't happen!")
    }
    if (!producer) {
      throw Error("There is no producer.  This shouldn't happen!")
    }
    if (!flavor) {
      throw Error('Select a flavor.')
    }
    const name = `${request.jobTitle} |#| ${new Date().toLocaleString('en-US')}`
    return {
      name,
      request: { connect: { id: request.id } },
      order: { connect: { id: request.order.id } },
      producer: { connect: { id: producer.id } },
      globals: data.flavor.globals,
      slides: data.flavor.slides,
      layers: data.flavor.layers,
      flavor,
    }
  }

  const cloneOrCreateScript = async () => {
    if (!request || !producer) return
    if (clone && !script) return
    if (!clone && !flavor) return

    // inherit newest data from flavors in case text length requirements change, etc.
    // the implies layerNames will not change, slightly dangerous
    // DOES NOT SUPPORT LAYER NAME CHANGES

    const { data } = await client.query<GetFlavorQuery>({
      query: GET_FLAVOR,
      variables: { name: clone ? script?.flavor : flavor },
    })

    let newScript: ScriptCreateInput
    if (clone && script) {
      newScript = makeCloneScriptVariables(script, data)
    }
    if (!clone) {
      newScript = makeCreateScriptVariables(data)
    }

    newScript!.producer = { connect: { id: producer.id } }

    try {
      setLoading(true)
      const { data } = await createScript({
        variables: { data: newScript! },
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
    setClone(false)
    setScript(null)
    setFlavor(null)
    setProducer(null)
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
      maxWidth={false}
    >
      <DialogTitle>
        <Typography variant="h5" className={classes.title}>
          Add Script to Request
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
        <div className={classes.resultDiv}>
          <Table size="small">
            <TableBody>
              <FindResourceResultRow
                label="Customer:"
                value={request.customer.name}
              />
              <FindResourceResultRow
                label="Job Title:"
                value={request.jobTitle}
              />
            </TableBody>
          </Table>
        </div>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="new or clone"
            name="clone"
            defaultValue="new"
            onChange={(e) => setClone(e.target.value === 'clone')}
          >
            <FormControlLabel
              value="new"
              control={<Radio color="primary" />}
              label="Create new"
              labelPlacement="end"
            />
            <FormControlLabel
              value="clone"
              control={<Radio color="primary" />}
              label="Clone existing"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <LuminaAutocomplete
          label="Lookup Producer by Email"
          getOptionLabel="email"
          resourceName="User"
          fieldName="email"
          queryFields={[QueryField.email]}
          returnFields={[ReturnField.id, ReturnField.email]}
          source="user.id"
          parse={(v: any) => {
            return v.id
          }}
          onChange={(value: any) => setProducer(value)}
          customWhereFilter={{
            customers: { some: { tenant: { equals: 'lumina' } } },
          }}
        />
        <br />
        {clone ? (
          <div className={classes.findScript}>
            <FindScriptById
              script={script}
              setScript={setScript}
              title="Find the Script to clone:"
              clone
            />
          </div>
        ) : (
          <>
            <Typography variant="h6">Choose a Template Flavor</Typography>
            <div>
              <Select
                variant="standard"
                onChange={(e) => setFlavor(e.target.value as TemplateFlavor)}
                value={flavor || ''}
              >
                <MenuItem value={TemplateFlavor.T1}>T1</MenuItem>
                <MenuItem value={TemplateFlavor.T2}>T2</MenuItem>
                <MenuItem value={TemplateFlavor.T4}>T4</MenuItem>
                <MenuItem value={TemplateFlavor.T6}>T6</MenuItem>
                <MenuItem value={TemplateFlavor.T7}>T7</MenuItem>
                <MenuItem value={TemplateFlavor.T8}>T8</MenuItem>
                <MenuItem value={TemplateFlavor.T10}>T10</MenuItem>
                <MenuItem value={TemplateFlavor.T11}>T11</MenuItem>
                <MenuItem value={TemplateFlavor.T12}>T12</MenuItem>
                <MenuItem value={TemplateFlavor.T13}>T13</MenuItem>
                <MenuItem value={TemplateFlavor.T14}>T14</MenuItem>
                <MenuItem value={TemplateFlavor.T15}>T15</MenuItem>
                <MenuItem value={TemplateFlavor.T16}>T16</MenuItem>
              </Select>
            </div>
          </>
        )}
        <br />
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            size="large"
            variant="contained"
            color="primary"
            disabled={!producer || (clone ? !script : !flavor)}
            onClick={cloneOrCreateScript}
          >
            {clone ? `Clone Script` : 'Create New Script'}
          </Button>
        )}
      </Box>
    </StyledDialog>
  )
}
