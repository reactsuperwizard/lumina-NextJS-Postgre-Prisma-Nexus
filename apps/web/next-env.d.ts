/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />

declare module 'ra-data-graphql-simple'
declare module 'ra-data-graphql'
declare module 'pluralize'
declare module '*.jpg'
declare type PromiseResult<T> = T extends Promise<infer U> ? U : T
declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}
