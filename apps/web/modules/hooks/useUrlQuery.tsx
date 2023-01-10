import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface Obj {
  [id: string]: string | number | undefined
}

/**
 * A utility hook for storing and accessing url query values.
 *
 * PROPS:
 * - `queryNames`: The names to use as keys for the values in the url passed as an array of strings
 *     -example: `['search']` would be used if you wanted something like `www.example.com?search=value`
 *
 * - `omitted`: An optional list of strings containing any NextJS router variables stored in the path or properties to be removed on update
 *     -example: `['id','name']` removes the query values for `id` and `name` prior to updating the url
 *
 * RETURN VALUE:
 * - Running `useUrlQuery(['thing'], ['id'])` returns an array containing two items:
 *     - Index `0` is an object containing the current value of `thing` stored in the url as `{thing: value}`
 *     - Index `1` is a function that takes an object with either string or number values (`{thing: newValue}`) and shallow navigates to the new url omitting any existing `id` query
 *
 * DEFAULT USAGE:
 *     - `const [urlValues, setUrlValues] = useUrlQuery(['foo'], ['bar'])`
 */
export const useUrlQuery = (queryNames: string[], omitted?: string[]) => {
  const router = useRouter()
  const query = router.query as Obj
  const queryValues: Obj = {}

  useEffect(() => {
    queryNames.forEach((name) => {
      queryValues[name] = query?.[name]?.toString() || undefined
    })
  }, [query, queryNames])

  const trimmer = (accumulator: Obj, currentValue: string) => {
    const { [currentValue]: _x, ...newObj } = accumulator
    return newObj
  }

  const setQuery = (queryValue: Obj) => {
    const newQuery = omitted
      ? [...omitted, ...queryNames].reduce(trimmer, query)
      : queryNames.reduce(trimmer, query)
    queryNames.forEach((name) => {
      if (queryValue[name]) newQuery[name] = `${queryValue[name]}`
    })
    router.push(
      { pathname: router.asPath.split('?')[0], query: newQuery },
      undefined,
      { shallow: true },
    )
  }

  const result: [Obj, (queryValue: Obj) => void] = [queryValues, setQuery]

  return result
}
