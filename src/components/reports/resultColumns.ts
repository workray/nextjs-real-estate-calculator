import { getReportPercentageValue, getReportPriceValue } from '@/helpers/getReportValues'
import { TReportTableData } from '@/types'
import { ColumnDef } from '@tanstack/table-core'

const resultColumns = <T>(): ColumnDef<TReportTableData<T>>[] => [
  {
    header: 'Current',
    columns: [
      {
        header: 'Gross Income',
        accessorKey: 'grossIncome',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Net Income',
        accessorKey: 'netIncome',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'CoC Return',
        accessorKey: 'cocReturn',
        cell: ({ getValue }) => getReportPercentageValue(getValue<number>())
      }
    ]
  },
  {
    header: 'Over 30 years',
    columns: [
      {
        header: 'Net Income',
        accessorKey: 'netIncomeOver30',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Appreciation',
        accessorKey: 'appreciationOver30',
        cell: ({ getValue }) => getReportPriceValue(getValue<number>())
      },
      {
        header: 'Rental Income',
        accessorKey: 'rentalIncomeOver30',
        cell: ({ getValue }) => getReportPriceValue(getValue())
      }
    ]
  }
]
export default resultColumns
