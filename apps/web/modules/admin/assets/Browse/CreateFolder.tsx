import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useMutation, gql } from '@apollo/client'
import { Theme } from '@mui/material/styles'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import { Folder, FolderCreateInput, QueryFolderArgs } from '@lumina/api'

const PREFIX = 'CreateFolder'

const classes = {
  root: `${PREFIX}-root`,
  buttonContainer: `${PREFIX}-buttonContainer`,
  folderIcon: `${PREFIX}-folderIcon`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  [`&.${classes.buttonContainer}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '15px',
  },

  [`& .${classes.folderIcon}`]: {
    marginLeft: '10px',
  },
}))

interface ICreateFolderDialog {
  open: boolean
  onClose: () => void
  handleCreate: (name: string) => Promise<void>
}

const CreateFolderDialog = (props: ICreateFolderDialog) => {
  const [name, setName] = useState('')
  const handleClick = (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (name !== '') {
      props.handleCreate(name)
      setName('')
    }
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Folder Name</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="folder-name"
          label="Folder Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          // helperText="Folder names can't have spaces. :-)"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClick} color="primary">
          Create Folder
        </Button>
      </DialogActions>
    </Dialog>
  )
}
const CREATE_FOLDER = gql`
  mutation createOneFolder($data: FolderCreateInput!) {
    folder: createOneFolder(data: $data) {
      id
      name
    }
  }
`

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const CreateFolder = ({
  parentId,
  refetchFolders,
  setUpdating,
}: {
  parentId: number
  refetchFolders: (variables?: Partial<QueryFolderArgs> | undefined) => void
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [open, setOpen] = useState(false)

  const [createFolder] = useMutation<
    { folder: Pick<Folder, 'id' | 'name'> },
    { data: FolderCreateInput }
  >(CREATE_FOLDER)

  const handleCreate = async (name: string) => {
    try {
      setUpdating(true)
      await createFolder({
        variables: { data: { name, parent: { connect: { id: parentId } } } },
      })
      setOpen(false)
      await refetchFolders()
      setUpdating(false)
    } catch (e) {
      setUpdating(false)
      throw e
    }
  }

  return (
    <Root className={classes.buttonContainer}>
      <CreateFolderDialog
        handleCreate={handleCreate}
        open={open}
        onClose={() => setOpen(false)}
      />
      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        size="large"
        color="primary"
      >
        Create Folder
        <CreateNewFolderIcon className={classes.folderIcon} />
      </Button>
    </Root>
  )
}
