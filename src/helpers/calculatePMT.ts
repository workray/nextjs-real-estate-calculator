const PMT = (rate: number, nper: number, pv: number, fv: number = 0, type: number = 0) => {
  /*
   * rate   - interest rate per month
   * nper   - number of periods (months)
   * pv   - present value
   * fv   - future value
   * type - when the payments are due:
   *        0: end of the period, e.g. end of month (default)
   *        1: beginning of period
   */

  if (rate === 0) return -(pv + fv) / nper

  const pvif = Math.pow(1 + rate, nper)
  let pmt = (-rate * (pv * pvif + fv)) / (pvif - 1)

  if (type === 1) pmt /= 1 + rate
  return pmt
}
export default PMT
