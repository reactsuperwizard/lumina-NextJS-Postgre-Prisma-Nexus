import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
  styled,
  Typography,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { ChangeEvent, useEffect, useState } from 'react'
import { Customer, PermissionsRole, User } from '@lumina/api'
import { useAuth0, usePlausible, useUser } from 'modules/hooks'
import { Background } from '../public/background'
import { useRouter } from 'next/router'
import { UPDATE_USER_PERMISSIONS } from 'modules/admin/users/actions/UPDATE_USER_PERMISSIONS'
import { resetTenants } from 'modules/utils'
import { EventNames } from 'modules/providers/plausible/Constants'

const CUSTOMERS_QUERY = gql`
  query Customers($where: CustomerWhereInput) {
    customers(where: $where) {
      name
      tenant
      isPaid
    }
  }
`
const CREATE_CUSTOMER = gql`
  mutation createOneCustomer($data: CustomerCreateInput!) {
    customer: createOneCustomer(data: $data) {
      id
      tenant
    }
  }
`

const GET_ME = gql`
  query User($where: UserWhereUniqueInput!) {
    me(where: $where) {
      customers {
        slug
      }
    }
  }
`

const PREFIX = 'SetupCustomer'

const classes = {
  box: `${PREFIX}-box`,
  orgBox: `${PREFIX}-orgBox`,
  text: `${PREFIX}-text`,
  button: `${PREFIX}-button`,
  buttonBox: `${PREFIX}-buttonBox`,
  addButton: `${PREFIX}-addButton`,
  modal: `${PREFIX}-modal`,
  customerWrap: `${PREFIX}-customerWrap`,
  customerName: `${PREFIX}-customerName`,
  customerBox: `${PREFIX}-customerBox`,
  headerText: `${PREFIX}-headerText`,
  descriptionText: `${PREFIX}-descriptionText`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.box}`]: {
    width: '33%',
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },

  [`& .${classes.orgBox}`]: {
    width: '100%',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    backgroundColor: '#fff',
    padding: '2rem',
  },

  [`& .${classes.text}`]: {
    width: '100%',
    margin: '1.5rem 0rem',
  },
  [`& .${classes.headerText}`]: {
    [theme.breakpoints.down('md')]: {
      fontSize: '1.4rem',
    },
  },
  [`& .${classes.descriptionText}`]: {
    [theme.breakpoints.down('md')]: {
      fontSize: '0.9rem',
    },
  },
  [`& .${classes.button}`]: {
    width: '100%',
    backgroundColor: '#9A30DE',
    color: 'white',
    padding: '1.25rem',
    textTransform: 'none',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    '&:hover': {
      backgroundColor: '#9A30DE',
      color: 'white',
    },
    '&:disabled': {
      color: 'white',
      backgroundColor: '#bb60f5',
    },
  },
  [`& .${classes.addButton}`]: {
    width: '100%',
    backgroundColor: '#2a93f4',
    color: 'white',
    padding: '0.5rem',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    '&:hover': {
      backgroundColor: '#2a93f4',
      color: 'white',
    },
  },
  [`& .${classes.buttonBox}`]: {
    width: '100%',
  },
  [`& .${classes.modal}`]: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#fff',
    width: '100%',
    maxHeight: '230px',
    marginTop: '-1rem',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '5px',
  },
  [`& .${classes.customerWrap}`]: {
    maxHeight: 150,
    overflow: 'scroll',
  },
  [`& .${classes.customerName}`]: {
    padding: '0.75rem',
    cursor: 'pointer',
  },
  [`& .${classes.customerBox}`]: {
    '&:hover': {
      backgroundColor: '#ebeff5',
    },
  },
}))

export interface CustomerQuery {
  name: string
  tenant?: string
  isPaid?: boolean
}
export const SetupCustomer = () => {
  const router = useRouter()
  const { refresh, email } = useUser()
  const {
    data: me,
    loading: meLoading,
    error,
  } = useQuery(GET_ME, {
    variables: {
      where: {
        email,
      },
      skip: !email,
    },
  })
  const [getCustomers] =
    useLazyQuery<{ customers: CustomerQuery[] }>(CUSTOMERS_QUERY)

  const [customers, setCustomers] = useState<CustomerQuery[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerQuery>()
  const [name, setName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
  const { plgAddNewCustomer, plgAddExistingCustomer } = usePlausible()

  const [createCustomerMutation, { error: createError }] = useMutation<{
    customer: Pick<Customer, 'id' | 'tenant'>
  }>(CREATE_CUSTOMER)

  const [updateUserPermissions, { error: updateError }] = useMutation<{
    updateUserPermissions: {
      customers: Pick<Customer, 'name' | 'slug' | 'isPaid'>[]
    }
  }>(UPDATE_USER_PERMISSIONS)

  const { user, initAuth0 } = useAuth0()

  useEffect(() => {
    if (!me) return
    if (me.me?.customers?.length > 0) {
      router.push(`${me.me.customers[0].slug}`)
    }
  }, [me])

  useEffect(() => {
    if (selectedCustomer) return
    if (!name) {
      setCustomers([])
      setShowModal(false)
      return
    }
    if (name) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      const timeout = setTimeout(() => {
        fetchData()
      }, 500)
      setTimeoutId(timeout)
    }
    const fetchData = async () => {
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
      setCustomers(data.data?.customers!)
      setShowModal(true)
    }
  }, [name])

  const createCustomer = async (): Promise<string> => {
    const result = await createCustomerMutation({
      variables: {
        data: {
          name,
        },
      },
    })
    return result?.data?.customer?.tenant!
  }

  const updateMe = async (
    customerTenant: string,
    role: string[],
    isApproved: boolean,
    hasFreeRequest: boolean,
  ) => {
    const result = await updateUserPermissions({
      variables: {
        authId: user?.sub,
        customerTenant,
        role,
        isApproved,
        hasFreeRequest,
      },
    })
    resetTenants({ [customerTenant]: { role } })
    await initAuth0(false)
    return result
  }

  const handleCustomerSelection = (customer: CustomerQuery) => {
    setName(customer.name)
    setSelectedCustomer(customer)
    setCustomers([])
    setShowModal(false)
    plgAddExistingCustomer(EventNames.PLG_ADD_EXISTING_CUSTOMER, {
      props: {
        userEmail: email,
      },
    })
  }

  const reset = () => {
    setName('')
    setSelectedCustomer(undefined)
    setCustomers([])
    setShowModal(false)
  }

  const addCustomer = () => {
    if (!name) return
    const foundCustomer = customers.find(
      (customer) => customer.name.toLowerCase() === name,
    )
    if (foundCustomer) {
      handleCustomerSelection(foundCustomer)
      return
    }
    setSelectedCustomer({ name })
    setCustomers([])
    setShowModal(false)
    plgAddNewCustomer(EventNames.PLG_ADD_NEW_CUSTOMER, {
      props: {
        userEmail: email,
      },
    })
  }

  const handleCreate = async () => {
    try {
      setLoading(true)
      let role = selectedCustomer?.isPaid
        ? [PermissionsRole.User]
        : [PermissionsRole.Admin]
      let customerTenant = selectedCustomer?.tenant
      const isApproved = selectedCustomer?.isPaid ? false : true
      const hasFreeRequest = selectedCustomer?.isPaid ? false : true
      if (!customerTenant) {
        customerTenant = await createCustomer()
        // role = PermissionsRole.Admin
      }
      const updatedUser = await updateMe(
        customerTenant,
        role,
        isApproved,
        hasFreeRequest,
      )
      await refresh(email)
      const newCustomer =
        updatedUser.data?.updateUserPermissions.customers.find(
          (customer) => customer.name == selectedCustomer?.name,
        )
      if (!newCustomer?.isPaid) router.push(`${newCustomer?.slug}/freeRequest`)
      else router.push(`${newCustomer?.slug}`)
    } catch {
    } finally {
      setLoading(false)
    }
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setName(e.target.value)
    setSelectedCustomer(undefined)
  }
  return (
    <Background>
      {error && <Typography color="#fff">Something went wrong</Typography>}
      {!meLoading && !error && (
        <StyledBox className={classes.box}>
          {(createError || updateError) && (
            <Typography
              variant="subtitle1"
              fontSize={'1.25rem'}
              color={'#ED4F32'}
            >
              Something went wrong !
            </Typography>
          )}
          <Box className={classes.orgBox}>
            <Typography
              variant="h3"
              fontSize={'2.5rem'}
              fontWeight="bold"
              mb={'1rem'}
              className={classes.headerText}
            >
              Find your Organization
            </Typography>
            <Typography className={classes.descriptionText} variant="subtitle1">
              Type your organization’s name to see if there is an account with
              us.
            </Typography>
            <Box sx={{ position: 'relative', color: '#333333' }}>
              <OutlinedInput
                placeholder="Organization Name"
                className={classes.text}
                value={name}
                onChange={handleChange}
                endAdornment={
                  selectedCustomer ? (
                    <InputAdornment position="end">
                      <IconButton onClick={reset}>
                        <CancelIcon></CancelIcon>
                      </IconButton>
                    </InputAdornment>
                  ) : undefined
                }
              />
              {showModal && (
                <Box className={classes.modal}>
                  <Box sx={{ border: '1px solid #EFEFEF' }}>
                    <Box className={classes.customerWrap}>
                      {customers?.map((customer) => (
                        <Box
                          className={classes.customerBox}
                          onClick={() => handleCustomerSelection(customer)}
                          key={customer.tenant}
                        >
                          <Typography
                            fontSize={'1rem'}
                            className={classes.customerName}
                          >
                            {customer.name}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <Typography p={1} textAlign={'center'} fontSize={'0.75rem'}>
                      Can’t find your organization?<br></br>Type its full name
                      and click Add
                    </Typography>
                    <Button className={classes.addButton} onClick={addCustomer}>
                      Add
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          <Box className={classes.buttonBox}>
            <Button
              onClick={handleCreate}
              className={classes.button}
              disabled={!selectedCustomer?.name || loading}
            >
              {loading ? (
                <Box sx={{ textAlign: 'center' }}>
                  <CircularProgress size={25} color="inherit" />
                </Box>
              ) : (
                'Play with Lumina'
              )}
            </Button>
          </Box>
        </StyledBox>
      )}
      {meLoading && !error && (
        <Box>
          <CircularProgress />
        </Box>
      )}
    </Background>
  )
}
