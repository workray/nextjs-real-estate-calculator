import mongoose from 'mongoose'

// Net Operating Income = Revenue – Operating Expenses

export const CashPurchaseSchema = new mongoose.Schema({
  purchase_price: { type: Number, default: 0 },
  closing_costs: { type: Number, default: 0 },
  finder_fee_cost: { type: Number, default: 0 },
  rehab_expense: { type: Number, default: 0 },
  gross_rental_income: { type: Number, default: 0 },
  maintenance: { type: Number, default: 0 },
  vacancy: { type: Number, default: 0 },
  property_management: { type: Number, default: 0 },
  capital_expenses: { type: Number, default: 0 },
  annual_taxes: { type: Number, default: 0 },
  annual_property_insurance: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  updated: { type: Date }
})

const CashPurchase =
  mongoose.models.cashpurchases || mongoose.model('cashpurchases', CashPurchaseSchema)

export default CashPurchase
