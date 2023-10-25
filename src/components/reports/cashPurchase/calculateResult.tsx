import { TCalculationData, TCashPurchase } from '@/types'

const calculateResult = (data: TCashPurchase | null, years: number = 1): TCalculationData => {
  let netIncome = 0
  let appreciation = 0
  let rentalIncome = 0
  try {
    if (data) {
      let purchasePrice = data.purchase_price

      const rentalIncreaseIncome = 0.03 // 3% average rental rate increase YoY
      const grossRentalIncome = data.gross_rental_income * 12
      const rentalExpenses =
        (grossRentalIncome *
          (data.maintenance + data.vacancy + data.property_management + data.capital_expenses)) /
        100
      const propertyExpenses = data.annual_taxes + data.annual_property_insurance
      const expenses = rentalExpenses + propertyExpenses

      for (let year = 1; year <= years; year++) {
        rentalIncome = grossRentalIncome * Math.pow(1 + rentalIncreaseIncome, year - 1)
        netIncome += rentalIncome - expenses

        appreciation += purchasePrice * 0.03 // Assuming 3% annual appreciation

        purchasePrice += purchasePrice * 0.03 // Update purchase price for next year's appreciation
      }
    }
  } catch (error) {
    console.log(error)
  }
  return { netIncome, appreciation, rentalIncome }
}

export default calculateResult
