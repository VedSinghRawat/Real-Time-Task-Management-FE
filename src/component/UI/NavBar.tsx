import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegUserCircle } from 'react-icons/fa'
import { cn } from '../../utils/tailwind'
import { isMobile } from 'react-device-detect'

const NavBar: React.FC = () => {
  return (
    <nav
      className={cn('sticky inset-x-0 bg-primary-2', {
        'w-screen': isMobile,
        'w-[calc(100vw-0.5rem)]': !isMobile,
      })}
    >
      <div className="container flex justify-between items-center px-4 py-2 mx-auto lg:px-0 lg:py-3">
        <Link to="/app" className="text-xl font-bold text-gray-800">
          <img src="/assets/img/logo-side.png" alt="logo" className="max-h-14 sm:max-h-16 md:max-h-20" />
        </Link>

        <FaRegUserCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" />
      </div>
    </nav>
  )
}

export default NavBar
