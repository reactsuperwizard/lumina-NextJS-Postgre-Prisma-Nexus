import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  TextField,
  Box,
  Button,
  Typography,
  Autocomplete,
  createFilterOptions,
} from '@mui/material'
import { TemplateDetails } from './interface'
import { useTenant } from 'modules/hooks'
import { gql, useLazyQuery } from '@apollo/client'
import { CustomerQuery } from 'modules/signup/setupCustomer'
const PREFIX = 'NewRequestContent'

const classes = {
  tableBox: `${PREFIX}-tableBox`,
  orderNameInput: `${PREFIX}-orderNameInput`,
  inputField: `${PREFIX}-inputField`,
  buttonWrap: `${PREFIX}-buttonWrap`,
  button: `${PREFIX}-button`,
  cancelButton: `${PREFIX}-cancelButton`,
  container: `${PREFIX}-container`,
  imageBox: `${PREFIX}-imageBox`,
}
const CUSTOMERS_QUERY = gql`
  query Customers($where: CustomerWhereInput) {
    customers(where: $where) {
      name
      tenant
      isPaid
    }
  }
`
const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.orderNameInput}`]: {
    margin: '1.5rem 0 2rem',
  },

  [`& .${classes.buttonWrap}`]: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: '2rem',
  },

  [`& .${classes.button}`]: {
    textTransform: 'none',
    backgroundColor: theme.palette.primary.light,
    marginLeft: '1rem',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  [`& .${classes.cancelButton}`]: {
    textTransform: 'none',
    borderColor: theme.palette.primary.light,
    color: theme.palette.primary.light,
    marginLeft: '1rem',
    backgroundColor: '#fff',
    border: '1px solid',
    paddingRight: '2rem',
    paddingLeft: '2rem',
    '&:hover': {
      backgroundColor: '#fff',
      border: '1px solid',
    },
  },
  [`& .${classes.container}`]: {
    display: 'flex',
    // flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  [`& .${classes.tableBox}`]: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  [`& .${classes.imageBox}`]: {
    height: 133,
    margin: 0,
    padding: 0,
  },
}))

interface FilterQuery {
  label: string
  tenant?: string
}

export const NewRequestContent = (props: {
  submit: (props: {
    jobTitle: string
    url: string
    message: string
    customerName?: string
    tenant?: string
  }) => Promise<boolean>
  template: TemplateDetails | null
  showSkip?: boolean
  onSkip?: () => void
  marketingFlow: boolean
}) => {
  const filter = createFilterOptions<FilterQuery>()
  const [getCustomers] =
    useLazyQuery<{ customers: CustomerQuery[] }>(CUSTOMERS_QUERY)
  const [customers, setCustomers] = useState<FilterQuery[]>([])
  const { submit, template, showSkip, onSkip, marketingFlow } = props
  const [jobTitle, setJobTitle] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [tenant, setTenant] = useState<string | undefined>('')
  const [name, setName] = useState<string | undefined>('')
  const [firstRender, setFirstRender] = useState(true)
  const [validTitle, setValidTitle] = useState(true)
  const [validUrl, setValidUrl] = useState(true)
  const [validCompany, setValidCompany] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const { isPaid } = useTenant()
  const cancelEdit = () => {
    setJobTitle('')
    setUrl('')
    setMessage('')
  }

  const fetchData = async (name: string) => {
    const data = await getCustomers({
      variables: {
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        orderBy: [
          {
            name: 'asc',
          },
        ],
      },
    })
    const filterCustomers: FilterQuery[] = []
    for (let i = 0; i < data.data?.customers?.length!; i++) {
      filterCustomers.push({
        tenant: data.data?.customers[i].tenant,
        label: data.data?.customers[i].name!,
      })
    }
    setCustomers(filterCustomers)
  }

  useEffect(() => {
    const getInitialCustomers = async () => {
      await fetchData('a')
    }
    getInitialCustomers()
  }, [])

  useEffect(() => {
    validateCompany()
  }, [name])

  const validateJobTitle = () => {
    setValidTitle(jobTitle.trim().length > 0)
  }
  const validateUrl = () => setValidUrl(url.trim().length > 0)
  const validateCompany = () => {
    const isValid = Boolean(name)
    setValidCompany(isValid)
  }

  const isOrgFieldValid = () => {
    if (submitted) return !validCompany
    else return !validCompany && !firstRender
  }
  return (
    <StyledBox>
      {/* <Typography
        variant="subtitle1"
        sx={{ fontSize: '0.9rem', color: '#333333', paddingLeft: '1rem' }}
      >
        All fields are required unless otherwise stated.
      </Typography> */}
      <Box className={classes.container}>
        {template?.id && (
          <Box sx={{ width: '40%', margin: '1rem', marginRight: 0 }}>
            <Box
              component="img"
              className={classes.imageBox}
              alt={template?.name}
              src={template?.imageUrl}
            ></Box>
            <Typography fontWeight="bold">{template?.name}</Typography>
          </Box>
        )}
        <Box className={classes.tableBox}>
          <>
            <TextField
              value={jobTitle}
              inputProps={{
                autoComplete: 'off',
              }}
              onChange={(e) => {
                if (!validTitle) validateJobTitle()
                setJobTitle(e.target.value)
              }}
              onBlur={() => validateJobTitle()}
              variant="outlined"
              margin="dense"
              required
              error={!validTitle}
              // helperText="This will also be the name of the video in your dashboard"
              id="newRequestJobTitle"
              name="jobTitle"
              label="Job Title"
              fullWidth
              autoFocus={!marketingFlow}
              sx={{ marginBottom: '1rem' }}
            />
          </>
          <>
            <TextField
              value={url}
              onChange={(e) => {
                if (!validUrl) validateUrl()
                setUrl(e.target.value)
              }}
              inputProps={{
                autoComplete: 'off',
              }}
              onBlur={() => validateUrl()}
              variant="outlined"
              margin="dense"
              required
              error={!validUrl}
              helperText="Copy/paste the URL to your online job posting"
              id="newRequestUrl"
              name="url"
              label="Link to Job Posting"
              fullWidth
            />
          </>
          {isPaid ? (
            <>
              <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                inputProps={{
                  autoComplete: 'off',
                }}
                variant="outlined"
                margin="dense"
                id="newRequestMessage"
                name="message"
                label="Special Instructions (Optional)"
                fullWidth
              />
            </>
          ) : (
            ''
          )}
          {marketingFlow ? (
            <>
              <Autocomplete
                sx={{ marginTop: '0.5rem' }}
                disablePortal
                options={customers}
                autoHighlight
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Organization Name"
                    error={isOrgFieldValid()}
                    required
                  />
                )}
                onChange={async (_, newValue) => {
                  setFirstRender(false)
                  if (!newValue?.label) {
                    setTenant(undefined)
                    setName(undefined)
                    return
                  }
                  if (newValue?.tenant) {
                    setName(newValue?.label!)
                  } else {
                    setName(
                      newValue.label
                        .replace('Add', '')
                        .replace(/"/g, '')
                        .trim(),
                    )
                  }
                  setTenant(newValue?.tenant)
                }}
                onInputChange={async (_, value, reason) => {
                  if (reason == 'input') await fetchData(value)
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params)
                  const { inputValue } = params
                  const isExisting = options.some(
                    (option) => inputValue === option.label,
                  )
                  if (inputValue !== '' && !isExisting) {
                    filtered.unshift({
                      label: `Add "${inputValue}"`,
                      tenant: '',
                    })
                  }
                  return filtered
                }}
              />
            </>
          ) : (
            ''
          )}
          <Box className={classes.buttonWrap}>
            {/* {showSkip && (
              <Button
                title="Skip for now"
                variant="contained"
                color="primary"
                onClick={onSkip}
                className={classes.cancelButton}
              >
                Skip for now
              </Button>
            )} */}
            <Button
              title="Submit"
              variant="contained"
              color="primary"
              onClick={async () => {
                setSubmitted(true)
                validateJobTitle()
                validateUrl()
                if (validTitle && validUrl) {
                  if (marketingFlow && !validCompany) return
                  const success = await submit({
                    jobTitle,
                    url,
                    message,
                    tenant,
                    customerName: name,
                  })
                  if (success) cancelEdit()
                  setSubmitted(false)
                }
              }}
              className={classes.button}
            >
              Request Video
            </Button>
          </Box>
        </Box>
      </Box>
    </StyledBox>
  )
}
