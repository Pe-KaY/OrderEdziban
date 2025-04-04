"use client"

import {
  ShoppingCart,
  Search,
  Star,
  MailsIcon as Notifications,
  HomeIcon,
  Store,
  UserIcon,
  CalendarIcon,
  Menu,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CustomerHeader() {
  return (
    <header className="bg-primary-700 bg-gradient-to-r from-primary-800 to-primary-600 p-6 rounded-b-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <div className="flex items-center space-x-2">
          <div className="bg-white/20 p-2 rounded-full">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">OrderEdziban</h1>
        </div>
        <div className="relative w-full sm:w-auto mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search for establishments..."
            className="w-full pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-300 bg-white/90 shadow-md"
          />
          <Search className="absolute left-3 top-2 text-gray-500 w-4 h-4" />
        </div>
        <nav className="hidden md:flex items-center space-x-6 mt-4 sm:mt-0">
          <Link
            href="/customer"
            className="text-white hover:text-primary-200 transition-colors duration-300 flex items-center gap-2 font-medium"
          >
            <HomeIcon className="w-4 h-4" />
            <span>Homepage</span>
          </Link>
          <Link
            href="#"
            className="text-white hover:text-primary-200 transition-colors duration-300 flex items-center gap-2 font-medium"
          >
            <Store className="w-4 h-4" />
            <span>Establishments</span>
          </Link>
          <Link
            href="#"
            className="text-white hover:text-primary-200 transition-colors duration-300 flex items-center gap-2 font-medium"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>My Reservations</span>
          </Link>
          <Link
            href="#"
            className="text-white hover:text-primary-200 transition-colors duration-300 flex items-center gap-2 font-medium"
          >
            <UserIcon className="w-4 h-4" />
            <span>Account</span>
          </Link>
        </nav>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="relative group">
            <Notifications className="text-white cursor-pointer hover:text-primary-200 transition-colors duration-300 w-5 h-5" />
            <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              2
            </div>
          </div>
          <div className="relative group">
            <ShoppingCart className="text-white cursor-pointer hover:text-primary-200 transition-colors duration-300 w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </div>
          <div className="w-8 h-8 bg-primary-300 rounded-full overflow-hidden cursor-pointer ring-2 ring-white hover:ring-primary-200 transition-all duration-300">
            <Image
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
              alt="User"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="md:hidden flex items-center mt-4 w-full justify-between">
        <button className="bg-white/10 hover:bg-white/20 transition-colors duration-300 p-2 rounded-lg text-white">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <Notifications className="text-white cursor-pointer hover:text-primary-200 transition-colors duration-300 w-5 h-5" />
            <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              2
            </div>
          </div>
          <div className="relative group">
            <ShoppingCart className="text-white cursor-pointer hover:text-primary-200 transition-colors duration-300 w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
