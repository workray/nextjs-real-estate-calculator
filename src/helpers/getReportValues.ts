export function getReportPriceValue(value?: number) {
  if (value === 0 || !value) return ''
  return '$' + value.toFixed(2)
}
export const getReportPercentageValue = (value?: number) => {
  if (value === 0 || !value) return ''
  return value.toFixed(2) + '%'
}
