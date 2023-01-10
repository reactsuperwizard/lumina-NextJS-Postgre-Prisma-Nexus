const { init, render } = require('@nexrender/core')
const job = require('./event.json')

// defaults
const settings = init({
  debug: true,
  logger: console,
  multiFrames: true, // false
  // maxMemoryPercent: 90, // 50
  // imageCachePercent: 90 // 50
})

const main = async () => {
  const result = await render(job, settings)
}

main().catch(console.error)
