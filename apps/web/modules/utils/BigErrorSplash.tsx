import React, { useEffect, useState } from 'react'
import { Container, Box, Grid, useMediaQuery } from '@mui/material'

import FavoriteIcon from '@mui/icons-material/Favorite'

import lumina from 'public/Color_Negative@3x.png'
import luminaIcon from 'public/LuminaIcon.png'
import Head from 'next/head'

export interface Article {
  title: string
  url: string
  urlToImage: string
}

export interface NewsAPIRes {
  status: string
  totalResults: number
  articles: Article[]
}

export const BigErrorSplash = () => {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    ;(async () => {
      const response = await fetch('/api/news')

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const { articles } = await response.json()
      setArticles(articles)
    })()
  }, [])

  const matchesSmallerScreen = useMediaQuery('(max-width:959px)')
  return (
    <>
      <Head>
        <style>{'body { background-color: #237DF1 !important; }'}</style>
      </Head>
      <Container maxWidth="sm">
        <Box mt={5}>
          <img
            src={matchesSmallerScreen ? luminaIcon : lumina}
            alt="Lumina logo"
            style={{ maxHeight: '2.5rem' }}
          />
          <h1>Hey There!</h1>
          <h2>
            Amazon Web Services (AWS) is currently down and they are working
            rapidly to fix the underlying issues.
          </h2>
          <h2>Hopefully Disney+ is back up tonight, and your Ring works!</h2>
          <p>
            <FavoriteIcon /> Your Friends at Lumina.
          </p>
          <Grid>
            {articles
              ? articles.map((article, i) => {
                  return (
                    <a key={i} href={article.url}>
                      <Grid>
                        <img
                          style={{
                            width: '100%',
                            height: '100%',
                            // objectFit: 'fill',
                          }}
                          src={article.urlToImage}
                        />
                        <h3>{article.title}</h3>
                      </Grid>
                    </a>
                  )
                })
              : null}
          </Grid>
        </Box>
      </Container>
    </>
  )
}
