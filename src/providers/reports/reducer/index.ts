import {
  ADDED_CASH_BUY,
  ADDED_REPORT,
  ADDED_SCENARIO,
  CASH_BUY,
  UPDATED_REPORT,
  UPDATED_SCENARIO,
  DELETED_SCENARIO,
  REPORT,
  REPORTS,
  SCENARIO,
  UPDATED_CASH_BUY,
  TReportsAction,
  TReportsState,
  ADDED_NORMAL_PURCHASE,
  NORMAL_PURCHASE,
  UPDATED_NORMAL_PURCHASE,
  CHANGED_CALCULATOR,
  DELETED_REPORT,
  ADDED_CASH_PURCHASE,
  UPDATED_CASH_PURCHASE,
  CASH_PURCHASE
} from '@/types/reports'
import { getReports, addReport, getReport, changeCalculator, deleteReport } from './reports'
import { addScenario, removeScenario, getScenario } from './scenarios'
import { addCashPurchase, getCashPurchase } from './cashPurchases'
import { addNormalPurchase, getNormalPurchase } from './normalPurchases'
import { addCashBuy, getCashBuy } from './cashBuys'

const reportsReducer = (state: TReportsState, action: TReportsAction): TReportsState => {
  const { type } = action
  switch (type) {
    case REPORTS:
      return getReports(state, action)
    case ADDED_REPORT:
      return addReport(state, action)
    case REPORT:
    case UPDATED_REPORT:
      return getReport(state, action)
    case CHANGED_CALCULATOR:
      return changeCalculator(state, action)
    case DELETED_REPORT:
      return deleteReport(state, action)

    case ADDED_SCENARIO:
      return addScenario(state, action)
    case SCENARIO:
    case UPDATED_SCENARIO:
      return getScenario(state, action)
    case DELETED_SCENARIO:
      return removeScenario(state, action)

    case ADDED_CASH_PURCHASE:
      return addCashPurchase(state, action)
    case CASH_PURCHASE:
    case UPDATED_CASH_PURCHASE:
      return getCashPurchase(state, action)

    case ADDED_NORMAL_PURCHASE:
      return addNormalPurchase(state, action)
    case NORMAL_PURCHASE:
    case UPDATED_NORMAL_PURCHASE:
      return getNormalPurchase(state, action)

    case ADDED_CASH_BUY:
      return addCashBuy(state, action)
    case CASH_BUY:
    case UPDATED_CASH_BUY:
      return getCashBuy(state, action)
    default:
      throw new Error('Unknown action type')
  }
}

export default reportsReducer
