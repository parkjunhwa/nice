"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()

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

  // 페이지 이동 시 사이드바 상태 관리
  useEffect(() => {
    // 현재 로컬 스토리지에 저장된 상태 확인
    let savedState = false
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('sidebarOpenState')
        if (saved) {
          savedState = JSON.parse(saved)
        }
      }
    } catch (error) {
      console.warn('Failed to load saved sidebar state:', error)
    }

    // 저장된 상태가 펼침이었다면 펼침 상태 유지
    if (savedState) {
      setIsSidebarOpen(true)
      return // 펼침 상태면 자동 접힘 하지 않음
    }

    // 저장된 상태가 접힘이었다면 펼침 → 접힘 순서로 동작
    setIsSidebarOpen(true)
    
    // 3초 후에 사이드바 접기
    const timer = setTimeout(() => {
      setIsSidebarOpen(false)
      // 로컬 스토리지에도 저장
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('sidebarOpenState', JSON.stringify(false))
        }
      } catch (error) {
        console.warn('Failed to save sidebar state:', error)
      }
    }, 3000) // 3초 후

    return () => clearTimeout(timer) // 컴포넌트 언마운트 시 타이머 정리
  }, [pathname]) // pathname이 변경될 때마다 실행

  const toggleSidebar = () => {
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
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 