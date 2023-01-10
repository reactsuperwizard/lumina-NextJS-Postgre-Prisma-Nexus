import { expect } from 'chai'
import { T6 } from '../T6'
import Net from 'net'
import { execSync, spawn } from 'child_process'

const getLayerNames = require.resolve('./getLayerNames.jsx')
// const runAEscript = require.resolve('./run-ae-script.scpt')

execSync(
  `cp ${getLayerNames} /Applications/Adobe\ After\ Effects\ 2020/Scripts/Startup/`,
)

describe('Flavor:T4', () => {
  it('AE Template should include all expected layers', async (done) => {
    const layers: string[] = []
    let testRunner: any
    const server = Net.createServer((connection) => {
      connection.on('data', (data) => {
        layers.push(...data.toString().split('\n'))
      })
      connection.on('close', () => {
        for (const l of Object.keys(T6.layers)) {
          expect(layers).to.includes(l)
        }
        testRunner.kill('SIGKILL')
        execSync(
          `sudo rm /Applications/Adobe\ After\ Effects\ 2020/Scripts/Startup/getLayerNames.jsx`,
        )
        server.close(() => {
          done()
        })
      })
    })

    server.listen(9003, function () {
      console.log('Hello!')
      testRunner = spawn(
        '/Applications/Adobe After Effects 2020/Adobe After Effects 2020.app/Contents/MacOS/After Effects',
      )
    })
  })
})
