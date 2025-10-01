"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

/**
 * 로더 오버레이 컴포넌트
 * - 전체 화면을 덮어서 표시 (사이드바 포함)
 * - 모달 팝업보다 위에 표시 (z-index: 10001)
 * - 자동 완료 및 수동 중지 지원
 * - 사이드바 상태와 무관하게 전체 화면 덮음
 */
interface LoaderOverlayProps {
  /** 로더 지속 시간 (밀리초, 기본값: 2000ms) */
  duration?: number
  /** 로더 완료 시 콜백 함수 */
  onComplete?: () => void
}

export function LoaderOverlay({ duration = 2000, onComplete }: LoaderOverlayProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  if (!isVisible) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      style={{
        // 전체 화면을 덮어서 표시 (사이드바 포함)
        zIndex: 10001, // 사이드바 풍선(10000)보다 위에 표시
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
