import React from 'react'
import { styled } from '@mui/material/styles';
import { Button, Link } from '@mui/material'
const PREFIX = 'LinkButton';

const classes = {
  linkText: `${PREFIX}-linkText`
};

const StyledLink = styled(Link)({
  [`& .${classes.linkText}`]: {
    textTransform: 'none',
    justifyContent: 'flex-start',
  },
});

interface Props {
  href: string
  text?: string
  blank?: boolean
  disabled?: boolean
}

export const LinkButton = ({ href, text, blank, disabled }: Props) => {

  return (
    <StyledLink
      href={disabled ? undefined : href}
      target={blank ? '_blank' : undefined}
    >
      <Button
        fullWidth
        variant="outlined"
        className={classes.linkText}
        disabled={disabled || false}
      >
        {text || href}
      </Button>
    </StyledLink>
  );
}
