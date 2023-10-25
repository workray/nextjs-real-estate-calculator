'use client'
import {
  CASH_BUY,
  CASH_PURCHASE,
  NORMAL_PURCHASE,
  SELLER_FINANCE_PURCHASE,
  SUB_TO_PURCHASE,
  TCalculatorType
} from '@/types'

const CalculatorTypes = ({
  type,
  changeCalculator
}: {
  type: TCalculatorType
  changeCalculator: (type: TCalculatorType) => void
}) => {
  const calculatorTab = (calculator: TCalculatorType, label: string) => (
    <a
      className={`tab tab-lg tab-bordered ${type === calculator ? 'tab-active' : ''}`}
      onClick={() => changeCalculator(calculator)}
    >
      {label}
    </a>
  )
  return (
    <div className="tabs">
      {calculatorTab(CASH_PURCHASE, 'Cash Purchase')}
      {calculatorTab(NORMAL_PURCHASE, 'Normal Purchase (w Mortgage)')}
      {calculatorTab(CASH_BUY, 'Cash Buy -> Refinance')}
      {calculatorTab(SUB_TO_PURCHASE, 'Sub To Purchase')}
      {calculatorTab(SELLER_FINANCE_PURCHASE, 'Seller Finance Purchase')}
    </div>
  )
}

export default CalculatorTypes
