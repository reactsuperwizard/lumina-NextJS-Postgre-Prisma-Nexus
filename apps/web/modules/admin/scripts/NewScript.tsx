import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import {
  Button,
  Paper,
  Box,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { FindRequestById, GetRequestQuery } from '../Components/ResourceById'

import {
  CREATE_SCRIPT,
  CreateScriptMutation,
  GET_FLAVOR,
  GetFlavorQuery,
} from './queries'

import { TemplateFlavor } from '@lumina/api'

import { LuminaAutocomplete, QueryField, ReturnField } from '../Components'

const PREFIX = 'NewScript'

const classes = {
  formBox: `${PREFIX}-formBox`,
  findRequest: `${PREFIX}-findRequest`,
  saveButton: `${PREFIX}-saveButton`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.formBox}`]: {
    padding: '1.5rem',
  },
  [`& .${classes.findRequest}`]: {
    margin: '1.5rem 0 0.5rem',
  },
  [`& .${classes.saveButton}`]: {
    marginTop: '1.5rem',
  },
})

export const NewScript = () => {
  const router = useRouter()
  const [request, setRequest] = useState<GetRequestQuery | null>(null)
  const [producer, setProducer] = useState<GetRequestQuery | null>(null)
  const [flavor, setFlavor] = useState<null | TemplateFlavor>(null)
  const [creating, setCreating] = useState(false)

  const [addScript] = useMutation<CreateScriptMutation>(CREATE_SCRIPT)

  const { data: flavorData, loading } = useQuery<GetFlavorQuery>(GET_FLAVOR, {
    skip: !flavor,
    variables: { name: flavor },
  })

  const createScript = async () => {
    if (!request || !flavorData || !producer) return
    setCreating(true)
    const { globals, slides, layers } = flavorData.flavor

    try {
      const result = await addScript({
        variables: {
          data: {
            name: `${request.jobTitle} |#| ${new Date().toLocaleString(
              'en-US',
            )}`,
            request: { connect: { id: request.id } },
            order: { connect: { id: request.order.id } },
            producer: { connect: { id: producer.id } },
            globals,
            slides,
            layers,
            flavor,
          },
        },
      })
      setCreating(false)
      const newId = result.data?.script?.id
      router.push(`./${newId}`)
    } catch (_) {
      setCreating(false)
    }
  }

  return (
    <Root>
      <Paper>
        <Box className={classes.formBox}>
          <Typography variant="h4">Create Script</Typography>
          <div className={classes.findRequest}>
            <FindRequestById request={request} setRequest={setRequest} />
          </div>
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
          />
          <br />
          <Typography variant="h6">Choose a Template Flavor</Typography>
          <div>
            <Select
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
          {creating || loading ? (
            <CircularProgress />
          ) : (
            <Button
              className={classes.saveButton}
              disabled={request === null || !flavorData || !producer}
              variant="contained"
              color="secondary"
              startIcon={<Save />}
              onClick={createScript}
            >
              Save
            </Button>
          )}
        </Box>
      </Paper>
    </Root>
  )
}
