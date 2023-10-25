import { CASH_PURCHASE, ScenarioCalculatorProps, TCashPurchase } from '@/types'
import defaultInitialValues from './defaultInitialValues'
import Calculator from '../Calculator'
import calculateResult from './calculateResult'
import useCashPurchase from '@/providers/reports/useCashPurchase'
import cashBuySections from './cashPurchaseSections'
import calculate from './calculate'

export default function CashPurchaseCalculator({
  reportId,
  scenarioId,
  calculatorId,
  initialValues = defaultInitialValues
}: ScenarioCalculatorProps<TCashPurchase>) {
  return (
    <Calculator
      type={CASH_PURCHASE}
      reportId={reportId}
      scenarioId={scenarioId}
      calculatorId={calculatorId}
      initialValues={initialValues}
      calculate={calculate}
      calculateResult={calculateResult}
      useSaveHook={useCashPurchase}
      sections={cashBuySections}
    />
  )
}
