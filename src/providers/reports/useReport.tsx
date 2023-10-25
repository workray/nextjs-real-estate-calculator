import {
  CHANGED_CALCULATOR,
  REPORT,
  TCalculatorType,
  TReportParams,
  TScenario,
  TNormalPurchase,
  TCashPurchase,
  CASH_PURCHASE,
  TCashBuy
} from '@/types'
import { useReportsDispatch, useReportsState } from '.'
import useReportsData from './useReportsData'
import api from '@/lib/api'
import { useMemo } from 'react'

const useReport = (params: TReportParams) => {
  const { reportId } = params
  const dispatch = useReportsDispatch()
  const { calculators, reports, scenarios, cash_purchases, normal_purchases, cash_buys } =
    useReportsState()
  const { report, type, scenariosForReport, cashPurchases, normalPurchases, cashBuys } =
    useMemo(() => {
      const report = reports[reportId]
      const type: TCalculatorType = (calculators[reportId] || CASH_PURCHASE) as TCalculatorType
      const scenariosForReport: TScenario[] = []
      const cashPurchases: { [key: string]: TCashPurchase } = {}
      const normalPurchases: { [key: string]: TNormalPurchase } = {}
      const cashBuys: { [eky: string]: TCashBuy } = {}
      if (report)
        report.scenarios.forEach((scenarioId: string) => {
          const scenario = scenarios[scenarioId]
          if (scenario) {
            scenariosForReport.push(scenario)
            cashPurchases[scenario._id] = scenario.cash_purchase
              ? cash_purchases[scenario.cash_purchase]
              : null
            normalPurchases[scenario._id] = scenario.normal_purchase
              ? normal_purchases[scenario.normal_purchase]
              : null

            cashBuys[scenario._id] = scenario.cash_buy ? cash_buys[scenario.cash_buy] : null
          }
        })
      return { report, type, scenariosForReport, cashPurchases, normalPurchases, cashBuys }
    }, [reports, reportId, calculators, scenarios, cash_purchases, normal_purchases, cash_buys])

  const changeCalculator = (type: TCalculatorType) => {
    dispatch({
      type: CHANGED_CALCULATOR,
      payload: { params, data: { type } }
    })
  }

  return {
    report,
    type,
    scenarios: scenariosForReport,
    cashPurchases,
    normalPurchases,
    cashBuys,
    changeCalculator,
    ...useReportsData({
      action: REPORT,
      params,
      fetchData: () => api.get(`/api/reports/${reportId}`)
    })
  }
}
export default useReport
