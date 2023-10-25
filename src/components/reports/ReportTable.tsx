'use client'

import { TReportTableData } from '@/types'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

function ReportTable<T>({
  reportId,
  columns,
  data = []
}: {
  reportId: string
  columns: ColumnDef<TReportTableData<T>>[]
  data: TReportTableData<T>[]
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: false
  })
  const router = useRouter()
  const handleClick = (scenarioId: string) => (e: { preventDefault: () => void }) => {
    e.preventDefault()
    router.push(`/reports/${reportId}/scenarios/${scenarioId}`)
  }
  return (
    <div className="w-full relative overflow-auto pb-4">
      <table className="table sticky border-collapse border border-slate-400">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`border text-center ${
                      header.id === 'no' || header.id === 'name'
                        ? 'sticky bg-indigo-900 text-indigo-50'
                        : ''
                    }`}
                  >
                    {header.isPlaceholder ? null : (
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr
                key={row.id}
                className="hover cursor-pointer"
                onClick={handleClick(row.original.scenarioId)}
              >
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id} className={`border`}>
                      {cell.getIsPlaceholder()
                        ? null // For cells with repeated values, render null
                        : // Otherwise, just render the regular cell
                          flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ReportTable
