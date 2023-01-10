import { styled } from '@mui/system'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Grid, Button } from '@mui/material'
import { CloseIcon } from './common'
import { MediaModal } from './MediaModal'
import { useState } from 'react'
import { Asset } from '@lumina/api'
import { Layer } from '@lumina/render/src/Script/Script'
import { AudioPlayer2 } from 'modules/admin/Components/AudioPlayer2'

const Root = styled(Grid)(({ theme }) => ({
  border: `1px solid #D9D9D9`,
  borderRadius: `4px`,
  padding: theme.spacing(2),
  strong: {
    fontWeight: 900,
    fontSize: 16,
  },
}))

interface Props {
  handleAudioSelection: (
    asset: Pick<Asset, 'id' | 'publicId' | 'assetType' | 'url' | 'name'>,
  ) => void
  audioLayer: Layer
}

const AudioPanel = ({ handleAudioSelection, audioLayer }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  return (
    <Root container gap={2}>
      <strong>Audio</strong>
      <MediaModal
        open={dialogOpen}
        setOpen={setDialogOpen}
        assetType="audio"
        onSelect={handleAudioSelection}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            startIcon={<QueueMusicIcon />}
            onClick={() => setDialogOpen(true)}
          >
            Select Audio
          </Button>
        </Grid>
        {audioLayer.id && (
          <>
            <Grid item>
              <AudioPlayer2 src={audioLayer.url!} mode="square" />
            </Grid>
            <Grid item>
              <span>
                {audioLayer.name} (ID {audioLayer.id})
              </span>
            </Grid>
            {/* <Grid item>
              <CloseIcon />
            </Grid> */}
          </>
        )}
      </Grid>
    </Root>
  )
}
export default AudioPanel
