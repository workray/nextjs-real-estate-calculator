import { TObject } from './TObject'

type TCashBuy = TObject & {
  purchase_price: number
  closing_costs: number
  finder_fee_cost: number
  renovation_costs: number
  holding_costs: {
    utilities: number
    insurance: number
  }
  initial_financing: {
    ltv_of_purchase_price: number
    closing_costs: number
    down_payment: number
    interest_rate: number
    loan_term: number
    months_of_rehab: number
  }
  rental_expenses: {
    maintenance: number
    vacancy: number
    property_management: number
    capital_expenses: number
    hoa_fees: number
    utilities: number
    insurance: number
  }
  annual_taxes: number
  annual_property_insurance: number
  refinancing: {
    arv: number
    ltv_of_arv: number
    closing_costs: number
    down_payment: number
    interest_rate: number
    loan_term: number
  }
  monthly_rent: number
  other_income: number
}

export default TCashBuy
