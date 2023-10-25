import mongoose from 'mongoose'

export const ScenarioSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please provide a Scenario Name'] },
  cash_purchase: { type: mongoose.Types.ObjectId, ref: 'cashpurchases' },
  normal_purchase: { type: mongoose.Types.ObjectId, ref: 'normalpurchases' },
  cash_buy: { type: mongoose.Types.ObjectId, ref: 'cashbuys' }
})

const Scenario = mongoose.models.scenarios || mongoose.model('scenarios', ScenarioSchema)

export default Scenario
