/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Chip, Theme, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { useApolloClient } from '@apollo/client'
import gql from 'graphql-tag'

const PREFIX = 'TagInput'

const classes = {
  root: `${PREFIX}-root`,
  autoComplete: `${PREFIX}-autoComplete`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },

  [`& .${classes.autoComplete}`]: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

// Autocomplete input that searches for cloudinary tags
// takes "handleOnChange" function to handle results when
// input results change`
export const TagInput = ({
  label,
  handleOnChange,
  tags,
  disableClearable = false,
  placeholder = '',
}: {
  placeholder?: string
  disableClearable?: boolean
  label?: string
  handleOnChange: (newValue: string[]) => void
  tags: string[]
}) => {
  const client = useApolloClient()
  const [tagResults, setTagResults] = useState<string[]>([''])
  const [param, setParam] = useState<string[]>(tags)

  useEffect(() => {
    ;(async () => {
      if (param?.length > 0 && !Array.isArray(param)) {
        const GET_TAGS = gql`
          query getTags($params: CloudinaryTagsInput) {
            getAssetTags(params: $params) {
              tags
            }
          }
        `
        const { data } = await client.query({
          query: GET_TAGS,
          variables: { params: { prefix: param } },
        })
        setTagResults(data.getAssetTags.tags)
      } else {
        setTagResults([])
      }
    })()
  }, [param])

  const handleOnInputChange = (event: any) => setParam(event.target.value)

  return (
    <Root className={classes.root}>
      <div className={classes.autoComplete}>
        <Autocomplete
          multiple
          style={{ width: '100%' }}
          disableClearable={disableClearable}
          id="tags"
          options={tagResults.map((option: string) => option)}
          freeSolo
          onChange={(_, newValue) => handleOnChange(newValue)}
          onInputChange={handleOnInputChange}
          renderTags={(value, getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                // key={index}
                color="primary"
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          value={tags}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={label || ''}
              placeholder={placeholder}
            />
          )}
          fullWidth
        />
      </div>
    </Root>
  )
}
