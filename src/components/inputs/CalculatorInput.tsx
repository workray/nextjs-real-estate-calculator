import React from 'react'
import classNames from 'classnames'
import { NumericFormat } from 'react-number-format'
import { TCalculatorInputProps } from '@/types'
import { get } from 'lodash'

function ForwardedCalculatorInput(
  {
    className,
    label,
    error,
    id,
    // required,
    editable = true,
    labelClassName,
    inputClassName,
    prefix,
    suffix,
    data,
    disabled,
    ...rest
  }: TCalculatorInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className={classNames('flex flex-col w-full', className)}>
      {label && (
        <label
          htmlFor={id}
          className={classNames(
            'text-sm font-semibold ml-2',
            { 'text-red-500': error },
            labelClassName
          )}
        >
          {label}
          {/* {required && '*'} */}
        </label>
      )}
      <NumericFormat
        id={id}
        getInputRef={ref}
        className={classNames(
          'p-2 text-right',
          { 'border outline-gray-300 rounded-lg focus:outline-blue-600': editable },
          { 'border-red-500 focus:border_red_600': error },
          { 'bg-transparent': !editable },
          inputClassName
        )}
        // format={format}
        prefix={prefix}
        suffix={suffix}
        decimalScale={prefix === '$' ? 2 : 0}
        fixedDecimalScale
        thousandSeparator=","
        value={get(data, id, 0)}
        disabled={disabled || !editable}
        {...rest}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  )
}
const CalculatorInput = React.forwardRef(ForwardedCalculatorInput)

CalculatorInput.displayName = 'CalculatorInput'

export default CalculatorInput
