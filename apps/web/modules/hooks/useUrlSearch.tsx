import { useRouter } from 'next/router'

export const useUrlSearch = () => {
  const router = useRouter()
  const query = router.query
  const search = query?.search?.toString() || ''

  const setSearch = (searchString: string) => {
    const { search: _s, portal: _p, id: _i, ...newQuery } = query
    if (searchString) newQuery.search = searchString
    router.push(
      { pathname: router.asPath.split('?')[0], query: newQuery },
      undefined,
      { shallow: true },
    )
  }
  return { search, setSearch }
}
