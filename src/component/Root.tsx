import { FC, memo } from 'react'
import { Outlet } from 'react-router'

interface RootProps {}

const Root: FC<RootProps> = () => {
  return (
    <div className={`bg-primary-600 text-secondary-600 px-6 py-11 md:pt-[4.5rem] md:px-[4.5rem] min-w-full min-h-screen flex flex-col`}>
      <Outlet />
    </div>
  )
}

export default memo(Root)
