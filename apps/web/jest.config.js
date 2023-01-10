// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults } = require('jest-config')

module.exports = {
  verbose: true,
  setupFiles: ['./test/setup.ts'],
  setupFilesAfterEnv: ['./test/setupAfterEnv.ts'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testMatch: ['**/*.spec.ts?(x)'],
  testPathIgnorePatterns: [
    ...defaults.testPathIgnorePatterns,
    '/.next/',
    '/.vscode',
    './modules/admin',
  ],
  moduleDirectories: ['node_modules', './'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/assetMock.js',
  },
}
