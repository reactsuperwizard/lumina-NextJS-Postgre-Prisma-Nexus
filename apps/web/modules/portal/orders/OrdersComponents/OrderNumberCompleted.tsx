import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { CheckCircle } from '@mui/icons-material'
import { OrderStatus } from '@lumina/api'

const PREFIX = 'OrderNumberCompleted';

const classes = {
  wrap: `${PREFIX}-wrap`,
  textStyle: `${PREFIX}-textStyle`,
  mobileCompletedText: `${PREFIX}-mobileCompletedText`,
  checkIcon: `${PREFIX}-checkIcon`,
  mobileCheckIcon: `${PREFIX}-mobileCheckIcon`,
  green: `${PREFIX}-green`
};

const StyledBox = styled(Box)({
  [`&.${classes.wrap}`]: { display: 'flex', alignItems: 'center' },
  [`& .${classes.textStyle}`]: {
    fontSize: '0.95rem',
    padding: '5px 0 0',
  },
  [`& .${classes.mobileCompletedText}`]: {
    fontSize: '0.85rem',
  },
  [`& .${classes.checkIcon}`]: {
    marginRight: '0.75rem',
    marginLeft: 0,
    color: '#C5C3C3',
  },
  [`& .${classes.mobileCheckIcon}`]: {
    marginRight: 0,
    marginLeft: '0.25rem',
  },
  [`& .${classes.green}`]: { color: '#02BD1A' },
});

interface Props {
  status: OrderStatus
  videoCount: number
  requestCount: number
  mobile?: boolean
  text?: string
}

export const OrderNumberCompleted = ({
  status,
  videoCount,
  requestCount,
  mobile,
  text,
}: Props) => {

  return (
    <StyledBox className={classes.wrap}>
      {mobile && (
        <Typography
          variant="subtitle1"
          className={`${classes.textStyle} ${
            mobile && classes.mobileCompletedText
          }`}
        >
          <strong>{text || 'Completed:'}</strong>{' '}
          {`${videoCount}/${requestCount}`}
        </Typography>
      )}
      <CheckCircle
        className={`${classes.checkIcon} ${mobile && classes.mobileCheckIcon} ${
          status === OrderStatus.Completed && classes.green
        }`}
      />
      {!mobile && (
        <Typography variant="subtitle1" className={classes.textStyle}>
          <strong>{text || 'Completed:'}</strong> {`${videoCount} / ${requestCount}`}
        </Typography>
      )}
    </StyledBox>
  );
}
