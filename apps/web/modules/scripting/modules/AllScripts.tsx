import { ApolloError } from '@apollo/client'
import { RequestStatus } from '@lumina/api'
import {
  Box,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { ALL_SCRIPTS_TAB } from './constants'
import { CustomerQuery, ScriptQuery } from './dashboard'
import { ScriptingCard } from './ScriptingCard'

interface Props {
  scriptQueueData: ScriptQuery[]
  loading: boolean
  error?: ApolloError
  users: CustomerQuery['users']
}

export const AllScripts = ({
  scriptQueueData,
  loading,
  error,
  users,
}: Props) => {
  const [qaScripts, setQAScripts] = useState<ScriptQuery[]>([])
  const [scriptingScripts, setScriptingScripts] = useState<ScriptQuery[]>([])
  const [renderingScripts, setRenderingScripts] = useState<ScriptQuery[]>([])
  const [statusFilter, setStatusFilter] = useState<RequestStatus[]>([])
  const [nameFilter, setNameFilter] = useState<string>()
  const [scripts, setScripts] = useState(scriptQueueData)
  useEffect(() => {
    const qa: ScriptQuery[] = []
    const rendering: ScriptQuery[] = []
    const scripting: ScriptQuery[] = []

    scripts.forEach((script) => {
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
  }, [scripts])

  useEffect(() => {
    const result = scriptQueueData
      .filter((script) =>
        nameFilter ? script.producer.email === nameFilter : true,
      )
      .filter((script) =>
        statusFilter.length > 0
          ? statusFilter.includes(script.request.status)
          : true,
      )
    setScripts(result)
  }, [nameFilter, statusFilter])

  const handleChange = (event: SelectChangeEvent<RequestStatus[]>) => {
    const status = event.target.value as RequestStatus[]
    setStatusFilter(status)
  }
  const handleNameChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.value as string
    setNameFilter(name)
  }

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
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormControl sx={{ flex: 1, margin: '1rem 0' }}>
              <InputLabel id="filter-by-owner">Filter By Owner</InputLabel>
              <Select
                id="filter-by-owner"
                label="Filter By Owner"
                onChange={handleNameChange}
              >
                <MenuItem key="None" value={''}>
                  None
                </MenuItem>

                {users.map((user) => (
                  <MenuItem key={user.email} value={user.email}>
                    {user.firstName} {user.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ flex: 1, margin: '1rem 0', marginLeft: '1rem' }}>
              <InputLabel id="filter-by-status">Filter By Status</InputLabel>
              <Select
                labelId="filter-by-status"
                id="filter-by-status"
                label="Filter By Status"
                multiple
                value={statusFilter}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected: RequestStatus[]) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value.toUpperCase()} />
                    ))}
                  </Box>
                )}
              >
                <MenuItem key={RequestStatus.Qa} value={RequestStatus.Qa}>
                  {RequestStatus.Qa.toUpperCase()}
                </MenuItem>
                <MenuItem
                  key={RequestStatus.Rendering}
                  value={RequestStatus.Rendering}
                >
                  {RequestStatus.Rendering.toUpperCase()}
                </MenuItem>
                <MenuItem
                  key={RequestStatus.Scripting}
                  value={RequestStatus.Scripting}
                >
                  {RequestStatus.Scripting.toUpperCase()}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
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
                  tab={ALL_SCRIPTS_TAB}
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
                  tab={ALL_SCRIPTS_TAB}
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
                  tab={ALL_SCRIPTS_TAB}
                />
              ))}
            </>
          )}
        </>
      )}
    </>
  )
}
