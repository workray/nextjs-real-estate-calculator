'use client'
import { REPORT, TReportParams } from '@/types'
import { useReportsState } from '.'
import useReportsData from './useReportsData'
import api from '@/lib/api'

const useScenarios = ({ reportId }: TReportParams & { type: string }) => {
  const { reports, scenarios, calculations } = useReportsState()
  const report = reports[reportId]
  report.scenarios = report
    ? report.scenarios.map((scenarioId: string) => {
        const scenario = scenarios[scenarioId]
        if (scenario && scenario.cash_purchase) {
          scenario.cash_purchase = calculations[scenario.cash_purchase]
        }
        if (scenario && scenario.normal_purchase) {
          scenario.normal_purchase = calculations[scenario.normal_purchase]
        }
      })
    : []
  return {
    report,
    ...useReportsData({
      action: REPORT,
      params: { reportId },
      fetchData: () => api.get(`/api/reports/${reportId}`)
    })
  }
}
export default useScenarios
