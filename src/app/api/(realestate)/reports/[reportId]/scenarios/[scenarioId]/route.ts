import dbConnect from '@/dbConfig/dbConnect'
import { NextRequest, NextResponse } from 'next/server'
import Scenario from '@/models/scenarioModel'
import CashPurchase from '@/models/cashPurchaseModel'
import NormalPurchase from '@/models/normalPurchaseModel'
import CashBuy from '@/models/cashBuyModel'
import { TScenarioParams } from '@/types'
import { getScenario } from '@/lib/reports'
import { getError } from '@/lib'

dbConnect()

export async function GET(req: NextRequest, { params }: { params: TScenarioParams }) {
  try {
    const { scenario } = await getScenario(params)
    const cashPurchase = await CashPurchase.findById(scenario.cash_purchase)
    const normalPurchase = await NormalPurchase.findById(scenario.normal_purchase)
    const cashBuy = await CashBuy.findById(scenario.cash_buy)
    return NextResponse.json({
      success: true,
      data: {
        scenario,
        cash_purchase: cashPurchase,
        normal_purchase: normalPurchase,
        cash_buy: cashBuy
      }
    })
  } catch (error: any) {
    return getError(error)
  }
}

export async function PUT(req: NextRequest, { params }: { params: TScenarioParams }) {
  try {
    const { name } = await req.json()
    const { scenario } = await getScenario(params)
    scenario.override({ name })
    const savedScenario = await scenario.save()

    return NextResponse.json({
      message: 'Scenario updated successfully',
      success: true,
      data: { scenario: savedScenario }
    })
  } catch (error: any) {
    return getError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: TScenarioParams }) {
  try {
    const { report, scenario, index } = await getScenario(params)

    report.scenarios.splice(index, 1)

    await report.save()

    if (scenario.cash_purchase) await CashPurchase.deleteOne({ _id: scenario.cash_purchase })
    if (scenario.normal_purchase) await NormalPurchase.deleteOne({ _id: scenario.normal_purchase })
    if (scenario.cash_buy) await CashBuy.deleteOne({ _id: scenario.cash_buy })

    await Scenario.deleteOne({ _id: params.scenarioId })

    return NextResponse.json({
      message: 'successfully removed',
      success: true
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
