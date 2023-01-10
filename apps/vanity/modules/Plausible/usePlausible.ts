// export const usePlausible = () => useContext(PlausibleContext)!
import { EventNames } from './Constants'

type ApplyNow = (
  rest: {
    props: {
      vimeoId: string
      page: string
    }
  },
) => void

export const usePlausible = () => {
  const applyNow: ApplyNow = (rest) => {
    ;(window as any).plausible?.(EventNames.APPLY_NOW, rest)
  }
  return {
    applyNow,
  }
}
