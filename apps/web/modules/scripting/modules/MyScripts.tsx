import { ApolloError } from '@apollo/client'
import { RequestStatus } from '@lumina/api'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { MY_SCRIPTS_TAB } from './constants'
import { ScriptQuery } from './dashboard'
import { ScriptingCard } from './ScriptingCard'

interface Props {
  scriptQueueData: ScriptQuery[]
  loading: boolean
  error?: ApolloError
  scriptRefetch: () => void
  requestRefetch: () => void
}

export const MyScripts = ({
  scriptQueueData,
  loading,
  error,
  scriptRefetch,
  requestRefetch,
}: Props) => {
  const [qaScripts, setQAScripts] = useState<ScriptQuery[]>([])
  const [scriptingScripts, setScriptingScripts] = useState<ScriptQuery[]>([])
  const [renderingScripts, setRenderingScripts] = useState<ScriptQuery[]>([])

  useEffect(() => {
    const qa: ScriptQuery[] = []
    const rendering: ScriptQuery[] = []
    const scripting: ScriptQuery[] = []
    scriptQueueData?.forEach((script) => {
      if (script.request.status == RequestStatus.Scripting) {
        scripting.push(script)
      } else if (script.request.status == RequestStatus.Qa) {
        qa.push(script)
      } else if (
        script.request.status == RequestStatus.Rendering ||
        script.request.status == RequestStatus.Queued
      ) {
        rendering.push(script)
      }
    })

    setQAScripts(qa)
    setRenderingScripts(rendering)
    setScriptingScripts(scripting)
  }, [scriptQueueData])

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
          {qaScripts.length > 0 && (
            <>
              <Typography
                fontWeight={'bold'}
                pt={'1rem'}
                pb={'0.5rem'}
                fontSize={'0.875rem'}
              >
                QA ({qaScripts.length})
              </Typography>
              {qaScripts.map((script) => (
                <ScriptingCard
                  id={script.request.id}
                  scriptId={script.id}
                  vimeoId={script.video?.vimeoId}
                  key={script.request.id}
                  createdAt={new Date(script.request.createdAt)}
                  customerName={script.request.customer.name}
                  customerId={script.request.customer.id}
                  title={script.request.jobTitle!}
                  bonusPrice={script.request.bonusPrice!}
                  bonusDeadline={new Date(script.request.bonusDeadline)}
                  basePrice={script.request.basePrice!}
                  template={script.request.template!}
                  specialInstructions={script.request.notes!}
                  logs={script.request.logs}
                  status={script.request.status}
                  videoCreationDate={script.video?.createdAt}
                  tab={MY_SCRIPTS_TAB}
                  scriptRefetch={scriptRefetch}
                  requestRefetch={requestRefetch}
                />
              ))}
            </>
          )}
          {scriptingScripts.length > 0 && (
            <>
              <Typography
                fontWeight={'bold'}
                pt={'1rem'}
                pb={'0.5rem'}
                fontSize={'0.875rem'}
              >
                SCRIPTING ({scriptingScripts.length})
              </Typography>
              {scriptingScripts.map((script) => (
                <ScriptingCard
                  id={script.request.id}
                  scriptId={script.id}
                  vimeoId={script.video?.vimeoId}
                  key={script.request.id}
                  createdAt={new Date(script.request.createdAt)}
                  customerName={script.request.customer.name}
                  customerId={script.request.customer.id}
                  title={script.request.jobTitle!}
                  bonusPrice={script.request.bonusPrice!}
                  bonusDeadline={new Date(script.request.bonusDeadline)}
                  basePrice={script.request.basePrice!}
                  template={script.request.template!}
                  specialInstructions={script.request.notes!}
                  logs={script.request.logs}
                  status={script.request.status}
                  tab={MY_SCRIPTS_TAB}
                  scriptRefetch={scriptRefetch}
                  requestRefetch={requestRefetch}
                />
              ))}
            </>
          )}
          {renderingScripts.length > 0 && (
            <>
              <Typography
                fontWeight={'bold'}
                pt={'1rem'}
                pb={'0.5rem'}
                fontSize={'0.875rem'}
              >
                RENDERING ({renderingScripts.length})
              </Typography>
              {renderingScripts.map((script) => (
                <ScriptingCard
                  id={script.request.id}
                  scriptId={script.id}
                  vimeoId={script.video?.vimeoId}
                  key={script.request.id}
                  createdAt={new Date(script.request.createdAt)}
                  customerName={script.request.customer.name}
                  customerId={script.request.customer.id}
                  title={script.request.jobTitle!}
                  bonusPrice={script.request.bonusPrice!}
                  bonusDeadline={new Date(script.request.bonusDeadline)}
                  basePrice={script.request.basePrice!}
                  template={script.request.template!}
                  specialInstructions={script.request.notes!}
                  logs={script.request.logs}
                  status={script.request.status}
                  tab={MY_SCRIPTS_TAB}
                  scriptRefetch={scriptRefetch}
                  requestRefetch={requestRefetch}
                />
              ))}
            </>
          )}
        </>
      )}
    </>
  )
}
