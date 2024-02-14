import { FC, InputHTMLAttributes, RefObject, memo } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  setRef?: RefObject<HTMLInputElement>
}

const Input: FC<InputProps> = ({ className = '', setRef, ...rest }) => {
  return (
    <input
      ref={setRef}
      className={`font-medium outline-[3px] p-0.5 outline-secondary-light outline rounded-sm focus:outline-primary-dark ${className}`}
      {...rest}
    />
  )
}

export default memo(Input)
