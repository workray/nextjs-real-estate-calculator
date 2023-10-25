'use client'

import { useMemo } from 'react'
import {
  TScenario,
  TReportTableData,
  TReportChartData,
  TCalculateRelations,
  TCalculate
} from '@/types'
import ReportTable from './ReportTable'
import { ColumnDef } from '@tanstack/table-core'
import ReportChart from './ReportChart'

export type TReportProps<T> = {
  reportId: string
  scenarios: TScenario[]
  items: { [key: string]: T }
}

function Report<T>({
  reportId,
  scenarios,
  items,
  columns,
  calculate,
  calculateResult
}: TReportProps<T> & {
  columns: ColumnDef<TReportTableData<T>>[]
  calculate: TCalculateRelations<T>
  calculateResult: TCalculate<T>
}) {
  const { tableData, chartData } = useMemo(() => {
    const tableData: TReportTableData<T>[] = []
    const chartData: TReportChartData[] = []
    scenarios.forEach((scenario: TScenario, index) => {
      const item = items[scenario._id]
      const calculations = calculate(item)
      const result = calculateResult(item, 30)
      chartData.push({ ...result, name: scenario.name })
      tableData.push({
        ...scenario,
        ...item,
        grossIncome: calculations.grossIncome,
        netIncome: calculations.netIncome,
        cocReturn: calculations.cocReturn,
        netIncomeOver30: result.netIncome,
        appreciationOver30: result.appreciation,
        rentalIncomeOver30: result.rentalIncome,
        no: index + 1,
        scenarioId: scenario._id
      })
    })
    return { tableData, chartData }
  }, [items, scenarios, calculate, calculateResult])
  return (
    <div className="space-y-4">
      <ReportTable reportId={reportId} data={tableData} columns={columns} />
      <ReportChart values={chartData} />
    </div>
  )
}

export default Report
