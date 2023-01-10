import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { gql, useApolloClient } from '@apollo/client'
import {
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
  Table,
  TableBody,
} from '@mui/material'
import { Alert } from '@mui/material';
import {
  FindResourceResultRow,
  LuminaAutocomplete,
  QueryField,
  ReturnField,
} from '..'
import { Script, Request, Order, Customer, Video, User } from '@lumina/api'

const PREFIX = 'FindScriptById';

const classes = {
  scriptIdInput: `${PREFIX}-scriptIdInput`,
  findButton: `${PREFIX}-findButton`,
  resultDiv: `${PREFIX}-resultDiv`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.scriptIdInput}`]: { margin: '1.5rem 0 1.5rem', width: 300, display: 'block' },
  [`& .${classes.findButton}`]: { marginBottom: '1.5rem' },
  [`& .${classes.resultDiv}`]: { padding: '0 0 1.5rem 0', maxWidth: '400px' },
});

export interface GetScriptQuery
  extends Pick<Script, 'id' | 'name' | 'flavor' | 'layers'> {
  producer: Pick<User, 'email'>
  order: Pick<Order, 'id' | 'name'> & {
    customer: Pick<Customer, 'id' | 'name'>
  }
  request: Pick<Request, 'id' | 'jobTitle'>
  video: Pick<Video, 'id'>
}

const GET_SCRIPT = gql`
  query Script($where: ScriptWhereUniqueInput!) {
    script(where: $where) {
      id
      name
      flavor
      layers
      producer {
        email
      }
      order {
        id
        name
        customer {
          id
          name
        }
      }
      request {
        id
        jobTitle
      }
      video {
        id
      }
    }
  }
`

export const FindScriptById = (props: {
  script: GetScriptQuery | null
  setScript: React.Dispatch<React.SetStateAction<GetScriptQuery | null>>
  title?: string
  clone?: boolean
}) => {

  const { script, setScript, title, clone } = props
  const client = useApolloClient()
  const [alertOpen, setAlertOpen] = useState(false)
  const [finding, setFinding] = useState(false)
  const [newScriptId, setNewScriptId] = useState<number | null>(null)

  const findScript = async () => {
    setFinding(true)
    const { data } = await client.query<{ script: GetScriptQuery }>({
      query: GET_SCRIPT,
      variables: { where: { id: newScriptId } },
    })
    if (!data?.script || (data.script.video && !clone)) {
      setAlertOpen(true)
    } else setScript(data.script)
    setFinding(false)
  }

  return (
    <Root>
      <Typography variant="h6">
        {title ||
          `Please enter the ID number for the Script this Video should be connected to:`}
      </Typography>
      <TextField
        className={classes.scriptIdInput}
        value={newScriptId || ''}
        type="number"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setScript(null)
          setNewScriptId(parseInt(event.target.value))
        }}
        variant="outlined"
        margin="dense"
        required
        id="newScriptIdInput"
        name="scriptId"
        label="Script Id"
        fullWidth
      />
      <LuminaAutocomplete
        label="Lookup Script by Name"
        getOptionLabel="name"
        resourceName="Script"
        fieldName="script"
        queryFields={[QueryField.name]}
        returnFields={[ReturnField.id, ReturnField.name]}
        source="script.name"
        parse={(v: any) => {
          return v.id
        }}
        onChange={(value: any) => {
          setScript(null)
          setNewScriptId(parseInt(value.id))
        }}
      />
      {script === null ? (
        finding ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={findScript}
            className={classes.findButton}
          >
            Find
          </Button>
        )
      ) : (
        <div className={classes.resultDiv}>
          <Table size="small">
            <TableBody>
              <FindResourceResultRow
                label="Customer:"
                value={script.order.customer.name}
              />
              <FindResourceResultRow
                label="Job Title:"
                value={script.request.jobTitle}
              />
              <FindResourceResultRow label="Script Name:" value={script.name} />
              <FindResourceResultRow
                label="Producer:"
                value={script.producer?.email || 'Not Specified'}
              />
              <FindResourceResultRow
                label="Order Id:"
                value={script.order.id}
              />
            </TableBody>
          </Table>
        </div>
      )}
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1500}
        onClose={() => setAlertOpen(false)}
      >
        <Alert severity="error">That Script Id is not available</Alert>
      </Snackbar>
    </Root>
  )
}
