'use client'
import classNames from 'classnames'
const CalculatorCard = ({
  className,
  title,
  children
}: {
  className?: string
  title: string | React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <div>
      <h1 className="mx-4 mb-1 font-bold whitespace-pre-wrap">{title}</h1>
      <div
        className={classNames('p-4 border rounded bg-gray-50 drop-shadow-sm space-y-4', className)}
      >
        {children}
      </div>
    </div>
  )
}
export default CalculatorCard
