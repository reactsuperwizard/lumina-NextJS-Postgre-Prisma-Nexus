// import { expect } from 'chai'
// import { T4 } from '../T4'
// import { T4 as T4Data } from '../../../sample-data/sample-t4-job'
// import Net from 'net'
// import { execSync, exec } from 'child_process'

// const getLayerNames = require.resolve('./getLayerNames.jsx')
// const runAEscript = require.resolve('./run-ae-script.scpt')
// describe('Flavor:T4', () => {
//   let server: any
//   // before((done) => {
//   //   server = Net.createServer()
//   //   server.listen(9003, function () {
//   //     console.log('Hello!')
//   //     done()
//   //   })
//   // })

//   it('should layout all layers as global variables or in slides', async (done) => {
//     const layers: string[] = []
//     server = Net.createServer((connection) => {
//       connection.on('data', (data) => {
//         layers.push(...data.toString().split('\n'))
//         debugger
//       })
//       connection.on('close', () => {
//         for (const l of Object.keys(T4.layers)) {
//           if (layers.includes(l)) {
//             console.log(`found layer ${l}`)
//           } else {
//             console.error(`${l} does not exist in AE Project!`)
//           }
//         }
//         debugger
//         console.log(layers)
//         done()
//         // for (const layer of layers) {
//         //   console.log(layer)
//         // }
//       })
//     })

//     server.listen(9003, function () {
//       console.log('Hello!')
//       execSync(`osascript ${runAEscript} ${getLayerNames}`)
//     })

//     // const client = Net.Socket connect({ port: 9003 }, function () {
//     //   console.log('connected to server!')
//     //   exec(`osascript ${runAEscript} ${getLayerNames}`)
//     // })

//     // client.on('data', function (data) {
//     //   console.log('data received')
//     //   console.log(data.toString())
//     // })

//     // client.on('end', function () {
//     //   console.log('disconnected from server')
//     // })
//     // const layers = Object.keys(T4.layers).sort()
//     // const slideLayers = T4.slides.reduce(
//     //   (accumulator, value) => accumulator.concat(value),
//     //   [],
//     // )
//     // const slideLayersAndGlobals = [...slideLayers, ...T4.globals].sort()
//     // expect(layers).to.eql(slideLayersAndGlobals)
//   })
//   // it('sample t4 job data should have all necessary layers with proper names', () => {
//   //   const expectedLayers = Object.keys(T4.layers).sort()
//   //   const dataLayers = T4Data.aeRenderData.assets.map((a) => a.layerName).sort()
//   //   expect(expectedLayers).to.eql(dataLayers)
//   // })
// })
