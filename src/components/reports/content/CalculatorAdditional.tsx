'use client'
import classNames from 'classnames'
import { NumericFormat } from 'react-number-format'

const CalculatorResult = ({
  className,
  label,
  value,
  prefix,
  suffix
}: {
  className?: string
  label?: string
  value: number
  prefix?: string
  suffix?: string
}) => {
  return (
    <div
      className={classNames('flex  flex-col justify-between font-semibold px-2 w-full', className)}
    >
      <span className="whitespace-nowrap">{label}</span>
      <NumericFormat
        prefix={prefix}
        suffix={suffix}
        value={value || 0}
        displayType="text"
        decimalScale={2}
        fixedDecimalScale
        thousandSeparator=","
        className="py-2"
      />
    </div>
  )
}

export default CalculatorResult
