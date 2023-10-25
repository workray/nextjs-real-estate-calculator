import { TCalculationData, TNormalPurchase } from '@/types'

const calculateResult = (data: TNormalPurchase | null, years: number = 1): TCalculationData => {
  let netIncome = 0
  let appreciation = 0
  let rentalIncome = 0
  try {
    if (data) {
      let purchasePrice = data.purchase_price
      const grossRentalIncome = data.gross_rental_income * 12
      const rentalRateIncrease = 0.03 // 3% average rental rate increase YoY

      const downPayment = purchasePrice * (data.mortgage.down_payment / 100)
      const loanAmount = purchasePrice * (data.mortgage.ltv_of_arv / 100) - downPayment
      const monthlyInterestRate = data.mortgage.interest_rate / 100 / 12
      const numberOfPayments = data.mortgage.loan_term * 12

      const rentalExpenses =
        (grossRentalIncome *
          (data.maintenance + data.vacancy + data.property_management + data.capital_expenses)) /
        100
      data.hoa_fees + data.utilities + data.insurance
      const propertyExpenses = data.annual_taxes + data.annual_property_insurance
      const expenses = rentalExpenses + propertyExpenses

      for (let year = 1; year <= years; year++) {
        rentalIncome = grossRentalIncome * Math.pow(1 + rentalRateIncrease, year - 1)

        const monthlyPayment =
          (loanAmount * monthlyInterestRate) /
          (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
        const mortgageExpenses = monthlyPayment * 12

        netIncome += rentalIncome - expenses - mortgageExpenses

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
