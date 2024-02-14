import { FC, HTMLAttributes, RefObject, memo } from 'react'

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
  setRef?: RefObject<HTMLTextAreaElement>
}

const TextArea: FC<TextAreaProps> = ({ className = '', setRef, onInput, ...rest }) => {
  return (
    <textarea
      ref={setRef}
      onInput={(event) => {
        onInput && onInput(event)

        const textAreaRef = event.currentTarget
        textAreaRef.style.height = 'auto'
        textAreaRef.style.height = textAreaRef.scrollHeight.toString() + 'px'
      }}
      className={`overflow-hidden w-full font-medium outline-[3px] p-1 outline-secondary-light resize-none outline rounded-sm focus:outline-primary-dark ${className}`}
      {...rest}
    />
  )
}

export default memo(TextArea)
