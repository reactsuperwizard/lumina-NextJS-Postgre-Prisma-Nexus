import { gql, useQuery } from '@apollo/client'
import { TemplateFlavor } from '@lumina/api'
import { CircularProgress } from '@material-ui/core'
import { Box, styled, Typography } from '@mui/material'
import { useTenant, useUser } from 'modules/hooks'
import { NewVideoDialog } from 'modules/portal/components/NewVideo/NewVideoDialog'
import { ApprovedTemplates, DefaultTemplate } from 'modules/utils/constants'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Background } from '../../public/background'
import { Tutorial } from './tutorial'

const PREFIX = 'FreeRequest'

const classes = {
  box: `${PREFIX}-box`,
  title: `${PREFIX}-title`,
  subtitle: `${PREFIX}-subtitle`,
}
const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.box}`]: {
    backgroundColor: '#fff',
    padding: '1rem',
    width: '45%',
    borderRadius: '1rem',
  },
  [`& .${classes.title}`]: {
    fontWeight: 'bold',
    fontSize: '1.6rem',
    padding: '1.5rem',
  },
  [`& .${classes.subtitle}`]: {
    fontSize: '0.9rem',
    padding: '0 1.5rem 1rem 1.5rem',
    color: theme.palette.grey[50],
  },
}))

const TEMPLATES_QUERY = gql`
  query templates {
    flavors
  }
`
export const FreeRequest = () => {
  const router = useRouter()
  const [requestAdded, setRequestAdded] = useState(0)
  const { hasFreeRequest, freeRequestId, loading, isApproved } = useUser()
  const { isPaid, loading: tenantLoading } = useTenant()
  const { data: templates } = useQuery(TEMPLATES_QUERY)
  const [step, setStep] = useState(0)
  const redirectToDashboard = () => {
    const slug = router.query?.portal
    router.replace(`/${slug}/videos`)
  }

  useEffect(() => {
    if (tenantLoading) return
    if (!router.isReady || loading) return
    if (
      (!isApproved && isPaid) ||
      (hasFreeRequest && freeRequestId) ||
      !hasFreeRequest
    ) {
      if (requestAdded) return
      redirectToDashboard()
    }
  }, [router.isReady, loading, isPaid, tenantLoading])

  useEffect(() => {
    if (!requestAdded) return
    setStep(1)
  }, [requestAdded])

  const handleStepChange = (step: number) => {
    if (step == 1) {
      redirectToDashboard()
    } else setStep(10)
  }

  return (
    <Background>
      {(!tenantLoading &&
        hasFreeRequest &&
        !freeRequestId &&
        templates?.flavors) ||
      requestAdded ? (
        step == 1 || step == 0 ? (
          <Tutorial stage={step} handleStepChange={handleStepChange} />
        ) : (
          // <StyledBox className={classes.box}>
          //   <Typography variant="h5" className={classes.title}>
          //     Request Your Free Job Ad
          //   </Typography>
          //   <Typography className={classes.subtitle} variant="subtitle1">
          //     Welcome to Lumina!
          //   </Typography>
          // {templates?.flavorsMultiple && (
          <NewVideoDialog
            open={true}
            close={redirectToDashboard}
            stay={true}
            setRequestAdded={setRequestAdded}
            templates={templates.flavors}
            showSkip={true}
            onSkip={redirectToDashboard}
            approvedTemplates={Object.keys(templates?.flavors)?.map(
              (ele) => ele as TemplateFlavor,
            )}
            defaultTemplate={undefined}
            requestedTemplates={[]}
            loaded={Boolean(templates)}
            marketingFlow={false}
          />
          // )}
          // </StyledBox>
        )
      ) : (
        <Box>
          <CircularProgress />
        </Box>
      )}
    </Background>
  )
}
