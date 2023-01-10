/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
  target: 'serverless',
  env: {
    // Will be available on both server and client
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    ENV: process.env.ENV,
    LUMINA_API_ENDPOINT: process.env.LUMINA_API_ENDPOINT,
    VANITY_URL_ENDPOINT: process.env.VANITY_URL_ENDPOINT,
  },
}

module.exports = withPlugins([[withImages]], nextConfig)
