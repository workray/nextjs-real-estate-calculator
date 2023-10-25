'use client'
import { Button } from '../buttons'
import { CalculatorInput } from '../inputs'
import {
  CalculatorSection,
  CalculatorCard,
  CalculatorGroup,
  CalculatorCheckGroup,
  CalculatorResult,
  CalculatorAdditional
} from './content'
import React, { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import {
  CalculatorProps,
  TCalculatorField,
  TCalculatorCard,
  TCalculatorCheckGroup,
  TCalculatorGroup,
  TCalculatorSection,
  TCalculatorResult
} from '@/types'
import useCalculationData from './useCalculationData'
import { get, set } from 'lodash'
import resultSections from './resultSection'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)

type SubType =
  | TCalculatorCard
  | TCalculatorResult
  | TCalculatorCheckGroup
  | TCalculatorGroup
  | TCalculatorField
  | TCalculatorField[]

const RESULT = 'result'
const FIELD = 'field'
const GROUP = 'group'
const CHECK = 'check'
const CARD = 'card'
function getType(
  arg: SubType
): typeof RESULT | typeof FIELD | typeof GROUP | typeof CHECK | typeof CARD {
  if ('type' in arg && arg.type === 'result') return RESULT
  if ('fields' in arg) {
    if ('id' in arg) return CHECK
    else if ('label' in arg) return GROUP
    return CARD
  }
  return FIELD
}

function Calculator<T>({
  calculatorId,
  initialValues,
  useSaveHook,
  sections,
  calculate,
  calculateResult,
  ...rest
}: CalculatorProps<T>) {
  const [values, setValues] = useState<T>(initialValues)

  const { chartData, data } = useCalculationData(values, calculateResult, calculate)

  const { saving, saveData } = useSaveHook({ ...rest, calculatorId })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    saveData(values)
  }
  const renderResult = ({ id, label, suffix, prefix }: TCalculatorResult) => (
    <CalculatorResult
      key={id}
      label={label}
      suffix={suffix}
      prefix={prefix}
      value={get(data, id, 0)}
    />
  )
  const renderInput = (attr: TCalculatorField | TCalculatorResult) => {
    if (getType(attr) === 'result') {
      return renderResult(attr as TCalculatorResult)
    }
    const { id, additional, ...rest } = attr as TCalculatorField
    return (
      <CalculatorInput
        key={id}
        id={id}
        additional={additional}
        required
        data={data}
        onValueChange={values => {
          setValues(prevState => ({ ...set<any>(prevState, id, values.floatValue) }))
        }}
        valueIsNumericString
        disabled={saving}
        {...rest}
      />
    )
  }
  const renderInputInline = (fields: TCalculatorField[]) => (
    <div className="flex items-end space-x-2" key={fields[0].id}>
      <div className="">{renderInput(fields[0])}</div>
      <div className="w-24">{fields[1] && renderInput(fields[1])}</div>
    </div>
  )

  const renderInputWithAdditional = (
    field: TCalculatorField,
    additional: TCalculatorField | null
  ) => (
    <div className="flex items-end space-x-2 w-full" key={field.id}>
      <div>{renderInput(field)}</div>
      <div>
        {additional && <CalculatorAdditional {...additional} value={get(data, additional.id, 0)} />}
      </div>
    </div>
  )

  const renderFields = (fields: SubType[]) =>
    fields.map(field => {
      if (Array.isArray(field)) return renderInputInline(field)
      if (getType(field) === CHECK) return renderSubSection(field as TCalculatorCheckGroup)
      if (getType(field) === GROUP) return renderGroup(field as TCalculatorGroup)
      const { additional, ...inputField } = field as TCalculatorField
      if (additional) {
        return renderInputWithAdditional(inputField, additional)
      }
      return renderInput(inputField)
    })
  const renderGroup = ({ label, fields }: TCalculatorGroup) => (
    <CalculatorGroup key={label} label={label}>
      {renderFields(fields)}
    </CalculatorGroup>
  )
  const renderSubSection = ({ id, label, fields }: TCalculatorCheckGroup) => (
    <CalculatorCheckGroup
      key={id}
      label={label}
      checked={values[id as keyof T] as boolean}
      onChange={(value: boolean) => {
        setValues(prevState => ({ ...prevState, [id]: value }))
      }}
    >
      {renderFields(fields)}
    </CalculatorCheckGroup>
  )

  const renderCard = (card: TCalculatorCard | TCalculatorResult, index: number) => {
    if (getType(card) === CARD) {
      const { title, fields } = card as TCalculatorCard
      return (
        <CalculatorCard title={title} key={`${index}-${title}`}>
          {renderFields(fields)}
        </CalculatorCard>
      )
    }
    return renderResult(card as TCalculatorResult)
  }
  const renderSection = (section: TCalculatorSection, index: number) => (
    <CalculatorSection key={`${index}-section`}>
      {section.map((card, index) => renderCard(card, index))}
    </CalculatorSection>
  )
  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col w-full items-end" onSubmit={handleSubmit}>
        <div className="mt-4">
          <Button type="submit" loading={saving}>
            {calculatorId ? 'Update' : 'New Add'}
          </Button>
        </div>
        <div className="inline-flex flex-wrap m-auto mt-4 items-start justify-center w-fit max-w-full">
          {sections.map((section, index) => renderSection(section, index))}
          <CalculatorSection>
            {resultSections.map((card, index) => renderCard(card, index))}
          </CalculatorSection>
        </div>
      </form>
      <div className="space-y-6 w-full">
        {chartData.map((values: any) => (
          <Line key={values.options.plugins.title.text} {...values} className="w-full" />
        ))}
      </div>
    </div>
  )
}

export default Calculator
