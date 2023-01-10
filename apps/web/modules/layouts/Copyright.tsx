import React, { FunctionComponent } from 'react'

import { styled } from '@mui/material/styles';

import Link from 'next/link'

import { Typography } from '@mui/material'
const PREFIX = 'Copyright';

const classes = {
  copyRight: `${PREFIX}-copyRight`
};

const Root = styled('div')({
  [`&.${classes.copyRight}`]: {
    marginBottom: '2rem',
  },
});

export const Copyright: FunctionComponent = () => {

  return (
    <Root className={classes.copyRight}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link href="https://www.lumina.co/">Lumina</Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Root>
  );
}
