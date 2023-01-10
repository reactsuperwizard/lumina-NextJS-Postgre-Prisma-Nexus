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
import { FindResourceResultRow } from '..'
import { Request, Script, Order, Customer } from '@lumina/api'
import {
  LuminaAutocomplete,
  QueryField,
  ReturnField,
} from '../LuminaAutocomplete'

const PREFIX = 'FindRequestById';

const classes = {
  requestIdInput: `${PREFIX}-requestIdInput`,
  findButton: `${PREFIX}-findButton`,
  resultDiv: `${PREFIX}-resultDiv`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.requestIdInput}`]: { margin: '1.5rem 0 1.5rem', width: 300, display: 'block' },
  [`& .${classes.findButton}`]: { marginBottom: '1.5rem' },
  [`& .${classes.resultDiv}`]: { padding: '0 0 1.5rem 0', maxWidth: '400px' },
});

export interface GetRequestQuery extends Pick<Request, 'id' | 'jobTitle'> {
  script: Pick<Script, 'id'>
  order: Pick<Order, 'id'> & {
    customer: Pick<Customer, 'id' | 'name'>
  }
}

const GET_REQUEST = gql`
  query Request($where: RequestWhereUniqueInput!) {
    request(where: $where) {
      id
      jobTitle
      script {
        id
      }
      order {
        id
        customer {
          id
          name
        }
      }
    }
  }
`

export const FindRequestById = (props: {
  request: GetRequestQuery | null
  setRequest: React.Dispatch<React.SetStateAction<GetRequestQuery | null>>
}) => {

  const { request, setRequest } = props
  const client = useApolloClient()
  const [alertOpen, setAlertOpen] = useState(false)
  const [finding, setFinding] = useState(false)
  const [newRequestId, setNewRequestId] = useState<number | null>(null)

  const findRequest = async () => {
    setFinding(true)
    const { data } = await client.query<{ request: GetRequestQuery }>({
      query: GET_REQUEST,
      variables: { where: { id: newRequestId } },
    })
    if (!data?.request || data.request.script) {
      setAlertOpen(true)
    } else setRequest(data.request)
    setFinding(false)
  }

  return (
    <Root>
      <Typography variant="h6">
        Please enter the ID number or search by Job Title for the Request this
        Script should be connected to:
      </Typography>
      <br />
      <LuminaAutocomplete
        label="Lookup Request by Job Title"
        getOptionLabel="jobTitle"
        resourceName="Request"
        fieldName="jobTitle"
        queryFields={[QueryField.jobTitle]}
        returnFields={[ReturnField.id, ReturnField.jobTitle]}
        source="request.id"
        parse={(v: any) => {
          return v.id
        }}
        onChange={(value: any) => {
          setRequest(null)
          setNewRequestId(+value.id)
        }}
      />
      <TextField
        className={classes.requestIdInput}
        value={newRequestId || ''}
        type="number"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRequest(null)
          setNewRequestId(+event.target.value)
        }}
        variant="outlined"
        margin="dense"
        required
        id="newRequestIdInput"
        name="requestId"
        label="Request Id"
        fullWidth
      />
      {request === null ? (
        finding ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={findRequest}
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
                value={request.order.customer.name}
              />
              <FindResourceResultRow
                label="Job Title:"
                value={request.jobTitle}
              />
              <FindResourceResultRow label="Request:" value={request.id} />
              <FindResourceResultRow label="Order:" value={request.order.id} />
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
        <Alert severity="error">That Request Id is not available</Alert>
      </Snackbar>
    </Root>
  )
}
