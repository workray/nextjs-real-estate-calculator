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
    }
  ],
  [
    {
      title: 'Mortgage Expense',
      fields: [
        {
          id: 'mortgage.ltv_of_arv',
          label: 'LTV of ARV',
          suffix: '%'
        },
        {
          id: 'mortgage.closing_costs',
          label: 'Closing Costs',
          prefix: '$'
        },
        {
          id: 'mortgage.down_payment',
          label: 'Down Payment %',
          suffix: '%'
        },
        {
          id: 'mortgage.interest_rate',
          label: 'Interest Rate',
          suffix: '%'
        },
        {
          id: 'mortgage.loan_term',
          label: 'Loan Term',
          suffix: ' years'
        },
        {
          type: 'result',
          id: 'mortgageLoanAmount',
          label: '<-- loan amount',
          prefix: '$'
        },
        {
          type: 'result',
          id: 'mortgageDpAmount',
          label: '<-- dp amount',
          prefix: '$'
        },
        {
          type: 'result',
          id: 'monthlyExpense',
          label: 'Monthly Expense',
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
          suffix: '%',
          additional: { id: 'maintenanceAmount', label: '$ amount', prefix: '$' }
        },

        {
          id: 'vacancy',
          label: 'Vacancy',
          suffix: '%',
          additional: { id: 'vacancyAmount', prefix: '$' }
        },

        {
          id: 'property_management',
          label: 'Property Management',
          suffix: '%',
          additional: { id: 'propertyManagementAmount', prefix: '$' }
        },
        {
          id: 'capital_expenses',
          label: 'Capital Expenses',
          suffix: '%',
          additional: { id: 'capitalExpensesAmount', prefix: '$' }
        },
        [
          {
            id: 'hoa_fees',
            label: 'HOA fees',
            prefix: '$'
          }
        ],
        [
          {
            id: 'utilities',
            label: 'Utilities',
            prefix: '$'
          }
        ],
        [
          {
            id: 'insurance',
            label: 'Insurance',
            prefix: '$'
          }
        ]
      ]
    },
    {
      title: 'Property Expenses',
      fields: [
        {
          id: 'annual_taxes',
          label: 'Taxes (Annual)',
          prefix: '$',
          additional: { id: 'monthlyTaxes', label: 'Monthly', prefix: '$' }
        },
        {
          id: 'annual_property_insurance',
          label: 'Property Insurance (Annual)',
          prefix: '$',
          additional: { id: 'monthlyPropertyInsurance', prefix: '$' }
        }
      ]
    },
    {
      type: 'result',
      id: 'totalMonthlyExpenses',
      label: 'Total Monthly Expenses',
      prefix: '$'
    }
  ]
]
export default cashBuySections
