const path = require('path')

module.exports = {
  template: {
    src: `file://${path.join(__dirname, 'testShort.aep')}`,
    composition: 'Render Comp',
    frameStart: 0,
    frameEnd: 120,
    frameIncrement: 3,
  },
  assets: [
    {
      src: `file://${path.join(
        __dirname,
        '../examples/lib/assets/Placeholder.png',
      )}`,
      type: 'image',
      layerName: 'Placeholder.png',
    },
    {
      src: `file://${path.join(
        __dirname,
        '../examples/lib/assets/Logo_Transparent.png',
      )}`,
      type: 'image',
      layerName: 'Logo_Transparent.png',
    },
    {
      type: 'data',
      layerName: 'BG',
      property: 'Effects.Fill.Color',
      value: [1, 0, 0, 1],
    },
  ],
  actions: {
    postrender: [
      {
        module: '@nexrender/action-encode',
        preset: 'mp4',
        output: 'encoded.mp4',
      },
      {
        module: '@nexrender/action-copy',
        input: 'encoded.mp4',
        output: __dirname,
      },
    ],
  },
}
