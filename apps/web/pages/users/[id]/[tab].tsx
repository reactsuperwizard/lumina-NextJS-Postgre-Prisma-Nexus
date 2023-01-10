import React from 'react'

import { styled } from '@mui/material/styles';

import { Tab } from 'modules/users/[id]/Tab'

import { Box } from '@mui/material'

import { MainAppBar } from 'modules/layouts/MainAppBar'
import { ILayout } from 'modules/layouts/Types'
import { Copyright } from 'modules/layouts/Copyright'

const PREFIX = 'TabPage';

const classes = {
  portalBody: `${PREFIX}-portalBody`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.portalBody}`]: {
    backgroundColor: '#F0EFEF',
    height: '1000px',
    paddingTop: '1rem',
  },
});

export const TabPage = () => <Tab />

const Layout = ({ children }: ILayout) => {

  return (
    (<Root>
      <div>
        <MainAppBar />
      </div>
      <div className={classes.portalBody}>{children}</div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Root>)
  );
}

TabPage.Layout = Layout

export default TabPage
