import dbConnect from '@/dbConfig/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import CashPurchase from '@/models/cashPurchaseModel'
import NormalPurchase from '@/models/normalPurchaseModel'
import { getError } from '@/lib'
import { getScenario } from '@/lib/reports'
import { CASH_BUY, CASH_PURCHASE, NORMAL_PURCHASE, TCalculatorTypeParams } from '@/types'
import CashBuy from '@/models/cashBuyModel'

const getCalculation = async ({ reportId, scenarioId, type }: TCalculatorTypeParams) => {
  const { scenario } = await getScenario({ reportId, scenarioId })
  let calculation
  switch (type) {
    case CASH_PURCHASE:
      calculation = await CashPurchase.findById(scenario.cash_purchase)
      break
    case NORMAL_PURCHASE:
      calculation = await NormalPurchase.findById(scenario.normal_purchase)
      break
    case CASH_BUY:
      calculation = await CashBuy.findById(scenario.cash_buy)
      break
    default:
      throw 'Wrong Type.'
  }
  return calculation
}
export async function GET(req: NextRequest, { params }: { params: TCalculatorTypeParams }) {
  try {
    await dbConnect()

    const { type } = params
    const calculation = await getCalculation(params)
    return NextResponse.json({
      success: true,
      data: { [type.toLowerCase()]: calculation }
    })
  } catch (error: any) {
    return getError(error)
  }
}

export async function PUT(req: NextRequest, { params }: { params: TCalculatorTypeParams }) {
  try {
    await dbConnect()

    const { type } = params
    const calculation = await getCalculation(params)
    const reqBody = await req.json()
    calculation.override({ ...reqBody })
    const savedCalculation = await calculation.save()
    return NextResponse.json({
      message: 'Scenario updated successfully',
      success: true,
      data: { [type]: savedCalculation }
    })
  } catch (error: any) {
    return getError(error)
  }
}
