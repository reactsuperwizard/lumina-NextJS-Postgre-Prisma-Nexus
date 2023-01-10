const { init, render } = require('@nexrender/core')
const job = require('./testShortData.js')

// defaults
const settings = init({
  logger: console,
  multiFrames: true, // false
  // maxMemoryPercent: 90, // 50
  // imageCachePercent: 10, // 50,
  addLicense: false, // true
  workpath: 'dist',
  fram,
})

const main = async () => {
  const result = await render(job, settings)
}

main().catch(console.error)
