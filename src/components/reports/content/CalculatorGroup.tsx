'use client'

import classNames from 'classnames'
const CalculatorGroup = ({
  className,
  label,
  children
}: {
  className?: string
  label?: string
  children?: React.ReactNode
}) => {
  return (
    <div className="">
      {label && (
        <label className="cursor-pointer label">
          <span className="label-text">{label}</span>
        </label>
      )}
      {children && <div className={classNames('pl-8 flex flex-col', className)}>{children}</div>}
    </div>
  )
}
export default CalculatorGroup
