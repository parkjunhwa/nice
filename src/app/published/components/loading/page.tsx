"use client"

import React, { useState, useCallback } from 'react'
import { Play, Square, Clock, Loader2 } from 'lucide-react'
import { useLoader } from '@/contexts/loader-context'
import { Button, Typography, Box, Breadcrumb } from '@/components'

export default function LoadingPage() {
  const { showLoader, hideLoader } = useLoader()
  const [countdown, setCountdown] = useState(0)
  const [isPageLoading, setIsPageLoading] = useState(false)

  /**
   * 카운트다운 시작
   */
  const startCountdown = useCallback((seconds: number) => {
    setCountdown(seconds)
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  /**
   * 5초간 로더 표시
   */
  const handleShowLoader = useCallback(() => {
    setIsPageLoading(true)
    showLoader(5000) // 5초간 로더 표시
    startCountdown(5)

    // 5초 후 자동으로 로더 제거
    setTimeout(() => {
      setIsPageLoading(false)
      hideLoader()
      setCountdown(0)
    }, 5000)
  }, [showLoader, hideLoader, startCountdown])

  /**
   * 로더 즉시 중지
   */
  const handleStopLoader = () => {
    setIsPageLoading(false)
    hideLoader()
    setCountdown(0)
  }

  return (
    <div className="flex flex-col h-full min-h-0 layout-top-bottom">
      {/* Breadcrumb and Page Title */}
      <div className="flex flex-row items-center justify-between mt-1 mb-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">로딩 중 페이지</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: '컴포넌트 예시', href: '/published/components/mui' },
              { label: '로딩중', active: true }
            ]}
          />
        </div>
      </div>

      <div className="c-panel bottom-contents-pannel">
        <div className="bottom-contents-pannel__content">
          <div className="pb-4 flex-shrink-0">
            <Typography variant="h6" className="text-gray-800 font-semibold">
              로딩 중 컴포넌트 예시
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-1">
              전역 로더 시스템을 사용하여 로딩 상태를 표시하는 예시입니다. 페이지 진입 시 자동으로 5초 로더가 시작됩니다.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 로더 제어 버튼들 */}
            <div>
              <div className="c-panel bottom-contents-pannel">
                <div className="bottom-contents-pannel__content flex flex-col">
                  <Typography variant="h6" className="mb-4">
                    로더 제어
                  </Typography>

                  <div className="space-y-3">
                    <Button
                      variant="contained"
                      startIcon={<Play />}
                      onClick={handleShowLoader}
                      disabled={isPageLoading}
                      fullWidth
                      sx={{
                        backgroundColor: '#2563eb',
                        '&:hover': { backgroundColor: '#1d4ed8' }
                      }}
                    >
                      5초 로더 시작
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={<Square />}
                      onClick={handleStopLoader}
                      disabled={!isPageLoading}
                      fullWidth
                      sx={{
                        borderColor: '#dc2626',
                        color: '#dc2626',
                        '&:hover': {
                          borderColor: '#b91c1c',
                          backgroundColor: '#fef2f2'
                        }
                      }}
                    >
                      로더 중지
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* 로더 상태 정보 */}
            <div>
              <div className="c-panel bottom-contents-pannel">
                <div className="bottom-contents-pannel__content flex flex-col">
                  <Typography variant="h6" className="mb-4">
                    로더 상태
                  </Typography>

                  <div className="space-y-3">
                    <Box className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">로딩 상태:</span>
                      <span className={`text-sm font-semibold ${isPageLoading ? 'text-blue-600' : 'text-gray-600'}`}>
                        {isPageLoading ? '로딩 중...' : '대기 중'}
                      </span>
                    </Box>

                    {countdown > 0 && (
                      <Box className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          남은 시간:
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                          {countdown}초
                        </span>
                      </Box>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 로딩 중 컴포넌트 예시 */}
          <div className="mt-6">
            <div className="c-panel bottom-contents-pannel">
              <div className="bottom-contents-pannel__content flex flex-col">
                <Typography variant="h6" className="mb-4">
                  로딩 중 컴포넌트 예시
                </Typography>

                <div className="space-y-4">
                  {/* 간단한 로딩 스피너 */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Typography variant="subtitle2" className="font-semibold mb-2">
                      1. 간단한 로딩 스피너
                    </Typography>
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      <span className="text-sm text-gray-600">로딩 중...</span>
                    </div>
                  </div>

                  {/* 중간 크기 로딩 스피너 */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Typography variant="subtitle2" className="font-semibold mb-2">
                      2. 중간 크기 로딩 스피너
                    </Typography>
                    <div className="flex items-center justify-center space-x-3">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                      <span className="text-base text-gray-700">데이터를 불러오는 중입니다...</span>
                    </div>
                  </div>

                  {/* 큰 로딩 스피너 */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Typography variant="subtitle2" className="font-semibold mb-3">
                      3. 큰 로딩 스피너
                    </Typography>
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                      <span className="text-lg text-gray-700">페이지를 불러오는 중입니다...</span>
                    </div>
                  </div>

                  {/* 점진적 로딩 바 */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Typography variant="subtitle2" className="font-semibold mb-2">
                      4. 점진적 로딩 바
                    </Typography>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <span className="text-sm text-gray-600">처리 중...</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">75% 완료</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 사용법 가이드 */}
          <div className="mt-6">
            <div className="c-panel bottom-contents-pannel">
              <div className="bottom-contents-pannel__content flex flex-col">
                <Typography variant="h6" className="mb-4">
                  사용법 가이드
                </Typography>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Typography variant="subtitle2" className="font-semibold mb-2">
                      1. 기본 사용법
                    </Typography>
                    <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
                      {`import { useLoader } from '@/contexts/loader-context'

const { showLoader, hideLoader, isLoading } = useLoader()

// 5초간 로더 표시
showLoader(5000)

// 로더 즉시 중지
hideLoader()`}
                    </pre>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Typography variant="subtitle2" className="font-semibold mb-2">
                      2. 주요 특징
                    </Typography>
                    <ul className="list-disc list-inside space-y-1">
                      <li>전체 화면을 덮어서 표시 (사이드바 포함)</li>
                      <li>모달 팝업보다 위에 표시 (z-index: 10001)</li>
                      <li>기본 지속 시간: 2초 (이 페이지는 5초)</li>
                      <li>수동 중지 기능 제공</li>
                      <li>자동 완료 및 수동 중지 지원</li>
                      <li>페이지 로드 완료 시 자동 제거</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
