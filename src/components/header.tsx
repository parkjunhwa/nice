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
      
    </header>
  )
})

export { Header } 