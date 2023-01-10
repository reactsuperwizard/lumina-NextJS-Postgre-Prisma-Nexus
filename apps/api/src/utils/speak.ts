import betterLogging, {
  MessageConstructionStrategy,
  Theme,
} from 'better-logging'

export const speak = () =>
  betterLogging(console, {
    messageConstructionStrategy: MessageConstructionStrategy.FIRST,
    color: Theme.light,
  })
