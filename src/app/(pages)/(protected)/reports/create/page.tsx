'use client'

import { CalculatorCard, ContainerWithPageTitle, Address } from '@/components'

const CalculatorPage = () => {
  return (
    <ContainerWithPageTitle title="New Report" toRedirect="/reports">
      <CalculatorCard title="" className="bg-transparent">
        <Address />
      </CalculatorCard>
    </ContainerWithPageTitle>
  )
}

export default CalculatorPage
