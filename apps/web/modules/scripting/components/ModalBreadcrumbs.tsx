import { Breadcrumbs, Link, styled, Typography } from '@mui/material'

export interface IBreadcrum {
  folderId: number
  name: string
}

interface Props {
  tags: IBreadcrum[]
  handleClick: (idx: number) => void
}
const PREFIX = 'ModalBreadcrumbs'

const classes = {
  link: `${PREFIX}-link`,
  root: `${PREFIX}-root`,
}

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  [`&.${classes.root}`]: {
    fontSize: '0.75rem',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  [`& .${classes.link}`]: {
    cursor: 'pointer',
    textDecoration: 'underline',
    color: theme.palette.primary.main,
  },
}))

export const ModalBreadcrumbs = ({ tags, handleClick }: Props) => {
  const currentTag = tags[tags.length - 1]
  const linkTags = tags.slice(0, tags.length - 1)
  return (
    <StyledBreadcrumbs
      maxItems={5}
      aria-label="breadcrumb"
      className={classes.root}
    >
      {linkTags.map((tag, idx) => (
        <Link
          onClick={() => handleClick(idx)}
          underline="hover"
          className={classes.link}
          color="inherit"
        >
          {tag.name}
        </Link>
      ))}
      {currentTag && (
        <Typography fontSize={'0.75rem'} color="text.primary">
          {currentTag.name}
        </Typography>
      )}
    </StyledBreadcrumbs>
  )
}
