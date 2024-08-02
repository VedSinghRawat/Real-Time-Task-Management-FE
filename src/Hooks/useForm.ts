import { FieldValues, useForm as reactHookForm, UseFormProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { z } from 'zod'

function useForm<T extends FieldValues>(
  schema: z.Schema<T>,
  onSubmit: ((vals: T) => unknown) | ((vals: T) => Promise<unknown>),
  defaultValues?: UseFormProps<T>['defaultValues']
) {
  const { handleSubmit, ...rest } = reactHookForm<T>({
    resolver: zodResolver(schema),
    shouldFocusError: true,
    mode: 'onTouched',
    defaultValues,
  })

  const submitHandler = useMemo(() => {
    console.log({ onSubmit })
    return handleSubmit(onSubmit)
  }, [handleSubmit, onSubmit])

  return { ...rest, submitHandler }
}

export default useForm
