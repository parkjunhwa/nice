"use client"

import React from "react"
import { Button } from "@mui/material"
import { ArrowLeft, ShieldX, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Error401Page() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 에러 아이콘 */}
        <div className="mb-8">
          <div className="mx-auto w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <ShieldX className="w-16 h-16 text-red-500" />
          </div>
        </div>

        {/* 에러 코드 */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-red-500 mb-2">401</h1>
          <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
        </div>

        {/* 에러 제목 */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          인증이 필요합니다
        </h2>

        {/* 에러 설명 */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          이 페이지에 접근하려면 로그인이 필요합니다.<br />
          로그인 후 다시 시도해 주세요.
        </p>

        {/* 버튼 그룹 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="contained"
            startIcon={<User />}
            component={Link}
            href="/mnb001"
            sx={{
              backgroundColor: '#dc2626',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#b91c1c',
              },
              minWidth: '160px'
            }}
          >
            로그인하기
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<ArrowLeft />}
            onClick={() => router.back()}
            sx={{
              borderColor: '#dc2626',
              color: '#dc2626',
              px: 4,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#b91c1c',
                backgroundColor: '#fef2f2',
              },
              minWidth: '160px'
            }}
          >
            이전 페이지
          </Button>
        </div>

        {/* 추가 정보 */}
        <div className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-red-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            도움이 필요하신가요?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            로그인에 문제가 있거나 계정 관련 문의사항이 있으시면<br />
            시스템 관리자에게 문의해 주세요.
          </p>
          <div className="text-xs text-gray-500 mt-4">
            문의사항 : 000-0000-0000
          </div>
        </div>
      </div>
    </div>
  )
}
