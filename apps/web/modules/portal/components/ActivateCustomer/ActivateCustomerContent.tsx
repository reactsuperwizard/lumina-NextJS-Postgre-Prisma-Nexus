import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Button, Typography, Theme } from '@mui/material'
import { useTenant, usePlausible } from 'modules/hooks'
import { EventNames } from 'modules/providers/plausible/Constants'
const PREFIX = 'ActivateCustomerContent'

const classes = {
  actionButton: `${PREFIX}-actionButton`,
  licenseButton: `${PREFIX}-licenseButton`,
  closeButton: `${PREFIX}-closeButton`,
  dialog: `${PREFIX}-dialog`,
  consent: `${PREFIX}-consent`,
  subtitleText: `${PREFIX}-subtitleText`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.actionButton}`]: {
    textTransform: 'capitalize',
    margin: '.70em 0',
    minWidth: '15rem',
  },

  [`& .${classes.licenseButton}`]: {
    backgroundColor: theme.palette.warning.main,
    color: 'white',
    '& span': {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },

  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  [`& .${classes.dialog}`]: {
    borderRadius: 20,
  },

  [`&.${classes.consent}`]: {
    textAlign: 'center',
    padding: '0 2rem 1rem',
  },

  [`& .${classes.subtitleText}`]: {
    maxWidth: '23rem',
    margin: '1rem auto',
  },
}))

interface Props {
  close: () => void
  perVideo?: boolean
}

export const ActivateCustomerContent = ({ close, perVideo }: Props) => {
  const { activateCustomer, name, email } = useTenant()
  const { termsConditionsLink, portalActivated } = usePlausible()

  const trackTermsConditionLink = () => {
    termsConditionsLink(EventNames.TERMS_CONDITIONS_LINK, {
      props: {
        customer: name || '',
        page: location.pathname,
        email: email,
      },
    })
  }

  const trackPortalActivated = () => {
    portalActivated(EventNames.PORTAL_ACTIVATED, {
      props: {
        customer: name || '',
        page: location.pathname,
        email: email,
      },
    })
  }

  return (
    <StyledBox className={classes.consent}>
      <Typography variant="h5">
        I consent to being invoiced $349 {perVideo && 'per video'} and have
        reviewed the{' '}
        <a
          href={`https://lumina-20184043.hs-sites.com/terms-conditions`}
          target="_blank"
          onClick={trackTermsConditionLink}
        >
          terms and conditions
        </a>
        .
      </Typography>
      <Typography variant="subtitle1" className={classes.subtitleText}>
        {!perVideo &&
          'Once purchase is complete you will be able to request revisions or further refinements.'}
      </Typography>
      <Button
        fullWidth
        variant="contained"
        title={perVideo ? 'APPROVE' : 'LICENSE'}
        className={`${classes.actionButton} ${classes.licenseButton}`}
        onClick={() => {
          activateCustomer()
          trackPortalActivated()
          close()
        }}
      >
        {perVideo ? 'Approve' : 'License'}
      </Button>
    </StyledBox>
  )
}
