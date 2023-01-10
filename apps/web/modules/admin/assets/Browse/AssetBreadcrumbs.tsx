import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Breadcrumbs, Link } from '@mui/material'
import {
  GetFolderQuery,
  GetFolderParentsQuery,
  GET_FOLDER_PARENTS,
} from './GET_FOLDER'
import { useApolloClient } from '@apollo/client'
import { LiveField } from 'modules/utils'
import { FolderWhereUniqueInput } from '@lumina/api'

export const AssetBreadcrumbs = ({ folder }: { folder: GetFolderQuery }) => {
  const router = useRouter()
  const client = useApolloClient()
  const [folderArray, setFolderArray] = useState<
    { id: number; name: string }[]
  >([])
  const [ellipsis, setEllipsis] = useState<number | null>(null)

  const where: FolderWhereUniqueInput = { id: folder.id }

  useEffect(() => {
    if (!folder) return
    setFolderArray([])
    crawlAndPush(folder)
  }, [folder])

  const crawlAndPush = (
    startFolder: GetFolderParentsQuery | GetFolderQuery,
    oldFolders?: boolean,
  ) => {
    const _folderArray: { id: number; name: string }[] = []
    const _oldFolders = oldFolders ? [...folderArray] : []
    const crawl = (id?: number, name?: string | null) => {
      if (id && name && id !== 1) _folderArray.unshift({ id, name: name || '' })
    }
    if (startFolder) crawl(startFolder.id, startFolder.name)
    if (startFolder.parent)
      crawl(startFolder.parent.id, startFolder.parent.name)
    if (startFolder.parent?.parent && startFolder.parent.parent.id !== 1) {
      setEllipsis(startFolder.parent.parent.id)
    } else setEllipsis(null)
    setFolderArray([..._folderArray, ..._oldFolders])
  }

  const getEllipsisCrumbs = async (ellipsisId: number) => {
    setEllipsis(null)
    const {
      data,
    }: { data: { folder: GetFolderParentsQuery } } = await client.query({
      query: GET_FOLDER_PARENTS,
      variables: {
        where: { id: ellipsisId },
      },
    })
    if (data.folder) crawlAndPush(data.folder, true)
  }

  return (
    <>
      <Breadcrumbs maxItems={8}>
        <Link
          style={{
            textDecoration: 'none',
            listStyle: 'none',
            cursor: 'pointer',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '20px',
            marginLeft: '6rem',
          }}
          onClick={() => {
            router.push(`/${router.pathname.split('/')[1]}/assets`)
          }}
        >
          assets
        </Link>
        {ellipsis && (
          <Link
            color="primary"
            onClick={() => getEllipsisCrumbs(ellipsis)}
            key={'ellipsis' + folderArray.length + '-' + ellipsis}
            style={{ cursor: 'pointer' }}
          >
            ...
          </Link>
        )}
        {folderArray.map(
          (folder: { id: number; name: string }, index: number) => {
            const breadcrumbLink = `/${router.pathname.split('/')[1]}/assets/${
              folder.id
            }`
            if (index === folderArray.length - 1) {
              return (
                <LiveField
                  dense
                  key={folder.id + '-' + index}
                  resource="Folder"
                  field="name"
                  where={where}
                  defaultValue={folder.name || ''}
                />
              )
            }
            return (
              <Link
                color="primary"
                onClick={() => {
                  router.push(breadcrumbLink)
                }}
                key={folder.id + '-' + index}
                style={{ cursor: 'pointer' }}
              >
                {folder.name || folder.id}
              </Link>
            )
          },
        )}
      </Breadcrumbs>
    </>
  )
}
