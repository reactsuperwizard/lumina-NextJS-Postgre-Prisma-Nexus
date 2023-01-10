import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { Box, Container, Grid, Link, Theme, Typography } from '@mui/material'
import {
  ArrowUpward,
  Folder as FolderIcon,
  FolderOutlined,
} from '@mui/icons-material'
import { LiveField } from 'modules/utils'
import { Folder, FolderWhereUniqueInput } from '@lumina/api'

const PREFIX = 'AssetFolder'

const classes = {
  mainContainer: `${PREFIX}-mainContainer`,
  folderIcon: `${PREFIX}-folderIcon`,
  link: `${PREFIX}-link`,
  draggable: `${PREFIX}-draggable`,
  dragHover: `${PREFIX}-dragHover`,
  noHover: `${PREFIX}-noHover`,
  nameBox: `${PREFIX}-nameBox`,
  editButton: `${PREFIX}-editButton`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.mainContainer}`]: {
    margin: '1rem 0',
    textAlign: 'center',
  },

  [`& .${classes.folderIcon}`]: {
    fontSize: '6rem',
  },

  [`& .${classes.link}`]: { width: '100%' },

  [`& .${classes.draggable}`]: {
    position: 'relative',
    textDecoration: 'none',
    minWidth: '10rem',
    listStyle: 'none',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
      '& .MuiSvgIcon-root': {
        color: theme.palette.primary.main,
      },
    },
  },

  [`& .${classes.dragHover}`]: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  [`& .${classes.noHover}`]: { border: '2px solid transparent' },

  [`& .${classes.nameBox}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '10rem',
    margin: 'auto',
  },

  [`& .${classes.editButton}`]: {
    position: 'absolute',
    top: '0.25rem',
    left: '0.25rem',
    height: '2rem',
    width: '2rem',
    color: 'transparent',
    '& .MuiSvgIcon-root': {
      fontSize: '0.9rem',
      '&:hover': {
        color: theme.palette.primary.dark,
      },
    },
  },
}))

const UPDATE_ASSET = gql`
  mutation updateAsset(
    $where: AssetWhereUniqueInput!
    $data: AssetUpdateInput!
  ) {
    updateOneAsset(where: $where, data: $data) {
      id
      name
      folder {
        id
      }
    }
  }
`

const UPDATE_FOLDER = gql`
  mutation updateFolder(
    $where: FolderWhereUniqueInput!
    $data: FolderUpdateInput!
  ) {
    updateOneFolder(where: $where, data: $data) {
      id
      name
      parent {
        id
        name
      }
    }
  }
`

interface IProps {
  folder: Pick<Folder, 'id' | 'name'>
  parent?: boolean
  root?: boolean
  refetch: () => void
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>
}

export const AssetFolder = ({
  folder,
  parent = false,
  root = false,
  refetch,
  setUpdating,
}: IProps) => {
  const router = useRouter()
  const [hover, setHover] = useState(false)
  const [edit, setEdit] = useState(false)

  const [updateAsset] = useMutation(UPDATE_ASSET)
  const [updateFolder] = useMutation(UPDATE_FOLDER)

  const where: FolderWhereUniqueInput = { id: folder.id }

  const makeHandleDrop = (folder: Pick<Folder, 'id' | 'name'>) => {
    return async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (hover) setHover(false)
      const dataTransfer = e.dataTransfer
      if (!dataTransfer) return
      let data
      try {
        data = JSON.parse(dataTransfer.getData('text'))
      } catch (error) {
        data = null
      }
      if (data) {
        if (data.id === folder.id && data.__typename !== 'Asset') return
        setUpdating(true)
        const isAsset = data.__typename === 'Asset'
        if (isAsset) {
          const assetId = data.id
          await updateAsset({
            variables: {
              where: { id: assetId },
              data: { folder: { connect: { id: folder.id } } },
            },
          })
        } else {
          const droppedFolderId = data.id
          if (droppedFolderId !== folder.id) {
            await updateFolder({
              variables: {
                where: { id: droppedFolderId },
                data: { parent: { connect: { id: folder.id } } },
              },
            })
          }
        }
        await refetch()
        setUpdating(false)
      }
    }
  }

  const handleDrag = async (
    e: React.DragEvent<HTMLDivElement>,
    resource: any,
  ) => {
    e.dataTransfer.setData('text', JSON.stringify(resource))
  }

  return (
    <Root>
      <Container>
        <Box flexGrow={1} m={2}>
          <Grid container className={classes.mainContainer} spacing={4}>
            <Grid
              draggable={!parent && !edit}
              onDragStart={(e) => handleDrag(e, folder)}
              onDragOver={() => {
                if (!hover) setHover(true)
              }}
              onDragLeave={() => {
                if (hover) setHover(false)
              }}
              container
              justifyContent="center"
              className={`${classes.draggable} ${
                hover ? classes.dragHover : classes.noHover
              }`}
              onClick={() => {
                if (edit) {
                  setEdit(false)
                  return
                }
                router.push(
                  '/' +
                    router.pathname.split('/')[1] +
                    '/assets/' +
                    (root || folder.id === 1 ? '' : folder.id),
                )
              }}
            >
              <Link className={classes.link}>
                <div
                  onDrop={makeHandleDrop(folder)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {parent ? (
                    <ArrowUpward
                      color="secondary"
                      className={classes.folderIcon}
                    />
                  ) : edit ? (
                    <FolderOutlined
                      color="secondary"
                      className={classes.folderIcon}
                    />
                  ) : (
                    <FolderIcon
                      color="secondary"
                      className={classes.folderIcon}
                    />
                  )}
                </div>
                <Box component="div" className={classes.nameBox}>
                  {edit ? (
                    <Box
                      component="div"
                      style={{ marginTop: '-1rem' }}
                      onClick={(e: { stopPropagation: () => void }) => {
                        e.stopPropagation()
                      }}
                    >
                      <LiveField
                        dense
                        resource="Folder"
                        label="Folder Name"
                        field="name"
                        where={where}
                        defaultValue={folder.name || ''}
                      />
                    </Box>
                  ) : (
                    <Typography
                      key={folder.name}
                      color="primary"
                      variant="subtitle1"
                      gutterBottom
                      onClick={(e) => {
                        if (parent || root) return
                        e.stopPropagation()
                        setEdit(true)
                      }}
                    >
                      {folder.name}
                    </Typography>
                  )}
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Root>
  )
}
