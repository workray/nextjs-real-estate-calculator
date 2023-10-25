import TCashPurchase from './TCashPurchase'
import TReport from './TReport'
import TScenario from './TScenario'
import TNormalPurchase from './TNormalPurchase'
import TCashBuy from './TCashBuy'
import { TCalculationData } from './TCalculator'

import {
  REPORTS,
  REPORT,
  ADDED_REPORT,
  UPDATED_REPORT,
  ADDED_SCENARIO,
  SCENARIO,
  UPDATED_SCENARIO,
  DELETED_SCENARIO,
  ADDED_CASH_PURCHASE,
  CASH_PURCHASE,
  UPDATED_CASH_PURCHASE,
  ADDED_CASH_BUY,
  CASH_BUY,
  UPDATED_CASH_BUY,
  ADDED_NORMAL_PURCHASE,
  NORMAL_PURCHASE,
  UPDATED_NORMAL_PURCHASE,
  CHANGED_CALCULATOR,
  DELETED_REPORT,
  SUB_TO_PURCHASE,
  SELLER_FINANCE_PURCHASE
} from './ActionTypes'

export type { TReport, TScenario, TCashPurchase, TNormalPurchase, TCashBuy }
export * from './TParams'
export * from './TObject'
export * from './ActionTypes'
export * from './TCashPurchase'
export * from './TNormalPurchase'
export * from './TCalculator'

export type TCalculatorType =
  | typeof CASH_PURCHASE
  | typeof NORMAL_PURCHASE
  | typeof CASH_BUY
  | typeof SUB_TO_PURCHASE
  | typeof SELLER_FINANCE_PURCHASE
export type TReportParams = { reportId: string }
export type TScenarioParams = TReportParams & { scenarioId: string }
export type TCalculatorTypeParams = TScenarioParams & { type: string }
export type TCalculatorParams = TCalculatorTypeParams & { calculatorId: string }

export type TCalculatorDataType = TCashPurchase | TNormalPurchase | TCashBuy
export type TReportTableData<T> = T & {
  scenarioId: string
  no: number
  name: string
  grossIncome: number
  netIncome: number
  cocReturn: number
  netIncomeOver30: number
  appreciationOver30: number
  rentalIncomeOver30: number
}

export type TReportChartData = TCalculationData & { name: string }

export type TReportData = {
  report: TReport
  scenarios: TScenario[]
  cash_purchases: TCashPurchase[]
  normal_purchases: TNormalPurchase[]
  cash_buys: TCashBuy[]
}

export type TCashPurchaseData = {
  cash_purchase: TCashPurchase
}

export type TNormalPurchaseData = {
  normal_purchase: TNormalPurchase
}

export type TCashBuyData = {
  cash_buy: TCashBuy
}

export type TScenarioData = TCashPurchaseData &
  TNormalPurchaseData &
  TCashBuyData & {
    scenario: TScenario
  }

export type TReportsState = { [key: string]: any }
export type TReportsAction =
  | { type: typeof REPORTS; payload: { data: { reports: TReport[] } } }
  | {
      type: typeof REPORT
      payload: {
        params: TReportParams
        data: TReportData
      }
    }
  | { type: typeof ADDED_REPORT; payload: { data: { report: TReport } } }
  | {
      type: typeof UPDATED_REPORT
      payload: { params: TReportParams; data: TReportData }
    }
  | {
      type: typeof DELETED_REPORT
      payload: { params: TReportParams }
    }
  | {
      type: typeof CHANGED_CALCULATOR
      payload: {
        params: TReportParams
        data: { type: TCalculatorType }
      }
    }
  | {
      type: typeof ADDED_SCENARIO
      payload: { params: TReportParams; data: { scenario: TScenario } }
    }
  | {
      type: typeof SCENARIO
      payload: { params: TScenarioParams; data: TScenarioData }
    }
  | {
      type: typeof UPDATED_SCENARIO
      payload: { params: TScenarioParams; data: TScenarioData }
    }
  | {
      type: typeof DELETED_SCENARIO
      payload: { params: TScenarioParams }
    }
  | {
      type: typeof ADDED_CASH_PURCHASE
      payload: {
        params: TCalculatorTypeParams
        data: TCashPurchaseData
      }
    }
  | {
      type: typeof CASH_PURCHASE
      payload: {
        params: TCalculatorParams
        data: TCashPurchaseData
      }
    }
  | {
      type: typeof UPDATED_CASH_PURCHASE
      payload: {
        params: TCalculatorParams
        data: TCashPurchaseData
      }
    }
  | {
      type: typeof ADDED_NORMAL_PURCHASE
      payload: {
        params: TCalculatorTypeParams
        data: TNormalPurchaseData
      }
    }
  | {
      type: typeof NORMAL_PURCHASE
      payload: {
        params: TCalculatorParams
        data: TNormalPurchaseData
      }
    }
  | {
      type: typeof UPDATED_NORMAL_PURCHASE
      payload: {
        params: TCalculatorParams
        data: TNormalPurchaseData
      }
    }
  | {
      type: typeof ADDED_CASH_BUY
      payload: {
        params: TCalculatorTypeParams
        data: TCashBuyData
      }
    }
  | {
      type: typeof CASH_BUY
      payload: {
        params: TCalculatorParams
        data: TCashBuyData
      }
    }
  | {
      type: typeof UPDATED_CASH_BUY
      payload: {
        params: TCalculatorParams
        data: TCashBuyData
      }
    }
export type TReportsDispatch = React.Dispatch<TReportsAction>
