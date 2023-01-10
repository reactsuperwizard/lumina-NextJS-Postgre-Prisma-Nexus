import * as path from 'path'
import { nexusPrisma as plugin } from 'nexus-plugin-prisma'

export const nexusSchemaPrisma = (shouldGenerateArtifacts: boolean) =>
  plugin({
    shouldGenerateArtifacts, // prevent generating types in production - Lambda is a read-only FS
    paginationStrategy: 'prisma',
    experimentalCRUD: true,
    // inputs: {
    //   prismaClient: require.resolve('.prisma/client'), // default
    // },
    outputs: {
      typegen: path.join(__dirname, '../../generated/nexusPrisma.d.ts'),
    },
  })
