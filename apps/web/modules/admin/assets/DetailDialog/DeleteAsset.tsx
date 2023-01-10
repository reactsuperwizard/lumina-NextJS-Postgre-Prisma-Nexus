import React, { useState, FC } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  DialogActions,
  styled
} from '@mui/material'
import { CloseSharp, Delete, DeleteForeverOutlined } from '@mui/icons-material/'

const PREFIX = 'DeleteAsset'

const classes = {
  root: `${PREFIX}-root`,
  buttonContainer: `${PREFIX}-buttonContainer`,
  dialogContainer: `${PREFIX}-dialogContainer`,
  deleteIcon: `${PREFIX}-deleteIcon`,
  deleteOutlined: `${PREFIX}-deleteOutlined`,
  deleteContained: `${PREFIX}-deleteContained`,
  title: `${PREFIX}-title`,
  closeButton: `${PREFIX}-closeButton`,
  deleteForever: `${PREFIX}-deleteForever`,
  dialogText: `${PREFIX}-dialogText`,
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

  [`& .${classes.dialogText}`]: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.deleteForever}`]: {
    textAlign: 'center',
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

  [`& .${classes.deleteIcon}`]: {
    marginLeft: '10px',
  },
}))

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.buttonContainer}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '15px',
  },

  [`& .${classes.deleteOutlined}`]: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
  },

}))

const DELETE_ASSET = gql`
  mutation deleteAsset($params: CloudinaryAssetDeleteInput!) {
    deleteAsset(params: $params) {
      deleted
    }
  }
`

interface IProps {
  publicId: string
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
}

export const DeleteAsset: FC<IProps> = ({
  publicId,
  setUpdating,
  refetch,
}: IProps) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteAsset, { loading: deleting }] = useMutation(DELETE_ASSET)

  const handleClick = async () => {
    try {
      setLoading(true)
      setUpdating(true)
      await deleteAsset({ variables: { params: { publicId } } })
      await refetch()
      setUpdating(false)
      router.push(router.asPath.split('?')[0])
    } catch (e) {
      throw e
    }
  }

  const promptDelete = () => {
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  return (
    <Root>
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
                  onClick={handleClick}
                >
                  Delete
                </Button>
              </>
            )}
          </DialogActions>
        </div>
      </StyledDialog>
      <div className={classes.buttonContainer}>
        {deleting ? (
          <CircularProgress />
        ) : (
          <Button
            onClick={promptDelete}
            className={classes.deleteOutlined}
            size="large"
            variant="outlined"
            endIcon={<Delete />}
          >
            Delete
          </Button>
        )}
      </div>
    </Root>
  )
}
