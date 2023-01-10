import React from 'react'

import { gql, useQuery } from '@apollo/client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { CircularProgress } from '@mui/material'

const DAILY_ACTIVE_USERS_QUERY = gql`
  query DailyActiveUsers {
    dailyActiveUsers {
      dailyUsers {
        activeUsers
        date
      }
    }
  }
`
export const DailyActiveUsers = () => {
  const { data, loading } = useQuery<{
    dailyActiveUsers: { dailyUsers: { activeUsers: number; date: string }[] }
  }>(DAILY_ACTIVE_USERS_QUERY)

  if (loading) {
    return <CircularProgress></CircularProgress>
  }

  if (data) {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Filler,
      Legend,
    )

    const options: ChartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Daily Active Users',
        },
        legend: {
          display: false,
        },
      },
      borderColor: '#8600D6',
      backgroundColor: 'rgba(136, 0, 214, 0.1)',
      elements: {
        line: {
          tension: 0.3,
        },
        point: {
          radius: 1,
        },
      },
    }

    const labels = data.dailyActiveUsers.dailyUsers.map((d) => d.date)

    const dataset = {
      labels,
      datasets: [
        {
          borderWidth: 2,
          fill: true,
          label: 'Daily Active Users',
          data: data.dailyActiveUsers.dailyUsers.map((d) => d.activeUsers),
        },
      ],
    }

    return <Line options={options} data={dataset} height={'70%'} />
  }
  return null
}
