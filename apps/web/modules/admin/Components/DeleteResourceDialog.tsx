import React from 'react'
import { styled } from '@mui/material/styles'
import { useMutation, gql } from '@apollo/client'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material'
import { CloseSharp, DeleteForeverOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'

const PREFIX = 'DeleteResourceDialog'

const classes = {
  dialogContainer: `${PREFIX}-dialogContainer`,
  deleteContained: `${PREFIX}-deleteContained`,
  title: `${PREFIX}-title`,
  closeButton: `${PREFIX}-closeButton`,
  deleteForever: `${PREFIX}-deleteForever`,
  dialogText: `${PREFIX}-dialogText`,
  deleteButton: `${PREFIX}-deleteButton`,
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.dialogContainer}`]: {
    padding: '3rem',
  },

  [`& .${classes.deleteContained}`]: {
    margin: '10px',
    backgroundColor: theme.palette.error.main,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#BB0F03',
    },
  },

  [`& .${classes.title}`]: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },

  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  [`& .${classes.deleteForever}`]: {
    textAlign: 'center',
  },

  [`& .${classes.dialogText}`]: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.deleteButton}`]: { border: '1px solid red', color: 'red' },
}))

export const DeleteResourceDialog = ({
  id,
  open,
  cancel,
  resource,
}: {
  id: number
  open: boolean
  cancel: () => void
  resource:
    | 'Video'
    | 'Request'
    | 'Order'
    | 'Script'
    | 'User'
    | 'Customer'
    | 'Platform'
}) => {
  const router = useRouter()

  const DELETE_RESOURCE = gql`
    mutation deleteOne${resource}($id: Int) {
      data: deleteOne${resource}(where: { id: $id }) {
        id
      }
    }
  `

  const [doMutation, { loading }] = useMutation(DELETE_RESOURCE)

  const deleteResource = async () => {
    await doMutation({ variables: { id } })
    cancel()
    router.push('./')
  }

  return (
    <StyledDialog onClose={cancel} open={open}>
      <div className={classes.dialogContainer}>
        <DialogTitle>
          <div className={classes.deleteForever}>
            <DeleteForeverOutlined
              style={{ fontSize: '5rem', color: '#f44336', padding: '0' }}
            />
          </div>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={cancel}
            size="large"
          >
            <CloseSharp />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogText}>
          <Typography
            variant="h5"
            className={classes.title}
            color="textPrimary"
          >
            Are you sure?
          </Typography>
          <Typography>
            This process <b>cannot</b> be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                style={{ margin: '10px' }}
                onClick={cancel}
              >
                NO WAY!
              </Button>

              <Button
                variant="contained"
                fullWidth
                className={classes.deleteContained}
                onClick={deleteResource}
              >
                DELETE
              </Button>
            </>
          )}
        </DialogActions>
      </div>
    </StyledDialog>
  )
}
