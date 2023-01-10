import React from 'react'
import { useRouter } from 'next/router'
import { Box, styled } from '@mui/system'
import { VideoCard } from '../videos/VideoCard'

const PREFIX = 'Academy'

const classes = {
  gridList: `${PREFIX}-gridList`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.gridList}`]: {
    padding: '0 0 2rem',
    margin: '0 -0.25rem',
    display: 'grid',
    gridGap: '1rem',
    minHeight: '48vh',
    gridTemplateColumns: '1fr',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },
    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    },
  },
}))
export const academyData = [
  {
    vimeoId: 745843743,
    title: 'How to Use Lumina on LinkedIn',
    createdAt: new Date('2022/09/01'),
  },
  {
    vimeoId: 745843723,
    title: 'How to Use Lumina on Indeed',
    createdAt: new Date('2022/09/01'),
  },
  {
    vimeoId: 745843708,
    title: 'How to Use Lumina on Facebook',
    createdAt: new Date('2022/09/01'),
  },
]

export const Academy = () => {
  const router = useRouter()
  const query = router.query
  const slug: string = query?.portal?.toString().toLowerCase()
  return (
    <StyledBox>
      <Box className={classes.gridList}>
        {academyData.map(({ vimeoId, title, createdAt }) => (
          <VideoCard
            video={{
              id: vimeoId,
              vimeoId,
              createdAt,
              name: title,
            }}
            onClick={() => router.push(`/${slug}/academy/${vimeoId}`)}
          />
        ))}
      </Box>
    </StyledBox>
  )
}
