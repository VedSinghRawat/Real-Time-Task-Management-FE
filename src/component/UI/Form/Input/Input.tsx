import { FC, InputHTMLAttributes, RefObject, memo } from 'react'
import formControlled from '../../../../HOC/formControlled'
import { cn } from '../../../../utils/tailwind'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  innerRef?: RefObject<HTMLInputElement | null>
  children?: string
  containerClassName?: string
}

const InputComp: FC<InputProps> = ({ className = '', children, innerRef, containerClassName, ...rest }) => {
  return (
    <div className={cn('', containerClassName)}>
      {children && <label htmlFor={rest.name}>{children}</label>}

      <input
        ref={innerRef}
        id={rest.name}
        className={cn(
          `block p-1 px-2 mt-1.5 w-full font-medium bg-opacity-60 rounded-xs border backdrop-blur-xs outline-hidden focus:border-secondary-8 border-secondary-7 placeholder-secondary-11 text-secondary-12 placeholder-opacity-55 bg-secondary-3 `,
          className
        )}
        {...rest}
      />
    </div>
  )
}

export const Input = memo(InputComp)
export default formControlled(Input)
