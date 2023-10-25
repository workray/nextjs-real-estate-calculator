'use client'

import { useMemo } from 'react'
import { TCalculate, TCalculateRelations } from '@/types'

function useCalculationData<T>(
  values: T,
  calculateResult: TCalculate<T>,
  calculate?: TCalculateRelations<T>
) {
  return useMemo(() => {
    const resultOver30 = calculateResult(values, 30)
    const currentData = {
      ...values,
      ...(calculate ? calculate(values) : {}),
      netIncomeOver30: resultOver30.netIncome,
      appreciationOver30: resultOver30.appreciation,
      rentalIncomeOver30: resultOver30.rentalIncome
    }
    const currentYear = new Date().getFullYear()
    const arr = Array.from(Array(30).keys())
    const data = arr.map(i => calculateResult(values, i))
    const chartOptions = (title: string) => ({
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const
        },
        title: {
          display: true,
          text: title
        }
      }
    })
    const labels = arr.map(i => currentYear + i)
    const chartData = [
      {
        options: chartOptions('Real estate calculation over 30 years'),
        data: {
          labels,
          datasets: [
            {
              label: 'Net income over 30 years',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              data: data.map(({ netIncome }) => netIncome)
            },
            {
              label: 'Appreciation over 30 years',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              data: data.map(({ appreciation }) => appreciation)
            },
            {
              label: 'Rental Rate Increase over 30 years',
              backgroundColor: 'rgba(rgba(123, 135, 132, 0.5)',
              data: data.map(({ rentalIncome }) => rentalIncome)
            }
          ]
        }
      }
    ]
    return { chartData, data: currentData as { [id: string]: number } }
  }, [calculate, calculateResult, values])
}
export default useCalculationData
