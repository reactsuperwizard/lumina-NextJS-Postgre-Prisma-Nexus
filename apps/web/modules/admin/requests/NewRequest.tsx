import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import {
  Button,
  Paper,
  Box,
  Typography,
  CircularProgress,
  TextField,
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { FindOrderById, GetOrderQuery } from '../Components/ResourceById'
import { Request, RequestCreateInput, RequestStatus } from '@lumina/api'

const PREFIX = 'NewRequest';

const classes = {
  formBox: `${PREFIX}-formBox`,
  findRequest: `${PREFIX}-findRequest`,
  saveButton: `${PREFIX}-saveButton`,
  requestFormInput: `${PREFIX}-requestFormInput`
};

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
  [`& .${classes.requestFormInput}`]: {
    margin: '1.5rem 0 1.5rem',
    width: 300,
    display: 'block',
  },
});

const CREATE_REQUEST = gql`
  mutation createOneRequest($data: RequestCreateInput!) {
    request: createOneRequest(data: $data) {
      id
    }
  }
`

export const NewRequest = () => {

  const router = useRouter()
  const [order, setOrder] = useState<GetOrderQuery | null>(null)
  const [jobTitle, setJobTitle] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [creating, setCreating] = useState(false)

  const [addRequest] = useMutation<{ request: Pick<Request, 'id'> }>(
    CREATE_REQUEST,
  )

  const createRequest = async () => {
    if (!order || !order.customer?.id || !jobTitle || !url) return
    setCreating(true)
    const data: RequestCreateInput = {
      jobTitle: jobTitle,
      url: url,
      message: message,
      status: RequestStatus.Draft,
      order: { connect: { id: order.id } },
      customer: { connect: { id: order.customer.id } },
    }
    const result = await addRequest({ variables: { data } })
    setCreating(false)
    const newId = result.data?.request?.id
    router.push(`./${newId}`)
  }

  return (
    (<Root>
      <Paper>
        <Box className={classes.formBox}>
          <Typography variant="h4">Create Request</Typography>
          <TextField
            variant="outlined"
            className={classes.requestFormInput}
            margin="dense"
            color="primary"
            required
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            label="Job Title"
          />
          <TextField
            variant="outlined"
            className={classes.requestFormInput}
            margin="dense"
            color="primary"
            required
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            label="Link to Description"
          />
          <TextField
            variant="outlined"
            className={classes.requestFormInput}
            margin="dense"
            color="primary"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            label="Message"
          />
          <div className={classes.findRequest}>
            <FindOrderById order={order} setOrder={setOrder} />
          </div>
          {creating ? (
            <CircularProgress />
          ) : (
            <Button
              className={classes.saveButton}
              disabled={order === null || !order?.customer?.id}
              variant="contained"
              color="secondary"
              startIcon={<Save />}
              onClick={createRequest}
            >
              Save
            </Button>
          )}
        </Box>
      </Paper>
    </Root>)
  );
}
