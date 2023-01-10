import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { useApolloClient, gql } from '@apollo/client'
import { Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { AssetType } from '@lumina/api'

const PREFIX = 'UploadAsset'

const classes = {
  root: `${PREFIX}-root`,
  buttonContainer: `${PREFIX}-buttonContainer`,
  uploadIcon: `${PREFIX}-uploadIcon`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  [`&.${classes.buttonContainer}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '15px',
  },

  [`& .${classes.uploadIcon}`]: {
    marginLeft: '10px',
  },
}))

declare const window: any

const CREATE_ASSET = gql`
  mutation createAsset($data: AssetCreateInput!) {
    createOneAsset(data: $data) {
      id
      publicId
    }
  }
`

interface IUploadAsset {
  folderId: number | null
  refetchAssets: () => void
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const UploadAsset = (props: IUploadAsset) => {
  const { folderId, refetchAssets, setUpdating } = props

  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [uploadWidget, setUploadWidget] = useState<any | null>(null)
  const client = useApolloClient()
  const getSignature = async (callback: any, params: any) => {
    const query = gql`
      query getUploadSignature($params: UploadSignatureInput!) {
        data: getUploadSignature(params: $params) {
          uploadSignature
        }
      }
    `
    const results = await client.query({ query, variables: { params } })
    const { uploadSignature } = results.data.data
    callback(uploadSignature)
  }

  useEffect(() => {
    if (!window) return
    if (window.cloudinary) {
      if (!scriptLoaded) setScriptLoaded(true)
      return
    }

    const script = document.createElement('script')

    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js'

    document.body.appendChild(script)
    script.addEventListener('load', () => {
      setScriptLoaded(true)
    })
  }, [scriptLoaded])

  const handleSuccess = async ({
    publicId,
    assetType,
    secureUrl,
  }: {
    publicId: string
    assetType: string
    secureUrl: string
    parentFolderId: number
  }) => {
    setUpdating(true)
    let newAssetType: AssetType
    switch (assetType) {
      case 'image':
        newAssetType = AssetType.Image
        break
      case 'raw':
        newAssetType = AssetType.Raw
        break
      case 'video':
        newAssetType = AssetType.Audio
        break
      default:
        newAssetType = AssetType.Video
        break
    }
    const newName = publicId.split('/').pop() || publicId
    const newFolderId = parseInt(publicId.split('/')[1]) || 1

    await client.mutate({
      mutation: CREATE_ASSET,
      variables: {
        data: {
          name: newName,
          publicId: publicId,
          url: secureUrl,
          folder: { connect: { id: newFolderId } },
          assetType: newAssetType,
        },
      },
    })
    await refetchAssets()
    setUpdating(false)
  }

  const uploadSettings = {
    cloudName: 'hdngr',
    apiKey: 544831596869866,
    uploadPreset: 'd4evbkq9', // defined in cloudinary dashboard
    uploadSignature: getSignature,
    showAdvancedOptions: false,
  }

  const mountUpload = async (parentFolderId: number) => {
    if (uploadWidget) {
      await uploadWidget.update({
        ...uploadSettings,
        folder: `assets/${parentFolderId}/`,
      })
      uploadWidget.open()

      return
    }
    const _uploadWidget = await window.cloudinary.openUploadWidget(
      { ...uploadSettings, folder: `assets/${parentFolderId}/` },
      (error: any, result: any) => {
        if (result.event === 'close' || result.event === 'abort') {
          try {
            refetchAssets()
          } catch (error) {
            console.error(error)
          }
          return
        }
        if (!error && result && result.event === 'success') {
          handleSuccess({
            publicId: result.info.public_id,
            assetType: result.info.resource_type,
            secureUrl: result.info.secure_url,
            parentFolderId: parentFolderId,
          })
        }
      },
    )
    _uploadWidget.open()
    setUploadWidget(_uploadWidget)
  }

  return (
    <Root className={classes.buttonContainer}>
      {scriptLoaded && (
        <Button
          variant="outlined"
          size="large"
          color="primary"
          onClick={() => (folderId ? mountUpload(folderId) : {})}
        >
          Upload Asset
          <CloudUploadIcon className={classes.uploadIcon} />
        </Button>
      )}
    </Root>
  )
}
