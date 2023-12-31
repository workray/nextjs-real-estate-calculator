import {
  ADDED_REPORT,
  UPDATED_REPORT,
  REPORT,
  REPORTS,
  TReportsAction,
  TReportsState,
  CHANGED_CALCULATOR,
  DELETED_REPORT,
  CASH_PURCHASE
} from '@/types'
import { arrayToObject, isChangedObjects, removeFromArray, removeFromObject } from '@/helpers'

export const getReports = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === REPORTS) {
    const { data } = payload
    if (!isChangedObjects(state.reports, data.reports)) return state
    const ids = data.reports.map(report => report._id)
    return {
      ...state,
      ids,
      calculators: ids.reduce(
        (acc, id) => ({ ...acc, [id]: state.calculators[id] || CASH_PURCHASE }),
        {}
      ),
      reports: { ...arrayToObject(data.reports) }
    }
  }
  return state
}

export const addReport = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === ADDED_REPORT) {
    const { data } = payload
    return {
      ...state,
      ids: [...state.ids, data.report._id],
      calculators: { ...state.calculators, [data.report._id]: CASH_PURCHASE },
      reports: { ...state.reports, [data.report._id]: data.report }
    }
  }
  return state
}

export const deleteReport = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === DELETED_REPORT) {
    const { params } = payload
    return {
      ...state,
      ids: removeFromArray(state.ids, params.reportId),
      reports: removeFromObject(state.reports, params.reportId)
    }
  }
  return state
}

export const getReport = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === REPORT || type === UPDATED_REPORT) {
    const { params, data } = payload
    return {
      ...state,
      reports: { ...state.reports, [params.reportId]: data.report },
      scenarios: { ...state.scenarios, ...arrayToObject(data.scenarios) },
      cash_purchases: { ...state.cash_purchases, ...arrayToObject(data.cash_purchases) },
      normal_purchases: {
        ...state.normal_purchases,
        ...arrayToObject(data.normal_purchases)
      },
      cash_buys: { ...state.cash_buys, ...arrayToObject(data.cash_buys) }
    }
  }
  return state
}

export const changeCalculator = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === CHANGED_CALCULATOR) {
    const { params, data } = payload
    return {
      ...state,
      calculators: { ...state.calculators, [params.reportId]: data.type }
    }
  }
  return state
}
