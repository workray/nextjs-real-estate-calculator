'use client'

import {
  CalculatorTypes,
  CashBuyCalculator,
  CashPurchaseCalculator,
  ContainerWithPageTitle,
  NormalPurchaseCalculator,
  ScenarioName
} from '@/components'
import useScenario from '@/providers/reports/useScenario'
import { CASH_BUY, CASH_PURCHASE, NORMAL_PURCHASE, TCalculatorType, TScenarioParams } from '@/types'
import { useEffect, useState } from 'react'

const ScenarioPage = ({ params }: { params: TScenarioParams }) => {
  const { scenario, cashPurchase, normalPurchase, cashBuy, loading, mutate } = useScenario(params)
  const [type, setType] = useState<TCalculatorType>(CASH_PURCHASE)
  useEffect(() => {
    mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (loading && !scenario) {
    return <p>loading...</p>
  }
  return (
    <ContainerWithPageTitle title={'Scenario'} toRedirect={`/reports/${params.reportId}`}>
      {loading && !scenario && <p>No Data</p>}
      {scenario && (
        <div className="space-y-4">
          <ScenarioName params={params} scenario={scenario} />
          <CalculatorTypes type={type} changeCalculator={setType} />
          {type === CASH_PURCHASE && (
            <CashPurchaseCalculator
              reportId={params.reportId}
              scenarioId={params.scenarioId}
              calculatorId={cashPurchase ? cashPurchase._id : null}
              key={cashPurchase ? cashPurchase._id : 'cash_purchase'}
              initialValues={cashPurchase}
            />
          )}
          {type === NORMAL_PURCHASE && (
            <NormalPurchaseCalculator
              reportId={params.reportId}
              scenarioId={params.scenarioId}
              calculatorId={normalPurchase ? normalPurchase._id : null}
              key={normalPurchase ? normalPurchase._id : 'normal_purchase'}
              initialValues={normalPurchase}
            />
          )}
          {type === CASH_BUY && (
            <CashBuyCalculator
              reportId={params.reportId}
              scenarioId={params.scenarioId}
              calculatorId={cashBuy ? cashBuy._id : null}
              key={cashBuy ? cashBuy._id : 'cash_buy'}
              initialValues={cashBuy}
            />
          )}
        </div>
      )}
    </ContainerWithPageTitle>
  )
}

export default ScenarioPage
