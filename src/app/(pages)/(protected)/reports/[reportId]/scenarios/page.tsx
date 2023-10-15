'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ScenariosPage = ({ params: { reportId } }: { params: { reportId: string } }) => {
  const router = useRouter()
  useEffect(() => {
    router.push(`/reports/${reportId}`)
  }, [])
  return <div></div>
}

export default ScenariosPage
