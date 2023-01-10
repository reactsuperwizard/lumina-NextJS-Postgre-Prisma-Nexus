import { gql, useQuery } from '@apollo/client'
import { TemplateFlavor } from '@lumina/api'
import { Box, CircularProgress, Typography } from '@mui/material'
import { NewVideoDialog } from 'modules/portal/components/NewVideo/NewVideoDialog'
import { useEffect } from 'react'

const TEMPLATES_QUERY = gql`
  query templates {
    flavors
  }
`

export const Templates = () => {
  const { data: templates } = useQuery(TEMPLATES_QUERY)

  return templates?.flavors ? (
    <NewVideoDialog
      open={true}
      close={() => {}}
      stay={true}
      setRequestAdded={() => {}}
      templates={templates.flavors}
      showSkip={true}
      onSkip={() => {}}
      approvedTemplates={Object.keys(templates?.flavors)?.map(
        (ele) => ele as TemplateFlavor,
      )}
      defaultTemplate={undefined}
      requestedTemplates={[]}
      loaded={Boolean(templates)}
      marketingFlow={true}
    />
  ) : (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <CircularProgress />
    </Box>
  )
}
