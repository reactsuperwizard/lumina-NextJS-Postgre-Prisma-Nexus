import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { useQuery, DocumentNode } from '@apollo/client'

import { LuminaTable } from './LuminaTable'

import {
  QueryLuminaResourcesArgs,
  SortOrder,
  Count,
  LuminaResource,
} from '@lumina/api'
import { ParsedUrlQueryInput } from 'querystring'

// sort by scalar OR connected column
export interface ScalarOrderBy {
  [column: string]: SortOrder
}

export interface ConnectedOrderBy {
  [column: string]: { [sortParam: string]: SortOrder }
}

export type OrderByParam = ScalarOrderBy | ConnectedOrderBy

// any time an arg is updated
export interface QueryArgs {
  take?: number
  skip?: number
  orderBy?: OrderByParam[]
  where?: any
}

// used for defaults and when parsing url
export interface RequiredQueryArgs extends QueryArgs {
  take: number
  skip: number
  orderBy: OrderByParam[]
}

interface IRouterProps extends ParsedUrlQueryInput {
  args?: string
}

interface Props {
  columns: string[]
  orderByColumns: string[]
  connectedColumns: { [column: string]: string }
  resourceName:
    | 'Order'
    | 'Request'
    | 'User'
    | 'Script'
    | 'Video'
    | 'Customer'
    | 'Platform'
  routeName:
    | 'orders'
    | 'requests'
    | 'users'
    | 'scripts'
    | 'videos'
    | 'customers'
    | 'platforms'
  RESOURCES_QUERY: DocumentNode
  COUNT_QUERY: DocumentNode
  filters: {
    where?: any
  } | null
  _searchField?: string // TODO
  chipKeyNameMapping?: { [column: string]: string }
}

export const ResourceList = ({
  columns,
  orderByColumns,
  connectedColumns,
  resourceName,
  routeName,
  filters,
  RESOURCES_QUERY,
  COUNT_QUERY,
  chipKeyNameMapping,
}: Props) => {
  const router = useRouter()
  const { args: argsFromUrl }: IRouterProps =
    router.query as unknown as IRouterProps
  const args: RequiredQueryArgs = argsFromUrl
    ? JSON.parse(decodeURIComponent(argsFromUrl))
    : {}
  const defaults: RequiredQueryArgs = {
    orderBy: [
      {
        id: 'desc' as SortOrder.Desc,
      },
    ],
    take: 10,
    skip: 0,
  }
  const currentArgs = { ...defaults, ...args }
  const { where, orderBy, take, skip } = currentArgs
  const page = (skip + take) / take - 1

  // all defaultColumns except, id...  id is included in the table component
  // const [columns] = useState<typeof columns>([...columns])
  const [rows, setRows] = useState<LuminaResource[] | null>(null)
  const { loading, error, data } = useQuery<
    { rows: LuminaResource[] },
    QueryLuminaResourcesArgs
  >(RESOURCES_QUERY, {
    variables: { orderBy, take, skip, where },
    fetchPolicy: 'network-only',
  })

  const { data: totalData } = useQuery<
    { result: Count },
    QueryLuminaResourcesArgs
  >(COUNT_QUERY, {
    variables: { where },
  })

  useEffect(() => {
    const rows = data?.rows
    if (rows) {
      setRows(rows)
    }
  }, [data])

  useEffect(() => {
    if (!filters) return
    handleUpdateArgs(filters)
  }, [filters])

  const handleUpdateArgs = (newArg: QueryArgs) => {
    const updatedArgs = { ...args, ...newArg }
    const _args = encodeURIComponent(JSON.stringify(updatedArgs))
    const query =
      updatedArgs.take ||
      updatedArgs.skip ||
      updatedArgs.where ||
      updatedArgs.orderBy
        ? { args: _args }
        : null
    router.push({
      pathname: `./${routeName}`,
      query,
    })
  }

  const handlePerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const args: QueryArgs = { take: parseInt(event.target.value) }
    // TODO: fix count on backend to be non-null - e.g. if nothing is found, should be typed as returning a number
    // since it will return 0 for not results
    if (args.take && totalData?.result && args.take > totalData.result.count!) {
      args.skip = 0
    }
    handleUpdateArgs(args)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    const newSkip = (newPage + 1) * take - take
    handleUpdateArgs({ skip: newSkip })
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <LuminaTable
          loading={loading}
          handleChangePage={handleChangePage}
          title={resourceName}
          rows={rows || []}
          page={page}
          count={totalData?.result?.count as number}
          columns={columns}
          connectedColumns={connectedColumns}
          orderByColumns={orderByColumns}
          handlePerPage={handlePerPage}
          orderBy={orderBy}
          handleUpdateArgs={handleUpdateArgs}
          take={take}
          args={args}
          chipKeyNameMapping={chipKeyNameMapping}
        />
      </div>
    </>
  )
}
