import { AccountCircle } from '@mui/icons-material'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import sarah from '../public/headshots/sarah.png'
import sarah2 from '../public/headshots/sarah2.png'
import bruce from '../public/headshots/bruce.png'
import celeste from '../public/headshots/celeste.png'
import liam from '../public/headshots/liam.png'
import brian from '../public/headshots/brian.png'
import huston from '../public/headshots/huston.png'
import leah from '../public/headshots/leah.png'
import kelsey from '../public/headshots/kelsey.png'

const PREFIX = 'ProducerImage'

const classes = {
  container: `${PREFIX}-container`,
  producedByTitleContainer: `${PREFIX}-producedByTitleContainer`,
  producedByTitle: `${PREFIX}-producedByTitle`,
  imageAndAccountCircle: `${PREFIX}-imageAndAccountCircle`,
}
const Root = styled('div')({
  [`& .${classes.container}`]: {
    display: 'grid',
    gridTemplateColumns: '1fr 45px',
    rowGap: '3rem',
    maxWidth: '20rem',
  },
  [`& .${classes.producedByTitleContainer}`]: {
    display: 'flex',
    alignItems: 'center',
  },
  [`& .${classes.producedByTitle}`]: {
    paddingRight: '0.75rem',
    textAlign: 'center',
    fontWeight: 300,
    paddingBottom: '0',
    opacity: '0.8',
  },
  [`& .${classes.imageAndAccountCircle}`]: {
    width: '45px',
    height: '45px',
  },
})

const StyledAccountCircle = styled(AccountCircle)(() => ({
  [`& .${classes.imageAndAccountCircle}`]: {
    width: '45px',
    height: '45px',
  },
}))

export const ProducerImage = (props: {
  producerId: number | null | undefined
}) => {
  const { producerId } = props
  const [image, setImage] = useState<{ img: string; name: string } | null>(null)

  const imageMap: { [id: number]: { img: string; name: string } } = {
    13: { img: huston, name: 'Huston' },
    8: { img: bruce, name: 'Bruce' },
    5: { img: celeste, name: 'Celeste' },
    4: { img: liam, name: 'Liam' },
    3: { img: brian, name: 'Brian' },
    2: { img: sarah, name: 'Sarah' },
    1: { img: huston, name: 'Huston' },
    69: { img: leah, name: 'Leah' },
    454: { img: sarah2, name: 'Sarah' },
    676: { img: kelsey, name: 'Kelsey' },
  }

  useEffect(() => {
    if (!producerId) return
    const _image = imageMap[producerId] || null
    if (_image) setImage(_image)
  }, [producerId])

  return image ? (
    <Root>
      <div className={classes.container}>
        <div className={classes.producedByTitleContainer}>
          <Typography className={classes.producedByTitle} variant="subtitle2">
            <strong>Produced by:</strong>
          </Typography>
          <Typography className={classes.producedByTitle} variant="subtitle2">
            {`${image.name || 'Lumina Team'}`}
          </Typography>
        </div>
        <img src={image.img} className={classes.imageAndAccountCircle} />
      </div>
    </Root>
  ) : (
    <StyledAccountCircle
      color="disabled"
      className={classes.imageAndAccountCircle}
    />
  )
}
