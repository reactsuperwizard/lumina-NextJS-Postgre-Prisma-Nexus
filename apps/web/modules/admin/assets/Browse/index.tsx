import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import {
  LinearProgress,
  Grid,
  CircularProgress,
  Dialog,
  Button,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { AssetBreadcrumbs } from './AssetBreadcrumbs'
import { AssetFolder } from './AssetFolder'
import { Assets } from './Assets'
import { CreateFolder } from './CreateFolder'
import { DeleteFolder } from './DeleteFolder'
import { DetailDialog } from '../DetailDialog'
import { UploadAsset } from './UploadAsset'
import { SearchTagsDialog } from '../Search'
import { GetFolderQuery, GET_FOLDER } from './GET_FOLDER'
import { QueryFolderArgs } from '@lumina/api'

const PREFIX = 'Browse'

const classes = {
  mainContainer: `${PREFIX}-mainContainer`,
  formControl: `${PREFIX}-formControl`,
  refreshingIndicator: `${PREFIX}-refreshingIndicator`,
  buttonContainer: `${PREFIX}-buttonContainer`,
  buttonIcon: `${PREFIX}-buttonIcon`,
  buttonFlexDiv: `${PREFIX}-buttonFlexDiv`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => {
  return {
    [`& .${classes.mainContainer}`]: {
      margin: '2rem',
    },
    [`& .${classes.formControl}`]: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    [`& .${classes.refreshingIndicator}`]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    [`& .${classes.buttonContainer}`]: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '15px',
    },
    [`& .${classes.buttonIcon}`]: {
      marginLeft: '10px',
    },
    [`& .${classes.buttonFlexDiv}`]: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingBottom: '5rem',
    },
  }
})

export const Browse = ({ isRoot }: { isRoot?: boolean }) => {
  const router = useRouter()

  const [updating, setUpdating] = useState(false)
  const [search, setSearch] = useState(false)
  const { folder } = router.query
  const folderId = isRoot
    ? 1
    : folder
    ? Array.isArray(folder)
      ? parseInt(folder[folder.length - 1] || '')
      : parseInt(folder)
    : null

  const showId = router.query.show?.toString() || null
  const tagsSearch = router.query.tags?.toString() || null

  useEffect(() => {
    if (!tagsSearch || search) return
    setSearch(true)
  }, [tagsSearch])

  const {
    loading: foldersLoading,
    refetch: foldersRefetch,
    data: foldersData,
  } = useQuery<{ folder: GetFolderQuery }, QueryFolderArgs>(GET_FOLDER, {
    variables: { where: { id: folderId } },
    fetchPolicy: 'network-only',
    skip: !folderId,
  })
  const showAsset = showId
    ? foldersData?.folder.assets.filter((a) => a.id === parseInt(showId))[0] ||
      null
    : null

  const cancelDialog = () => {
    const routeWithoutSearch = router.asPath.split('?')[0]
    const { pg, count } = router.query
    const pgText = pg ? `pg=${pg}` : ''
    const countText = count ? `count=${count}` : ''
    const newUrl =
      routeWithoutSearch +
      (pg || count ? '?' : '') +
      countText +
      (pg && count ? '&' : '') +
      pgText
    router.push(newUrl)
  }

  const parentId = foldersData?.folder.parent?.id
    ? foldersData.folder.parent.id !== 1
      ? foldersData.folder.parent.id
      : undefined
    : undefined

  return (
    <Root>
      <div className={classes.buttonFlexDiv}>
        <div className={classes.buttonContainer}>
          <Button
            onClick={() => setSearch(true)}
            variant="outlined"
            size="large"
            color="primary"
          >
            Search Tags
            <Search className={classes.buttonIcon} />
          </Button>
        </div>
        <UploadAsset
          refetchAssets={foldersRefetch}
          folderId={folderId}
          setUpdating={setUpdating}
        />

        {folderId !== null && (
          <CreateFolder
            refetchFolders={foldersRefetch}
            parentId={folderId}
            setUpdating={setUpdating}
          />
        )}
        {!isRoot &&
          !foldersLoading &&
          foldersData &&
          foldersData.folder.assets.length === 0 &&
          foldersData.folder.children.length === 0 &&
          folderId && (
            <DeleteFolder
              folderId={folderId}
              parentId={parentId}
              setUpdating={setUpdating}
            />
          )}
      </div>
      {foldersData?.folder && <AssetBreadcrumbs folder={foldersData.folder} />}
      <div className={classes.mainContainer}>
        <Grid container spacing={2}>
          {!foldersLoading && foldersData ? (
            <>
              {!isRoot && (
                <AssetFolder
                  key={'parent-folder'}
                  folder={foldersData.folder.parent || foldersData.folder}
                  parent
                  root={false}
                  refetch={() => foldersRefetch()}
                  setUpdating={setUpdating}
                />
              )}
              {foldersData.folder.children.map((folder, i: number) => {
                return (
                  <AssetFolder
                    key={folder.id || i}
                    folder={folder}
                    refetch={() => foldersRefetch()}
                    setUpdating={setUpdating}
                  />
                )
              })}
              {!isRoot && foldersData.folder.children.length < 1 && (
                <div style={{ width: '100%' }} />
              )}
            </>
          ) : (
            <LinearProgress />
          )}
          {!foldersLoading &&
            foldersData &&
            foldersData.folder.assets?.length > 0 && (
              <Assets resources={foldersData.folder.assets} />
            )}
          {showAsset && (
            <DetailDialog
              open={true}
              asset={showAsset}
              cancel={cancelDialog}
              setUpdating={setUpdating}
              refetch={async () => await foldersRefetch()}
            />
          )}
          <Dialog
            open={updating || foldersLoading}
            PaperProps={{
              style: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
                overflow: 'hidden',
              },
            }}
          >
            <CircularProgress size="large" />{' '}
          </Dialog>
          <SearchTagsDialog
            open={search}
            cancel={() => {
              setSearch(false)
              cancelDialog()
            }}
            setUpdating={setUpdating}
          />
        </Grid>
      </div>
    </Root>
  )
}
