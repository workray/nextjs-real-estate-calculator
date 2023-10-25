import { TCashBuy } from '@/types'

const defaultInitialValues: TCashBuy = {
  _id: '',
  purchase_price: 250000,
  closing_costs: 2500,
  finder_fee_cost: 5000,
  renovation_costs: 25000,
  holding_costs: {
    utilities: 350,
    insurance: 450
  },
  initial_financing: {
    ltv_of_purchase_price: 75,
    closing_costs: 3000,
    down_payment: 25,
    interest_rate: 5.5,
    loan_term: 30,
    months_of_rehab: 3
  },
  rental_expenses: {
    maintenance: 8,
    vacancy: 8,
    property_management: 8,
    capital_expenses: 8,
    hoa_fees: 150,
    utilities: 200,
    insurance: 100
  },
  annual_taxes: 1500,
  annual_property_insurance: 1800,
  refinancing: {
    arv: 350000,
    ltv_of_arv: 70,
    closing_costs: 3500,
    down_payment: 30,
    interest_rate: 5,
    loan_term: 30
  },
  monthly_rent: 2000,
  other_income: 0
}

export default defaultInitialValues
