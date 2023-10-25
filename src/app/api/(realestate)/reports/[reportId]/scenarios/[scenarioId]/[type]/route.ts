import { NextRequest, NextResponse } from 'next/server'
import CashPurchase from '@/models/cashPurchaseModel'
import NormalPurchase from '@/models/normalPurchaseModel'
import { getError } from '@/lib'
import { CASH_BUY, CASH_PURCHASE, NORMAL_PURCHASE, TCalculatorTypeParams } from '@/types'
import { getScenario } from '@/lib/reports'
import CashBuy from '@/models/cashBuyModel'

export async function POST(req: NextRequest, { params }: { params: TCalculatorTypeParams }) {
  try {
    const { type, ...rest } = params
    const { scenario } = await getScenario(rest)

    const reqBody = await req.json()
    delete reqBody._id

    let calculation
    switch (type) {
      case CASH_PURCHASE:
        calculation = new CashPurchase({ ...reqBody })
        calculation = await calculation.save()
        scenario.cash_purchase = calculation._id
        break
      case NORMAL_PURCHASE:
        calculation = new NormalPurchase({ ...reqBody })
        calculation = await calculation.save()
        scenario.normal_purchase = calculation._id
        break
      case CASH_BUY:
        calculation = new CashBuy({ ...reqBody })
        calculation = await calculation.save()
        scenario.cash_buy = calculation._id
        break
      default:
        throw 'Wrong Type.'
    }
    const savedScenario = await scenario.save()
    return NextResponse.json({
      message: 'Scenario updated successfully',
      success: true,
      data: { scenario: savedScenario, [type.toLowerCase()]: calculation }
    })
  } catch (error: any) {
    return getError(error)
  }
}
