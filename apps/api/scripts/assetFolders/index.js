const fs = require('fs')
const { createFolders } = require('./createFolders')
const { updateAssets } = require('./updateAssets')

const writeToFolders = (text) =>
  fs.writeFileSync('folders.js', text, (e) =>
    process.stdout.write(e ? e : ''),
  )

const writeToOutput = (text) =>
  fs.writeFileSync('output.js', text, (e) => process.stdout.write(e ? e : ''))

const main = async () => {
//   const folders = await createFolders({})
//   await writeToFolders(`const folders = ${JSON.stringify(folders)}; module.exports.folders = folders;`)
//   console.log('folders have been created')
  const assets = await updateAssets()
  writeToOutput(`const assets = ${JSON.stringify(assets)};`)
  console.log('assets have been updated')
}

main()
