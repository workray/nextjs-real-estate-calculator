'use client'
import { Input, Button } from '@/components'
import { StringKeys, capitalizeFirstLetter } from '@/helpers'
import useAddress from '@/providers/reports/useAddress'
import { TAddressValues } from '@/types'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'

type TAddressProps = {
  reportId?: string
  initialValues?: TAddressValues
}

const keysOfFormValues: StringKeys<TAddressValues>[] = ['street', 'city', 'state', 'postal_code']

const resolver: Resolver<TAddressValues> = async values => {
  const errors: { [key: string]: any } = {}
  if (!values.street) {
    errors['street'] = { type: 'required', message: 'This is required.' }
  }
  if (!values.city) {
    errors['city'] = { type: 'required', message: 'This is required.' }
  }
  if (!values.state) {
    errors['state'] = { type: 'required', message: 'This is required.' }
  }
  if (!values.postal_code) {
    errors['postal_code'] = { type: 'required', message: 'This is required.' }
  }
  return {
    values,
    errors
  }
}

const Address = ({ reportId, initialValues }: TAddressProps) => {
  const { saving, saveAddress } = useAddress({ reportId })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAddressValues>({ resolver, defaultValues: { ...initialValues } })

  const onSubmit: SubmitHandler<TAddressValues> = async data => await saveAddress(data)

  const renderInput = (id: keyof TAddressValues) => (
    <Input
      id={id}
      key={id}
      className=""
      {...register(id, { required: true })}
      type="text"
      error={errors[id]?.message}
      required
      placeholder={capitalizeFirstLetter(id)}
      disabled={saving}
    />
  )

  return (
    <div>
      <h3 className="whitespace-nowrap ml-2">Property Address</h3>
      <form
        className="inline-flex w-full space-x-4 items-center overflow-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-grow space-x-4 items-center overflow-auto">
          {keysOfFormValues.map(key => renderInput(key))}
        </div>
        <Button type="submit" loading={saving} className="w-24">
          Save
        </Button>
      </form>
    </div>
  )
}

export default Address
