const { init, render } = require('@nexrender/core')
const job = require('./test.json')

// defaults
const settings = init({
  logger: console,
  multiFrames: true, // false
  // maxMemoryPercent: 90, // 50
  // imageCachePercent: 10, // 50,
  addLicense: false, // true
})

const main = async () => {
  const result = await render(job, settings)
}

main().catch(console.error)
