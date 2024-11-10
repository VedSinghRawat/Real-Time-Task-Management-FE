import { FC } from 'react'
import { cn } from '../../utils/tailwind'

interface DividerProps {
  className?: string
}

const Divider: FC<DividerProps> = ({ className }) => {
  return <div className={cn('w-full h-[1px] bg-secondary-8', className)} />
}

export default Divider
