import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  CircularProgress,
  useMediaQuery,
  Tooltip,
} from '@mui/material'
import { HighlightOffRounded } from '@mui/icons-material/'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'
import { gql, ObservableQuery, useMutation } from '@apollo/client'

import {
  Order,
  Customer,
  OrderCreateInput,
  RequestCreateInput,
  RequestStatus,
  Request,
  TemplateFlavor,
  User,
} from '@lumina/api'
import { useTenant, useUser } from 'modules/hooks'

import { NewRequestContent } from './NewRequestContent'
import { AnimatedThumbnail } from '../AnimatedThumbnail'

import { SingleVideoThumbnailButton } from './SingleVideoThumbnail'
import { StackedVideoThumbnail } from './StackedVideoThumbnail'
import { TemplateSelection } from './TemplateSelection'
import { Preview } from './Preview'
import { TemplateDetails, TemplateTypes } from './interface'
import { IUserContext } from 'modules/providers/user'
import { Theme } from '@mui/system'
import { SignupBox } from 'modules/signup/SignupBox'

const PREFIX = 'NewVideoDialog'

const classes = {
  buttonGrid: `${PREFIX}-buttonGrid`,
  buttonWrap: `${PREFIX}-buttonWrap`,
  spacer: `${PREFIX}-spacer`,
  chip: `${PREFIX}-chip`,
  chipHover: `${PREFIX}-chipHover`,
  button: `${PREFIX}-button`,
  tableBox: `${PREFIX}-tableBox`,
  orderNameInput: `${PREFIX}-orderNameInput`,
  closeButton: `${PREFIX}-closeButton`,
  title: `${PREFIX}-title`,
  titleText: `${PREFIX}-titleText`,
  center: `${PREFIX}-center`,
  dialog: `${PREFIX}-dialog`,
  transparent: `${PREFIX}-transparent`,
  loadingWrap: `${PREFIX}-loadingWrap`,
  loader: `${PREFIX}-loader`,
  scootUp: `${PREFIX}-scootUp`,
  selectItem: `${PREFIX}-selectItem`,
  select: `${PREFIX}-select`,
  tab: `${PREFIX}-tab`,
  activeTab: `${PREFIX}-activeTab`,
  tabGrid: `${PREFIX}-tabGrid`,
  tabSpacer: `${PREFIX}-tabSpacer`,
  backHover: `${PREFIX}-backHover`,
  tooltip: `${PREFIX}-tooltip`,
  cancelButton: `${PREFIX}-cancelButton`,
  skipButton: `${PREFIX}-skipButton`,
  width: `${PREFIX}-width`,
}
const classesObject = (theme: Theme) => {
  return {
    [`& .${classes.buttonGrid}`]: {
      textAlign: 'center',
      maxWidth: '50rem',
      justifyContent: 'center',
      alignItems: 'center',
    },

    [`& .${classes.buttonWrap}`]: {
      padding: '0rem 1rem 1rem',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      // marginBottom: '1rem',
    },

    [`& .${classes.spacer}`]: {
      height: '1rem',
    },

    [`& .${classes.chip}`]: {
      textTransform: 'none',
      minWidth: '9rem',
    },

    [`& .${classes.chipHover}`]: {
      textTransform: 'none',
      minWidth: '9rem',
      backgroundColor: theme.palette.primary.light,
    },

    [`& .${classes.button}`]: { maxWidth: '20rem' },
    [`& .${classes.tableBox}`]: {
      margin: theme.spacing(3),
      marginTop: theme.spacing(1),
    },
    [`& .${classes.orderNameInput}`]: { margin: '1.5rem 0 2rem' },

    [`& .${classes.closeButton}`]: {
      position: 'absolute',
      right: theme.spacing(2),
      top: theme.spacing(2),
    },

    [`& .${classes.title}`]: {
      // marginTop: theme.spacing(2),
      marginLeft: theme.spacing(0.5),
      fontWeight: 'bold',
      fontSize: '1.6rem',
    },
    [`& .${classes.width}`]: {
      width: '50vw',
      [theme.breakpoints.down('md')]: {
        width: '70vw',
      },
    },

    [`& .${classes.dialog}`]: {
      borderRadius: '20px',
      maxWidth: '700px',
      overflow: 'hidden',
      maxHeight: '98vh',
    },

    [`& .${classes.transparent}`]: {
      opacity: '0',
    },

    [`& .${classes.loadingWrap}`]: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },

    [`& .${classes.loader}`]: {
      // minWidth: '19rem',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    [`& .${classes.scootUp}`]: {
      marginTop: '-1.25rem',
    },
    [`& .${classes.select}`]: {
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
      margin: '2rem 0 1.5rem',
      borderRadius: '0.5rem',
      [`& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input`]:
        {
          paddingTop: '0.6rem',
          paddingBottom: '0.6rem',
        },
    },
    [`& .${classes.tab}`]: {
      padding: '0.5rem 0.5rem 0.25rem',
      borderBottom: `1px solid ${theme.palette.grey[400]}`,
      textAlign: 'center',
    },
    [`& .${classes.activeTab}`]: {
      borderBottom: `4px solid black`,
    },
    [`& .${classes.backHover}`]: {
      backgroundColor: 'black',
      opacity: 100,
      color: 'red',
    },
    [`& .${classes.tooltip}`]: {
      background: theme.palette.info.main,
      fontSize: 14,
      color: '#FFFFFF',
    },
    [`& .${classes.tabGrid}`]: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        padding: '0.5rem 1rem',
        width: '100%',
      },
    },

    [`& .${classes.tabSpacer}`]: {
      borderBottom: `1px solid ${theme.palette.grey[400]}`,
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
    [`& .${classes.skipButton}`]: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '0 2rem 1rem 1rem',
      marginTop: 0,
    },
    [`& .${classes.titleText}`]: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: '2rem',
    },
    [`& .${classes.center}`]: {
      textAlign: 'center',
      justifyContent: 'center',
    },
  }
}
const StyledDialog = styled(Dialog)(({ theme }) => ({
  ...classesObject(theme),
}))
const StyledBox = styled(Box)(({ theme }) => ({
  width: '60%',
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  ...classesObject(theme),
}))

const ADD_ORDER = gql`
  mutation createOneCustomerOrder($data: OrderCreateInput!) {
    order: createOneCustomerOrder(data: $data) {
      id
      name
      customer {
        id
      }
    }
  }
`
const UPDATE_ME = gql`
  mutation Mutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateMe(data: $data, where: $where) {
      id
      customers {
        slug
        name
      }
    }
  }
`

const UPDATE_CUSTOMER = gql`
  mutation updateOneCustomer(
    $where: CustomerWhereUniqueInput!
    $data: CustomerUpdateInput!
  ) {
    resource: updateOneCustomer(where: $where, data: $data) {
      id
      approvedTemplates
      defaultTemplate
      requestedTemplates
    }
  }
`

interface AddOrderMutation extends Pick<Order, 'name' | 'id'> {
  customer: Pick<Customer, 'id'>
}

interface GetCustomerQuery extends Pick<Customer, 'id' | 'approvedTemplates'> {}

const ADD_REQUEST = gql`
  mutation createOneCustomerRequest($data: RequestCreateInput!) {
    request: createOneCustomerRequest(data: $data) {
      id
      jobTitle
    }
  }
`

const CREATE_CUSTOMER_WITH_USER = gql`
  mutation createCustomerWithUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $jobTitle: String!
    $jobUrl: String!
    $customerName: String!
    $template: String!
    $tenant: String
  ) {
    userSignUpWithCustomer(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      jobTitle: $jobTitle
      jobURL: $jobUrl
      customerName: $customerName
      tenant: $tenant
      template: $template
    ) {
      accessToken
      expiresIn
      idToken
      decodedToken
      tenant
      expiresAt
    }
  }
`

type AddRequestMutation = Pick<Request, 'id' | 'jobTitle'>
type unlockTemplateMutation = Pick<Customer, 'requestedTemplates'>

interface Props {
  refetch?: ObservableQuery['refetch'] | (() => Promise<void>)
  close: () => void
  open: boolean
  stay?: boolean // prevent navigation away from page on creation of single request
  setRequestAdded: React.Dispatch<React.SetStateAction<number>>
  templates: any
  approvedTemplates: TemplateFlavor[]
  requestedTemplates: TemplateFlavor[]
  defaultTemplate: TemplateFlavor | undefined | null
  showSkip?: boolean
  loaded: boolean
  marketingFlow: boolean
  onSkip?: () => void
}

export const NewVideoDialog = ({
  refetch,
  close,
  open,
  stay,
  setRequestAdded,
  templates,
  showSkip,
  onSkip,
  approvedTemplates,
  requestedTemplates,
  defaultTemplate,
  loaded,
  marketingFlow,
}: Props) => {
  const router = useRouter()
  const userData: IUserContext = marketingFlow
    ? {
        freeRequestId: 0,
        hasFreeRequest: false,
        email: 'string',
        firstName: 'string',
        lastName: 'string',
        avatar: 'string',
        isUserActive: true,
        id: 0,
        loading: false,
        isApproved: true,
        async refresh(email: string) {},
      }
    : useUser()
  const query = router.query
  const slug: string = query?.portal?.toString().toLowerCase()
  const [addingRequest, setAddingRequest] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  // const [hoverSingle, setHoverSingle] = useState(false)
  // const [hoverMultiple, setHoverMultiple] = useState(false)
  const [activating, setActivating] = useState(false)
  const [templateSelection, setTemplateSelection] = useState(false)

  // Added for marketing flow
  const [addingUser, setAddingUser] = useState(false)
  const [jobTitle, setJobTitle] = useState<string>('')
  const [jobURL, setJobURL] = useState<string>('')
  const [customerName, setCustomerName] = useState<string>('')
  const [cusTenant, setCustomerTenant] = useState<string>('')

  const [userTemplate, setUserTemplates] = useState<TemplateDetails[]>([])
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateDetails | null>(null)

  const [preview, setPreview] = useState<TemplateDetails | null>(null)
  const { isTenantAdmin, isLuminaAdmin, tenant, name, active } = useTenant()
  const xs = useMediaQuery('(max-width:599px)')

  const [addOrder] = useMutation<{ order: AddOrderMutation }>(ADD_ORDER)
  const [createUserWithCustomer, { error: userErr, loading }] = useMutation(
    CREATE_CUSTOMER_WITH_USER,
  )
  const [addRequest, { error: requestErr }] =
    useMutation<{ request: AddRequestMutation }>(ADD_REQUEST)
  const [unlockTemplate, { error: unlockError }] =
    useMutation<{ request: unlockTemplateMutation }>(UPDATE_CUSTOMER)
  const [updateMeMutation] = useMutation<{
    updateMe: {
      user: Pick<User, 'id'>
      customers: Pick<Customer, 'name' | 'slug'>[]
    }
  }>(UPDATE_ME)

  const isFreeRequestAvailable = () => {
    return userData.hasFreeRequest && !userData.freeRequestId
  }

  useEffect(() => {
    if (userTemplate && userTemplate.length == 0 && templates && userData) {
      const templateKeys = Object.keys(templates)
      const result: TemplateDetails[] = []
      templateKeys.forEach((key) => {
        let status = TemplateTypes.Locked

        if (
          approvedTemplates.includes(key as TemplateFlavor) ||
          isFreeRequestAvailable()
        )
          status = TemplateTypes.Approved
        else if (defaultTemplate == key) status = TemplateTypes.Default
        else if (requestedTemplates.includes(key as TemplateFlavor))
          status = TemplateTypes.Requested
        if (
          status != TemplateTypes.Approved &&
          status != TemplateTypes.Default &&
          !isTenantAdmin &&
          !isLuminaAdmin &&
          !isFreeRequestAvailable()
        )
          return
        result.push({
          id: key,
          name: templates[key].name,
          description: templates[key].meta?.description,
          imageUrl: templates[key].meta?.imageUrl,
          duration: templates[key].meta?.duration,
          orientation: templates[key].meta?.orientation,
          vimeoId: templates[key].meta?.vimeoId,
          category: templates[key].meta?.category,
          status,
        })
      })
      setUserTemplates(result)
    }
  }, [templates, userData])

  useEffect(() => {
    if (loaded) handleVideoTypeSelection()
  }, [userTemplate, loaded])
  const createNewOrder = async (newOrderName?: string) => {
    if (tenant) {
      setAddLoading(true)
      const data: OrderCreateInput = {
        customer: { connect: { tenant } },
      }
      if (newOrderName) data.name = newOrderName
      const result = await addOrder({
        variables: { data },
      })
      setAddLoading(false)
      close()
      router.push(`/${slug}/orders/${result.data?.order?.id}`)
    }
  }

  const handleUnlock = async (template: TemplateDetails): Promise<boolean> => {
    const updatedTemplates = [
      ...new Set([
        ...userTemplate
          .filter((temp) => temp.status == TemplateTypes.Requested)
          .map((temp) => temp.id),
        template.id,
      ]),
    ]
    await unlockTemplate({
      variables: {
        data: {
          requestedTemplates: { set: updatedTemplates },
        },
        where: {
          tenant,
        },
      },
    })
    if (unlockError) return false
    const updatedUserTemplate = []
    for (let i = 0; i < userTemplate.length; i++) {
      if (userTemplate[i].id == template.id) {
        userTemplate[i].status = TemplateTypes.Requested
      }
      updatedUserTemplate.push(userTemplate[i])
    }

    setUserTemplates(updatedUserTemplate)
    return true
  }
  const handleVideoTypeSelection = (): void => {
    if (userTemplate) {
      if (userTemplate.length == 1) {
        handlePreviewSelection(userTemplate[0])
      } else if (userTemplate.length == 0) {
        setAddingRequest(true)
      } else {
        setTemplateSelection(true)
        setAddingRequest(false)
      }
    } else {
      setAddingRequest(true)
    }
  }
  const createNewRequest = async (props: {
    jobTitle: string
    url: string
    message: string
    customerName?: string
    tenant?: string
  }) => {
    if (marketingFlow) {
      setJobTitle(props.jobTitle)
      setJobURL(props.url)
      setCustomerName(props.customerName!)
      setCustomerTenant(props.tenant!)
      setAddingRequest(false)
      setAddingUser(true)
      return true
    }
    if (!tenant) return false
    const { jobTitle, url, message } = props
    if (!(jobTitle && url)) {
      setAddLoading(false)
      return false
    }
    setAddLoading(true)
    const orderData: OrderCreateInput = {
      customer: { connect: { tenant } },
      name: jobTitle,
    }
    const { data: createdOrder } = await addOrder({
      variables: { data: orderData },
    })

    if (!createdOrder) return false
    const data: RequestCreateInput = {
      jobTitle,
      url,
      message,
      status:
        isTenantAdmin || isLuminaAdmin
          ? RequestStatus.Submitted
          : RequestStatus.Draft,
      order: { connect: { id: createdOrder.order.id } },
      customer: { connect: { tenant } },
      template: selectedTemplate?.id as TemplateFlavor,
    }
    try {
      const result = await addRequest({ variables: { data } })
      if (requestErr) return false
      setRequestAdded(result.data?.request.id!)
      if (isFreeRequestAvailable()) {
        await updateMeMutation({
          variables: {
            data: {
              freeRequest: {
                connect: {
                  id: result.data?.request.id!,
                },
              },
            },
            where: {
              email: userData.email,
            },
          },
        })
        await userData.refresh(userData.email)
        // if (showSkip) {
        //   const slug = router.query?.portal
        //   router.replace(`/${slug}/videos`)
        // }
      }

      if (!defaultTemplate) {
        defaultTemplate = selectedTemplate?.id as TemplateFlavor
      }
    } catch (error) {
      console.error(error)
    }

    if (refetch) refetch()

    setAddLoading(false)
    if (!stay) close()
    return true
  }

  const handleClose = () => {
    close()
  }

  const createUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    setAddLoading(true)
    const data = {
      firstName,
      lastName,
      email,
      password,
      jobTitle,
      jobUrl: jobURL,
      customerName,
      tenant: cusTenant,
      template: selectedTemplate?.id,
    }
    try {
      await createUserWithCustomer({
        variables: { ...data },
      })
      window.open(window.location.origin, '_parent')?.focus()
      return true
    } catch (err) {
      return false
    } finally {
      reset()
      setTemplateSelection(false)
      setAddLoading(false)
    }
  }
  const showCloseButton = (): boolean => {
    return !marketingFlow && (showSkip || (!showSkip && !templateSelection))
  }

  const reset = () => {
    // showSkip is added to not show Video Selection Screen on pressing back
    if (
      (preview || addingRequest || showSkip || addingUser) &&
      userTemplate?.length > 1
    ) {
      setPreview(null)
      setAddingRequest(false)
      setTemplateSelection(true)
      setAddingUser(false)
    } else {
      close()
    }
  }

  const handleTemplateSelection = (template: TemplateDetails) => {
    setSelectedTemplate(template)
    setAddingRequest(true)
    setTemplateSelection(false)
  }

  const handlePreview = (template: TemplateDetails) => {
    setPreview(template)
    setTemplateSelection(false)
  }

  const handlePreviewSelection = (template: TemplateDetails) => {
    setSelectedTemplate(template)
    setAddingRequest(true)
    setPreview(null)
  }

  const getTitle = () => {
    if (preview) return 'Preview Template'
    else if (templateSelection && !marketingFlow) return 'Choose a Template'
    else if (templateSelection && marketingFlow) return 'Try it for yourself'
    else if (activating) return 'Licensing'
    else if (addingRequest) return 'Enter Job Details'
    else if (addingUser) return 'Enter Your Details'
    else return ''
  }

  const child = (
    <>
      <DialogTitle
        className={`${classes.titleText} ${
          marketingFlow ? classes.center : ''
        }`}
      >
        {(preview ||
          (templateSelection && !showSkip) ||
          addingRequest ||
          addingUser) && (
          <Tooltip
            title="Back"
            placement="right-start"
            classes={{
              tooltip: classes.tooltip,
            }}
          >
            <IconButton
              aria-label="close"
              sx={{ marginRight: '0.5rem' }}
              // className={classes.closeButton}
              onClick={reset}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        )}
        <Box>
          <Typography className={classes.title}>{getTitle()}</Typography>
          {templateSelection && (
            <Typography
              variant="body1"
              fontSize={'0.8rem'}
              color={'#808080'}
              ml={'0.25rem'}
              fontWeight={'bold'}
            >
              Choose a style for your video. Don't worry, we'll use your brand
              colors.
            </Typography>
          )}
        </Box>
        {!showSkip && templateSelection && (
          <Tooltip className={classes.closeButton} title="Multiple Videos">
            <Box ml={'0.5rem'}>
              <StackedVideoThumbnail
                label="Multiple Videos"
                onClick={() => {
                  if (!active) return
                  createNewOrder()
                }}
              />
            </Box>
          </Tooltip>
        )}
        {showCloseButton() && (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
            size="large"
          >
            <HighlightOffRounded fontSize="large" />
          </IconButton>
        )}
      </DialogTitle>
      <Box
        className={`${classes.buttonWrap} ${
          xs && !activating ? classes.scootUp : ''
        }`}
      >
        {preview && (
          <Preview
            handlePreviewSelection={handlePreviewSelection}
            template={preview}
          />
        )}
        {templateSelection && (
          <TemplateSelection
            userTemplate={userTemplate}
            handleTemplateSelection={handleTemplateSelection}
            handlePreview={handlePreview}
            handleUnlock={handleUnlock}
            marketingFlow={marketingFlow}
          />
        )}
        {/* {!addingRequest && !activating && !templateSelection && !preview && (
    <Grid
      container
      className={`${classes.buttonGrid} ${
        addLoading ? classes.transparent : ''
      }`}
    >
      <Grid item xs={12} sm={5} className={classes.button}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <SingleVideoThumbnailButton
              hover={hoverSingle}
              label="Single Video"
              setHover={setHoverSingle}
              onClick={() => {
                if (!active) return
                // setAddingRequest(true)
                handleVideoTypeSelection()
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {!xs && <Grid item xs={12} sm={1} className={classes.spacer} />}
      <Grid item xs={12} sm={5} className={classes.button}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <StackedVideoThumbnail
              // hover={hoverMultiple}
              label="Multiple Videos"
              // setHover={setHoverMultiple}
              onClick={() => {
                if (!active) return
                createNewOrder()
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )} */}
        {addingRequest && (
          <div className={addLoading ? classes.transparent : ''}>
            <NewRequestContent
              submit={createNewRequest}
              template={selectedTemplate}
              showSkip={showSkip}
              onSkip={onSkip}
              marketingFlow={marketingFlow}
            />
          </div>
        )}
        {addingUser && (
          <Box
            className={`${classes.width} ${
              addLoading ? classes.transparent : ''
            }`}
          >
            <SignupBox
              loading={loading}
              submit={createUser}
              title="Sign Up to View Your Video"
            />
          </Box>
        )}
        {addLoading && (
          <div className={classes.loadingWrap}>
            <div className={classes.loader}>
              <CircularProgress size="4rem" />
            </div>
          </div>
        )}
        {userErr && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography>Something went wrong</Typography>
          </Box>
        )}
      </Box>
    </>
  )
  return (
    <>
      {marketingFlow ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <StyledBox aria-labelledby="simple-dialog-title">{child}</StyledBox>
        </Box>
      ) : (
        <StyledDialog
          onClose={() => close()}
          aria-labelledby="simple-dialog-title"
          open={open}
          fullWidth
          maxWidth="sm"
          classes={{ paper: classes.dialog }}
        >
          {child}
        </StyledDialog>
      )}
      {/* <Header marketingFlow={marketingFlow}>{child}</Header> */}
    </>
  )
}
