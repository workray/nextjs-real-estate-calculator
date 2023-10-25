import PMT from '@/helpers/calculatePMT'
import { TCalculateRelations, TNormalPurchase } from '@/types'

const calculate: TCalculateRelations<TNormalPurchase> = (
  data: TNormalPurchase | null
): { [key: string]: number } => {
  if (!data) return {}
  const mortgageLoanAmount = (data.purchase_price * data.mortgage.ltv_of_arv) / 100
  const mortgageDpAmount = data.purchase_price - mortgageLoanAmount
  const monthlyExpense = -PMT(
    data.mortgage.interest_rate / 100 / 12,
    data.mortgage.loan_term * 12,
    mortgageLoanAmount
  )
  const totalCashIn =
    data.purchase_price +
    data.closing_costs +
    data.finder_fee_cost +
    data.rehab_expense +
    data.mortgage.closing_costs
  const maintenanceAmount = (data.gross_rental_income * data.maintenance) / 100
  const vacancyAmount = (data.gross_rental_income * data.vacancy) / 100
  const propertyManagementAmount = (data.gross_rental_income * data.property_management) / 100
  const capitalExpensesAmount = (data.gross_rental_income * data.capital_expenses) / 100
  const monthlyTaxes = data.annual_taxes / 12
  const monthlyPropertyInsurance = data.annual_property_insurance / 12
  const totalMonthlyExpenses =
    monthlyExpense +
    maintenanceAmount +
    vacancyAmount +
    propertyManagementAmount +
    capitalExpensesAmount +
    data.hoa_fees +
    data.utilities +
    data.insurance +
    monthlyTaxes +
    monthlyPropertyInsurance

  const grossIncome = data.gross_rental_income
  const netIncome = grossIncome - totalMonthlyExpenses
  const cocReturn = (netIncome / totalCashIn) * 12 * 100

  return {
    mortgageLoanAmount,
    mortgageDpAmount,
    monthlyExpense,
    totalCashIn,
    maintenanceAmount,
    vacancyAmount,
    propertyManagementAmount,
    capitalExpensesAmount,
    monthlyTaxes,
    monthlyPropertyInsurance,
    totalMonthlyExpenses,
    grossIncome,
    netIncome,
    cocReturn
  }
}

export default calculate
