import { TCalculatorCard } from '@/types'

const resultSections: TCalculatorCard[] = [
  {
    title: 'Current',
    fields: [
      { type: 'result', id: 'grossIncome', label: 'Gross Income', prefix: '$' },
      { type: 'result', id: 'netIncome', label: 'Net Income', prefix: '$' },
      { type: 'result', id: 'cocReturn', label: 'CoC Return', suffix: '%' }
    ]
  },
  {
    title: 'Over 30 years',
    fields: [
      { type: 'result', id: 'netIncomeOver30', label: 'Net Income', prefix: '$' },
      { type: 'result', id: 'appreciationOver30', label: 'Appreciation', prefix: '$' },
      { type: 'result', id: 'rentalIncomeOver30', label: 'Rental Income', prefix: '$' }
    ]
  }
]

export default resultSections
