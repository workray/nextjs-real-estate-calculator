import mongoose from 'mongoose'

// Net Operating Income = Revenue – Operating Expenses

export const CashBuySchema = new mongoose.Schema({
  purchase_price: { type: Number, default: 0 },
  closing_costs: { type: Number, default: 0 },
  finder_fee_cost: { type: Number, default: 0 },
  renovation_costs: { type: Number, default: 0 },
  holding_costs: {
    utilities: { type: Number, default: 0 },
    insurance: { type: Number, default: 0 }
  },
  initial_financing: {
    ltv_of_purchase_price: { type: Number, default: 0 },
    closing_costs: { type: Number, default: 0 },
    down_payment: { type: Number, default: 0 },
    interest_rate: { type: Number, default: 0 },
    loan_term: { type: Number, default: 0 },
    months_of_rehab: { type: Number, default: 0 }
  },
  rental_expenses: {
    maintenance: { type: Number, default: 0 },
    vacancy: { type: Number, default: 0 },
    property_management: { type: Number, default: 0 },
    capital_expenses: { type: Number, default: 0 },
    hoa_fees: { type: Number, default: 0 },
    utilities: { type: Number, default: 0 },
    insurance: { type: Number, default: 0 }
  },
  annual_taxes: { type: Number, default: 0 },
  annual_property_insurance: { type: Number, default: 0 },
  refinancing: {
    arv: { type: Number, default: 0 },
    ltv_of_arv: { type: Number, default: 0 },
    closing_costs: { type: Number, default: 0 },
    down_payment: { type: Number, default: 0 },
    interest_rate: { type: Number, default: 0 },
    loan_term: { type: Number, default: 0 }
  },
  monthly_rent: { type: Number, default: 0 },
  other_income: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  updated: { type: Date }
})

const CashBuy = mongoose.models.cashbuys || mongoose.model('cashbuys', CashBuySchema)

export default CashBuy
