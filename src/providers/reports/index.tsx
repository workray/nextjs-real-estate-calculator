'use client'

import React, { useContext, useReducer } from 'react'
import reportsReducer from './reducer'
import { ReportsDispatchContext, ReportsStateContext } from './ReportsContext'
import { TReportsDispatch } from '@/types'

import useAddress from './useAddress'
import useCashBuy from './useCashBuy'
import useCashPurchase from './useCashPurchase'
import useReport from './useReport'
import useReports from './useReports'
import useReportsData from './useReportsData'
import useScenario from './useScenario'
import useScenarioName from './useScenarioName'
import useScenarios from './useScenarios'
import useNormalPurchase from './useNormalPurchase'

export {
  useAddress,
  useCashBuy,
  useCashPurchase,
  useReport,
  useReports,
  useReportsData,
  useScenario,
  useScenarioName,
  useScenarios,
  useNormalPurchase
}

const initialState = {
  ids: [],
  calculators: {},
  reports: {},
  scenarios: {},
  cash_purchases: {},
  normal_purchases: {},
  cash_buys: {}
}
export const ReportsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reportsReducer, initialState)

  return (
    <ReportsStateContext.Provider value={state}>
      <ReportsDispatchContext.Provider value={dispatch}>{children}</ReportsDispatchContext.Provider>
    </ReportsStateContext.Provider>
  )
}

export const useReportsState = () => useContext(ReportsStateContext)
export const useReportsDispatch: () => TReportsDispatch = () => useContext(ReportsDispatchContext)
export default ReportsProvider
