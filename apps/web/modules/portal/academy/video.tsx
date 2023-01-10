import { useRouter } from 'next/router'
import { Paper, styled } from '@mui/material'
import { Box } from '@mui/system'
import { Player } from '@lumina/player'
import { academyData } from '.'
import { DetailsHeader } from '../components/DetailsHeader'

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.container}`]: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    maxWidth: '82em',
    columnGap: '2rem',
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 17em',
    },
    position: 'relative',
  },

  [`& .${classes.boxPadding}`]: {
    padding: '1rem 0 0',
  },
}))
const PREFIX = 'AcademyDetail'

const classes = {
  container: `${PREFIX}-container`,
  boxPadding: `${PREFIX}-boxPadding`,
}

export const AcademyVideoDetail = () => {
  const router = useRouter()
  const query = router.query
  const vimeoId: number = parseInt(query?.id?.toString())
  const title = academyData.find(
    ({ vimeoId: itemId }) => itemId === vimeoId,
  )?.title

  return (
    <>
      <Root className={classes.container}>
        <Box className={classes.boxPadding}>
          <DetailsHeader title={title!} />
          <Paper elevation={2} sx={{ position: 'relative', mt: 2 }}>
            <Player responsive={true} vimeoId={vimeoId as number} />
          </Paper>
        </Box>
      </Root>
    </>
  )
}
