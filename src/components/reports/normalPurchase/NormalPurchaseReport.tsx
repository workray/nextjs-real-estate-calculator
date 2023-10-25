import { TNormalPurchase, TReportTableData } from '@/types'
import Report, { TReportProps } from '../Report'
import { ColumnDef } from '@tanstack/table-core'
import calculateResult from './calculateResult'
import { getReportPercentageValue, getReportPriceValue } from '@/helpers/getReportValues'
import calculate from './calculate'
import resultColumns from '../resultColumns'

const defaultColumns: ColumnDef<TReportTableData<TNormalPurchase>>[] = [
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
    header: 'Rehab Info(if applicable)',
    columns: [
      {
        header: 'Rehab Expense',
        accessorKey: 'rehab_expense',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      }
    ]
  },
  {
    header: 'Mortgage Expense',
    columns: [
      {
        header: 'LTV of ARV',
        accessorKey: 'mortgage.ltv_of_arv',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Closing Costs',
        accessorKey: 'mortgage.closing_costs',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Down Payment %',
        accessorKey: 'mortgage.down_payment',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Interest Rate',
        accessorKey: 'mortgage.interest_rate',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Loan Term',
        accessorKey: 'mortgage.loan_term',
        cell: ({ getValue }) => {
          const value = getValue<number>()
          return value ? value + 'years' : ''
        }
      }
    ]
  },
  {
    header: 'Rental Information',
    columns: [
      {
        header: 'Gross Rental Income',
        accessorKey: 'gross_rental_income',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      }
    ]
  },
  {
    header: 'Rental Expenses',
    columns: [
      {
        header: 'Maintenance ( % of rental income)',
        accessorKey: 'maintenance',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Vacancy (% of rental income)',
        accessorKey: 'vacancy',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Property Management (% of rental income)',
        accessorKey: 'property_management',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Capital Expenses (% of rental income)',
        accessorKey: 'capital_expenses',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'HOA fees',
        accessorKey: 'foa_fees',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Utilities',
        accessorKey: 'utilities',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Insurance',
        accessorKey: 'insurance',
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
  ...resultColumns<TNormalPurchase>()
]

export default function CashBuyReport(props: TReportProps<TNormalPurchase>) {
  return (
    <Report
      {...props}
      columns={defaultColumns}
      calculate={calculate}
      calculateResult={calculateResult}
    />
  )
}
