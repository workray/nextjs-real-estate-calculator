import PMT from '@/helpers/calculatePMT'
import { TCalculateRelations, TCashBuy } from '@/types'

const calculate: TCalculateRelations<TCashBuy> = (
  data: TCashBuy | null
): { [key: string]: number } => {
  if (!data) return {}

  const initialFinancing: any = {}
  initialFinancing.loanAmount =
    (data.initial_financing.ltv_of_purchase_price * data.purchase_price) / 100
  initialFinancing.dpAmount = data.purchase_price - initialFinancing.loanAmount
  initialFinancing.monthlyExpense = -PMT(
    data.initial_financing.interest_rate / 100 / 12,
    data.initial_financing.loan_term * 12,
    initialFinancing.loanAmount
  )
  initialFinancing.totalInterest =
    initialFinancing.monthlyExpense * data.initial_financing.months_of_rehab
  const totalRehabLoanCost = data.initial_financing.closing_costs + initialFinancing.totalInterest
  const allInCash =
    data.purchase_price +
    data.closing_costs +
    data.finder_fee_cost +
    data.renovation_costs +
    data.holding_costs.utilities +
    data.holding_costs.insurance +
    totalRehabLoanCost
  const maintenanceAmount = (data.monthly_rent * data.rental_expenses.maintenance) / 100
  const vacancyAmount = (data.monthly_rent * data.rental_expenses.vacancy) / 100
  const propertyManagementAmount =
    (data.monthly_rent * data.rental_expenses.property_management) / 100
  const capitalExpensesAmount = (data.monthly_rent * data.rental_expenses.capital_expenses) / 100

  const monthlyTaxes = data.annual_taxes / 12
  const monthlyPropertyInsurance = data.annual_property_insurance / 12

  const refinancingDetails: any = {}
  refinancingDetails.loanAmount = (data.refinancing.arv * data.refinancing.ltv_of_arv) / 100
  refinancingDetails.dpAmount = data.refinancing.arv - refinancingDetails.loanAmount
  refinancingDetails.monthlyExpense = -PMT(
    data.refinancing.interest_rate / 100 / 12,
    data.refinancing.loan_term * 12,
    refinancingDetails.loanAmount
  )

  const grossIncome = data.monthly_rent * 12
  const netIncome =
    grossIncome -
    refinancingDetails.monthlyExpense * 12 -
    data.annual_taxes -
    data.annual_property_insurance
  const cocReturn = (netIncome / allInCash) * 100

  return {
    initialFinancing,
    totalRehabLoanCost,
    allInCash,
    maintenanceAmount,
    vacancyAmount,
    propertyManagementAmount,
    capitalExpensesAmount,
    monthlyTaxes,
    monthlyPropertyInsurance,
    refinancingDetails,
    grossIncome,
    netIncome,
    cocReturn
  }
}

export default calculate
