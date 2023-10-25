import { TObject } from './TObject'

type TNormalPurchase = TObject & {
  purchase_price: number
  closing_costs: number
  finder_fee_cost: number
  rehab_expense: number
  mortgage: {
    ltv_of_arv: number
    closing_costs: number
    down_payment: number
    interest_rate: number
    loan_term: number
  }
  gross_rental_income: number
  maintenance: number
  vacancy: number
  property_management: number
  capital_expenses: number
  hoa_fees: number
  utilities: number
  insurance: number

  annual_taxes: number
  annual_property_insurance: number
}

export default TNormalPurchase
