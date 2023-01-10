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
  TextField,
} from '@mui/material'
import { CloseSharp } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { FindResourceResultRow } from '../Components'
import { GetRequestQuery } from './Request'
import { RequestCreateInput, Request, RequestStatus } from '@lumina/api'

const PREFIX = 'CopyRequestDialog'

const classes = {
  title: `${PREFIX}-title`,
  closeButton: `${PREFIX}-closeButton`,
  tableBox: `${PREFIX}-tableBox`,
  resultDiv: `${PREFIX}-resultDiv`,
  requestFormInput: `${PREFIX}-requestFormInput`,
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

  [`& .${classes.requestFormInput}`]: {
    margin: '1.5rem 0 1.5rem',
    width: 300,
    display: 'block',
  },
}))

interface CreateRequestMutation {
  request: Pick<Request, 'id'>
}

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
  request: GetRequestQuery
}
export const CopyRequestDialog = ({ open, cancel, request }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [jobTitle, setJobTitle] = useState<string | null>(
    request.jobTitle || null,
  )
  const [specialInstructions, setSpecialInstructions] = useState<string | null>(
    request.message || null,
  )

  const [createRequest] = useMutation<CreateRequestMutation>(CREATE_REQUEST)

  const onSuccess = (id: number) => {
    cancel()
    router.push(`/admin/requests/${id}`)
  }

  const copyRequest = async () => {
    if (!request || !jobTitle) return

    const newRequest: RequestCreateInput = {
      jobTitle,
      url: request.url,
      message: specialInstructions,
      status: RequestStatus.Draft,
      order: { connect: { id: request.order.id } },
      customer: { connect: { id: request.customer.id } },
    }

    try {
      setLoading(true)
      const { data } = await createRequest({
        variables: { data: newRequest },
      })
      const id = data?.request.id
      if (!id) throw new Error('Request could not be copied.')
      onSuccess(id)
      setLoading(false)
    } catch (e) {
      if (process.env.ENV !== 'production') {
        console.error(e)
      }
    }
  }

  const handleClose = () => {
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
          Copy This Request
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
              <FindResourceResultRow label="Order:" value={request.order.id} />
            </TableBody>
          </Table>
        </div>
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
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          label="Customer Special Instructions"
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            size="large"
            variant="contained"
            color="primary"
            disabled={!jobTitle || !request}
            onClick={copyRequest}
          >
            Copy
          </Button>
        )}
      </Box>
    </StyledDialog>
  )
}
