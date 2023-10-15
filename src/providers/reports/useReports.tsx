import { REPORTS } from '@/types'
import { useReportsState } from '.'
import useReportsData from './useReportsData'
import api from '@/lib/api'
import { useMemo } from 'react'

const useReports = () => {
  const { ids, reports } = useReportsState()
  const data = useReportsData({
    action: REPORTS,
    params: {},
    fetchData: async () => await api.get('/api/reports')
  })
  return useMemo(
    () => ({
      ids,
      reports,
      ...data
    }),
    [data, ids, reports]
  )
}
export default useReports
