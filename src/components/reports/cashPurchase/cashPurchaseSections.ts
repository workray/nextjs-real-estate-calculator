import { TCalculatorSection } from '@/types'

const cashBuySections: TCalculatorSection[] = [
  [
    {
      title: 'Purchase Information',
      fields: [
        {
          id: 'purchase_price',
          label: 'Purchase Price',
          prefix: '$'
        },
        {
          id: 'closing_costs',
          label: 'Closing Costs',
          prefix: '$'
        },
        {
          id: 'finder_fee_cost',
          label: 'Finder Fee Cost',
          prefix: '$'
        }
      ]
    },
    {
      title: 'Rehab Information',
      fields: [
        {
          id: 'rehab_expense',
          label: 'Rehab Expense',
          prefix: '$'
        }
      ]
    },
    {
      type: 'result',
      id: 'totalCashIn',
      label: 'Total Cash In',
      prefix: '$'
    }
  ],
  [
    {
      title: 'Rental Information',
      fields: [
        {
          id: 'gross_rental_income',
          label: 'Gross Rental Income',
          prefix: '$'
        }
      ]
    },
    {
      title: 'Rental Expenses',
      fields: [
        {
          id: 'maintenance',
          label: 'Maintenance',
          suffix: '%'
        },
        {
          id: 'vacancy',
          label: 'Vacancy',
          suffix: '%'
        },
        {
          id: 'property_management',
          label: 'Property Management',
          suffix: '%'
        },
        {
          id: 'capital_expenses',
          label: 'Capital Expenses',
          suffix: '%'
        }
      ]
    },
    {
      type: 'result',
      id: 'rentalExpenses',
      label: 'Rental Expenses',
      prefix: '$'
    }
  ],
  [
    {
      title: 'Property Expenses',
      fields: [
        {
          id: 'annual_taxes',
          label: 'Taxes (Annual)',
          prefix: '$'
        },
        {
          id: 'annual_property_insurance',
          label: 'Property Insurance (Annual)',
          prefix: '$'
        }
      ]
    }
  ]
]
export default cashBuySections
