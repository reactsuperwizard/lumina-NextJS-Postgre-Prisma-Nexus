import { plugin } from 'nexus'

import chalk from 'chalk'

export const logTxTime = plugin({
  name: 'LogTxTimePlugin',
  onCreateFieldResolver(config) {
    const { name } = config.parentTypeConfig
    if (name !== 'Mutation' && name !== 'Query') {
      return
    }

    return async (root, args, ctx, info, next) => {
      const startTimeMs = new Date().valueOf()
      const value = await next(root, args, ctx, info)
      const endTimeMs = new Date().valueOf()
      const totalTime = endTimeMs - startTimeMs
      console.info(
        `${chalk.green(name)} "${chalk.underline.bgBlue(
          info.fieldName,
        )}" took ${chalk.bold.cyanBright(`${totalTime} ms`)}`,
      )
      return value
    }
  },
})
