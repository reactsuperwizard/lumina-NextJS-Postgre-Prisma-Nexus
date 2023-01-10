import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Typography,
  DialogActions,
} from '@mui/material'
import { useRouter } from 'next/router'
import { CloseSharp, Delete, DeleteForeverOutlined } from '@mui/icons-material'

const PREFIX = 'DELETE_SCRIPT'

const classes = {
  dialogContainer: `${PREFIX}-dialogContainer`,
  deleteIcon: `${PREFIX}-deleteIcon`,
  deleteOutlined: `${PREFIX}-deleteOutlined`,
  deleteContained: `${PREFIX}-deleteContained`,
  title: `${PREFIX}-title`,
  closeButton: `${PREFIX}-closeButton`,
  deleteForever: `${PREFIX}-deleteForever`,
  dialogText: `${PREFIX}-dialogText`,
}
const StyledButton = styled(Button)(({ theme }) => ({
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
}))
const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.dialogContainer}`]: {
    padding: '3rem',
  },

  [`& .${classes.deleteIcon}`]: {
    marginLeft: '10px',
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
}))

interface Props {
  scriptId: number
}
export const DELETE_SCRIPT = gql`
  mutation deleteOneScript($where: ScriptWhereUniqueInput!) {
    script: deleteOneScript(where: $where) {
      id
    }
  }
`

export const DeleteScript = ({ scriptId }: Props) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteScript, { loading: deleting }] = useMutation<
    {
      script: { id: number; request: { id: number } }
    },
    { where: { id: number } }
  >(DELETE_SCRIPT)

  const handleDelete = async () => {
    setLoading(true)
    await deleteScript({ variables: { where: { id: +scriptId } } })
    router.replace('../scripts')
  }

  const promptDelete = () => {
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  return (
    <>
      <StyledDialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
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
              onClick={handleClose}
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
                  fullWidth
                  variant="outlined"
                  color="primary"
                  disabled={deleting}
                  style={{ margin: '10px' }}
                  onClick={handleClose}
                >
                  No Way!
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  className={classes.deleteContained}
                  disabled={deleting}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </>
            )}
          </DialogActions>
        </div>
      </StyledDialog>
      {deleting ? (
        <CircularProgress />
      ) : (
        <StyledButton
          onClick={promptDelete}
          className={classes.deleteOutlined}
          size="large"
          variant="outlined"
          endIcon={<Delete />}
        >
          Delete
        </StyledButton>
      )}
    </>
  )
}
