import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { Theme } from '@mui/material/styles';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  DialogActions,
} from '@mui/material'
import { CloseSharp, Delete, DeleteForeverOutlined } from '@mui/icons-material'

const PREFIX = 'DeleteFolder';

const classes = {
  buttonContainer: `${PREFIX}-buttonContainer`,
  deleteIcon: `${PREFIX}-deleteIcon`,
  dialogContainer: `${PREFIX}-dialogContainer`,
  deleteOutlined: `${PREFIX}-deleteOutlined`,
  deleteContained: `${PREFIX}-deleteContained`,
  title: `${PREFIX}-title`,
  closeButton: `${PREFIX}-closeButton`,
  deleteForever: `${PREFIX}-deleteForever`,
  dialogText: `${PREFIX}-dialogText`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.buttonContainer}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '15px',
  },

  [`& .${classes.deleteIcon}`]: {
    marginLeft: '10px',
  },

  [`& .${classes.dialogContainer}`]: {
    padding: '3rem',
  },

  [`& .${classes.deleteOutlined}`]: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
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
  }
}));

const DELETE_FOLDER = gql`
  mutation deleteFolder($where: FolderWhereUniqueInput!) {
    deleteOneFolder(where: $where) {
      id
    }
  }
`

export const DeleteFolder = ({
  folderId,
  parentId,
  setUpdating,
}: {
  folderId: number
  parentId?: number
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>
}) => {


  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteAssetFolder, { loading: deleting }] = useMutation(DELETE_FOLDER)
  const parentPath =
    router.asPath.split('/').slice(0, -1).join('/') + '/' + parentId || ''

  const handleClick = async () => {
    try {
      setUpdating(true)
      setLoading(true)
      await deleteAssetFolder({ variables: { where: { id: folderId } } })
      setUpdating(false)
      router.push(parentPath)
    } catch (e) {
      setUpdating(false)
      throw e
    }
  }

  const promptDelete = () => {
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  return (
    <Root>
      <Dialog
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
              size="large">
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
      </Dialog>
      <div className={classes.buttonContainer}>
        {deleting ? (
          <CircularProgress />
        ) : (
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={classes.deleteOutlined}
            onClick={promptDelete}
          >
            Delete Folder
            <Delete className={classes.deleteIcon} />
          </Button>
        )}
      </div>
    </Root>
  );
}
