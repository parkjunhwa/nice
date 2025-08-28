"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // 컴포넌트 마운트 시 저장된 상태 복원 (클라이언트에서만 실행)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedState = localStorage.getItem('sidebarOpenState')
        if (savedState) {
          const parsedState = JSON.parse(savedState)
          setIsSidebarOpen(parsedState)
        }
      }
    } catch (error) {
      console.warn('Failed to load sidebar state:', error)
      // 에러 발생 시 기본값 사용
      setIsSidebarOpen(true)
    }
  }, []) // 컴포넌트 마운트 시에만 실행

  // toggleSidebar 함수를 useCallback으로 메모이제이션
  const toggleSidebar = useCallback(() => {
    const newState = !isSidebarOpen
    setIsSidebarOpen(newState)
    
    // 로컬 스토리지에 상태 저장
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('sidebarOpenState', JSON.stringify(newState))
      }
    } catch (error) {
      console.warn('Failed to save sidebar state:', error)
    }
  }, [isSidebarOpen])

  // 레이아웃 구조를 useMemo로 메모이제이션
  const layoutStructure = useMemo(() => (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div className={cn(
        "flex flex-1 flex-col min-h-0 transition-all duration-300 ease-in-out",
        isSidebarOpen ? "ml-0" : "ml-0"
      )}>
        <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6 min-h-0">
          <div className="mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  ), [isSidebarOpen, toggleSidebar, children])

  return layoutStructure
} 