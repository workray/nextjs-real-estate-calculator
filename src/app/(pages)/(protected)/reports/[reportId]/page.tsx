'use client'
import {
  ContainerWithPageTitle,
  Address,
  Button,
  CalculatorTypes,
  CashPurchaseReport,
  CashBuyReport,
  NormalPurchaseReport
} from '@/components'
import { CalculatorCard } from '@/components/reports/content'
import useReport from '@/providers/reports/useReport'
import { CASH_PURCHASE, NORMAL_PURCHASE, CASH_BUY } from '@/types'
import Link from 'next/link'
import { useEffect } from 'react'

const ReportPage = ({ params: { reportId } }: { params: { reportId: string } }) => {
  const {
    report,
    type,
    scenarios,
    cashPurchases,
    normalPurchases,
    cashBuys,
    changeCalculator,
    loading,
    mutate
  } = useReport({ reportId })
  useEffect(() => {
    mutate()
  }, [])

  const renderActions = () => (
    <Link href={`/reports/${reportId}/scenarios/create`}>
      <Button color="default">Add Scenario</Button>
    </Link>
  )
  return (
    <ContainerWithPageTitle title="Report" actions={renderActions()} toRedirect="/reports">
      {loading && !report && <p>Loading...</p>}
      {report && (
        <div className="space-y-4">
          <CalculatorCard title="Property Information" className="bg-transparent mb-4">
            <Address reportId={reportId} initialValues={report.address} />
          </CalculatorCard>
          <CalculatorTypes type={type} changeCalculator={changeCalculator} />
          {type === CASH_PURCHASE && (
            <CashPurchaseReport reportId={reportId} scenarios={scenarios} items={cashPurchases} />
          )}
          {type === NORMAL_PURCHASE && (
            <NormalPurchaseReport
              reportId={reportId}
              scenarios={scenarios}
              items={normalPurchases}
            />
          )}
          {type === CASH_BUY && (
            <CashBuyReport reportId={reportId} scenarios={scenarios} items={cashBuys} />
          )}
        </div>
      )}
      {!loading && !report && <p>Not Found Data.</p>}
    </ContainerWithPageTitle>
  )
}

export default ReportPage
