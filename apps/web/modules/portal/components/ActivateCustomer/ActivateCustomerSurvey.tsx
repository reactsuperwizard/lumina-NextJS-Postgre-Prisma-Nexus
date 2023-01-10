import React, { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  styled,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  useMediaQuery,
} from '@mui/material'
import { useTenant, usePlausible } from 'modules/hooks'
import { EventNames } from 'modules/providers/plausible/Constants'
import { gql, useMutation } from '@apollo/client'
import { Customer, CustomerWhereUniqueInput } from '@lumina/api'

const PREFIX = 'ActivateCustomerSurvey'

const classes = {
  actionButton: `${PREFIX}-actionButton`,
  licenseButton: `${PREFIX}-licenseButton`,
  closeButton: `${PREFIX}-closeButton`,
  dialog: `${PREFIX}-dialog`,
  subtitleText: `${PREFIX}-subtitleText`,
  formContainer: `${PREFIX}-formContainer`,
  mobileFormContainer: `${PREFIX}-mobileFormContainer`,
  headerText: `${PREFIX}-headerText`,
  mobileHeaderText: `${PREFIX}-mobileHeaderText`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: '0 2rem 1rem',
  [`& .${classes.actionButton}`]: {
    textTransform: 'capitalize',
    margin: '.70em 0',
    maxWidth: '12rem',
  },

  [`& .${classes.licenseButton}`]: {
    backgroundColor: '#ff9800',
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#e58231',
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

  [`& .${classes.subtitleText}`]: {
    maxWidth: '28rem',
    margin: '1rem auto',
  },

  [`& .${classes.formContainer}`]: {
    margin: '1.2rem 2.5rem',
  },

  [`& .${classes.mobileFormContainer}`]: {
    margin: '1.2rem 0',
  },

  [`& .${classes.headerText}`]: {
    fontWeight: 600,
  },

  [`& .${classes.mobileHeaderText}`]: {
    fontSize: '1.1rem',
    fontWeight: 600,
  },
}))

interface Props {
  close: () => void
  perVideo?: boolean
}

const SEND_SURVEY = gql`
  mutation sendSurvey(
    $where: CustomerWhereUniqueInput!
    $brandReflection: String!
    $compelling: String!
    $attractTalent: String!
    $comments: String!
  ) {
    customer: sendSurveyData(
      where: $where
      brandReflection: $brandReflection
      compelling: $compelling
      attractTalent: $attractTalent
      comments: $comments
    ) {
      id
    }
  }
`
interface SendSurveyMutationInput {
  where: CustomerWhereUniqueInput
  brandReflection: string
  compelling: string
  attractTalent: string
  comments: string
}

export const ActivateCustomerSurvey = ({ close, perVideo }: Props) => {
  const { activateCustomer, name, email, tenant } = useTenant()
  const { termsConditionsLink, portalActivated } = usePlausible()

  const sm = useMediaQuery('(max-width:959px)')
  const [question1Input, setQuestion1Input] = useState<string | null>(null)
  const [question2Input, setQuestion2Input] = useState<string | null>(null)
  const [question3Input, setQuestion3Input] = useState<string | null>(null)
  const [questionCommentInput, setQuestionCommentInput] = useState('')
  const [requiredField, setRequiredField] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sendSurveyData] = useMutation<
    { customer: Pick<Customer, 'id'> },
    SendSurveyMutationInput
  >(SEND_SURVEY)

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

  const handleSurveySubmit = () => {
    if (
      question1Input !== null &&
      question2Input !== null &&
      question3Input !== null
    ) {
      setSubmitted(true)
      activateCustomer()
      trackPortalActivated()
      sendSurveyData({
        variables: {
          where: { tenant },
          brandReflection: question1Input,
          compelling: question2Input,
          attractTalent: question3Input,
          comments: questionCommentInput,
        },
      })
      setRequiredField(false)
    } else {
      setRequiredField(true)
    }
  }

  return (
    <StyledBox>
      {!submitted ? (
        <>
          <Typography
            className={`${sm ? classes.mobileHeaderText : classes.headerText}`}
            variant="h5"
          >
            Answer these questions to UNLOCK your video!
          </Typography>
          <FormControl
            required
            error={requiredField}
            className={`${
              sm ? classes.mobileFormContainer : classes.formContainer
            }`}
            component="fieldset"
          >
            <FormLabel component="legend">
              Did the video accurately reflect your brand?
            </FormLabel>
            <RadioGroup
              className={classes.subtitleText}
              row
              aria-label="brand-aligned"
              name="question1-row-radio-buttons-group"
              onChange={(e) => setQuestion1Input(e.target.value)}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>
            <FormLabel>
              Is the video job posting more compelling than the original
              text-only version?
            </FormLabel>
            <RadioGroup
              className={classes.subtitleText}
              row
              aria-label="engaging"
              name="question2-row-radio-buttons-group"
              onChange={(e) => setQuestion2Input(e.target.value)}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>
            <FormLabel component="legend">
              Do you feel confident in your team’s ability to leverage this type
              of video to attract talent?
            </FormLabel>
            <RadioGroup
              className={classes.subtitleText}
              row
              aria-label="attract talent"
              name="question3-row-radio-buttons-group"
              onChange={(e) => setQuestion3Input(e.target.value)}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>
            <TextField
              id="outlined-multiline-static"
              label="Comments / Questions"
              multiline
              helperText="Optional"
              variant="filled"
              onChange={(e) => setQuestionCommentInput(e.target.value)}
            />
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            title="SUBMIT"
            type="submit"
            className={`${classes.actionButton} ${classes.licenseButton}`}
            onClick={() => {
              handleSurveySubmit()
            }}
          >
            Submit
          </Button>
        </>
      ) : (
        <>
          <Typography className={classes.headerText} variant="h5">
            Hooray! You've earned a FREE 30-day license.
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitleText}>
            To learn how to leverage your video job posting, request edits, or
            see our pricing plan:{' '}
            <a
              href={`https://www.lumina.co/schedule-a-demo`}
              target="_blank"
              onClick={trackTermsConditionLink}
            >
              click here
            </a>
            .
          </Typography>
          <Button
            fullWidth
            variant="contained"
            className={`${classes.actionButton} ${classes.licenseButton}`}
            onClick={() => {
              close()
            }}
          >
            OK!
          </Button>
        </>
      )}
    </StyledBox>
  )
}
