import React from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Grid, Link, TextField } from '@mui/material'
import { Skeleton } from '@mui/material';
import {
  LuminaAutocomplete,
  QueryField,
  ReturnField,
} from 'modules/admin/Components'
import { LiveField } from 'modules/utils'
import { GetScriptQuery } from '../../queries/GET_SCRIPT'

interface Props {
  data:
    | {
        script: GetScriptQuery
      }
    | undefined
  scriptId: string
  connectProducer: (id: number) => void
  aeNames: boolean
  toggleAE: () => void
  validate: () => void
}

export const ScriptDetails = ({
  data,
  scriptId,
  connectProducer,
  aeNames,
  toggleAE,
  validate,
}: Props) => {
  const router = useRouter()

  return (
    <Box px={4}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12}>
          <Box>
            <LiveField
              label="Script Name"
              resource="Script"
              where={{ id: +scriptId }}
              defaultValue={data?.script?.name || ''}
              field="name"
              debounceTime={300}
              dense
            />
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box>
            {data?.script ? (
              <LuminaAutocomplete
                label="Script Producer Email"
                getOptionLabel="email"
                resourceName="User"
                fieldName="email"
                queryFields={[QueryField.email]}
                returnFields={[ReturnField.id, ReturnField.email]}
                source="user.id"
                initValue={data.script.producer}
                parse={(v: any) => {
                  return v.id
                }}
                onChange={(value: any) =>
                  value?.id ? connectProducer(value.id) : null
                }
                customWhereFilter={{
                  customers: { some: { tenant: { equals: 'lumina' } } },
                }}
                fullWidth
              />
            ) : (
              <Skeleton variant="text" />
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            {data?.script?.flavor ? (
              <TextField
                variant="outlined"
                defaultValue={data.script.flavor}
                label="Template Flavor"
                disabled
                fullWidth
                size="small"
              />
            ) : (
              <Skeleton variant="text" />
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            {data?.script?.createdAt ? (
              <TextField
                variant="outlined"
                label="Created At"
                value={data.script.createdAt || ''}
                disabled
                fullWidth
                size="small"
              />
            ) : (
              <Skeleton variant="text" />
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            {data?.script?.updatedAt ? (
              <TextField
                variant="outlined"
                label="Updated At"
                value={data.script.updatedAt || ''}
                disabled
                fullWidth
                size="small"
              />
            ) : (
              <Skeleton variant="text" />
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <TextField
              variant="outlined"
              label="Customer Special Instructions:"
              value={data?.script?.request?.message || 'none'}
              disabled
              fullWidth
              multiline
              size="small"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <TextField
              variant="outlined"
              label="Internal Notes:"
              value={data?.script?.request?.notes || 'none'}
              disabled
              fullWidth
              multiline
              size="small"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <>
              Job Description Link:
              {data?.script?.request?.url && (
                <Link
                  onClick={() =>
                    window.open(`${data.script.request.url}`, '_blank')
                  }
                >
                  {`  ${data.script.request.url}`}
                </Link>
              )}
            </>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            {data?.script?.request?.id && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() =>
                  router.push(
                    `/admin/production?request=${data.script.request.id}`,
                  )
                }
              >
                View in Production
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={toggleAE}
            >
              {aeNames ? 'Hide' : 'Show'} layer names
            </Button>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={validate}
            >
              Check Script
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
