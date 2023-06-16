import { FC, HTMLAttributes, memo } from 'react'

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {}

const TextArea: FC<TextAreaProps> = ({ className = '', onInput, ...rest }) => {
  return (
    <textarea
      onInput={(event) => {
        onInput && onInput(event)

        const textAreaRef = event.currentTarget
        textAreaRef.style.height = 'auto'
        textAreaRef.style.height = textAreaRef.scrollHeight + 'px'
      }}
      className={`overflow-hidden font-semibold outline-[3px] p-1 outline-secondary-800 resize-none outline rounded-sm w-fit focus:outline-primary-800 ${className}`}
      {...rest}
    />
  )
}

export default memo(TextArea)
