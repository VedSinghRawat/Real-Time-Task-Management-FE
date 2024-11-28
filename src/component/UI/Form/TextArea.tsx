import { FC, HTMLAttributes, memo, useEffect, useRef } from 'react'
import formControlled from '../../../HOC/formControlled'

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
  children?: string
  name?: string
}

const TextAreaComp: FC<TextAreaProps> = ({ className = '', name, onInput, children, ...rest }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Function to resize the textarea
  const resizeTextarea = () => {
    if (!textareaRef.current) return
    textareaRef.current.style.height = 'auto' // Reset to auto to shrink if needed
    textareaRef.current.style.height = textareaRef.current.scrollHeight.toString() + 'px' // Set to scrollHeight
  }

  // Resize on initial render (when content is already present)
  useEffect(() => {
    resizeTextarea()
  }, []) // Empty dependency array ensures this runs only on mount

  return (
    <>
      {children && <label htmlFor={name}>{children}</label>}

      <textarea
        id={name}
        ref={textareaRef}
        onInput={(event) => {
          onInput && onInput(event)

          resizeTextarea()
        }}
        className={`overflow-hidden p-1 px-2 mt-1.5 w-full font-medium bg-opacity-60 rounded-sm border backdrop-blur-sm outline-none resize-none focus:border-secondary-8 border-secondary-7 placeholder-secondary-11 text-secondary-12 placeholder-opacity-55 bg-secondary-3 ${className}`}
        {...rest}
      />
    </>
  )
}

export const TextArea = memo(TextAreaComp)
export default formControlled(TextArea)
