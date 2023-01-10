import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { CircularProgress, Paper, Typography } from '@mui/material'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { useTenant } from 'modules/hooks'
import { VideoDetail } from './VideoDetail'
import { DetailsHeader } from '../../components/DetailsHeader'
import {
  Video as VideoType,
  QueryVideoArgs,
  VideoStatus,
  Request,
  Script,
  Customer,
} from '@lumina/api'
import Head from 'next/head'

const PREFIX = 'Video'

const classes = {
  paper: `${PREFIX}-paper`,
  loadingDiv: `${PREFIX}-loadingDiv`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.paper}`]: {
    marginBottom: theme.spacing(10),
  },

  [`& .${classes.loadingDiv}`]: {
    width: '100%',
    height: '25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const GET_VIDEO = gql`
  query getCustomerVideo($where: VideoWhereUniqueInput!) {
    video: getCustomerVideo(where: $where) {
      id
      vimeoId
      status
      createdAt
      downloads
      hash
      orderId
      name
      producerId
      canRevise
      customerId
      scriptLayers
      scriptId
      rating
      request {
        submittedBy {
          id
        }
      }
    }
  }
`

export interface VideoQuery
  extends Pick<
    VideoType,
    | 'id'
    | 'vimeoId'
    | 'createdAt'
    | 'downloads'
    | 'status'
    | 'hash'
    | 'orderId'
    | 'name'
    | 'producerId'
    | 'canRevise'
    | 'customerId'
    | 'scriptId'
    | 'scriptLayers'
    | 'rating'
  > {
  request: Pick<Request, 'submittedBy'>
}

export const Video = () => {
  const router = useRouter()
  const query = router.query
  const videoId: number = parseInt(query?.id?.toString())
  const { isLuminaAdmin, name } = useTenant()
  const [pending, setPending] = useState(false)

  const {
    data: videoQuery,
    loading,
    error,
  } = useQuery<{ video: VideoQuery }, QueryVideoArgs>(GET_VIDEO, {
    variables: { where: { id: videoId } },
    skip: !videoId,
  })

  useEffect(() => {
    if (!videoQuery?.video.status) return
    if (videoQuery.video.status === VideoStatus.Pending)
      if (isLuminaAdmin) {
        setPending(true)
      } else {
        router.push(router.asPath.split('/').slice(0, -1).join('/'))
      }
  }, [videoQuery])

  return (
    <Root>
      <Head>
        <title>{`Lumina - Video #${videoId} - ${name}`}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <DetailsHeader title={videoQuery?.video.name!} />

      <Paper elevation={0} className={classes.paper}>
        <div>
          {pending && (
            <Typography
              variant="h5"
              style={{ padding: '5px 0' }}
              color="primary"
            >
              PENDING
            </Typography>
          )}
          {loading ? (
            <div className={classes.loadingDiv}>
              <CircularProgress size="10rem" />
            </div>
          ) : error || !videoQuery?.video ? (
            <div className={classes.loadingDiv}>
              An error occurred loading your video:{' '}
              {error?.message || 'video not found'}
            </div>
          ) : !videoQuery.video.vimeoId ? (
            <div className={classes.loadingDiv}>No Vimeo ID</div>
          ) : (
            <VideoDetail video={videoQuery.video} />
          )}
        </div>
      </Paper>
    </Root>
  )
}
