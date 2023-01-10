import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Draggable from 'react-draggable'
import { gql, useQuery } from '@apollo/client'
import {
  Button,
  Paper,
  Box,
  Grid,
  Typography,
  CircularProgress,
  Theme,
} from '@mui/material'
import { Image, DragIndicator, CloseSharp } from '@mui/icons-material'
import lumina from 'public/color-positive-3x.png'
import checkerboard from 'public/checkerboard_background.png'
import { Asset, Folder } from '@lumina/api'
import { useRouter } from 'next/router'

const PREFIX = 'ImageModal'

const classes = {
  modalWrap: `${PREFIX}-modalWrap`,
  modalInnerWrap: `${PREFIX}-modalInnerWrap`,
  imageButton: `${PREFIX}-imageButton`,
  paperCursor: `${PREFIX}-paperCursor`,
  closeIcon: `${PREFIX}-closeIcon`,
  image: `${PREFIX}-image`,
  progress: `${PREFIX}-progress`,
  imageWrapper: `${PREFIX}-imageWrapper`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.modalWrap}`]: {
    position: 'relative',
    zIndex: 4000,
  },

  [`& .${classes.modalInnerWrap}`]: {
    position: 'absolute',
    height: 0,
    minWidth: '300px',
  },

  [`& .${classes.imageButton}`]: {
    padding: '10px 25px',
    lineHeight: 1.45,
    marginTop: '2rem',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },

  [`& .${classes.paperCursor}`]: {
    cursor: 'move',
  },

  [`& .${classes.closeIcon}`]: {
    cursor: 'pointer',
    margin: '0 0.25rem',
  },

  [`& .${classes.image}`]: {
    cursor: 'pointer',
    maxWidth: '350px',
    backgroundImage: `url(${checkerboard})`,
  },

  [`& .${classes.progress}`]: {
    width: '200px',
    height: '200px',
    margin: '1rem 75px',
  },

  [`& .${classes.imageWrapper}`]: {
    textAlign: 'center',
  },
}))

const GET_IMAGE = gql`
  query asset($where: AssetWhereUniqueInput!) {
    asset(where: $where) {
      id
      name
      assetType
      url
      folder {
        id
      }
    }
  }
`

type GetAssetQuery = Pick<Asset, 'id' | 'assetType' | 'url' | 'name'> & {
  folder: Pick<Folder, 'id'>
}

interface Props {
  id?: string
  title: string
}

export const ImageModal = ({ id, title }: Props) => {
  const [open, setOpen] = useState(false)
  const [queried, setQueried] = useState(false)
  const [dirty, setDirty] = useState(false)

  const router = useRouter()

  const toggleOpen = () => {
    setOpen(!open)
  }

  const shouldSkip = () => !id || !queried || isNaN(parseInt(id)) || !open

  const { data, error, loading, refetch } = useQuery<{
    asset: GetAssetQuery
  }>(GET_IMAGE, {
    variables: { where: { id: parseInt(id || '') } },
    skip: shouldSkip(),
  })

  useEffect(() => {
    shouldSkip() ? setDirty(true) : setDirty(false)
  }, [id])

  useEffect(() => {
    if (!dirty) return
    refetch()
    setDirty(false)
  }, [open])

  return (
    <Root>
      <Button
        className={classes.imageButton}
        color="primary"
        variant="contained"
        onClick={() => {
          if (!queried) setQueried(true)
          toggleOpen()
        }}
        endIcon={<Image />}
      >
        Image
      </Button>
      {open && (
        <div className={classes.modalWrap}>
          <div className={classes.modalInnerWrap}>
            <Draggable cancel="#image" defaultPosition={{ x: 200, y: -100 }}>
              <Paper className={classes.paperCursor}>
                <Box p={2}>
                  <Box mb={2} display="flex">
                    <Grid container>
                      <Grid item container xs={1} onClick={toggleOpen}>
                        <CloseSharp
                          color="primary"
                          className={classes.closeIcon}
                        />
                      </Grid>
                      <Grid container justifyContent="center" item xs={10}>
                        {title && (
                          <Typography color="textSecondary" noWrap>
                            {error || (!loading && !data?.asset?.id)
                              ? "That image doesn't exist"
                              : title + '-' + data?.asset?.name ||
                                `Asset Id ${id}`}
                          </Typography>
                        )}
                      </Grid>
                      <Grid container justifyContent="flex-end" item xs={1}>
                        <DragIndicator color="primary" />
                      </Grid>
                    </Grid>
                  </Box>
                  {data?.asset?.url ? (
                    <div className={classes.imageWrapper}>
                      <img
                        onClick={() => {
                          if (data.asset.folder?.id)
                            router.push(
                              `/admin/assets/${data.asset.folder.id}?show=${id}`,
                            )
                        }}
                        className={classes.image}
                        id={`image-${id}-${title}`}
                        src={data?.asset?.url || lumina}
                        alt={title || `Image ${id}`}
                      />
                    </div>
                  ) : loading ? (
                    <CircularProgress
                      size="large"
                      className={classes.progress}
                    />
                  ) : undefined}
                </Box>
              </Paper>
            </Draggable>
          </div>
        </div>
      )}
    </Root>
  )
}
