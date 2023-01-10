import {
  Accordion,
  AccordionSummary,
  Stack,
  Typography,
  Box,
  Skeleton,
  Link,
} from '@mui/material'
import { styled } from '@mui/system'
import { FunctionComponent, useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { UserAvatarWithDetails } from './UserAvatarWithDetails'
import { useAuth0, useTenant } from 'modules/hooks'
import { gql, useQuery } from '@apollo/client'
import { Customer, QueryGetCustomerArgs, User } from '@lumina/api'

const PREFIX = 'UserList'

const classes = {
  teamsHeader: `${PREFIX}-teamsHeader`,
  accordionRoot: `${PREFIX}-accordionRoot`,
  accordion: `${PREFIX}-accordion`,
  more: `${PREFIX}-more`,
  skeleton: `${PREFIX}-skeleton`,
  boxWrap: `${PREFIX}-boxWrap`,
}

const Root = styled('div')(({}) => ({
  [`& .${classes.teamsHeader}`]: {
    flexGrow: 0,
    opacity: 0.7,
  },
  [`& .${classes.skeleton}`]: {
    margin: 0,
    padding: 0,
  },
  [`& .${classes.accordionRoot}`]: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '1.5rem',
  },
  [`& .${classes.accordion}`]: {
    color: '#fff',
    marginTop: '1rem !important',
    backgroundColor: 'inherit',
  },
  [`& .${classes.boxWrap}`]: {
    display: 'flex',
    flexGrow: 0,
    paddingLeft: '1.5rem',
  },
  [`& .${classes.more}`]: {
    color: '#fff',
    fontSize: '0.75rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))

const GET_CUSTOMER_USERS = gql`
  query getCustomer($where: CustomerWhereUniqueInput!) {
    customer: getCustomer(where: $where) {
      id
      users {
        email
        firstName
        lastName
        isUserActive
        avatar
      }
    }
  }
`
interface CustomerQuery extends Pick<Customer, 'id'> {
  users: Pick<
    User,
    'email' | 'firstName' | 'lastName' | 'isUserActive' | 'avatar'
  >[]
}

export const UserList: FunctionComponent = () => {
  const { tenant } = useTenant()
  const { user } = useAuth0()
  const defaultCount = 5
  const [users, setUsers] = useState<CustomerQuery['users']>([])

  const [openRows, setOpenRows] = useState(false)
  const [filteredUsers, setfilteredUsers] = useState<CustomerQuery['users']>([])
  const [expanded, setExpanded] = useState(true)
  const { data: usersQuery, loading } = useQuery<
    { customer: CustomerQuery },
    QueryGetCustomerArgs
  >(GET_CUSTOMER_USERS, {
    variables: { where: { tenant } },
    skip: !tenant,
  })
  const openRowsHandler = () => {
    setOpenRows(!openRows)
  }
  useEffect(() => {
    if (!users || users.length == 0) return
    if (openRows) {
      setfilteredUsers(users)
    } else {
      setfilteredUsers(users.slice(0, 5))
    }
  }, [openRows])
  useEffect(() => {
    if (user?.email && usersQuery) {
      const userWithoutCurrentUser = usersQuery.customer.users
        .filter((u) => user.email != u.email)
        .sort((user) => (user.isUserActive ? -1 : 1))
      setUsers(userWithoutCurrentUser)
    }
  }, [usersQuery])

  useEffect(() => {
    setfilteredUsers(users.slice(0, defaultCount))
  }, [users])
  return (
    <Root>
      <Accordion
        expanded={expanded}
        disableGutters
        elevation={0}
        onChange={() => setExpanded(!expanded)}
        className={classes.accordion}
      >
        <AccordionSummary
          classes={{
            content: classes.teamsHeader,
            root: classes.accordionRoot,
          }}
          expandIcon={
            <ExpandMoreIcon
              fontSize="small"
              sx={{
                color: '#fff',
                opacity: 0.7,
              }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ padding: 0 }}
        >
          <Stack direction="row" alignItems="center">
            {/* <FontAwesomeIcon icon={faUsers} /> */}
            <Typography fontWeight={500} fontSize="0.75rem">
              MY TEAM
            </Typography>
          </Stack>
        </AccordionSummary>
        <Box sx={{ maxHeight: openRows ? 318 : 230, overflow: 'scroll' }}>
          {usersQuery &&
            filteredUsers.map((user) => (
              <div key={`${user.email}`}>
                <UserAvatarWithDetails
                  firstName={user.firstName as string}
                  lastName={user.lastName as string}
                  email={user.email as string}
                  isUserActive={user.isUserActive as boolean}
                  avatar={user.avatar}
                  flow="sidebar"
                />
              </div>
            ))}
          {loading &&
            [1, 2, 3, 4, 5].map((i) => (
              <Skeleton
                className={classes.skeleton}
                width="100%"
                key={i}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.13)',
                  height: 50,
                }}
              >
                <Typography>.</Typography>
              </Skeleton>
            ))}
        </Box>
        {users.length > 5 && (
          <Box className={classes.boxWrap}>
            <Link
              underline="hover"
              className={classes.more}
              onClick={openRowsHandler}
            >
              {openRows ? 'Show Fewer' : `& ${users.length - 5} more`}
            </Link>
          </Box>
        )}
      </Accordion>
    </Root>
  )
}
