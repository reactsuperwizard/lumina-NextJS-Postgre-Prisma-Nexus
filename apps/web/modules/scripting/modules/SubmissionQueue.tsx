import { ApolloError } from '@apollo/client'
import { RequestLog, User } from '@lumina/api'
import { Box, CircularProgress, Typography } from '@mui/material'
import { SUBMISSION_QUEUE_TAB } from './constants'
import { SubmissionQueueQuery } from './dashboard'
import { ScriptingCard } from './ScriptingCard'

interface Props {
  submissionQueueData: SubmissionQueueQuery[]
  loading: boolean
  error?: ApolloError
}
export const SubmissionQueue = ({
  submissionQueueData,
  loading,
  error,
}: Props) => {
  return (
    <>
      {error && (
        <Box sx={{ width: '100%', textAlign: 'center', paddingTop: '2rem' }}>
          <Typography>Something went wrong!</Typography>
        </Box>
      )}
      {loading ? (
        <Box sx={{ width: '100%', textAlign: 'center', paddingTop: '2rem' }}>
          <CircularProgress size={'2rem'} />
        </Box>
      ) : (
        <>
          {submissionQueueData?.map((request) => (
            <ScriptingCard
              id={request.id}
              key={request.id}
              createdAt={new Date(request.createdAt)}
              customerName={request.customer.name}
              customerId={request.customer.id}
              title={request.jobTitle!}
              bonusPrice={request.bonusPrice!}
              bonusDeadline={new Date(request.bonusDeadline)}
              basePrice={request.basePrice!}
              template={request.template!}
              specialInstructions={request.notes!}
              logs={[...request.logs].sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )}
              status={request.status}
              tab={SUBMISSION_QUEUE_TAB}
            />
          ))}
        </>
      )}
    </>
  )
}
