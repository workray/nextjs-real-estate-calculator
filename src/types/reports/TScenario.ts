import { TObject } from './TObject'
type TScenario = TObject & {
  name: string
  cash_purchase: string
  normal_purchase: string
}

export default TScenario
