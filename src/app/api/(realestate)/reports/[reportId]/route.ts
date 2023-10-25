import dbConnect from '@/dbConfig/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import Scenario from '@/models/scenarioModel'

import mongoose from 'mongoose'
import { TReportParams } from '@/types'
import { getError } from '@/lib'
import { getReport } from '@/lib/reports'
import CashPurchase from '@/models/cashPurchaseModel'
import NormalPurchase from '@/models/normalPurchaseModel'
import CashBuy from '@/models/cashBuyModel'

const getReportRelations = async (report: { scenarios: mongoose.Types.ObjectId[] }) => {
  const scenarios =
    report.scenarios.length > 0 ? await Scenario.find({ _id: { $in: report.scenarios } }) : []

  const cashPurchaseIds: any[] = []
  const normalPurchaseIds: any[] = []
  const cashBuyIds: any[] = []

  scenarios.forEach(scenario => {
    if (scenario.cash_purchase) cashPurchaseIds.push(scenario.cash_purchase)
    if (scenario.normal_purchase) normalPurchaseIds.push(scenario.normal_purchase)
    if (scenario.cash_buy) cashBuyIds.push(scenario.cash_buy)
  })

  const cash_purchases =
    cashPurchaseIds.length > 0 ? await CashPurchase.find({ _id: { $in: cashPurchaseIds } }) : []
  const normal_purchases =
    normalPurchaseIds.length > 0
      ? await NormalPurchase.find({ _id: { $in: normalPurchaseIds } })
      : []
  const cash_buys = cashBuyIds.length > 0 ? await CashBuy.find({ _id: { $in: cashBuyIds } }) : []

  return { scenarios, cash_purchases, normal_purchases, cash_buys }
}
export async function GET(req: NextRequest, { params }: { params: TReportParams }) {
  try {
    await dbConnect()

    const report = await getReport(params)
    const relations = await getReportRelations(report)

    return NextResponse.json({
      success: true,
      data: { report, ...relations }
    })
  } catch (error: any) {
    return getError(error)
  }
}

export async function PUT(req: NextRequest, { params }: { params: TReportParams }) {
  try {
    await dbConnect()

    const reqBody = await req.json()
    const report = await getReport(params)
    report.address = reqBody.address
    const savedReport = await report.save()
    const relations = await getReportRelations(savedReport)
    return NextResponse.json({
      success: true,
      data: { report: savedReport, ...relations }
    })
  } catch (error: any) {
    return getError(error)
  }
}
