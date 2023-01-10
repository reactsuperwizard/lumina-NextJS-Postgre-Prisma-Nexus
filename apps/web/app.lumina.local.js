const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const dev = process.env.ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const httpsOptions = {
  key: fs.readFileSync('./certs/app.lumina.local.key'),
  cert: fs.readFileSync('./certs/app.lumina.local.crt'),
}
app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Server started on https://app.lumina.local:3000')
    console.log(`> Hitting API at ${process.env.LUMINA_API_ENDPOINT}`)
  })
})
