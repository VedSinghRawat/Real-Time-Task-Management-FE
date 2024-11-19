import { FC, RefObject } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

function formControlled<
  E,
  P extends {
    innerRef?: RefObject<E>
    className?: string
  },
>(Comp: FC<P>) {
  function FormControlled<T extends FieldValues>({ innerRef, ...props }: UseControllerProps<T> & { control: UseControllerProps<T>['control'] } & P) {
    const { field, fieldState } = useController(props)
    return (
      <div>
        <Comp {...field} {...(props as P)} ref={innerRef} className={`${!fieldState.error ? 'mb-[1.375rem]' : ''} ${props.className || ''}`} />

        {fieldState.error ? <p className={`text-[0.7rem] sm:text-sm mt-0.5 text-red`}>{fieldState.error.message}</p> : <></>}
      </div>
    )
  }

  return FormControlled
}

export default formControlled
