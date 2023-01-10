import React from 'react'
import { styled } from '@mui/system';
import {
  TableRow,
  Typography,
  TableCell,
  Box,
  useMediaQuery,
} from '@mui/material'
import { Theme } from '@mui/material/styles';
import { GetOrdersQuery } from '..'
import { AnimatedThumbnail } from '../../components/AnimatedThumbnail'
import { OrderStatus, RequestStatus, VideoStatus } from '@lumina/api'
import { OrderNumberCompleted } from './OrderNumberCompleted'
import { JobTitleList } from './JobTitleList'
import { Skeleton } from '@mui/material';

import inProgress from '../../public/in-progress.png'
import pending from '../../public/pending.png'

const PREFIX = 'OrderRow';

const classes = {
  orderRow: `${PREFIX}-orderRow`,
  completedCell: `${PREFIX}-completedCell`,
  completedWrap: `${PREFIX}-completedWrap`,
  subtitleText: `${PREFIX}-subtitleText`,
  denseIdCell: `${PREFIX}-denseIdCell`,
  denseIdText: `${PREFIX}-denseIdText`,
  idTextSkeleton: `${PREFIX}-idTextSkeleton`,
  denseIdNumber: `${PREFIX}-denseIdNumber`,
  thumbnailCell: `${PREFIX}-thumbnailCell`,
  thumbnailWrap: `${PREFIX}-thumbnailWrap`,
  jobTitleCell: `${PREFIX}-jobTitleCell`,
  spacer: `${PREFIX}-spacer`,
  bigSpacer: `${PREFIX}-bigSpacer`
};

const StyledTableRow = styled(TableRow)((
  {
    theme
  }
) => ({
  [`&.${classes.orderRow}`]: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },

  [`& .${classes.completedCell}`]: {
    paddingRight: 0,
  },

  [`& .${classes.completedWrap}`]: {
    height: '8rem',
    width: '15rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },

  [`& .${classes.subtitleText}`]: {
    fontSize: '0.95rem',
    padding: '0',
  },

  [`& .${classes.denseIdCell}`]: {
    maxWidth: '6rem',
    textAlign: 'center',
  },

  [`& .${classes.denseIdText}`]: {
    fontWeight: 'bold',
    fontSize: '0.75rem',
  },

  [`& .${classes.idTextSkeleton}`]: {
    minWidth: '2.75rem',
  },

  [`& .${classes.denseIdNumber}`]: {
    fontSize: '1.25rem',
  },

  [`& .${classes.thumbnailCell}`]: {
    paddingLeft: 0,
    paddingRight: 0,
  },

  [`& .${classes.thumbnailWrap}`]: {
    minWidth: '12rem',
    maxWidth: '19rem',
  },

  [`& .${classes.jobTitleCell}`]: {
    height: '100%',
    maxWidth: '15rem',
    minWidth: '9rem',
  },

  [`& .${classes.spacer}`]: {
    width: 0,
  },

  [`& .${classes.bigSpacer}`]: {
    width: '20rem',
  }
}));

export const OrderRow = ({
  order,
  handleOnClick,
}: {
  order?: GetOrdersQuery['orders'][0]
  handleOnClick: () => void
}): JSX.Element => {

  const xl = useMediaQuery('(min-width:1920px)')
  const dense = useMediaQuery('(max-width:1080px)')

  return (
    <StyledTableRow className={classes.orderRow} onClick={handleOnClick}>
      {dense && (
        <TableCell
          key={`completedCreated${order?.id || ''}`}
          className={classes.completedCell}
        >
          <Box className={classes.completedWrap}>
            <Typography variant="subtitle1" className={classes.subtitleText}>
              <strong>Order Id:</strong> {order?.id || '##'}
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitleText}>
              {`Opened: ${
                order
                  ? new Date(order.createdAt).toLocaleString('en-US')
                  : 'mm/dd/yyyy, hh:mm:ss XM'
              }`}
            </Typography>
            <OrderNumberCompleted
              status={order?.status || OrderStatus.InProgress}
              videoCount={
                order?.videos?.filter((v) => v.status === VideoStatus.Live)
                  .length || 0
              }
              requestCount={order?.requests?.length || 0}
            />
          </Box>
        </TableCell>
      )}
      {!dense && (
        <TableCell
          key={`orderId${order?.id || ''}`}
          className={classes.denseIdCell}
        >
          <Typography variant="body2" className={classes.denseIdText}>
            Order Id:
          </Typography>
          <Typography variant="body1" className={classes.denseIdNumber}>
            {order?.id || '##'}
          </Typography>
        </TableCell>
      )}
      <TableCell
        key={`thumbnail${order?.id || ''}`}
        className={classes.thumbnailCell}
      >
        <Box className={classes.thumbnailWrap}>
          {order?.videos && order.videos.length > 0 ? (
            <AnimatedThumbnail
              urlList={order.videos.map((v) =>
                v.status === VideoStatus.Live
                  ? v.thumbnail || inProgress
                  : inProgress,
              )}
            />
          ) : !order ? (
            <AnimatedThumbnail />
          ) : (
            <AnimatedThumbnail
              urlList={
                order.requests?.filter(
                  (r) =>
                    r.status !== RequestStatus.Cancelled &&
                    r.status !== RequestStatus.Draft,
                )[0]
                  ? order.requests
                      .filter((r) => r.status !== RequestStatus.Cancelled)
                      .map((r) =>
                        r.status === RequestStatus.Draft ? pending : inProgress,
                      )
                  : order.requests.filter(
                      (r) => r.status !== RequestStatus.Cancelled,
                    )[0]
                  ? order.requests
                      .filter((r) => r.status !== RequestStatus.Cancelled)
                      .map((_r) => pending)
                  : [pending]
              }
            />
          )}
        </Box>
      </TableCell>

      <TableCell
        key={`jobTitleList${order?.id || ''}`}
        className={classes.jobTitleCell}
      >
        <JobTitleList
          requests={order?.requests || []}
          orderId={order?.id || 0}
        />
      </TableCell>
      {!dense && (
        <TableCell
          key={`completedCreated${order?.id || ''}`}
          className={classes.completedCell}
        >
          <Box className={classes.completedWrap}>
            {order ? (
              <OrderNumberCompleted
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
            ) : (
              <Skeleton width="100%" />
            )}
            <Typography variant="subtitle1" className={classes.subtitleText}>
              {`Opened: ${
                order
                  ? new Date(order.createdAt).toLocaleString('en-US')
                  : 'mm/dd/yyyy, hh:mm:ss XM'
              }`}
            </Typography>
          </Box>
        </TableCell>
      )}
      {!dense && (
        <TableCell
          key={`spacer`}
          align="right"
          className={`${classes.spacer} ${xl && classes.bigSpacer}`}
        />
      )}
    </StyledTableRow>
  );
}
