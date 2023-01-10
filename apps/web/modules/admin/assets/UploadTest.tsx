import React from 'react'

import { useMutation, gql } from '@apollo/client'

const SINGLE_UPLOAD = gql`
  mutation($file: Upload!) {
    assetUploadNew(file: $file) {
      id
    }
  }
`

export const UploadTest = () => {
  const [mutate, { loading, error }] = useMutation(SINGLE_UPLOAD)
  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    validity.valid && mutate({ variables: { file } })
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>

  return <input type="file" onChange={onChange} />
}
