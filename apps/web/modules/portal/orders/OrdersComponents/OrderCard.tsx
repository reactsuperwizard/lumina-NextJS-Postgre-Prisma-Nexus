import React from 'react'
import { styled } from '@mui/system'
import { Typography, Box, Card } from '@mui/material'
import { GetOrdersQuery } from '..'
import { RequestStatus, VideoStatus } from '@lumina/api'
import { OrderNumberCompleted } from './OrderNumberCompleted'
import { JobTitleList } from './JobTitleList'
import { Skeleton } from '@mui/material'

const PREFIX = 'OrderCard'

const classes = {
  orderCard: `${PREFIX}-orderCard`,
  blockBox: `${PREFIX}-blockBox`,
  titleCompletedWrap: `${PREFIX}-titleCompletedWrap`,
  subtitleText: `${PREFIX}-subtitleText`,
  orderIdDateWrap: `${PREFIX}-orderIdDateWrap`,
  textSize: `${PREFIX}-textSize`,
  rightPadding: `${PREFIX}-rightPadding`,
  skeleton: `${PREFIX}-skeleton`,
}

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.orderCard}`]: {
    padding: '1rem',
    borderRadius: 15,
    cursor: 'pointer',
    border: '2px solid white',
    transform: 'border-color 1s',
    height: '13.5rem',
    '&:hover': {
      borderColor: theme.palette.primary.light,
    },
  },

  [`& .${classes.blockBox}`]: {
    display: 'block',
    height: '6rem',
  },

  [`& .${classes.titleCompletedWrap}`]: {
    display: 'flex',
    flexWrap: 'wrap-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  [`& .${classes.subtitleText}`]: {
    fontSize: '0.85rem',
    padding: '5px 0 0',
    marginRight: '0.5rem',
  },

  [`& .${classes.orderIdDateWrap}`]: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },

  [`& .${classes.textSize}`]: {
    fontSize: '0.85rem',
  },

  [`& .${classes.rightPadding}`]: {
    paddingRight: '1rem',
  },

  [`& .${classes.skeleton}`]: {
    height: '13.5rem',
    margin: '-1rem',
  },
}))

export const OrderCard = ({
  order,
  handleOnClick,
}: {
  order?: GetOrdersQuery['orders'][0]
  handleOnClick: () => void
}): JSX.Element => {
  return (
    <StyledCard className={classes.orderCard} onClick={handleOnClick}>
      <Box className={classes.blockBox}>
        {order ? (
          <>
            <Box key={`completed${order.id}`}>
              <Box className={classes.titleCompletedWrap}>
                <Typography
                  variant="subtitle1"
                  className={`${classes.subtitleText} ${classes.textSize}`}
                >
                  <strong>Job Title(s):</strong>
                </Typography>
                <OrderNumberCompleted
                  mobile
                  status={order.status}
                  videoCount={
                    order.videos?.filter((v) => v.status === VideoStatus.Live)
                      .length || 0
                  }
                  requestCount={
                    order.requests?.filter(
                      (r) =>
                        r.status !== RequestStatus.Cancelled &&
                        r.status !== RequestStatus.Draft,
                    ).length || 0
                  }
                />
              </Box>
            </Box>
            <Box key={`jobTitleList${order.id}`} style={{ height: '100%' }}>
              <JobTitleList requests={order.requests} orderId={order.id} card />
            </Box>
            <Box key={`orderId${order.id}`} className={classes.orderIdDateWrap}>
              <Typography
                noWrap
                variant="subtitle1"
                className={`${classes.textSize} ${classes.rightPadding}`}
              >
                <strong>Order Id:</strong> {order.id}
              </Typography>
              <Typography
                noWrap
                variant="subtitle1"
                className={`${classes.textSize}`}
              >
                <strong>Created: </strong>{' '}
                {new Date(order.createdAt).toLocaleString('en-US')}
              </Typography>
            </Box>
          </>
        ) : (
          <Skeleton
            variant="rectangular"
            animation="wave"
            className={classes.skeleton}
          />
        )}
      </Box>
    </StyledCard>
  )
}
