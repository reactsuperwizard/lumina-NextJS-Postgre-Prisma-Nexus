import React, { useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import {
  ResourceList,
  AdminViewGrid,
  FilterSearchBar,
} from 'modules/admin/Components'
import { QueryMode } from '@lumina/api'

import type { VideoOrderByInput, Video, VideoWhereInput } from '@lumina/api'
import { Button } from '@mui/material'

const VIDEOS_QUERY = gql`
  query videos(
    $where: VideoWhereInput
    $orderBy: [VideoOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    rows: videos(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      name
      vimeoId
      status
      createdAt
      updatedAt
      rating
      customer {
        id
        name
      }
      script {
        id
      }
      order {
        id
      }
      request {
        id
      }
    }
  }
`

const VIDEOS_COUNT = gql`
  query totalVideos($where: VideoWhereInput) {
    result: totalVideos(where: $where) {
      count
    }
  }
`

export const Videos = () => {
  const [filters, setFilters] = useState<null | { where?: VideoWhereInput }>(
    null,
  )
  const [nameFilter, setNameFilter] = useState<string | null>(null)
  const [checkRatedVideos, setCheckRatedVideos] = useState<boolean>(false)
  const columns: (keyof Video)[] = [
    'name',
    'customer',
    'script',
    'request',
    'order',
    'vimeoId',
    'status',
    'rating',
    'createdAt',
    'updatedAt',
  ]
  const orderByColumns: (keyof VideoOrderByInput)[] = [
    'customer',
    'order',
    'request',
    'createdAt',
    'updatedAt',
    'status',
  ]
  const connectedColumns = {
    customer: 'name',
    order: 'id',
    request: 'id',
    script: 'id',
  }

  useEffect(() => {
    if (checkRatedVideos) setFilters({ where: { rating: { gt: 0 } } })
    return () => {
      setCheckRatedVideos(false)
    }
  }, [checkRatedVideos, filters])

  useEffect(() => {
    if (nameFilter == '' || !nameFilter) return
    const where: VideoWhereInput = {}
    where.name = {
      contains: nameFilter,
      mode: QueryMode.Insensitive,
    }
    setFilters(nameFilter !== '' ? { where } : { where: undefined })
  }, [nameFilter])
  const toggleRatedVideosList = () => {
    setCheckRatedVideos(!checkRatedVideos)
  }
  return (
    <AdminViewGrid
      heading="Videos"
      searchBar={
        <>
          <FilterSearchBar
            filterLabel="Filter videos by name"
            setTerm={setNameFilter}
            searchTerm="name"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleRatedVideosList}
          >
            Rated Videos
          </Button>
        </>
      }
    >
      <ResourceList
        resourceName="Video"
        RESOURCES_QUERY={VIDEOS_QUERY}
        COUNT_QUERY={VIDEOS_COUNT}
        columns={columns}
        orderByColumns={orderByColumns}
        connectedColumns={connectedColumns}
        filters={filters}
        routeName="videos"
      />
    </AdminViewGrid>
  )
}
