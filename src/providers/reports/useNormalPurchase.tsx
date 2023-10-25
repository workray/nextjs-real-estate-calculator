import api from '@/lib/api'
import { useCallback, useState } from 'react'
import { useReportsDispatch } from './index'
import toast from 'react-hot-toast'
import {
  ADDED_NORMAL_PURCHASE,
  TCalculatorParams,
  TCalculatorTypeParams,
  TNormalPurchase,
  TNormalPurchaseData,
  UPDATED_NORMAL_PURCHASE
} from '@/types'

const useNormalPurchase = (params: TCalculatorTypeParams | TCalculatorParams) => {
  const { reportId, scenarioId, type } = params
  const dispatch = useReportsDispatch()

  const [saving, setSaving] = useState(false)
  const saveData = useCallback(
    async (values: TNormalPurchase) => {
      if (saving) return
      try {
        setSaving(true)
        const { calculatorId } = params as TCalculatorParams
        if (calculatorId) {
          const response = await api.put(
            `/api/reports/${reportId}/scenarios/${scenarioId}/${type}/${calculatorId}`,
            values
          )
          const data: TNormalPurchaseData = response.data.data
          dispatch({
            type: UPDATED_NORMAL_PURCHASE,
            payload: { params: params as TCalculatorParams, data }
          })
        } else {
          const response = await api.post(
            `/api/reports/${reportId}/scenarios/${scenarioId}/${type}`,
            values
          )
          const data = response.data.data
          dispatch({
            type: ADDED_NORMAL_PURCHASE,
            payload: { params, data }
          })
        }
      } catch (error: any) {
        console.log('saving', error.message)
        toast.error(error.message)
      } finally {
        setSaving(false)
      }
    },
    [dispatch, params, reportId, saving, scenarioId, type]
  )

  // const [deleting, setDeleting] = useState(false)
  // const deleteNormalPurchase = useCallback(
  //   async (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault()
  //     if (!scenarioId) return

  //     try {
  //       setDeleting(true)
  //       await api.delete(`/api/reports/${reportId}/scenarios/${scenarioId}`)
  //       dispatch({
  //         type: DELETED_SCENARIO,
  //         payload: { params: params as TScenarioParams }
  //       })
  //     } catch (error: any) {
  //       console.log(DELETED_SCENARIO, error.message)
  //       toast.error(error.message)
  //     } finally {
  //       setDeleting(false)
  //     }
  //   },
  //   [dispatch, params, reportId, router, scenarioId]
  // )
  return {
    saving,
    // deleting,
    saveData
    // deleteNormalPurchase
  }
}
export default useNormalPurchase
