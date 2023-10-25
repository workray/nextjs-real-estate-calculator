import { SCENARIO, TScenarioParams } from '@/types'
import { useReportsState } from '.'
import useReportsData from './useReportsData'
import api from '@/lib/api'
import { useMemo } from 'react'

const useScenario = (params: TScenarioParams) => {
  const { reportId, scenarioId } = params
  const { scenarios, cash_purchases, normal_purchases, cash_buys } = useReportsState()

  const { scenario, cashPurchase, normalPurchase, cashBuy } = useMemo(() => {
    const scenario = scenarios[scenarioId]
    const cashPurchase = scenario ? cash_purchases[scenario.cash_purchase] : undefined
    const normalPurchase = scenario ? normal_purchases[scenario.normal_purchase] : undefined
    const cashBuy = scenario ? cash_buys[scenario.cash_buy] : undefined
    return { scenario, cashPurchase, normalPurchase, cashBuy }
  }, [cash_buys, cash_purchases, scenarioId, scenarios, normal_purchases])
  return {
    scenario,
    cashPurchase,
    normalPurchase,
    cashBuy,
    ...useReportsData({
      action: SCENARIO,
      params,
      fetchData: () => api.get(`/api/reports/${reportId}/scenarios/${scenarioId}`)
    })
  }
}
export default useScenario
