import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Theme } from '@mui/material/styles'
import { Button, Dialog, Grid, IconButton, Typography } from '@mui/material'
import { FileCopy, CloseSharp } from '@mui/icons-material'
import AudioPlayer from 'material-ui-audio-player'
import { DeleteAsset } from './DeleteAsset'
import { useMutation, useQuery, gql } from '@apollo/client'
import { TagInput } from '../TagInput'
import { LiveField } from 'modules/utils'
import { Asset, AssetType, AssetWhereUniqueInput } from '@lumina/api'
import { AudioPlayer2 } from 'modules/admin/Components/AudioPlayer2'

const PREFIX = 'DetailDialog'

const classes = {
  root: `${PREFIX}-root`,
  pinnedAssets: `${PREFIX}-pinnedAssets`,
  assetImage: `${PREFIX}-assetImage`,
  assetName: `${PREFIX}-assetName`,
  cardContainer: `${PREFIX}-cardContainer`,
  imagesContainer: `${PREFIX}-imagesContainer`,
  imageName: `${PREFIX}-imageName`,
  gridBackground: `${PREFIX}-gridBackground`,
  closeButton: `${PREFIX}-closeButton`,
  title: `${PREFIX}-title`,
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.root}`]: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '3rem',
      marginTop: '5rem',
    },
  },

  [`& .${classes.pinnedAssets}`]: {
    margin: '2rem 0 0 0rem',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  [`& .${classes.assetImage}`]: {
    width: '60%',
    marginBottom: '30px',
  },

  [`& .${classes.assetName}`]: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem 0 1rem 0',
    fontSize: '25px',
  },

  [`& .${classes.cardContainer}`]: {
    margin: '3rem 2rem',
  },

  [`& .${classes.imagesContainer}`]: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 1rem 0 1rem',
    margin: '1rem 0',
  },

  [`& .${classes.imageName}`]: {
    display: 'flex',
    justifyContent: 'center',
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '15px',
    padding: '2rem',
  },

  [`& .${classes.gridBackground}`]: {
    backgroundColor: '#C9C8C8',
    backgroundImage:
      'linear-gradient(45deg, #FFFFFF 25%, transparent 25%, transparent 75%, 	#FFFFFF 75%, 	#FFFFFF), linear-gradient(45deg, 	#FFFFFF 25%, transparent 25%, transparent 75%, 	#FFFFFF 75%, 	#FFFFFF)',
    backgroundSize: '60px 60px',
    backgroundPosition: '0 0, 30px 30px',
  },

  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  [`& .${classes.title}`]: {
    marginTop: '1.25rem',
  },
}))

const UPDATE_ASSET = gql`
  mutation updateAsset($params: CloudinaryAssetUpdateInput!) {
    updateAsset(params: $params) {
      public_id
      tags
    }
  }
`

const GET_TAGS = gql`
  query asset($params: CloudinaryGetAssetInput!) {
    data: getAsset(params: $params) {
      tags
    }
  }
`

interface IProps {
  asset: Pick<Asset, 'name' | 'id' | 'publicId' | 'assetType' | 'url'>
  open: boolean
  cancel: () => void
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const DetailDialog = ({
  asset,
  open,
  cancel,
  setUpdating,
  refetch,
}: IProps) => {
  const where: AssetWhereUniqueInput = { id: asset.id }
  const {
    data: tagsQuery,
    loading,
    error,
  } = useQuery(GET_TAGS, {
    variables: { params: { publicId: asset.publicId } },
    skip: !asset.publicId,
  })
  const [tags, setTags] = useState<string[] | null>(null)

  useEffect(() => {
    if (loading || error || !tagsQuery) return
    setTags(tagsQuery.data.tags || [])
  }, [tagsQuery])

  const [updateAsset] = useMutation(UPDATE_ASSET)

  const handleUpdateTags = async (updatedTags: string[]) => {
    const result: any = await updateAsset({
      variables: {
        params: {
          publicId: asset.publicId,
          tags: updatedTags,
        },
      },
    })
    if (result.data.updateAsset.tags) {
      setTags(result.data.updateAsset.tags)
    } else {
      setTags([])
    }
  }

  const copyAssetId = () => navigator.clipboard.writeText(asset.id.toString())

  const copyAssetUrl = () => navigator.clipboard.writeText(asset.url)

  return (
    <StyledDialog open={open} onBackdropClick={cancel}>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={cancel}
        size="large"
      >
        <CloseSharp />
      </IconButton>
      <div className={classes.cardContainer}>
        <Grid container>
          <Grid item xs={6}>
            <Typography
              variant="h5"
              className={classes.title}
            >{`ID #${asset.id}`}</Typography>
          </Grid>
          <Grid item xs={6}>
            <DeleteAsset
              publicId={asset.publicId}
              setUpdating={setUpdating}
              refetch={refetch}
            />
          </Grid>
        </Grid>
        <LiveField
          dense
          resource="Asset"
          label="Asset Name"
          field="name"
          where={where}
          defaultValue={asset.name || ''}
        />
        <div className={classes.imageName}>
          <Button
            startIcon={<FileCopy />}
            color="primary"
            variant="outlined"
            style={{ margin: '10px' }}
            onClick={copyAssetUrl}
          >
            Copy Asset URL
          </Button>

          <Button
            startIcon={<FileCopy />}
            color="primary"
            variant="outlined"
            style={{ margin: '10px' }}
            onClick={copyAssetId}
          >
            Copy Asset ID
          </Button>
        </div>

        <div className={classes.imagesContainer}>
          {asset.assetType === AssetType.Image ? (
            <img
              style={{ width: '60%', marginBottom: '30px' }}
              src={asset.url}
              className={classes.gridBackground}
            />
          ) : null}
          {asset.assetType === AssetType.Audio ? (
            <AudioPlayer2 src={asset.url} />
          ) : null}
          {asset.assetType === AssetType.Raw ? (
            <h1>{asset.url.split('.').pop()}</h1>
          ) : null}
        </div>

        {!loading && tags && (
          <TagInput
            disableClearable={true}
            tags={tags}
            label="Edit Tags"
            handleOnChange={handleUpdateTags}
          />
        )}
      </div>
    </StyledDialog>
  )
}
