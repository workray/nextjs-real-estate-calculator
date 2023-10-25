import { TNormalPurchase } from '@/types'

const defaultInitialValues: TNormalPurchase = {
  _id: '',
  purchase_price: 125000,
  closing_costs: 2000,
  finder_fee_cost: 5000,
  rehab_expense: 0,
  mortgage: {
    ltv_of_arv: 75,
    closing_costs: 3000,
    down_payment: 25,
    interest_rate: 5.5,
    loan_term: 30
  },
  gross_rental_income: 2500,
  maintenance: 5,
  vacancy: 5,
  property_management: 5,
  capital_expenses: 5,
  hoa_fees: 150,
  utilities: 150,
  insurance: 100,
  annual_taxes: 1800,
  annual_property_insurance: 1200
}

export default defaultInitialValues
