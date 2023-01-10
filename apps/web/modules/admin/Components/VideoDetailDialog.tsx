import React, { useEffect, ReactNode, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Dialog, DialogActions } from '@mui/material'
import { QueryVideoArgs, Video } from '@lumina/api'
import { useQuery, gql } from '@apollo/client'
import { Player } from '@lumina/player'

const PREFIX = 'VideoDetailDialog';

const classes = {
  videoArea: `${PREFIX}-videoArea`,
  notes: `${PREFIX}-notes`,
  errorDiv: `${PREFIX}-errorDiv`
};

const StyledDialog = styled(Dialog)({
  [`& .${classes.videoArea}`]: {
    width: '100%',
    padding: '2px',
  },
  [`& .${classes.notes}`]: {
    width: '100%',
    padding: '0 0.5rem 1rem',
  },
  [`& .${classes.errorDiv}`]: {
    textAlign: 'center',
    marginTop: '4rem',
    marginBottom: '4rem',
  },
});

const GET_READY_QUERY = gql`
  query vid($where: VideoWhereUniqueInput!) {
    video(where: $where) {
      ready
      checkReady
    }
  }
`

type GetReadyQuery = Pick<Video, 'checkReady' | 'ready'>

interface IVideoDetailProps {
  open: boolean
  vimeoId: number
  handleClose: () => void
  notes?: ReactNode
  actions?: ReactNode
  ready: boolean
  updateProgress?: (progress: number) => void
}

export const VideoDetailDialog = ({
  vimeoId,
  open,
  handleClose,
  notes,
  actions,
  ready,
  updateProgress,
}: IVideoDetailProps) => {

  const [loading, setLoading] = useState(true)
  const [isReady, setIsReady] = useState(ready)
  const [progress, setProgress] = useState(0)

  const { data, loading: readyLoading } = useQuery<
    {
      video: GetReadyQuery
    },
    QueryVideoArgs
  >(GET_READY_QUERY, {
    variables: { where: { vimeoId } },
    skip: isReady,
    pollInterval: 30000,
  })

  useEffect(() => {
    if (loading) setLoading(false)
    if (data?.video?.checkReady && isReady === false) {
      setIsReady(true)
    }
  }, [data])

  useEffect(() => {
    if (updateProgress) updateProgress(progress)
  }, [progress])

  return (
    <StyledDialog open={open} maxWidth="md" fullWidth onBackdropClick={handleClose}>
      <Box component="div" className={classes.videoArea}>
        {!isReady && !loading && !readyLoading && (
          <div className={classes.errorDiv}>
            <h2>
              This video is not available at the moment.
              <br />
              <br />
              It is currently encoding, please check back in a few minutes.
              Thanks!
            </h2>
          </div>
        )}
        {vimeoId && isReady && (
          <Box width="100%">
            <Player
              poweredBy={{
                logoSrc: '/Negative@3x.png',
                iconSrc: '/Negative@3xIcon.png',
                href: 'https://www.lumina.co',
              }}
              vimeoId={vimeoId}
              responsive
              getCurrentTime={(progress: number) => setProgress(progress)}
            />
          </Box>
        )}
      </Box>
      {notes && (
        <Box component="div" className={classes.notes}>
          {notes}
        </Box>
      )}
      {actions && <DialogActions>{actions}</DialogActions>}
    </StyledDialog>
  );
}
