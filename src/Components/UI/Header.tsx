import { FC, memo } from 'react'
import { FaHistory } from 'react-icons/fa'
import { MdToday } from 'react-icons/md'
import NavLink from './NavLink'

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className={`max-w-[100vw] sticky inset-x-0 rounded-b-xl py-1.5`}>
      <ul className={`flex ${history ? 'justify-around' : 'justify-end mr-5'}`}>
        <li></li>
      </ul>
    </header>
  )
}

export default memo(Header)
