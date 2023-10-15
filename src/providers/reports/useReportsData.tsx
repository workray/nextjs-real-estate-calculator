'use client'

import { useReportsDispatch } from '.'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useReportsData = ({ action, params, fetchData }: any) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useReportsDispatch()

  useEffect(() => {
    if (error) {
      console.log(action, error)
      toast.error(error)
    }
  }, [action, error])

  const mutate = useCallback(() => {
    if (loading) return
    setLoading(true)
    setError(null)
    const getData = async () => {
      try {
        const response = await fetchData()
        dispatch({ type: action, payload: { params, data: response.data.data } })
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [action, dispatch, fetchData, loading, params])

  return { mutate, loading, error }
}

export default useReportsData
