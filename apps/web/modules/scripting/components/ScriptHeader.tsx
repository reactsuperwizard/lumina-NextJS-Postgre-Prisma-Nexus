import { useRouter } from 'next/router'
import { Grid, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HistoryIcon from '@mui/icons-material/History'
import { ReturnToSubmissionQueueDialog } from '../modules/ReturnToSubmissionQueueDialog'
import { useState } from 'react'
import { RequestStatus } from '@lumina/api'

const ScriptHeader = ({
  mode,
  title,
  subtitle,
  requestId,
  status,
}: {
  mode: 'script' | 'master'
  title: string
  subtitle: string
  requestId?: number
  status: RequestStatus
}) => {
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState(false)
  return (
    <Grid container spacing={2} alignItems="center">
      {openDialog && (
        <ReturnToSubmissionQueueDialog
          id={requestId!}
          open={openDialog}
          setOpen={setOpenDialog}
          onClose={() => setOpenDialog(false)}
          scriptRefetch={() => {}}
          requestRefetch={() => {}}
        />
      )}
      <Grid item>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
        >
          Back
        </Button>
      </Grid>
      <Grid item fontSize={34} fontWeight={900}>
        {/* <span>Script #{script.id}</span> */}
        <span>{title}</span>
      </Grid>
      <Grid item ml={2} mr={'auto'} fontSize={20}>
        {subtitle}
        {/* Request #{script.request.id} */}
      </Grid>
      {mode == 'script' && status === RequestStatus.Scripting && (
        <Grid item>
          <Button
            variant="text"
            startIcon={<HistoryIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Return Script to Submission Queue
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default ScriptHeader
