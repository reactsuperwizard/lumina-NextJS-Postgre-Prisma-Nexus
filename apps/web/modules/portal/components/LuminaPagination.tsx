import React, { useEffect, useState } from 'react'
import { Box, TablePagination, useMediaQuery } from '@mui/material'
import { useUrlQuery } from 'modules/hooks/useUrlQuery'

interface Props {
  label?: string
  defaultCount: number
  total: number
  loading: boolean
}

export const LuminaPagination = ({
  label,
  defaultCount,
  total,
  loading,
}: Props) => {
  const [urlValues, setUrl] = useUrlQuery(['page', 'count'], ['id', 'portal'])
  const sm = useMediaQuery('(max-width:959px)')
  const md = useMediaQuery('(max-width:1280px)')
  const lg = useMediaQuery('(max-width:1920px)')
  const [page, setPage] = useState<number>(+(urlValues.page || 0))
  const [count, setCount] = useState<number>(+(urlValues.count || defaultCount))
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const getRowOption = (rows: number) => rows * (sm ? 2 : md ? 3 : lg ? 4 : 5)

  useEffect(() => {
    if (urlValues.page !== `${page}`) setPage(+(urlValues.page || 0))
    if (urlValues.count !== `${count}`)
      setCount(+(urlValues.count || defaultCount))
  }, [urlValues])

  useEffect(() => {
    if (!loading) {
      setTableLoading(loading)
    }
  }, [total])

  return (
    <Box width="100%">
      {!tableLoading && (
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_e, pg) => {
            setUrl({ count: urlValues.count, page: pg })
          }}
          rowsPerPage={count || defaultCount}
          onRowsPerPageChange={(e) =>
            setUrl({
              count:
                +e.target.value !== defaultCount ? e.target.value : undefined,
              page: undefined,
            })
          }
          rowsPerPageOptions={[
            getRowOption(2),
            getRowOption(3),
            getRowOption(4),
            getRowOption(6),
            getRowOption(8),
            total,
          ]}
          labelRowsPerPage={label}
        />
      )}
    </Box>
  )
}
