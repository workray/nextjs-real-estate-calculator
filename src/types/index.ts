import { ColumnDef } from '@tanstack/table-core'

export * from './auth'
export * from './reports'

export type TAddressValues = {
  street: string
  city: string
  state: string
  postal_code: string
}

export type TColumnDef<T> = ColumnDef<T> & {
  header: string
  prefix?: string
  suffix?: string
  columns?: TColumnDef<T>[]
}
