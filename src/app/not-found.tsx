"use client"

import { Button } from "@mui/material"
import { Home, ArrowLeft, FileX } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 에러 아이콘 */}
        <div className="mb-8">
          <div className="mx-auto w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <FileX className="w-16 h-16 text-blue-500" />
          </div>
        </div>

        {/* 에러 코드 */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-blue-500 mb-2">404</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* 에러 제목 */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          페이지를 찾을 수 없습니다
        </h2>

        {/* 에러 설명 */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          요청하신 페이지가 존재하지 않거나<br />
          이동되었을 수 있습니다.
        </p>

        {/* 버튼 그룹 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="contained"
            startIcon={<Home />}
            component={Link}
            href="/published"
            sx={{
              backgroundColor: '#2563eb',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#1d4ed8',
              },
              minWidth: '160px'
            }}
          >
            홈으로 이동
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<ArrowLeft />}
            onClick={() => router.back()}
            sx={{
              borderColor: '#2563eb',
              color: '#2563eb',
              px: 4,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#1d4ed8',
                backgroundColor: '#eff6ff',
              },
              minWidth: '160px'
            }}
          >
            이전 페이지
          </Button>
        </div>

        {/* 추가 정보 */}
        <div className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            찾고 계신 페이지가 없나요?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            URL을 다시 확인하시거나, 메인 페이지에서<br />
            원하시는 메뉴를 찾아보세요.
          </p>
          <div className="text-xs text-gray-500 mt-4">
            문의사항 : 000-0000-0000
          </div>
        </div>
      </div>
    </div>
  )
}
