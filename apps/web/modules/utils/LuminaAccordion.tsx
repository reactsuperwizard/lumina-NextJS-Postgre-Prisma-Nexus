import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  styled,
  Typography,
} from '@mui/material'
import { useState } from 'react'

const PREFIX = 'Lumina-Accordion'

const classes = {
  main: `${PREFIX}-main`,
  details: `${PREFIX}-details`,
}

interface Props {
  openOnStart: boolean
  title: string
  children: React.ReactNode
  expandIcon: React.ReactNode
  collapseIcon: React.ReactNode
}

const StyledAccordion = styled(Accordion)(() => ({
  [`&.${classes.main}`]: {
    boxShadow: 'none',
    border: '1px solid #D9D9D9',
  },

  [`& .${classes.details}`]: {
    padding: 0,
  },
}))
export const LuminaAccordion = ({
  children,
  title,
  expandIcon,
  collapseIcon,
  openOnStart,
}: Props) => {
  const [expanded, setExpanded] = useState(openOnStart)
  return (
    <StyledAccordion
      className={classes.main}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary expandIcon={expanded ? expandIcon : collapseIcon}>
        <Typography fontSize={'1.25rem'} fontWeight={'bold'}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        {children}
      </AccordionDetails>
    </StyledAccordion>
  )
}
