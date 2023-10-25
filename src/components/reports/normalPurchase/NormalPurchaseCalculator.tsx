import { NORMAL_PURCHASE, ScenarioCalculatorProps, TNormalPurchase } from '@/types'
import defaultInitialValues from './defaultInitialValues'
import Calculator from '../Calculator'
import calculateResult from './calculateResult'
import cashBuySections from './normalPurchaseSections'
import calculate from './calculate'
import { useNormalPurchase } from '@/providers/reports'

export default function NormalPurchaseCalculator({
  reportId,
  scenarioId,
  calculatorId,
  initialValues = defaultInitialValues
}: ScenarioCalculatorProps<TNormalPurchase>) {
  return (
    <Calculator
      type={NORMAL_PURCHASE}
      reportId={reportId}
      scenarioId={scenarioId}
      calculatorId={calculatorId}
      initialValues={initialValues}
      calculate={calculate}
      calculateResult={calculateResult}
      useSaveHook={useNormalPurchase}
      sections={cashBuySections}
    />
  )
}
