import {
  ADDED_CASH_PURCHASE,
  CASH_PURCHASE,
  UPDATED_CASH_PURCHASE,
  TReportsAction,
  TReportsState
} from '@/types'

export const getCashPurchase = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === CASH_PURCHASE || type === UPDATED_CASH_PURCHASE) {
    const { params, data } = payload
    if (params.type !== CASH_PURCHASE) return state

    return {
      ...state,
      cash_purchases: { ...state.cash_purchases, [params.calculatorId]: data.cash_purchase }
    }
  }
  return state
}

export const addCashPurchase = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === ADDED_CASH_PURCHASE) {
    const { params, data } = payload
    if (params.type !== CASH_PURCHASE) return state

    const scenario = state.scenarios[params.scenarioId]
    return {
      ...state,
      cash_purchases: { ...state.cash_purchases, [data.cash_purchase._id]: data.cash_purchase },
      scenarios: {
        ...state.scenarios,
        [params.scenarioId]: { ...scenario, cash_purchase: data.cash_purchase._id }
      }
    }
  }
  return state
}
