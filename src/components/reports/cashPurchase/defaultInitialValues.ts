import { TCashPurchase } from '@/types'

const defaultInitialValues: TCashPurchase = {
  _id: '',
  purchase_price: 115000,
  closing_costs: 2500,
  finder_fee_cost: 5000,
  rehab_expense: 15000,
  gross_rental_income: 1300,
  maintenance: 6,
  vacancy: 6,
  property_management: 8,
  capital_expenses: 5,
  annual_taxes: 2400,
  annual_property_insurance: 1200
}

export default defaultInitialValues
