import { TCalculateRelations, TCashPurchase } from '@/types'

const calculate: TCalculateRelations<TCashPurchase> = (
  data: TCashPurchase | null
): { [key: string]: number } => {
  if (!data) return {}

  const totalCashIn =
    data.purchase_price + data.closing_costs + data.finder_fee_cost + data.rehab_expense
  const rentalExpenses =
    (data.gross_rental_income *
      (data.maintenance + data.vacancy + data.property_management + data.capital_expenses)) /
    100
  const grossIncome = data.gross_rental_income * 12
  const netIncome =
    grossIncome - rentalExpenses * 12 - data.annual_taxes - data.annual_property_insurance
  const cocReturn = (netIncome / totalCashIn) * 100

  return { totalCashIn, rentalExpenses, grossIncome, netIncome, cocReturn }
}

export default calculate
