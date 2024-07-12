import { FC, FormEventHandler, FormHTMLAttributes, memo, useCallback } from 'react'

const Form: FC<FormHTMLAttributes<HTMLFormElement>> = ({ onSubmit, ...rest }) => {
  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault()
      onSubmit && onSubmit(e)
    },
    [onSubmit]
  )

  return <form onSubmit={handleSubmit} {...rest} />
}

export default memo(Form)
