import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useMutation, gql } from '@apollo/client'
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Box,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material'
import { CloseSharp, Save } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { Request, RequestCreateInput, RequestStatus } from '@lumina/api'
import { GetOrderQuery } from './Order'

const PREFIX = 'AddRequestDialog'

const classes = {
  title: `${PREFIX}-title`,
  closeButton: `${PREFIX}-closeButton`,
  tableBox: `${PREFIX}-tableBox`,
  requestFormInput: `${PREFIX}-requestFormInput`,
  saveButton: `${PREFIX}-saveButton`,
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.title}`]: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },

  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  [`& .${classes.tableBox}`]: {
    margin: theme.spacing(4),
    marginTop: theme.spacing(0.5),
    textAlign: 'center',
  },

  [`& .${classes.requestFormInput}`]: {
    margin: '1.5rem 0 1.5rem',
    width: 300,
    display: 'block',
  },

  [`& .${classes.saveButton}`]: {
    marginTop: '0.45rem',
  },
}))

const CREATE_REQUEST = gql`
  mutation createOneRequest($data: RequestCreateInput!) {
    request: createOneRequest(data: $data) {
      id
    }
  }
`

interface Props {
  open: boolean
  cancel: () => void
  order: GetOrderQuery | undefined
}
export const AddRequestDialog = ({ open, cancel, order }: Props) => {
  const router = useRouter()
  const [jobTitle, setJobTitle] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [creating, setCreating] = useState(false)

  const [addRequest] =
    useMutation<{ request: Pick<Request, 'id'> }>(CREATE_REQUEST)

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
    router.push(`../requests/${newId}`)
  }

  if (!open) {
    return null
  }

  return (
    <StyledDialog
      onClose={cancel}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth={false}
    >
      <DialogTitle>
        <Typography variant="h5" className={classes.title}>
          Add Request to Order
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={cancel}
          size="large"
        >
          <CloseSharp />
        </IconButton>
      </DialogTitle>
      <Box className={classes.tableBox}>
        <>
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
          {creating ? (
            <CircularProgress />
          ) : (
            <Button
              className={classes.saveButton}
              disabled={
                order === null || !order?.customer?.id || !url || !jobTitle
              }
              variant="contained"
              color="secondary"
              startIcon={<Save />}
              onClick={createRequest}
            >
              Save
            </Button>
          )}
        </>
      </Box>
    </StyledDialog>
  )
}
