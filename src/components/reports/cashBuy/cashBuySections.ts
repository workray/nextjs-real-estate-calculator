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
          id: 'renovation_costs',
          label: 'Renovation Costs',
          prefix: '$'
        },
        {
          label: 'Holding Costs',
          fields: [
            { id: 'holding_costs.utilities', label: 'include estimated utilities', prefix: '$' },
            { id: 'holding_costs.insurance', label: 'include estimated insurance', prefix: '$' }
          ]
        }
      ]
    },
    {
      title: 'Rental Income (after rehab)',
      fields: [
        { id: 'monthly_rent', label: 'Monthly Rent', prefix: '$' },
        {
          id: 'other_income',
          label: 'Other Income',
          prefix: '$'
        }
      ]
    }
  ],
  [
    {
      title: 'Initial Financing Information\n(Hard or Private money loan)',
      fields: [
        {
          id: 'initial_financing.ltv_of_purchase_price',
          label: 'LTV of Purchase Price',
          suffix: '%'
        },
        {
          id: 'initial_financing.closing_costs',
          label: 'Closing Costs (escrow fees & points)',
          prefix: '$'
        },
        {
          id: 'initial_financing.down_payment',
          label: 'Down Payment %',
          suffix: '%'
        },
        {
          id: 'initial_financing.interest_rate',
          label: 'Interest Rate',
          suffix: '%'
        },
        {
          id: 'initial_financing.loan_term',
          label: 'Loan Term',
          suffix: ' years'
        },
        {
          id: 'initial_financing.months_of_rehab',
          label: 'Months of rehab'
        },
        {
          type: 'result',
          id: 'initialFinancing.loanAmount',
          label: '<-- loan amount',
          prefix: '$'
        },
        {
          type: 'result',
          id: 'initialFinancing.dpAmount',
          label: '<-- dp amount',
          prefix: '$'
        },
        {
          type: 'result',
          id: 'initialFinancing.monthlyExpense',
          label: 'Monthly expense',
          prefix: '$'
        },
        {
          type: 'result',
          id: 'initialFinancing.totalInterest',
          label: 'Total Interest',
          prefix: '$'
        }
      ]
    },
    {
      type: 'result',
      id: 'allInCash',
      label: 'All In Cash',
      prefix: '$'
    }
  ],
  [
    {
      title: 'Rental Expenses',
      fields: [
        {
          id: 'rental_expenses.maintenance',
          label: 'Maintenance',
          suffix: '%',
          additional: { id: 'maintenanceAmount', label: '$ amount', prefix: '$' }
        },

        {
          id: 'rental_expenses.vacancy',
          label: 'Vacancy',
          suffix: '%',
          additional: { id: 'vacancyAmount', prefix: '$' }
        },

        {
          id: 'rental_expenses.property_management',
          label: 'Property Management',
          suffix: '%',
          additional: { id: 'propertyManagementAmount', prefix: '$' }
        },
        {
          id: 'rental_expenses.capital_expenses',
          label: 'Capital Expenses',
          suffix: '%',
          additional: { id: 'capitalExpensesAmount', prefix: '$' }
        },
        [
          {
            id: 'rental_expenses.hoa_fees',
            label: 'HOA fees',
            prefix: '$'
          }
        ],
        [
          {
            id: 'rental_expenses.utilities',
            label: 'Utilities',
            prefix: '$'
          }
        ],
        [
          {
            id: 'rental_expenses.insurance',
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
    }
  ],
  [
    {
      title: 'Refinancing Details',
      fields: [
        {
          id: 'refinancing.arv',
          label: 'ARV',
          prefix: '$'
        },
        {
          id: 'refinancing.ltv_of_arv',
          label: 'LTV of ARV',
          suffix: '%'
        },
        {
          id: 'refinancing.closing_costs',
          label: 'Closing Costs',
          prefix: '$'
        },
        {
          id: 'refinancing.down_payment',
          label: 'Down Payment %',
          suffix: '%'
        },
        {
          id: 'refinancing.interest_rate',
          label: 'Interest Rate',
          suffix: '%'
        },
        {
          id: 'refinancing.loan_term',
          label: 'Loan Term',
          suffix: ' years'
        },
        {
          type: 'result',
          id: 'refinancingDetails.loanAmount',
          label: '<-- loan amount',
          prefix: '$'
        },
        {
          type: 'result',
          id: 'refinancingDetails.dpAmount',
          label: '<-- dp amount',
          prefix: '$'
        },
        {
          type: 'result',
          id: 'refinancingDetails.monthlyExpense',
          label: 'Monthly expense',
          prefix: '$'
        }
      ]
    }
  ]
]
export default cashBuySections
