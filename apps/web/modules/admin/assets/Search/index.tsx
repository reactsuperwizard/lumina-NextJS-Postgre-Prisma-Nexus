import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Box,
  Link,
  Dialog,
  styled
} from '@mui/material'
import { ArrowForward, CloseSharp } from '@mui/icons-material'
import { TagInput } from '../TagInput'
import { Folder } from '@lumina/api'
import {
  GET_ASSET,
  GET_ASSETS,
  GetAssetQuery,
  GetCloudinaryAssets,
  PickedCloudinaryResources,
} from './queries'

const PREFIX = 'SearchTagsDialog'

const classes = {
  container: `${PREFIX}-container`,
  searchTagsContainer: `${PREFIX}-searchTagsContainer`,
  pinIcon: `${PREFIX}-pinIcon`,
  closeButton: `${PREFIX}-closeButton`,
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.container}`]: {
    padding: '4rem 2rem 0',
    minHeight: '80vh',
    width: '80vw',
  },

  [`& .${classes.searchTagsContainer}`]: {
    display: 'flex',
    justifyContent: 'center',
  },

  [`& .${classes.pinIcon}`]: {
    margin: '0 1rem 0 0',
    fontSize: '10px',
  },

  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}))

interface IProps {
  open: boolean
  cancel: () => void
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SearchTagsDialog = ({ open, cancel, setUpdating }: IProps) => {
  const [assets, setAssets] = useState<PickedCloudinaryResources[] | null>(null)
  const client = useApolloClient()
  const router = useRouter()

  const getQuery = (): string[] => {
    const { tags } = router.query
    const rawTagsString = tags?.toString() || null
    const cleanTagsArray = rawTagsString
      ?.split(',')
      .map((str: string) => decodeURIComponent(str))
    return cleanTagsArray ? cleanTagsArray : []
  }

  const query = getQuery()

  useEffect(() => {
    if (!query || query.length < 1) {
      setAssets(null)
      return
    }
    ;(async () => {
      const { data }: { data: { getAssets: GetCloudinaryAssets } } =
        await client.query({
          query: GET_ASSETS,
          variables: {
            params: {
              expression: `tags: ${query.join(' AND ')}`,
              withTags: true,
              withContext: true,
            },
          },
        })
      setAssets(data.getAssets.resources)
    })()
  }, [query])

  const handleOnChange = (newValue: string[]) => {
    let url: string
    if (newValue.length > 0) {
      const cleanNewValue = newValue.map((str: string) =>
        encodeURIComponent(str),
      )
      url = `${router.asPath.split('?')[0]}?tags=${cleanNewValue.join(',')}`
    } else {
      url = router.asPath.split('?')[0]
    }
    router.push(url)
  }

  const findAssetPathAndGo = async (publicId: string) => {
    setUpdating(true)
    const { data }: { data: { asset: GetAssetQuery } } = await client.query({
      query: GET_ASSET,
      variables: {
        where: { publicId },
      },
    })
    if (data?.asset?.folder && data.asset.id) {
      const newPath =
        router.asPath.split('assets')[0] +
        'assets/' +
        data.asset.folder.id +
        '?show=' +
        data.asset.id
      setUpdating(false)
      cancel()
      router.push(newPath)
    }
    setUpdating(false)
  }

  return (
    <StyledDialog
      open={open}
      onClose={cancel}
      maxWidth={false}
      PaperProps={{ style: { margin: '3rem' } }}
    >
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={cancel}
        size="large"
      >
        <CloseSharp />
      </IconButton>
      <div className={classes.container}>
        <TagInput
          label="Search for assets by tag"
          handleOnChange={handleOnChange}
          tags={query}
        />
        <Box justifyContent="center" m={2}>
          <ImageList className={classes.searchTagsContainer} cols={5}>
            {assets
              ? assets.map((asset: any) => (
                  <ImageListItem key={asset.public_id} cols={1.5}>
                    <Link
                      onClick={() => findAssetPathAndGo(asset.public_id)}
                      key={asset.public_id}
                    >
                      <img
                        style={{ width: '100px', height: '100px' }}
                        src={asset.secure_url}
                        alt={asset.public_id}
                      />
                      <ImageListItemBar
                        title={asset.public_id}
                        actionIcon={
                          <IconButton
                            aria-label={`info about ${asset.public_id}`}
                            size="large"
                          >
                            <ArrowForward style={{ color: 'white' }} />
                          </IconButton>
                        }
                      />
                    </Link>
                  </ImageListItem>
                ))
              : []}
          </ImageList>
        </Box>
      </div>
    </StyledDialog>
  )
}
