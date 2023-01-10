import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import {
  Button,
  Paper,
  Box,
  Typography,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { FindScriptById, GetScriptQuery } from '../Components/ResourceById'
import { Video, VideoStatus } from '@lumina/api'

const PREFIX = 'NewVideo';

const classes = {
  formBox: `${PREFIX}-formBox`,
  findScript: `${PREFIX}-findScript`,
  saveButton: `${PREFIX}-saveButton`,
  videoFormInput: `${PREFIX}-videoFormInput`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.formBox}`]: {
    padding: '1.5rem',
  },
  [`& .${classes.findScript}`]: {
    margin: '1.5rem 0 0.5rem',
  },
  [`& .${classes.saveButton}`]: {
    marginTop: '1.5rem',
  },
  [`& .${classes.videoFormInput}`]: { margin: '1.5rem 0 1.5rem', width: 300, display: 'block' },
});

const CREATE_VIDEO = gql`
  mutation createVideo($data: VideoCreateInput!) {
    video: createVideo(data: $data) {
      id
    }
  }
`

export const NewVideo = () => {

  const router = useRouter()
  const [script, setScript] = useState<GetScriptQuery | null>(null)
  const [creating, setCreating] = useState(false)
  const [vimeoId, setVimeoId] = useState('')
  const [status, setStatus] = useState(VideoStatus.Pending)
  const [addVideo] = useMutation<{ video: Pick<Video, 'id'> }>(CREATE_VIDEO)

  const createVideo = async () => {
    if (!script) return
    setCreating(true)
    const data = {
      status,
      script: { connect: { id: script.id } },
      order: { connect: { id: script.order.id } },
      request: { connect: { id: script.request.id } },
      customer: { connect: { id: script.order.customer.id } },
      vimeoId: parseInt(vimeoId) || null,
    }
    const result = await addVideo({ variables: { data } })
    setCreating(false)
    const newId = result.data?.video?.id
    router.push(`./${newId}`)
  }

  return (
    (<Root>
      <Paper>
        <Box className={classes.formBox}>
          <Typography variant="h4">Create Video</Typography>
          <TextField
            variant="outlined"
            className={classes.videoFormInput}
            margin="dense"
            color="primary"
            type="number"
            fullWidth
            value={vimeoId}
            onChange={(e) => setVimeoId(e.target.value)}
            label="Vimeo Id"
          />
          <InputLabel id="video-status">Status</InputLabel>
          <Select
            labelId="video-status"
            id="video-status-select"
            value={status}
            style={{ width: '300px' }}
            margin="dense"
            variant="outlined"
            onChange={(e) =>
              setStatus(
                e.target.value === VideoStatus.Live
                  ? VideoStatus.Live
                  : VideoStatus.Pending,
              )
            }
          >
            <MenuItem value={VideoStatus.Live}>Live</MenuItem>
            <MenuItem value={VideoStatus.Pending}>Pending</MenuItem>
          </Select>
          <div className={classes.findScript}>
            <FindScriptById script={script} setScript={setScript} />
          </div>
          {creating ? (
            <CircularProgress />
          ) : (
            <Button
              className={classes.saveButton}
              disabled={script === null || !script.order?.id}
              variant="contained"
              color="secondary"
              startIcon={<Save />}
              onClick={createVideo}
            >
              Save
            </Button>
          )}
        </Box>
      </Paper>
    </Root>)
  );
}
