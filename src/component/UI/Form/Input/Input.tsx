import { FC, InputHTMLAttributes, RefObject, memo } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  setRef?: RefObject<HTMLInputElement>
  children?: string
}

const Input: FC<InputProps> = ({ className = '', children, setRef, ...rest }) => {
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
        ref={setRef}
        className={`font-medium placeholder-secondary-12 placeholder-opacity-55 outline-[3px] p-1 px-2 outline-secondary-7 bg-secondary-3 text-primary-12 bg-opacity-60 backdrop-blur-sm rounded-sm ${className}`}
        {...rest}
      />
    </>
  )
}

export default memo(Input)
