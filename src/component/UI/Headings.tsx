import { FC, ReactNode } from 'react'

interface HeadingProps {
  children: ReactNode
}

export const Heading: FC<HeadingProps> = ({ children }) => <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl sm:mb-6">{children}</h1>

export const SubHeading: FC<HeadingProps> = ({ children }) => (
  <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-700 sm:text-2xl sm:mb-4 sm:mt-8">{children}</h2>
)
