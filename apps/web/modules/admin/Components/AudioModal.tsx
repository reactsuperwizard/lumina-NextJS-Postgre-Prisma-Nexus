import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import { useQuery, gql } from '@apollo/client'
import {
  Button,
  Box,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  styled,
  Link,
  IconButton,
} from '@mui/material'
import { MusicNote, DragIndicator, CloseSharp } from '@mui/icons-material'
import { Asset, Folder } from '@lumina/api'
import { useRouter } from 'next/router'
import { AudioPlayer2 } from './AudioPlayer2'

const PREFIX = 'AudioModal'

const classes = {
  modalWrap: `${PREFIX}-modalWrap`,
  modalInnerWrap: `${PREFIX}-modalInnerWrap`,
  audioButton: `${PREFIX}-audioButton`,
  paperStyle: `${PREFIX}-paperStyle`,
  closeIcon: `${PREFIX}-closeIcon`,
  image: `${PREFIX}-image`,
  progress: `${PREFIX}-progress`,
  folderLink: `${PREFIX}-folderLink`,
}

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '10px 25px',
  lineHeight: 1.45,
  marginTop: '2rem',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}))

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.modalWrap}`]: {
    position: 'relative',
    zIndex: 4000,
  },

  [`& .${classes.modalInnerWrap}`]: {
    position: 'absolute',
    height: 0,
  },

  [`& .${classes.paperStyle}`]: {
    cursor: 'move',
    width: 400,
    height: '100%',
  },

  [`& .${classes.closeIcon}`]: {
    cursor: 'pointer',
    margin: '0 0.25rem',
  },

  [`& .${classes.image}`]: {
    cursor: 'auto',
    maxWidth: '350px',
  },

  [`& .${classes.progress}`]: {
    width: '200px',
    height: '200px',
    margin: '1rem 75px',
  },

  [`& .${classes.folderLink}`]: {
    margin: '1.5rem 0 -0.5rem',
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
  },
}))

const GET_AUDIO = gql`
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

export const AudioModal = ({ id, title }: Props) => {
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
  }>(GET_AUDIO, {
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

  if (!id && id !== '') {
    return null
  }

  return (
    <>
      <StyledButton
        color="primary"
        variant="contained"
        onClick={() => {
          setQueried(true)
          toggleOpen()
        }}
        endIcon={<MusicNote />}
      >
        Audio
      </StyledButton>
      {open && (
        <Root className={classes.modalWrap}>
          <div className={classes.modalInnerWrap}>
            <Draggable cancel="#player" defaultPosition={{ x: 200, y: -100 }}>
              <div>
                <Paper className={classes.paperStyle}>
                  <Box p={3}>
                    <Box mb={2} display="flex">
                      <Grid container>
                        <Grid container item xs={1} onClick={toggleOpen}>
                          <IconButton className={classes.closeIcon}>
                            <CloseSharp
                              sx={{ position: 'absolute' }}
                              color="primary"
                            />
                          </IconButton>
                        </Grid>
                        <Grid justifyContent="center" item xs={10}>
                          {title && (
                            <Typography color="textSecondary" noWrap>
                              {error || (!loading && !data?.asset?.id)
                                ? "That audio doesn't exist"
                                : title +
                                  '-' +
                                  (data?.asset?.name || `Asset Id ${id}`)}
                            </Typography>
                          )}
                        </Grid>
                        <Grid container justifyContent="flex-end" item xs={1}>
                          <DragIndicator color="primary" />
                        </Grid>
                      </Grid>
                    </Box>
                    <Grid
                      id="player"
                      style={{ cursor: 'auto' }}
                      item
                      justifyContent="center"
                    >
                      {loading && (
                        <CircularProgress
                          size="large"
                          className={classes.progress}
                        />
                      )}
                      {data?.asset?.url && (
                        <AudioPlayer2 src={data.asset.url} />
                      )}
                    </Grid>
                    {data?.asset?.folder?.id && (
                      <Grid item className={classes.folderLink}>
                        <Link
                          onClick={() => {
                            if (data.asset.folder?.id)
                              router.push(
                                `/admin/assets/${data.asset.folder.id}?show=${id}`,
                              )
                          }}
                        >
                          view in assets
                        </Link>
                      </Grid>
                    )}
                  </Box>
                </Paper>
              </div>
            </Draggable>
          </div>
        </Root>
      )}
    </>
  )
}
