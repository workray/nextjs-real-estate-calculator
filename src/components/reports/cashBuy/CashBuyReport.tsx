import { TCashBuy, TReportTableData } from '@/types'
import Report, { TReportProps } from '../Report'
import { ColumnDef } from '@tanstack/table-core'
import calculateResult from './calculateResult'
import { getReportPercentageValue, getReportPriceValue } from '@/helpers/getReportValues'
import calculate from './calculate'
import resultColumns from '../resultColumns'

const defaultColumns: ColumnDef<TReportTableData<TCashBuy>>[] = [
  {
    header: 'No',
    accessorKey: 'no'
  },
  {
    header: 'Scenario Name',
    accessorKey: 'name'
  },
  {
    header: 'Purchase Information',
    columns: [
      {
        header: 'Purchase Price',
        accessorKey: 'purchase_price',
        aggregatedCell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Closing Costs',
        accessorKey: 'closing_costs',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Finder Fee Cost',
        accessorKey: 'finder_fee_cost',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      }
    ]
  },
  {
    header: 'Rehab Information',
    columns: [
      {
        header: 'Renovation Costs',
        accessorKey: 'renovation_costs',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Holding Costs',
        columns: [
          {
            header: 'estimated utilities',
            accessorKey: 'holding_costs.utilities',
            cell: ({ getValue }) => getReportPriceValue(getValue<number>())
          },
          {
            header: 'estimated insurance',
            accessorKey: 'holding_costs.insurance',
            cell: ({ getValue }) => getReportPriceValue(getValue<number>())
          }
        ]
      }
    ]
  },
  {
    header: 'Rental income',
    columns: [
      {
        header: 'Monthly Rent',
        accessorKey: 'monthly_rent',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Other Income',
        accessorKey: 'other_income',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      }
    ]
  },
  {
    header: 'Initial Financing Information (Hard or Private money loan)',
    columns: [
      {
        header: 'LTV of Purchase Price',
        accessorKey: 'initial_financing.ltv_of_purchase_price',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Closing Costs(escrow fees & points)',
        accessorKey: 'initial_financing.closing_costs',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Down Payment %',
        accessorKey: 'initial_financing.down_payment',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Interest Rate',
        accessorKey: 'initial_financing.interest_rate',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Loan Term',
        accessorKey: 'initial_financing.loan_term',
        cell: ({ getValue }) => getValue<number>() + 'years'
      },
      {
        header: 'Months of rehab',
        accessorKey: 'initial_financing.months_of_rehab',
        cell: ({ getValue }) => getValue<number>()
      }
    ]
  },
  {
    header: 'Rental Expenses',
    columns: [
      {
        header: 'Maintenance ( % of rental income)',
        accessorKey: 'rental_expenses.maintenance',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Vacancy (% of rental income)',
        accessorKey: 'rental_expenses.vacancy',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Property Management (% of rental income)',
        accessorKey: 'rental_expenses.property_management',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Capital Expenses (% of rental income)',
        accessorKey: 'rental_expenses.capital_expenses',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'HOA fees',
        accessorKey: 'rental_expenses.hoa_fees',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Utilities',
        accessorKey: 'rental_expenses.utilities',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Insurance',
        accessorKey: 'rental_expenses.insurance',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      }
    ]
  },
  {
    header: 'Property Expenses',
    columns: [
      {
        header: 'Taxes (Annual)',
        accessorKey: 'annual_taxes',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Property Insurance (Annual)',
        accessorKey: 'annual_property_insurance',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      }
    ]
  },
  {
    header: 'Refinancing Details',
    columns: [
      {
        header: 'ARV',
        accessorKey: 'refinancing.arv',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'LTV of ARV',
        accessorKey: 'refinancing.ltv_of_arv',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Closing Costs',
        accessorKey: 'refinancing.closing_costs',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Down Payment %',
        accessorKey: 'refinancing.down_payment',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Interest Rate',
        accessorKey: 'refinancing.interest_rate',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Loan Term',
        accessorKey: 'refinancing.loan_term',
        cell: ({ getValue }) => getValue<number>() + 'years'
      }
    ]
  },
  ...resultColumns<TCashBuy>()
]

export default function CashBuyReport(props: TReportProps<TCashBuy>) {
  return (
    <Report
      {...props}
      columns={defaultColumns}
      calculate={calculate}
      calculateResult={calculateResult}
    />
  )
}
