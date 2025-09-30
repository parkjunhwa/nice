"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Sidebar } from "./sidebar"
import { cn } from "@/lib/utils"
import { LoaderProvider, useLoader } from "@/contexts/loader-context"

/**
 * 대시보드 레이아웃 Props
 */
interface DashboardLayoutProps {
  children: React.ReactNode
}

/**
 * 대시보드 레이아웃 메인 컨텐츠 컴포넌트
 * 
 * 주요 특징:
 * - 사이드바 토글 시 자동으로 1초간 로더 표시
 * - 페이지 로드 완료 시 자동으로 로더 제거
 * - 사이드바 상태를 localStorage에 저장/복원
 * - 반응형 레이아웃 지원
 * - 전역 로더 상태 관리
 */
function DashboardLayoutContent({ children, isSidebarOpen, setIsSidebarOpen }: DashboardLayoutProps & { 
  isSidebarOpen: boolean
  setIsSidebarOpen: (value: boolean) => void 
}) {
  const { showLoader, hideLoader } = useLoader()

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
  }, [setIsSidebarOpen]) // setIsSidebarOpen을 의존성에 추가

  /**
   * 페이지 로드 완료 시 로더 자동 제거
   * 
   * 현재 구현 방식:
   * - document.readyState === 'complete'로 이미 로드된 경우 즉시 로더 제거
   * - 그렇지 않으면 window.addEventListener('load', handleLoad)로 완료 시 제거
   * - 컴포넌트 언마운트 시 이벤트 리스너 정리
   * 
   * 동작 원리:
   * 1. DOM이 완전히 로드된 후 로더 제거
   * 2. 로드 중인 경우 load 이벤트 리스너 등록
   * 3. 메모리 누수 방지를 위한 이벤트 리스너 정리
   * 
   * 장점:
   * - 구현이 단순하고 안정적
   * - 브라우저 네이티브 이벤트 활용
   * - DOM 로드 완료를 정확히 감지
   * - 메모리 누수 방지 (리스너 정리)
   * 
   * 단점:
   * - 모든 리소스 로드까지 대기 (이미지, CSS 등)
   * - 페이지별 세밀한 제어 어려움
   * - SPA에서 라우트 전환 시 타이밍 이슈 가능
   * 
   * 대안 방법들:
   * 1. Next.js Router 이벤트 활용
   * 2. 페이지별 완료 신호 (onPageReady 함수)
   * 3. Intersection Observer 활용
   * 4. 하이브리드 접근 (타임아웃 추가)
   * 
   * 현재 방식이 가장 안정적이며 대부분의 경우에 적합함
   */
  useEffect(() => {
    const handleLoad = () => {
      hideLoader()
    }

    // DOM이 완전히 로드된 후 로더 제거
    if (document.readyState === 'complete') {
      hideLoader()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [hideLoader]) // hideLoader 의존성 추가

  /**
   * 사이드바 토글 함수
   * - 사이드바 상태 변경 시 1초간 로더 표시
   * - 상태를 localStorage에 저장하여 다음 방문 시 복원
   * - useCallback으로 메모이제이션하여 성능 최적화
   */
  const toggleSidebar = useCallback(() => {
    const newState = !isSidebarOpen
    setIsSidebarOpen(newState)
    
    // 사이드바 토글 시 로더 표시
    showLoader(1000) // 1초간 로더 표시
    
    // 로컬 스토리지에 상태 저장
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('sidebarOpenState', JSON.stringify(newState))
      }
    } catch (error) {
      console.warn('Failed to save sidebar state:', error)
    }
  }, [isSidebarOpen, showLoader, setIsSidebarOpen])

  /**
   * 레이아웃 구조를 useMemo로 메모이제이션
   * - 사이드바와 메인 컨텐츠 영역으로 구성
   * - 반응형 디자인 및 부드러운 전환 효과
   * - 성능 최적화를 위한 메모이제이션
   */
  const layoutStructure = useMemo(() => (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div className={cn(
        "flex flex-1 flex-col min-h-0 transition-all duration-300 ease-in-out",
        isSidebarOpen ? "ml-0" : "ml-0"
      )}>
        <main className="flex-1 p-4 min-h-0 overflow-y-auto">
          <div className="mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  ), [isSidebarOpen, toggleSidebar, children])

  return layoutStructure
}

/**
 * 대시보드 레이아웃 최상위 컴포넌트
 * 
 * 주요 특징:
 * - LoaderProvider로 전역 로더 상태 제공
 * - DashboardLayoutContent로 실제 레이아웃 렌더링
 * - 사이드바 토글 시 자동 로더 표시
 * - 페이지 로드 완료 시 자동 로더 제거
 * - 사이드바 상태 지속성 (localStorage)
 * - 반응형 및 성능 최적화
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <LoaderProvider isSidebarOpen={isSidebarOpen}>
      <DashboardLayoutContent 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      >
        {children}
      </DashboardLayoutContent>
    </LoaderProvider>
  )
} 