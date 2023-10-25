import PMT from '@/helpers/calculatePMT'
import { TCalculationData, TCashBuy } from '@/types'

const calculateResult = (data: TCashBuy | null, years: number = 1): TCalculationData => {
  let netIncome = 0
  let appreciation = 0
  let rentalIncome = 0
  try {
    if (data) {
      let purchasePrice = data.purchase_price
      const grossRentalIncome = data.monthly_rent * 12
      const rentalRateIncrease = 0.03 // 3% average rental rate increase YoY

      const downPayment = purchasePrice * (data.initial_financing.down_payment / 100)
      const loanAmount =
        purchasePrice * (data.initial_financing.ltv_of_purchase_price / 100) - downPayment
      const monthlyInterestRate = data.initial_financing.interest_rate / 100 / 12
      const numberOfPayments = data.initial_financing.loan_term * 12

      const rentalExpenses =
        (grossRentalIncome *
          (data.rental_expenses.maintenance +
            data.rental_expenses.vacancy +
            data.rental_expenses.property_management +
            data.rental_expenses.capital_expenses)) /
        100
      data.rental_expenses.hoa_fees +
        data.rental_expenses.utilities +
        data.rental_expenses.insurance
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

      const refinancingLoanAmount = (data.refinancing.arv * data.refinancing.ltv_of_arv) / 100
      // const refinancingDpAmount = data.refinancing.arv - refinancingLoanAmount
      const refinancingMonthlyExpense = -PMT(
        data.refinancing.interest_rate / 100 / 12,
        data.refinancing.loan_term * 12,
        refinancingLoanAmount
      )
      const refinancingMortgageExpenses = refinancingMonthlyExpense * 12

      const refinancingNetIncome =
        grossRentalIncome - rentalExpenses - propertyExpenses - refinancingMortgageExpenses

      netIncome += refinancingNetIncome
    }
  } catch (error) {
    console.log(error)
  }
  return { netIncome, appreciation, rentalIncome }
}

export default calculateResult
