import { NumericFormatProps } from 'react-number-format'
import { TScenarioParams } from './TParams'
import { TCalculatorParams, TCalculatorType, TCalculatorTypeParams } from './index'

export type TCalculatorSection = (TCalculatorCard | TCalculatorResult)[]
export type TCalculatorCard = {
  title?: string | React.ReactNode
  fields: (
    | TCalculatorResult
    | TCalculatorField
    | TCalculatorField[]
    | TCalculatorCheckGroup
    | TCalculatorGroup
  )[]
}

export type TCalculatorGroup = {
  label?: string
  fields: (TCalculatorField | TCalculatorField[])[]
}

export type TCalculatorCheckGroup = TCalculatorGroup & {
  id: string
}

export type TCalculatorField = {
  id: string
  label?: string
  prefix?: string
  suffix?: string
  additional?: TCalculatorField
}

export type TCalculatorResult = TCalculatorField & {
  type?: 'result'
}

export type TCalculatorInputProps = NumericFormatProps &
  TCalculatorField & {
    className?: string
    editable?: boolean
    labelClassName?: string
    inputClassName?: string
    error?: string
    required?: boolean
    data: { [key: string]: number }
  }

export type TCalculationData = {
  netIncome: number
  appreciation: number
  rentalIncome: number
}

export type TCalculate<T> = (data: T | null, years: number) => TCalculationData
export type TCalculateRelations<T> = (data: T | null) => { [key: string]: number }
export type ScenarioCalculatorProps<T> = TScenarioParams & {
  calculatorId: string
  initialValues: T
}
export type CalculatorProps<T> = ScenarioCalculatorProps<T> & {
  type: TCalculatorType
  useSaveHook: (params: TCalculatorTypeParams | TCalculatorParams) => {
    saving: boolean
    saveData: (data: T) => void
  }
  sections: TCalculatorSection[]
  calculate?: TCalculateRelations<T>
  calculateResult: TCalculate<T>
}
