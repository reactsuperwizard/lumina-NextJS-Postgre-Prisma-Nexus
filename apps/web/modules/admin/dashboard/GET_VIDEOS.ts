import { gql } from '@apollo/client'

export const GET_VIDEOS = gql`
  query totalVideos($where: VideoWhereInput) {
    totalVideos(where: $where) {
      count
    }
  }
`
