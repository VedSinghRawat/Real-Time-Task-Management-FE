import { FC, HTMLAttributes, memo, useEffect, useRef, RefObject } from 'react'
import formControlled from '../../../HOC/formControlled'

export interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
  children?: string
  name?: string
  innerRef?: RefObject<HTMLTextAreaElement>
}

const TextAreaComp: FC<TextAreaProps> = ({ className = '', name, onInput, children, innerRef, ...rest }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const r = innerRef || textareaRef

  // Function to resize the textarea
  const resizeTextarea = () => {
    if (!r.current) return
    r.current.style.height = 'auto' // Reset to auto to shrink if needed
    r.current.style.height = r.current.scrollHeight.toString() + 'px' // Set to scrollHeight
  }

  // Resize on initial render (when content is already present)
  useEffect(() => {
    resizeTextarea()
  }, [])

  return (
    <>
      {children && <label htmlFor={name}>{children}</label>}

      <textarea
        id={name}
        ref={r}
        onInput={(event) => {
          onInput && onInput(event)

          resizeTextarea()
        }}
        className={`overflow-hidden p-1 px-2 mt-1.5 w-full font-medium bg-opacity-60 rounded-xs border backdrop-blur-xs outline-hidden resize-none focus:border-secondary-10 border-secondary-7 placeholder-secondary-11 text-secondary-12 placeholder-opacity-55 bg-secondary-3 ${className}`}
        {...rest}
      />
    </>
  )
}

export const TextArea = memo(TextAreaComp)
export default formControlled(TextArea)
