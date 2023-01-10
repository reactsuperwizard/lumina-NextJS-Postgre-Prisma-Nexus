import { Button, Grid, Typography, Box } from '@mui/material'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import SendIcon from '@mui/icons-material/Send'
import SaveIcon from '@mui/icons-material/Save'
import { useEffect, useState } from 'react'

interface Props {
  onSubmit: () => {}
  handleRender: () => void
  handlePublish: () => void
  lastUpdated: Date
  mode: 'script' | 'master'
}

const StickyFooter = ({
  onSubmit,
  lastUpdated,
  handleRender,
  handlePublish,
  mode,
}: Props) => {
  const [lastUpdatedMinsAgo, setLastUpdatedMinsAgo] = useState<number>()
  const [newLastUpdated, setNewLastUpdated] = useState<Date>(lastUpdated)
  const calculateTimeLapsed = () =>
    setLastUpdatedMinsAgo(
      Math.ceil(
        (new Date().getTime() - new Date(newLastUpdated).getTime()) / 60000,
      ),
    )

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeLapsed()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSave = () => {
    setNewLastUpdated(new Date())
    onSubmit()
  }
  return (
    <Grid
      container
      direction={'row'}
      p={2}
      style={{
        boxShadow: `0px -2px 4px #0000001F`,
        bottom: 0,
        position: 'fixed',
        background: 'white',
        marginLeft: '-2.5rem',
        width: '-webkit-fill-available',
        marginTop: '2.5rem',
      }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box gap={2} display="flex" px={'1rem'}>
        {mode === 'script' ? (
          <>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              onClick={handleRender}
              variant="contained"
              startIcon={<VideoCallIcon />}
            >
              Render
            </Button>
          </>
        ) : (
          <Button
            onClick={handlePublish}
            variant="contained"
            startIcon={<SendIcon />}
          >
            Publish Edits
          </Button>
        )}
      </Box>
      {!Number.isNaN(lastUpdatedMinsAgo) && (
        <Typography fontSize={'0.875rem'}>
          Last saved {lastUpdatedMinsAgo} minutes ago
        </Typography>
      )}
    </Grid>
  )
}

export default StickyFooter
