import { gql, useQuery } from '@apollo/client'
import { Asset, AssetType, Folder, QueryFolderArgs } from '@lumina/api'
import { HighlightOffRounded } from '@mui/icons-material'
import FolderIcon from '@mui/icons-material/Folder'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  DialogTitle,
  Drawer,
  IconButton,
  Link,
  Snackbar,
  styled,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import { copyToClipboard } from 'modules/utils/copyToClipboard'
import { AudioBox } from './AudioBox'
import { ImageBox } from './ImageBox'
import { AssetTagFilter } from './AssetTagFilter'
import { IBreadcrum } from './ModalBreadcrumbs'
import { ModalBreadcrumbs } from './ModalBreadcrumbs'
const PREFIX = 'MediaModal'

const classes = {
  closeButton: `${PREFIX}-closeButton`,
  title: `${PREFIX}-title`,
  dialogTitle: `${PREFIX}-dialogTitle`,
  wrap: `${PREFIX}-wrap`,
  folder: `${PREFIX}-fodler`,
  asset: `${PREFIX}-asset`,
  assetBox: `${PREFIX}-assetBox`,
  infoBox: `${PREFIX}-infoBox`,
  buttonBox: `${PREFIX}-buttonBox`,
  loader: `${PREFIX}-loader`,
  nodata: `${PREFIX}-nodata`,
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    height: '100vh',
    padding: '2rem',
  },
  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(4),
    top: theme.spacing(4),
  },
  [`& .${classes.title}`]: {
    fontWeight: 'bold',
    padding: 0,
    fontSize: '1.5rem',
  },
  [`& .${classes.nodata}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '1rem',
  },
  [`& .${classes.wrap}`]: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    overflow: 'scroll',
  },
  [`& .${classes.folder}`]: {
    width: '18rem',
    textAlign: 'center',
    margin: '1rem',
    color: '#80D8FF',
    '&:hover': {
      color: '#42A2CE',
      cursor: 'pointer',
    },
  },
  [`& .${classes.buttonBox}`]: {
    display: 'flex',
    marginTop: '5px',
  },
  [`& .${classes.loader}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
  [`& .${classes.asset}`]: {
    display: 'flex',
    flexDirection: 'column',
    width: '18rem',
    margin: '1rem',
    border: '1px solid #D9D9D9',
  },
  [`& .${classes.assetBox}`]: {
    textAlign: 'center',
    height: '10rem',
    width: '100%',
    color: '#42A2CE',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`& .${classes.infoBox}`]: {
    padding: '5px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  [`& .${classes.dialogTitle}`]: {
    paddingLeft: 0,
  },
}))
interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  onSelect: (
    asset: Pick<Asset, 'id' | 'publicId' | 'assetType' | 'url' | 'name'>,
  ) => void
  assetType: 'image' | 'audio'
}

interface GetFolderQuery extends Pick<Folder, 'name' | 'id'> {
  children: Pick<Folder, 'name' | 'id'>[]
  assets: Pick<Asset, 'id' | 'publicId' | 'assetType' | 'url' | 'name'>[]
}

export const GET_FOLDER = gql`
  query getFolder($where: FolderWhereUniqueInput!) {
    folder(where: $where) {
      id
      name
      children(orderBy: { name: asc }) {
        id
        name
      }
      assets(orderBy: { name: asc }) {
        id
        publicId
        assetType
        url
        name
      }
      parent {
        id
        name
        parent {
          id
          name
        }
      }
    }
  }
`

export const QUERY_ASSETS_BY_TAG = gql`
  query GetAssetsByTag($params: CloudinaryGetAssetsInput) {
    getAssets(params: $params) {
      resources {
        public_id
        resource_type
        id
        url
        filename
      }
    }
  }
`
const DEFAULT_FOLDER: IBreadcrum = {
  folderId: 1,
  name: 'Assets',
}
export const MediaModal = ({ open, setOpen, assetType, onSelect }: Props) => {
  const [folderId, setFolderId] = useState<number>(DEFAULT_FOLDER.folderId)
  const [tags, setTags] = useState<string[]>([])
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrum[]>([DEFAULT_FOLDER])
  const [embedOpen, setEmbedOpen] = useState(false)
  const [assets, setAssets] = useState<
    Pick<Asset, 'id' | 'publicId' | 'assetType' | 'url' | 'name'>[]
  >([])
  const {
    loading: foldersLoading,
    refetch: foldersRefetch,
    data: foldersData,
  } = useQuery<{ folder: GetFolderQuery }, QueryFolderArgs>(GET_FOLDER, {
    variables: { where: { id: folderId } },
    notifyOnNetworkStatusChange: true,
    skip: !folderId,
  })

  const {
    loading: tagLoading,
    refetch: tagRefetch,
    data: tagData,
  } = useQuery(QUERY_ASSETS_BY_TAG, {
    variables: {
      params: {
        expression: `tags: ${tags.join(' AND ')}`,
        withTags: true,
        withContext: true,
      },
    },
    skip: tags?.length == 0,
    notifyOnNetworkStatusChange: true,
  })

  const handleDelete = (chip: string) => {
    const filteredTags = tags.filter((tag) => tag != chip)
    setTags(filteredTags)
  }

  const addTag = (chip: string) => {
    const newTag = [...tags, chip]
    setTags(newTag)
  }
  useEffect(() => {
    if (open) setFolderId(1)
  }, [open])

  useEffect(() => {
    if (tags.length == 0) setFolderId(1)
    else tagRefetch()
  }, [tags])

  useEffect(() => {
    const assets = foldersData?.folder?.assets?.filter(
      (asset) => asset.assetType === assetType,
    )
    setAssets(assets || [])
  }, [foldersData])

  useEffect(() => {
    const assets = tagData?.getAssets?.resources
      ?.filter((asset: any) => asset.resource_type === assetType)
      .map((asset: any) => ({
        id: asset.id,
        publicId: asset.public_id,
        assetType: asset.resource_type,
        url: asset.url,
        name: asset.filename,
      }))
    setAssets(assets || [])
  }, [tagData])

  useEffect(() => {
    const assets = foldersData?.folder?.assets?.filter(
      (asset) => asset.assetType === assetType,
    )
    setAssets(assets || [])
  }, [foldersData])

  useEffect(() => {
    if (folderId == DEFAULT_FOLDER.folderId) setBreadcrumbs([DEFAULT_FOLDER])
    foldersRefetch()
  }, [folderId])

  const handleAssetSelection = (
    asset: Pick<Asset, 'id' | 'publicId' | 'assetType' | 'url' | 'name'>,
  ) => {
    setOpen(false)
    onSelect(asset)
  }

  const handleFolderSelection = (folder: Pick<Folder, 'id' | 'name'>) => {
    setFolderId(folder.id)
    const updatedBreadCrumbs: IBreadcrum[] = [
      ...breadcrumbs,
      { name: folder.name!, folderId: folder.id },
    ]
    setBreadcrumbs(updatedBreadCrumbs)
  }

  const handleBreadcrumbClick = (index: number) => {
    setFolderId(breadcrumbs[index].folderId)
    const updatedBreadCrumbs = breadcrumbs.slice(0, index + 1)
    setBreadcrumbs(updatedBreadCrumbs)
  }
  return (
    <StyledDrawer
      anchor="bottom"
      open={open}
      variant="persistent"
      onClose={() => {
        setOpen(false)
      }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => setOpen(false)}
          size="large"
        >
          <HighlightOffRounded fontSize="large" />
        </IconButton>
        <Typography className={classes.title}>
          Select{' '}
          {assetType.toUpperCase()[0] + assetType.toLowerCase().substring(1)}{' '}
          Anchor: Cover
        </Typography>
      </DialogTitle>
      <AssetTagFilter tags={tags} handleDelete={handleDelete} addTag={addTag} />
      <ModalBreadcrumbs
        tags={breadcrumbs}
        handleClick={(idx: number) => {
          handleBreadcrumbClick(idx)
        }}
      />
      {foldersLoading || tagLoading ? (
        <Box className={classes.loader}>
          <CircularProgress />
        </Box>
      ) : (
        <Box className={classes.wrap}>
          {foldersData?.folder?.children?.length == 0 && assets?.length == 0 && (
            <Box className={classes.nodata}>
              <Typography fontSize={'0.875rem'}>
                No data in this folder
              </Typography>
            </Box>
          )}
          {tags.length == 0 &&
            foldersData?.folder?.children?.map((folder) => (
              <Box
                key={folder.id}
                className={classes.folder}
                onClick={() => handleFolderSelection(folder)}
              >
                <Box>
                  <FolderIcon sx={{ fontSize: '5rem' }} color="inherit" />
                </Box>
                <Typography color="#0A1467">{folder.name}</Typography>
              </Box>
            ))}
          {assets?.map((asset, idx) => (
            <Box key={idx} className={classes.asset}>
              <Box className={classes.assetBox} key={asset.id}>
                {asset.assetType == AssetType.Audio && (
                  <AudioBox url={asset.url} />
                )}
                {asset.assetType == AssetType.Image && (
                  <ImageBox url={asset.url} />
                )}
              </Box>
              <Box className={classes.infoBox}>
                <Typography
                  flex={1}
                  color="#0A1467"
                  fontSize={'0.75rem'}
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  {asset.name} (ID: {asset.id})
                </Typography>
                <Box className={classes.buttonBox}>
                  <Button
                    sx={{ fontSize: '0.75rem', marginRight: '5px' }}
                    variant="contained"
                    startIcon={<DoneIcon />}
                    onClick={() => handleAssetSelection(asset)}
                  >
                    Select Asset
                  </Button>
                  <Button
                    sx={{ fontSize: '0.75rem' }}
                    variant="outlined"
                    startIcon={<ContentCopyIcon />}
                    onClick={() => copyToClipboard(asset.url, setEmbedOpen)}
                  >
                    Copy URL
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      <Snackbar
        open={embedOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={1500}
        onClose={() => setEmbedOpen(false)}
      >
        <Alert severity="success">Link copied to clipboard</Alert>
      </Snackbar>
    </StyledDrawer>
  )
}
