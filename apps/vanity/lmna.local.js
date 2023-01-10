/* eslint-disable @typescript-eslint/no-var-requires */
const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const dev = process.env.ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const httpsOptions = {
  key: fs.readFileSync('./certs/lmna.local.key'),
  cert: fs.readFileSync('./certs/lmna.local.crt'),
}
app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(3001, (err) => {
    if (err) throw err
    console.log('> Server started on https://lmna.local:3001')
  })
})
