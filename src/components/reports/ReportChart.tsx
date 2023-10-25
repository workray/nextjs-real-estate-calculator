'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useMemo } from 'react'
import { generateRandomColor } from '@/helpers'
import { TReportChartData } from '@/types'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)

const colors: string[] = []

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Comparing Real State by Scenarios'
    }
  }
}

const ReportChart = ({ values = [] }: { values: TReportChartData[] }) => {
  const data = useMemo(() => {
    // disable-eslint
    if (colors.length < values.length) {
      Array.from(Array(values.length - colors.length).keys()).forEach(() =>
        colors.push(generateRandomColor())
      )
    }
    return {
      labels: [
        'Net income over 30 years',
        'Appreciation over 30 years',
        'Rental Rate Increase over 30 years'
      ],
      datasets: values.map(({ name, netIncome, appreciation, rentalIncome }, index) => ({
        label: name,
        backgroundColor: colors[index],
        bordercolor: colors[index], // set the  border color
        fill: false, // required for line chart
        data: [netIncome, appreciation, rentalIncome]
      }))
    }
  }, [values])

  return <Line options={options} data={data} />
}

export default ReportChart
