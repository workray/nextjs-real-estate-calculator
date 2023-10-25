import { CASH_BUY, ScenarioCalculatorProps, TCashBuy } from '@/types'
import defaultInitialValues from './defaultInitialValues'
import Calculator from '../Calculator'
import useCashBuy from '@/providers/reports/useCashBuy'
import cashBuySections from './cashBuySections'
import calculate from './calculate'
import calculateResult from './calculateResult'

export default function CashBuyCalculator({
  reportId,
  scenarioId,
  calculatorId,
  initialValues = defaultInitialValues
}: ScenarioCalculatorProps<TCashBuy>) {
  return (
    <Calculator
      type={CASH_BUY}
      reportId={reportId}
      scenarioId={scenarioId}
      calculatorId={calculatorId}
      initialValues={initialValues}
      calculate={calculate}
      calculateResult={calculateResult}
      useSaveHook={useCashBuy}
      sections={cashBuySections}
    />
  )
}
