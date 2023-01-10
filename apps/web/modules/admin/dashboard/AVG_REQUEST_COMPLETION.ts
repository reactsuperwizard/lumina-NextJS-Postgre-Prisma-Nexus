import { gql } from '@apollo/client'

export interface AvgRequestCompletionResults {
  time: number
}

export interface AvgRequestCompletionQuery {
  start: Date
  end: Date
}

export const AVG_REQUEST_COMPLETION = gql`
  query avgRequestCompletion($start: DateTime!, $end: DateTime!) {
    time: avgRequestCompletion(start: $start, end: $end)
  }
`
