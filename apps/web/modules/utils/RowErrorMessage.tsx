import { Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import React from 'react'

const PREFIX = 'RowErrorMessage';

const classes = {
  errorMessageCard: `${PREFIX}-errorMessageCard`
};

const StyledBox = styled(Box)({
  [`& .${classes.errorMessageCard}`]: {
    width: '100%',
    padding: '3rem',
    textAlign: 'center',
    borderBottom: '1px solid lightgrey',
  },
});

interface IRowErrorMessage {
  text: string
}

export const RowErrorMessage = ({ text }: IRowErrorMessage): JSX.Element => {

  return (
    <StyledBox style={{ width: '100%', height: '10rem', paddingTop: '3rem' }}>
      <Box className={classes.errorMessageCard}>
        <Typography>{text}</Typography>
      </Box>
    </StyledBox>
  );
}
