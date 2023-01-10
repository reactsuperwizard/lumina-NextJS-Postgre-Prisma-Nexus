import { TemplateFlavor } from '@lumina/api'

export const getThumbnailTime = (flavor?: TemplateFlavor) => {
  switch (flavor) {
    case TemplateFlavor.T1:
      return 2.5
    case TemplateFlavor.T2:
      return 2.5
    default:
      return 1.5
  }
}
