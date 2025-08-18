"use client"

import { Menu, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarToggleProps {
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export function SidebarToggle({ isOpen, onToggle, className }: SidebarToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-600 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none",
        className
      )}
      aria-label={isOpen ? "사이드바 닫기" : "사이드바 열기"}
    >
      <div className="relative h-5 w-5">
        {/* 햄버거 메뉴 아이콘 */}
        <Menu
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-300 ease-in-out",
            isOpen 
              ? "rotate-90 scale-0 opacity-0" 
              : "rotate-0 scale-100 opacity-100"
          )}
        />
        {/* 뒤로가기 아이콘 */}
        <ArrowLeft
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-300 ease-in-out",
            isOpen 
              ? "rotate-0 scale-100 opacity-100" 
              : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </div>
    </button>
  )
} 