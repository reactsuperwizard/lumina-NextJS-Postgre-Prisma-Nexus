import { styled } from '@mui/system'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

type Props = {
  currentSlideIndex: number
  setCurrentSlide: (func: (slideNumberToSet: number) => number) => void
}

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),

  svg: {
    color: '#999999',
  },
}))

const SlideNavigator = ({
  setCurrentSlide,
  currentSlideIndex,
}: React.PropsWithChildren<Props>) => {
  return (
    <Root>
      <ArrowBackIosNewIcon
        onClick={() => setCurrentSlide((c: number) => (c > 0 ? c - 1 : 0))}
      />
      <span>Slide {`${currentSlideIndex + 1} of ${5}`}</span>
      <ArrowForwardIosIcon
        onClick={() => setCurrentSlide((c: number) => (c < 4 ? c + 1 : c))}
      />
    </Root>
  )
}

export default SlideNavigator
