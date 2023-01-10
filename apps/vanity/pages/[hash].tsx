import React from 'react'

import type { GetServerSideProps } from 'next'
import { InferGetServerSidePropsType } from 'next'

import Head from 'next/head'
import Image from 'next/image'

import { styled } from '@mui/material'

import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'
import type { QueryGetVideoByShortIdArgs, PublicVideo } from '@lumina/api'
import { FavIcons, VanityWithEmbed, VanityWithoutEmbed } from '../modules'

const PREFIX = 'Hash'

const classes = {
  fixedBackground: `${PREFIX}-fixedBackground`,
}

const Root = styled('div')(({ theme }) => ({
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    zIndex: -1,
}))

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

const GET_VIDEO = gql`
  query GET_VIDEO($hash: String!) {
    video: getVideoByHash(hash: $hash) {
      vimeoId
      thumbnail
      name
      jobUrl
      embedJobPage
      vanityButtonText
    }
  }
`

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  const { hash } = params || {}
  if (!hash) return { notFound: true }

  const { data } = await client.query<VideoQuery, QueryGetVideoByShortIdArgs>({
    query: GET_VIDEO,
    variables: { hash: hash as string },
  })
  const errorCode = !data?.video ? 404 : false
  if (errorCode) {
    res.statusCode = errorCode
    return { notFound: true }
  }

  const url = 'https://' + req.headers.host + req.url

  return {
    props: {
      url,
      video: data.video,
    },
  }
}

export default function Hash({
  video,
  url,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { vimeoId, thumbnail, name, jobUrl, embedJobPage, vanityButtonText } =
    video || {}

  const vimeoUrl = encodeURIComponent(`https://vimeo.com/${vimeoId}`)

  const isValidHttpUrl = (testString: string) => {
    let testUrl
    try {
      testUrl = new URL(testString)
    } catch (_) {
      return false
    }
    return testUrl.protocol === 'http:' || testUrl.protocol === 'https:'
  }

  return (
    <>
      <Head>
        <FavIcons />
        <meta property="og:title" content={name || 'Now Hiring!'} />
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
        <title>{name || 'Now Hiring!'}</title>
      </Head>
      <Root>
        <Image
          alt="Background"
          src="/tile.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </Root>
      {isValidHttpUrl(jobUrl) && embedJobPage ? (
        <VanityWithEmbed
          vimeoId={vimeoId as number}
          jobUrl={jobUrl}
          isValidHttpUrl={true}
          name={name}
        />
      ) : (
        <VanityWithoutEmbed
          vimeoId={vimeoId as number}
          jobUrl={jobUrl}
          isValidHttpUrl={isValidHttpUrl(jobUrl)}
          vanityButtonText={vanityButtonText}
        />
      )}
      <style>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  )
}
