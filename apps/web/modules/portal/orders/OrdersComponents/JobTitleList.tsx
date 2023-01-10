import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material'
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@mui/icons-material'
import { GetOrdersQuery } from '..'
import { useEffect } from 'react'
import { RequestStatus } from '@lumina/api'

const PREFIX = 'JobTitleList';

const classes = {
  wrap: `${PREFIX}-wrap`,
  wrapCard: `${PREFIX}-wrapCard`,
  jobTitle: `${PREFIX}-jobTitle`,
  cardText: `${PREFIX}-cardText`,
  seeMore: `${PREFIX}-seeMore`,
  icon: `${PREFIX}-icon`,
  iconCard: `${PREFIX}-iconCard`,
  draft: `${PREFIX}-draft`
};

const StyledBox = styled(Box)({
  [`& .${classes.wrap}`]: {
    minHeight: '8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  [`& .${classes.wrapCard}`]: {
    minHeight: '6rem',
    justifyContent: 'flex-start',
  },
  [`& .${classes.jobTitle}`]: {
    width: '100%',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis !important',
    overflow: 'hidden',
    fontSize: '0.95rem',
  },
  [`& .${classes.cardText}`]: {
    fontSize: '0.85rem',
  },
  [`& .${classes.seeMore}`]: {
    color: 'lightgrey',
    margin: '-5px 0 0',
    fontSize: '0.95rem',
  },
  [`& .${classes.icon}`]: {
    fontSize: '2rem',
    margin: '0 0 -0.65rem',
    padding: 0,
  },
  [`& .${classes.iconCard}`]: {
    fontSize: '1.9rem',
  },
  [`& .${classes.draft}`]: {
    backgroundColor: 'rgba(249, 245, 230, 0.6)',
    textShadow: '#E6C56F 3px 2px 7px',
  },
});

interface Props {
  requests: GetOrdersQuery['orders'][0]['requests']
  orderId: number
  card?: boolean
}

export const JobTitleList = ({ requests, orderId, card }: Props) => {
  const [showAll, setShowAll] = useState(false)
  const [activeRequests, setActiveRequests] = useState<
    GetOrdersQuery['orders'][0]['requests'] | null
  >(null)


  useEffect(() => {
    if (requests)
      setActiveRequests(
        requests.filter((r) => r.status !== RequestStatus.Cancelled),
      )
  }, [requests])

  return (
    <StyledBox className={`${classes.wrap} ${card && classes.wrapCard}`}>
      {activeRequests &&
        activeRequests.slice(0, showAll ? undefined : 4).map((r) => (
          <Typography
            noWrap
            variant="body1"
            key={`order-${orderId}-job-${r.id}`}
            className={`${classes.jobTitle} ${card && classes.cardText}`}
          >
            <span
              className={
                card && r.status === RequestStatus.Draft ? classes.draft : ''
              }
            >
              {r.jobTitle}
            </span>
          </Typography>
        ))}
      {activeRequests && activeRequests[4] && (
        <Typography
          variant="body1"
          className={`${classes.seeMore} ${card && classes.cardText}`}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setShowAll(!showAll)
          }}
        >
          {`See ${showAll ? 'Less' : 'More'} `}
          {showAll ? (
            <KeyboardArrowUpRounded
              className={`${classes.icon} ${card && classes.iconCard}`}
            />
          ) : (
            <KeyboardArrowDownRounded
              className={`${classes.icon} ${card && classes.iconCard}`}
            />
          )}
        </Typography>
      )}
    </StyledBox>
  );
}
