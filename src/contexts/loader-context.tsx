"use client"

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { LoaderOverlay } from '@/components/loader-overlay'

/**
 * 전역 로더 상태 관리 Context
 * - 사이드바를 제외한 메인 컨텐츠 영역에만 로더 표시
 * - 기본 지속 시간: 2초
 * - 수동 중지 기능 제공
 * - 사이드바 상태에 따른 동적 위치 조정
 */
interface LoaderContextType {
  /** 로더 표시 (기본 2초) */
  showLoader: (duration?: number) => void
  /** 로더 즉시 숨김 */
  hideLoader: () => void
  /** 현재 로딩 상태 */
  isLoading: boolean
  /** 사이드바 열림 상태 */
  isSidebarOpen: boolean
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined)

export function LoaderProvider({ children, isSidebarOpen = true }: { children: ReactNode, isSidebarOpen?: boolean }) {
  const [isLoading, setIsLoading] = useState(false)
  const [duration, setDuration] = useState(2000) // 기본 2초

  /**
   * 로더 표시
   * @param loaderDuration 로더 지속 시간 (밀리초, 기본값: 2000ms)
   */
  const showLoader = (loaderDuration = 2000) => {
    setDuration(loaderDuration)
    setIsLoading(true)
  }

  /**
   * 로더 즉시 숨김 (수동 중지)
   */
  const hideLoader = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading, isSidebarOpen }}>
      {children}
      {isLoading && (
        <LoaderOverlay 
          duration={duration} 
          onComplete={hideLoader}
          isSidebarOpen={isSidebarOpen}
        />
      )}
    </LoaderContext.Provider>
  )
}

/**
 * 전역 로더 훅
 * @returns 로더 제어 함수들
 * @throws LoaderProvider 외부에서 사용 시 에러
 */
export function useLoader() {
  const context = useContext(LoaderContext)
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider')
  }
  return context
}
