import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  Button,
  Paper,
  Box,
  Typography,
  CircularProgress,
  TextField,
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { QueryPlatformArgs, Platform } from '@lumina/api'

const PREFIX = 'NewPlatform';

const classes = {
  formBox: `${PREFIX}-formBox`,
  findRequest: `${PREFIX}-findRequest`,
  saveButton: `${PREFIX}-saveButton`,
  platformFormInput: `${PREFIX}-platformFormInput`,
  platformFormSelectLabel: `${PREFIX}-platformFormSelectLabel`
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
  [`& .${classes.platformFormInput}`]: { margin: '1.5rem 0 1.5rem', width: 300, display: 'block' },
  [`& .${classes.platformFormSelectLabel}`]: { marginTop: '1.5rem', display: 'block' },
});

const CREATE_PLATFORM = gql`
  mutation createOnePlatform($data: PlatformCreateInput!) {
    platform: createOnePlatform(data: $data) {
      id
    }
  }
`

export const NewPlatform = () => {

  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')


  const [addPlatform] = useMutation<{ platform: Pick<Platform, 'id'> }>(CREATE_PLATFORM)

  const createPlatform = async () => {
    if (!name) return
    setCreating(true)
    const result = await addPlatform({
      variables: {
        data: {
          name,
        },
      },
    })
    setCreating(false)
    const newId = result.data?.platform?.id
    router.push(`./${newId}`)
  }


  return (
    (<Root>
      <Paper>
        <Box className={classes.formBox}>
          <Typography variant="h4">Create Platform</Typography>
          <TextField
            variant="outlined"
            className={classes.platformFormInput}
            margin="dense"
            color="primary"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
          />
          {creating ? (
            <CircularProgress />
          ) : (
            <Button
              className={classes.saveButton}
              disabled={!name}
              variant="contained"
              color="secondary"
              startIcon={<Save />}
              onClick={createPlatform}
            >
              Save
            </Button>
          )}
        </Box>
      </Paper>
    </Root>)
  );
}
