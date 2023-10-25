import { TObject } from './TObject'

type TCashPurchase = TObject & {
  purchase_price: number
  closing_costs: number
  finder_fee_cost: number
  rehab_expense: number
  gross_rental_income: number
  maintenance: number
  vacancy: number
  property_management: number
  capital_expenses: number
  annual_taxes: number
  annual_property_insurance: number
}

export default TCashPurchase
