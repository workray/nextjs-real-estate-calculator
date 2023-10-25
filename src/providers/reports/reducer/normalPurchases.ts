import {
  ADDED_NORMAL_PURCHASE,
  NORMAL_PURCHASE,
  UPDATED_NORMAL_PURCHASE,
  TReportsAction,
  TReportsState
} from '@/types'

export const getNormalPurchase = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === NORMAL_PURCHASE || type === UPDATED_NORMAL_PURCHASE) {
    const { params, data } = payload
    if (params.type !== NORMAL_PURCHASE) return state

    return {
      ...state,
      normal_purchases: {
        ...state.normal_purchases,
        [params.calculatorId]: data.normal_purchase
      }
    }
  }
  return state
}

export const addNormalPurchase = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === ADDED_NORMAL_PURCHASE) {
    const { params, data } = payload
    if (params.type !== NORMAL_PURCHASE) return state

    const scenario = state.scenarios[params.scenarioId]
    return {
      ...state,
      normal_purchases: {
        ...state.normal_purchases,
        [data.normal_purchase._id]: data.normal_purchase
      },
      scenarios: {
        ...state.scenarios,
        [params.scenarioId]: { ...scenario, normal_purchase: data.normal_purchase._id }
      }
    }
  }
  return state
}
