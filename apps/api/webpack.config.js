/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')

module.exports = {
  entry: slsw.lib.entries,
  mode: 'production',
  target: 'node',
  externals: [
    nodeExternals(),
    'aws-sdk',
    'nexus',
    'nexus-plugin-prisma',
    'graphql',
  ],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'build.tsconfig.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
}
