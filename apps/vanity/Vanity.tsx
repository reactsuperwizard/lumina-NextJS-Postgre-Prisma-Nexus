import React, { useEffect, useState } from 'react'
import Player from '@vimeo/player'

import { Box, Container } from '@mui/material'

export const Vanity = () => {
  const [content, setContent] = useState<HTMLElement | null>(null)
  const [iframe, setIframe] = useState<HTMLElement | null>(null)

  useEffect(() => {
    getVideo()

    // Adjusting the iframe height onload event
  }, [])

  useEffect(() => {
    if (content) {
      content.style.height = `${content.clientWidth * 1.3}px`
    } else {
      const _content = document.getElementById('main-content')
      setContent(_content)
    }
    if (iframe) {
      iframe.style.height = `${iframe.clientWidth * 1.3}px`
    } else {
      const _iframe = document.getElementById('iframe')
      setIframe(_iframe)
    }
  }, [content, iframe])

  const getVideo = async () => {
    new Player('player-container', {
      id: 507865020,
      byline: false,
      responsive: true,
      title: false,
      portrait: false,
    })
  }
  return (
    <Container
      style={{ backgroundColor: 'black', padding: '0', marginTop: '0' }}
      maxWidth="lg"
    >
      <Box boxShadow={4}>
        <Container maxWidth="md" style={{ padding: '0' }}>
          <Box component="div" id="player-container" />
        </Container>
        <div
          style={{
            display: 'table',
            height: '100vh',
            width: '100%',
          }}
        >
          <div style={{ display: 'table-row', height: '0' }} id="main-content">
            <iframe
              frameBorder="0"
              src="https://www.merritthawkins.com/candidates/job-search/job-details/mauston-wi-physicians-family-medicine-2013367/"
              style={{
                height: '100%',
                width: '100%',
              }}
              id="iframe"
            />
          </div>
        </div>
      </Box>
    </Container>
  )
}
