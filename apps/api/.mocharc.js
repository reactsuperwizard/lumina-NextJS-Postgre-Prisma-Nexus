module.exports = {
  require: 'ts-node/register',
  file: ['src/setup.spec.ts'],
  spec: ['src/**/*.spec.ts'],
  diff: true,
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 2000,
  ui: 'bdd',
  'watch-files': ['src/**/*.ts']  
}