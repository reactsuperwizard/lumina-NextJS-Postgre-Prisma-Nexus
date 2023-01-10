import type Express from 'express'

// import { extendType, objectType } from 'nexus'

import { branch, commit } from '../../generated/git.json'
// import { isLuminaAdmin } from '../auth'

// export const Version = objectType({
//   name: 'Version',
//   definition(t) {
//     t.string('branch', { description: 'Github branch name.' })
//     t.string('commit', { description: 'Github commit hash.' })
//   },
// })

// export const version = extendType({
//   type: 'Query',
//   definition(t) {
//     t.field('version', {
//       authorize: (_root, _args, ctx) => isLuminaAdmin(ctx),
//       description:
//         'Provides the branch name and commit hash for the currently deployed server',
//       type: 'Version',
//       async resolve() {
//         return { branch, commit }
//       },
//     })
//   },
// })

export const Version = (req: Express.Request, res: Express.Response): void => {
  res.json({ branch, commit })
}
