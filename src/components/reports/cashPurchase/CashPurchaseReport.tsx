import { TCashPurchase, TReportTableData } from '@/types'
import Report, { TReportProps } from '../Report'
import { ColumnDef } from '@tanstack/table-core'
import calculateResult from './calculateResult'
import { getReportPercentageValue, getReportPriceValue } from '@/helpers/getReportValues'
import calculate from './calculate'
import resultColumns from '../resultColumns'

const defaultColumns: ColumnDef<TReportTableData<TCashPurchase>>[] = [
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
    header: 'Rehab Info',
    columns: [
      {
        header: 'Rehab Expense',
        accessorKey: 'rehab_expense',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
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
        header: 'Maintenance',
        accessorKey: 'maintenance',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Vacancy',
        accessorKey: 'vacancy',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Property Management',
        accessorKey: 'property_management',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      },
      {
        header: 'Capital Expenses',
        accessorKey: 'capital_expenses',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
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
  ...resultColumns<TCashPurchase>()
]

export default function CashPurchaseReport(props: TReportProps<TCashPurchase>) {
  return (
    <Report
      {...props}
      columns={defaultColumns}
      calculate={calculate}
      calculateResult={calculateResult}
    />
  )
}
