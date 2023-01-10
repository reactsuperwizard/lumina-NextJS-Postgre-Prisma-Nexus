import React from 'react'

import { styled } from '@mui/material/styles'

import clsx from 'clsx'

import { Theme, lighten } from '@mui/material/styles'

import {
  Toolbar as MuiToolbar,
  Typography,
  Tooltip,
  IconButton,
  CircularProgress,
  Button,
  Chip,
} from '@mui/material'

import { Delete } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { QueryArgs, RequiredQueryArgs } from './ResourceList'
import { FilterChip } from './FilterChip'

const PREFIX = 'Toolbar'

const classes = {
  root: `${PREFIX}-root`,
  highlight: `${PREFIX}-highlight`,
  title: `${PREFIX}-title`,
  filterChip: `${PREFIX}-filterChip`,
  newOrLoading: `${PREFIX}-newOrLoading`,
}

const StyledMuiToolbar = styled(MuiToolbar)(({ theme }) => ({
  [`&.${classes.root}`]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },

  [`&.${classes.highlight}`]:
    theme.palette.mode === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },

  [`& .${classes.title}`]: {
    flex: '1 1 100%',
  },

  [`& .${classes.filterChip}`]: {
    margin: '0 0.25rem',
  },

  [`& .${classes.newOrLoading}`]: {
    width: '13rem',
    maxWidth: '13rem',
    margin: '0 0.5rem',
    flexShrink: 'revert',
  },
}))

interface ToolbarProps {
  numSelected: number
  title: string
  loading: boolean
  args: RequiredQueryArgs
  handleUpdateArgs: (newArg: QueryArgs) => void
  chipKeyNameMapping?: { [column: string]: string }
}

export const Toolbar = ({
  numSelected,
  title,
  loading,
  args,
  handleUpdateArgs,
  chipKeyNameMapping,
}: ToolbarProps) => {
  const router = useRouter()
  const { where, ...restArgs } = args
  const keys: string[] = Object.keys(restArgs)
  if (where) keys.push(...Object.keys(where).map((key) => `where.${key}`))
  const removeFilter = (keyToRemove: string) => {
    let newArgs: QueryArgs
    if (keyToRemove.includes('where.')) {
      const subKey = keyToRemove.replace('where.', '')
      delete where[subKey.split('.')[0]]
      newArgs = { ...args, where }
    } else {
      newArgs = { ...args, [keyToRemove]: undefined }
    }

    handleUpdateArgs(newArgs)
  }

  return (
    <StyledMuiToolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" size="large">
            <Delete />
          </IconButton>
        </Tooltip>
      ) : null}
      {keys.map((k) =>
        k === 'skip' ? undefined : (
          <FilterChip
            chipKey={k}
            removeFilter={removeFilter}
            args={args}
            key={`${k}-chip`}
            chipKeyNameMapping={chipKeyNameMapping}
          />
        ),
      )}
      <Button
        variant="contained"
        color="secondary"
        disabled={loading}
        className={classes.newOrLoading}
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          event.stopPropagation()
          router.push(
            `/${router.pathname.split('/')[1]}/${title.toLowerCase()}s/new`,
          )
        }}
      >
        {loading ? (
          <CircularProgress size="2rem" color="secondary" />
        ) : (
          `New ${title}`
        )}
      </Button>
    </StyledMuiToolbar>
  )
}
