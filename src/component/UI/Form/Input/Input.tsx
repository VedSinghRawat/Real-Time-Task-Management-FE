import { FC, InputHTMLAttributes, RefObject, memo } from 'react'
import formControlled from '../../../../HOC/formControlled'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  innerRef?: RefObject<HTMLInputElement>
  children?: string
}

const InputComp: FC<InputProps> = ({ className = '', children, innerRef, ...rest }) => {
  return (
    <>
      {children ? (
        <label htmlFor={rest.name} className={`text-primary-12`}>
          {children}
        </label>
      ) : (
        <></>
      )}

      <input
        ref={innerRef}
        className={`font-medium placeholder-secondary-12 placeholder-opacity-55 outline-[3px] p-1 px-2 outline-secondary-7 bg-secondary-3 text-primary-12 bg-opacity-60 backdrop-blur-sm rounded-sm mt-1 block w-full ${className}`}
        {...rest}
      />
    </>
  )
}

export const Input = memo(InputComp)
export default formControlled(Input)
