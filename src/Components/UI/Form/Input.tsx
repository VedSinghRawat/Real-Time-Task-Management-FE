import { FC, HTMLAttributes, RefObject, memo } from 'react'

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  setRef: RefObject<HTMLInputElement>
}

const Input: FC<InputProps> = ({ className, setRef, ...rest }) => {
  return (
    <input
      ref={setRef}
      className={`font-medium outline-[3px] p-0.5 outline-secondary-400 outline rounded-sm focus:outline-primary-800 ${className}`}
      {...rest}
    />
  )
}

export default memo(Input)
