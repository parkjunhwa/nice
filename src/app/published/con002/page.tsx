"use client"

import { Breadcrumb } from '@/components'

export default function Con002Page() {

  return (
    <div
      className="flex flex-col h-full min-h-0 layout-top-bottom"
      style={{
        height: 'calc(100vh - 2rem)', // 1rem top + 1rem bottom
      }}
    >

      {/* Breadcrumb and Page Title */}
      <div className="flex flex-row items-center justify-between mt-1 mb-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">정산기준정보 상세/등록/수정 (준비중)</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: '정산기준정보', href: '/' },
              { label: '정산기준정보 상세/등록/수정', active: true }
            ]}
          />
        </div>
      </div>

    </div>
  )
} 
