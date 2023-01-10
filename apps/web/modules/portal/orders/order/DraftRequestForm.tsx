import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { gql, useMutation } from '@apollo/client'
import { Theme } from '@mui/material/styles'
import {
  Button,
  CircularProgress,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { RequestWhereUniqueInput } from '@lumina/api'
import { LiveField } from 'modules/utils'
import { OrderQuery } from '.'

const PREFIX = 'DraftRequestForm'

const classes = {
  layoutGrid: `${PREFIX}-layoutGrid`,
  buttonStyle: `${PREFIX}-buttonStyle`,
  approveButton: `${PREFIX}-approveButton`,
  declineButton: `${PREFIX}-declineButton`,
  buttonWrap: `${PREFIX}-buttonWrap`,
  buttonDiv: `${PREFIX}-buttonDiv`,
  spacer: `${PREFIX}-spacer`,
  mainWrap: `${PREFIX}-mainWrap`,
  requestedBy: `${PREFIX}-requestedBy`,
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  [`& .${classes.layoutGrid}`]: {
    display: 'grid',
    margin: '0 0.5rem',
    gridTemplateColumns: '1fr',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('lg')]: {
      margin: '0',
      gridTemplateColumns: '1fr 1fr 1fr 13rem',
    },
    columnGap: '1rem',
    '& .MuiInputBase-root': { backgroundColor: 'white' },
  },

  [`& .${classes.buttonStyle}`]: {
    textTransform: 'none',
    margin: '0.55rem 0',
  },

  [`& .${classes.approveButton}`]: {
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },

  [`& .${classes.declineButton}`]: {
    color: '#F60801',
    backgroundColor: 'white',
    border: '1px solid #F60801',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },

  [`& .${classes.buttonWrap}`]: {
    display: 'block',
    minWidth: '5rem',
  },

  [`& .${classes.buttonDiv}`]: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-start',
      justifyContent: 'space-evenly',
    },
  },

  [`& .${classes.spacer}`]: {
    display: 'block',
    borderBottom: '1px solid grey',
    marginTop: '0.5rem',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },

  [`&.${classes.mainWrap}`]: {
    borderRadius: 10,
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: '0.5rem',
    backgroundColor: theme.palette.grey[100],
    [theme.breakpoints.up('lg')]: {
      border: 'none',
      padding: '0.5rem 0',
      backgroundColor: 'white',
    },
  },

  [`& .${classes.requestedBy}`]: {
    textAlign: 'center',
    color: theme.palette.grey[400],
    padding: '0 1rem',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 0.5rem',
    },
  },
  [`& .css-16rj8g7-MuiInputBase-root-MuiOutlinedInput-root`]: {
    padding: '12px 10px'
  }
}))

interface IProps {
  request: OrderQuery['requests'][0]
}

const UPDATE_REQUEST = gql`
  mutation updateOneCustomerRequest($id: Int, $status: RequestStatus) {
    updateOneCustomerRequest(
      where: { id: $id }
      data: { status: { set: $status } }
    ) {
      id
      status
    }
  }
`

export const DraftRequestForm = ({ request }: IProps) => {
  const lg = useMediaQuery('(min-width:1280px)')
  const where: RequestWhereUniqueInput = {
    id: request?.id,
  }

  const [updateRequest] = useMutation(UPDATE_REQUEST)
  const [statusLoading, setStatusLoading] = useState(false)

  const callRequestUpdate = async (status: string) => {
    setStatusLoading(true)
    try {
      await updateRequest({
        variables: { id: request.id, status: status },
      })
      setStatusLoading(false)
    } catch (error) {
      setStatusLoading(false)
      console.error(error)
    }
  }

  return (
    <StyledPaper className={classes.mainWrap} elevation={lg ? 0 : 2}>
      <div className={classes.layoutGrid}>
        <LiveField
          dense
          resource="Request"
          field="jobTitle"
          where={where}
          label="Job Title"
          defaultValue={request.jobTitle || ''}
          customer
        />
        <LiveField
          dense
          resource="Request"
          field="url"
          where={where}
          label="Link to Description"
          defaultValue={request.url || ''}
          customer
        />
        <LiveField
          dense
          multiline
          required={false}
          resource="Request"
          field="message"
          where={where}
          label="Related Message"
          defaultValue={request.message || ''}
          customer
        />
        {statusLoading ? (
          <CircularProgress />
        ) : (
          <div className={classes.buttonDiv}>
            <div className={classes.buttonWrap}>
              <Button
                className={`${classes.buttonStyle} ${classes.approveButton}`}
                variant="contained"
                color="primary"
                onClick={() => callRequestUpdate('submitted')}
              >
                Approve
              </Button>
            </div>
            <div className={classes.buttonWrap}>
              <Button
                className={`${classes.buttonStyle} ${classes.declineButton}`}
                variant="outlined"
                onClick={() => callRequestUpdate('cancelled')}
              >
                Decline
              </Button>
            </div>
          </div>
        )}
      </div>
      <Typography variant="body2" className={classes.requestedBy}>
        Requested by: {request.submittedBy?.email || 'Not stored'}
      </Typography>
    </StyledPaper>
  )
}
