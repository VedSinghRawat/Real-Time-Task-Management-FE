import { FC, RefObject } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

function formControlled<P>(Comp: FC<P>) {
  function FormControlled<T extends FieldValues>({
    innerRef,
    ...props
  }: UseControllerProps<T> & { control: UseControllerProps<T>['control'] } & P & { innerRef?: RefObject<unknown> }) {
    const { field, fieldState } = useController(props)
    return (
      <div>
        <Comp {...field} {...(props as P)} checked={'type' in props && props.type === 'checkbox' ? field.value : undefined} ref={innerRef} />

        <div className={`${!fieldState.error ? 'mb-[1.375rem]' : ''}`}></div>

        {fieldState.error ? <p className={`text-[0.7rem] sm:text-sm mt-0.5 text-red`}>{fieldState.error.message}</p> : <></>}
      </div>
    )
  }

  return FormControlled
}

export default formControlled
