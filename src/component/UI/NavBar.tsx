import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegUserCircle } from 'react-icons/fa'

const NavBar: React.FC = () => {
  return (
    <nav className="bg-primary-2">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-800">
                <img src="/assets/img/logo-side.png" alt="logo" className={`w-2/5`} />
              </Link>
            </div>

            <div className="ml-4 text-sm font-medium text-gray-700">
              <FaRegUserCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
