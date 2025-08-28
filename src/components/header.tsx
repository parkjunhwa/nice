"use client"

import { Bell, Search, User, LogOut } from "lucide-react"
import { SidebarToggle } from "./sidebar-toggle"
import { memo } from "react"
import { IconButton, Tooltip } from "@mui/material"

interface HeaderProps {
  isSidebarOpen?: boolean
  onToggleSidebar?: () => void
}

const Header = memo(function Header({ isSidebarOpen, onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center space-x-3">
        <div className="relative">
          {/* 현재 까지는 빈 영역 */}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="relative rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="알림"
        >
          <Bell className="h-5 w-5 text-gray-600"  />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <button
          type="button"
          className="flex items-center space-x-3 focus:outline-none hover:bg-gray-100 rounded-full px-2 py-1 transition"
          aria-label="프로필"
        >
          <div className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-100 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-600" />
          </div>
          <div className="hidden md:block text-left pr-2">
            <p className="text-sm font-medium text-gray-700">홍길동</p>
            <p className="text-xs text-gray-500">소속부서명 정보</p>
          </div>
        </button>

        <Tooltip title="로그아웃" placement="top" arrow>
          <IconButton
            aria-label="로그아웃"
            onClick={() => {
              // 로그아웃 로직 추가
              console.log('로그아웃 클릭')
            }}
            className="text-gray-600 p-4 hover:text-gray-600 hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5 text-gray-600" />
          </IconButton>
        </Tooltip>
      </div>
    </header>
  )
})

export { Header } 