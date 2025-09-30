"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

/**
 * 로더 오버레이 컴포넌트
 * - 사이드바를 제외한 메인 컨텐츠 영역에만 표시
 * - 모달 팝업보다 위에 표시 (z-index: 9999)
 * - 자동 완료 및 수동 중지 지원
 * - 사이드바 상태에 따른 동적 위치 조정
 */
interface LoaderOverlayProps {
  /** 로더 지속 시간 (밀리초, 기본값: 2000ms) */
  duration?: number
  /** 로더 완료 시 콜백 함수 */
  onComplete?: () => void
  /** 사이드바 열림 상태 */
  isSidebarOpen?: boolean
}

export function LoaderOverlay({ duration = 2000, onComplete, isSidebarOpen = true }: LoaderOverlayProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  if (!isVisible) return null

  // 사이드바 상태에 따른 왼쪽 여백 계산
  const leftMargin = isSidebarOpen ? '16rem' : '4rem' // 열림: 16rem (256px), 접힘: 4rem (64px)

  return (
    <div 
      className="fixed bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      style={{
        // 사이드바를 제외한 메인 컨텐츠 영역에만 표시
        top: '0rem', // 상단 여백
        left: leftMargin, // 사이드바 상태에 따른 동적 왼쪽 여백
        right: '0rem', // 오른쪽 여백
        bottom: '0rem', // 하단 여백
        zIndex: 9999, // 모달 팝업보다 위에 표시
      }}
    >
      <div className="max-w-md w-full text-center">
        {/* 로더 아이콘 */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 flex items-center justify-center mb-6">
            <Loader2 className="w-16 h-16 text-white animate-spin" />
          </div>
        </div>

        {/* 로더 텍스트 */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white">로딩 중</h1>
        </div>

        {/* 로딩 메시지 */}
        <p className="text-lg text-white/80 mb-8 leading-relaxed">
          페이지를 불러오는 중입니다...
        </p>

      </div>
    </div>
  )
}
