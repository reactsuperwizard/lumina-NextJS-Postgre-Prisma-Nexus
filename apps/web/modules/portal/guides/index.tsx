import React from 'react'
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { ImageList, Container } from '@mui/material'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import { ArrowForward } from '@mui/icons-material'

import gettingStarted from '.././public/gettingStarted.jpg'
import bestPractices from '.././public/bestPractices.jpg'
import videoTutorials from '.././public/videoTutorials.jpg'

const PREFIX = 'Guides';

const classes = {
  guidesContainer: `${PREFIX}-guidesContainer`,
  gridList: `${PREFIX}-gridList`,
  title: `${PREFIX}-title`
};

const Root = styled('div')((
  {
   theme
  }
) => ({
  [`&.${classes.guidesContainer}`]: {
    paddingTop: '6rem',
  },

  [`& .${classes.gridList}`]: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },

  [`& .${classes.title}`]: {
    color: theme.palette.primary.light,
  }
}));

const tileData = [
  {
    img: gettingStarted,
    title: 'Getting Started',
    author: 'author',
  },
  {
    img: bestPractices,
    title: 'Best Practices',
    author: 'author',
  },
  {
    img: videoTutorials,
    title: 'Video Tutorials',
    author: 'author',
  },
]

export const Guides = () => {


  return (
    <Root className={classes.guidesContainer}>
      <Container maxWidth="lg">
        <ImageList
          className={classes.gridList}
          cols={4.5}
        >
          {tileData.map((tile) => (
            <ImageListItem key={tile.img} cols={1.5}>
              <img src={tile.img} alt={tile.title} />
              <ImageListItemBar
                title={tile.title}
                actionIcon={
                  <IconButton aria-label={`star ${tile.title}`} size="large">
                    <ArrowForward
                      style={{ color: 'white' }}
                      className={classes.title}
                    />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </Root>
  );
}
