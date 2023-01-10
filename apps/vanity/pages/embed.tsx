import React, { useState, useEffect } from 'react'

import type { GetServerSideProps } from 'next'
import { InferGetServerSidePropsType } from 'next'

import Head from 'next/head'

import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'
import type { QueryGetVideoByShortIdArgs, PublicVideo } from '@lumina/api'

import { Player } from '@lumina/player'

import { Box, CssBaseline } from '@mui/material'
import { CloseButton } from '../modules/CloseButton'
import { VideoBox } from '../modules/VideoBox'
import { FavIcons } from '../modules/FavIcons'
import { useRouter } from 'next/dist/client/router'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.LUMINA_API_ENDPOINT,
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
})

export interface VideoQuery {
  video: PublicVideo
}

export default function Embed() {
  const router = useRouter()
  const vimeoId = router.query.vimeoId
  // const { vimeoId, thumbnail, name, jobUrl } = video || {}
  const vimeoUrl = encodeURIComponent(`https://vimeo.com/${vimeoId}`)

  const [vidDiv, setVidDiv] = useState<HTMLElement | null>(null)
  const [postingDiv, setPostingDiv] = useState<HTMLIFrameElement | null>(null)
  const [open, setOpen] = useState(true)
  const [hideClose, setHideClose] = useState(false)
  const [hideCloseTimer, setHideCloseTimer] = useState<NodeJS.Timeout | null>(
    null,
  )

  useEffect(() => {
    setDivElements()
  }, [])

  useEffect(() => {
    resetTimer()
    return () => {
      if (hideCloseTimer) clearTimeout(hideCloseTimer)
    }
  }, [])

  const resetTimer = () => {
    if (hideClose) setHideClose(false)
    if (hideCloseTimer) clearTimeout(hideCloseTimer)
    setHideCloseTimer(
      setTimeout(() => {
        if (open) setHideClose(true)
      }, 3000),
    )
  }

  const setDivElements = async () => {
    const _vidDiv = await document.getElementById('video')
    const _postingDiv = (await document.getElementById(
      'posting',
    )) as HTMLIFrameElement
    setVidDiv(_vidDiv)
    setPostingDiv(_postingDiv)
  }

  useEffect(() => {
    if (postingDiv) {
      postingDiv.style.height = `${
        window.innerHeight - (vidDiv?.offsetHeight || 0) - 18
      }px`
    }
  }, [vidDiv, postingDiv, open])

  const isValidHttpUrl = (testString: string) => {
    let url
    try {
      url = new URL(testString)
    } catch (_) {
      return false
    }
    return url.protocol === 'http:' || url.protocol === 'https:'
  }

  return (
    <>
      {/* <Head>
        <FavIcons />
        <meta property="og:title" content={name || 'An Awesome Job!'} />
        <meta property="og:url" content={jobUrl} />
        <meta
          property="og:description"
          content="Apply for this awesome position, you'll love working with us!"
        />
        <meta property="fb:app_id" content="767526710546660" />
        <meta property="og:type" content="video.other" />
        <meta property="og:image" content={thumbnail} />
        <meta property="og:image:secure_url" content={thumbnail} />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta
          property="og:video:url"
          content={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
        />
        <meta
          property="og:video:secure_url"
          content={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
        />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <link
          rel="alternate"
          href={`https://vimeo.com/api/oembed.json?url=${vimeoUrl}`}
          type="application/json+oembed"
          title={name}
        />
        <link
          rel="alternate"
          href={`https://vimeo.com/api/oembed.xml?url=${vimeoUrl}`}
          type="text/xml+oembed"
          title={name}
        />
        <link rel="canonical" href={url} />
        <title>{video?.name || 'Now Hiring!'}</title>
      </Head> */}
      <CssBaseline />
      {/* <h1>Hash from server is {vimeoId}</h1> */}
      {/* /for testing purposes only.  Iframe probably not needed.  Redirect if document.parent.referrer === document.origin  */}
      <Box
        style={{ padding: 0, width: '100vw' }}
        onMouseMove={resetTimer}
        onMouseOver={resetTimer}
        onMouseOut={resetTimer}
      >
        <CloseButton
          open={open}
          show={!hideClose}
          toggle={() => setOpen(!open)}
        />
        {/* <VideoBox open={open}>
          {vimeoId ? (
            <Player
              poweredBy={{
                logoSrc: '/Negative@3x.png',
                iconSrc: '/Negative@3xIcon.png',
                href: 'https://www.lumina.co',
              }}
              vimeoId={vimeoId}
            />
          ) : null}
        </VideoBox> */}
        <Box>
          <Box>
            <Box style={{ overflowY: 'auto' }}>
              {/* {jobUrl && isValidHttpUrl(jobUrl) ? ( */}
              <iframe
                style={{
                  width: '100%',
                  minHeight: `30vh`,
                  marginTop: `5px`,
                  background: 'white',
                  border: 'none',
                }}
                src={'https://p.lmna.local:3002/576952727'}
                id="posting"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
