import { FC, HTMLAttributes, memo } from 'react'

interface InputProps extends HTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ className, ...rest }) => {
  return (
    <input
      className={`font-semibold outline-[3px] p-0.5 outline-secondary-800 outline rounded-sm focus:outline-primary-800 ${className}`}
      {...rest}
    />
  )
}

export default memo(Input)
