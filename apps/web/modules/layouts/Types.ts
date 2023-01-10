import { NextComponentType } from 'next'

import { ReactNode } from 'react'

export type ILayout = NextComponentType & {
  children: ReactNode
}
