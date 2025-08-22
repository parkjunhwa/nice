"use client"

import { Bell, Search, User } from "lucide-react"
import { SidebarToggle } from "./sidebar-toggle"
import { memo } from "react"

interface HeaderProps {
  isSidebarOpen?: boolean
  onToggleSidebar?: () => void
}

const Header = memo(function Header({ isSidebarOpen, onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="검색..."
            className="h-10 w-64 rounded-md border border-gray-300 bg-gray-50 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          className="relative rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="알림"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500"></span>
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700">관리자</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </header>
  )
})

export { Header } 