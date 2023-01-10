import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Box,
  TablePagination,
} from '@mui/material'
import { ArrowForward, InsertDriveFile, MusicNote } from '@mui/icons-material'
import { AssetType } from '@lumina/api'

const PREFIX = 'Assets'

const classes = {
  fileIcon: `${PREFIX}-fileIcon`,
  fileIconContainer: `${PREFIX}-fileIconContainer`,
  title: `${PREFIX}-title`,
  break: `${PREFIX}-break`,
  assetTile: `${PREFIX}-assetTile`,
  pagination: `${PREFIX}-pagination`,
}

const Root = styled('div')(({ theme }) => {
  return {
    [`& .${classes.fileIcon}`]: {
      width: 100,
      fontSize: '7rem',
      color: theme.palette.secondary.main,
      textAlign: 'center',
    },
    [`& .${classes.fileIconContainer}`]: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '21px',
    },
    [`& .${classes.title}`]: {
      color: 'white',
      fontSize: '15px',
    },
    [`& .${classes.break}`]: {
      padding: '2rem 1rem 0',
      width: '100%',
      '& hr': { color: theme.palette.grey[200] },
    },
    [`& .${classes.assetTile}`]: {
      textAlign: 'center',
      minWidth: '11rem',
      cursor: 'pointer',
      '&:hover': {
        '& .MuiGridListTileBar-root': {
          backgroundColor: theme.palette.primary.main,
        },
        '& .MuiSvgIcon-root': {
          color: theme.palette.primary.main,
        },
      },
    },
    [`& .${classes.pagination}`]: {
      paddingRight: '3rem',
    },
  }
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Assets = ({ resources, ...props }: { resources: any[] }) => {
  const router = useRouter()
  const { count, pg } = router.query
  const [args, setArgs] = useState({ page: 0, assetsPerPage: 10 })

  const renderPlaceholder = (resource: any) => {
    switch (resource.assetType) {
      case AssetType.Image:
        return (
          <img
            style={{ width: '100%' }}
            src={resource.url}
            alt={resource.publicId}
          />
        )
      case AssetType.Raw:
        return <InsertDriveFile className={classes.fileIcon} />
      case AssetType.Video:
      default:
        return <MusicNote className={classes.fileIcon} />
    }
  }

  const handleDrag = async (
    e: React.DragEvent<HTMLLIElement>,
    resource: any,
  ) => {
    e.dataTransfer.setData('text', JSON.stringify(resource))
  }

  const getStartIndex = () => {
    if (args.page === 0) return 0
    return args.page * args.assetsPerPage
  }

  useEffect(() => {
    if (!router.query) return
    const _count = +count || 10
    const _page = +pg ? +pg - 1 : 0
    const newArgs = {
      assetsPerPage: _count,
      page: _page,
    }
    setArgs(newArgs)
  }, [count, pg])

  const handlePageChange = (newPage: number) => {
    const _count =
      args.assetsPerPage !== 10 ? `count=${args.assetsPerPage}&` : ''
    if (!_count && newPage === 0) {
      router.push(`./${router.query.folder}`)
    } else {
      router.push(`./${router.query.folder}?${_count}pg=${newPage + 1}`)
    }
  }

  const handleShowChange = (newShow: number) => {
    const _count = newShow !== 10 ? `?count=${newShow}` : ''
    router.push(`./${router.query.folder}${_count}`)
  }

  const makeHandleAssetClick = (id: number) => {
    return () => {
      const { pg, count } = router.query
      const pgText = pg ? `pg=${pg}&` : ''
      const countText = count ? `count=${count}&` : ''
      const routeWithoutSearch = router.asPath.split('?')[0]
      router.push(`${routeWithoutSearch}?${countText}${pgText}show=${id}`)
    }
  }

  return (
    <Root>
      <Box justifyContent="center" m={2} className={classes.fileIconContainer}>
        <ImageList cols={5}>
          {resources
            .slice(getStartIndex(), getStartIndex() + args.assetsPerPage)
            .map((resource: any, i: number) => (
              <ImageListItem
                key={resource.publicId + i}
                cols={1}
                className={classes.assetTile}
                draggable={true}
                onDragStart={(e) => handleDrag(e, resource)}
                onClick={makeHandleAssetClick(resource.id)}
              >
                <div>{renderPlaceholder(resource)}</div>
                <ImageListItemBar
                  title={resource.name || resource.publicId}
                  className={classes.title}
                  actionIcon={
                    <IconButton size="large">
                      <ArrowForward style={{ color: 'white' }} />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          {resources.length < 5 && (
            <ImageListItem
              key={'filler'}
              cols={1}
              className={classes.assetTile}
              draggable={true}
              onDragStart={() => {}}
              onClick={() => {}}
            >
              <div style={{ width: '100%', backgroundColor: 'pink' }}></div>
            </ImageListItem>
          )}
        </ImageList>
      </Box>
      {resources.length > 8 && (
        <>
          <div className={classes.break}>
            <hr />
          </div>
          <div className={classes.pagination}>
            <TablePagination
              key={router.query.id as string}
              component="div"
              count={resources.length}
              page={args.page}
              onPageChange={(_, page) => handlePageChange(page)}
              rowsPerPage={args.assetsPerPage}
              onRowsPerPageChange={(event) =>
                handleShowChange(parseInt(event.target.value))
              }
              labelRowsPerPage="Assets per page"
            />
          </div>
        </>
      )}
    </Root>
  )
}
