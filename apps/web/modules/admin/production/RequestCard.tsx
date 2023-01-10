import { Card, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import React from 'react'

const PREFIX = 'RequestCard'

const classes = {
  cardWrap: `${PREFIX}-cardWrap`,
  title: `${PREFIX}-title`,
  idCustomerGrid: `${PREFIX}-idCustomerGrid`,
}

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.cardWrap}`]: {
    padding: '0.5rem',
    cursor: 'pointer',
    marginBottom: '1rem',
  },

  [`& .${classes.title}`]: {
    textAlign: 'left',
    padding: '0.25rem 0.25rem 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },

  [`& .${classes.idCustomerGrid}`]: {
    margin: '-0.5rem -0.5rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.25rem 0.75rem',
    columnGap: '1rem',
    textAlign: 'left',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}))

interface Props {
  requestId: number
  jobTitle: string
  customer: string
  owner: string
}

export const RequestCard = ({
  requestId,
  jobTitle,
  customer,
  owner,
}: Props) => {
  const router = useRouter()

  const showRequest = () => {
    const newQuery = { ...router.query, request: requestId }
    router.push({ pathname: '/admin/production', query: newQuery })
  }
  return (
    <StyledCard className={classes.cardWrap} onClick={showRequest}>
      <div className={classes.idCustomerGrid}>
        <Typography variant="body1">{requestId}</Typography>
        <Typography variant="body2" noWrap>
          {customer}
        </Typography>
      </div>
      <div className={classes.title}>
        <Typography variant="body1" noWrap>
          {jobTitle}
        </Typography>
        <Typography variant="body2" noWrap>
          {owner}
        </Typography>
      </div>
    </StyledCard>
  )
}
