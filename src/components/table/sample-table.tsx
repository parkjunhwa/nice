'use client'

import { useEffect, useRef, useMemo, useState } from 'react'
import { TabulatorFull as Tabulator, ColumnDefinition } from 'tabulator-tables'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import '@/components/table/table-common.scss'

interface SampleTableProps {
  className?: string
  height?: string | number
  showPagination?: boolean
  pageSize?: number
  data?: Record<string, unknown>[]
  columns?: ColumnDefinition[]
  enableHorizontalScroll?: boolean
  enableVerticalScroll?: boolean
  layout?: 'fitColumns' | 'fitDataFill' | 'fitData'
}

export default function SampleTable({
  className = '',
  height = '100%',
  showPagination = true,
  pageSize: initialPageSize = 10,
  data: customData,
  columns: customColumns,
  enableHorizontalScroll = true,
  enableVerticalScroll = true,
  layout = 'fitColumns'
}: SampleTableProps) {
  const tableRef = useRef<HTMLDivElement>(null)
  const tabulatorRef = useRef<Tabulator | null>(null)
  
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [totalPages, setTotalPages] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)

  // 데이터 (커스텀 데이터가 있으면 사용, 없으면 샘플 데이터)
  const tableData = useMemo(() => {
    if (customData) return customData
    
    const data = []
    for (let i = 1; i <= 50; i++) {
      data.push({
        id: i,
        header1: `데이터 ${i}`,
        header2: `값 ${i}`,
        header3: `정보 ${i}`,
        header4: `상태 ${i}`,
        header5: `날짜 ${i}`,
        header6: `사용자 ${i}`,
        header7: `카테고리 ${i}`,
        header8: `추가데이터 ${i}`,
        header9: `추가값 ${i}`,
        header10: `추가정보 ${i}`
      })
    }
    return data
  }, [customData])

  // 컬럼 정의 (커스텀 컬럼이 있으면 사용, 없으면 기본 컬럼)
  const tableColumns = useMemo(() => {
    if (customColumns) return customColumns
    
    return [
      { title: 'ID', field: 'id', width: 80, headerSort: true, headerSortTristate: true },
    { title: '헤더1', field: 'header1', width: 150, headerSort: true, headerSortTristate: true, editor: 'input' as const },
    { title: '헤더2', field: 'header2', width: 150, headerSort: true, headerSortTristate: true },
      { title: '헤더3', field: 'header3', width: 150, headerSort: true, headerSortTristate: true },
      { title: '상태', field: 'header4', width: 120, headerSort: true, headerSortTristate: true },
      { title: '날짜', field: 'header5', width: 180, headerSort: true, headerSortTristate: true },
      { title: '사용자', field: 'header6', width: 140, headerSort: true, headerSortTristate: true },
      { title: '카테고리', field: 'header7', width: 160, headerSort: true, headerSortTristate: true },
      { title: '추가컬럼1', field: 'header8', width: 150, headerSort: true, headerSortTristate: true },
      { title: '추가컬럼2', field: 'header9', width: 150, headerSort: true, headerSortTristate: true },
      { title: '추가컬럼3', field: 'header10', width: 150, headerSort: true, headerSortTristate: true }
    ]
  }, [customColumns])

  // 페이지네이션된 데이터 계산
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return tableData.slice(startIndex, endIndex)
  }, [tableData, currentPage, pageSize])

  useEffect(() => {
    if (!tableRef.current) return

    if (tabulatorRef.current) {
      tabulatorRef.current.destroy()
    }

    // 총 페이지 수 계산
    const total = Math.ceil(tableData.length / pageSize)
    setTotalPages(total)
    setTotalRecords(tableData.length)

    tabulatorRef.current = new Tabulator(tableRef.current, {
      data: paginatedData,
      columns: tableColumns,
      height: '100%',
      layout: layout,
      headerVisible: true,
      scrollToColumnIfVisible: enableHorizontalScroll,
      scrollToColumnPosition: 'left',
      sortMode: 'local',
      initialSort: [{ column: 'id', dir: 'asc' }],
      pagination: false, // 커스텀 페이지네이션 사용
      rowFormatter: (row: { getElement: () => HTMLElement; getPosition: () => number | false }) => {
        const element = row.getElement()
        element.style.transition = 'all 0.2s ease'
        const position = row.getPosition()
        if (typeof position === 'number' && position % 2 === 0) {
          element.style.backgroundColor = '#f9fafb'
        }
      }
    })

    // 정렬 아이콘을 회전하는 화살표로 교체
    setTimeout(() => {
      const sortElements = tableRef.current?.querySelectorAll('.sort-icon-wrapper')
      sortElements?.forEach((element) => {
        const wrapper = element as HTMLElement
        wrapper.innerHTML = ''
        
        // 정렬 상태에 따라 회전하는 화살표 표시
        const col = wrapper.closest('.tabulator-col')
        if (col) {
          const sortAttr = col.getAttribute('aria-sort')
          const iconElement = document.createElement('div')
          
          // 기본 화살표 아이콘 (ChevronUp)
          iconElement.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>'
          
          // 정렬 상태에 따라 회전
          if (sortAttr === 'ascending') {
            iconElement.style.transform = 'rotate(180deg)' // 아래쪽 화살표 (오름차순)
          } else if (sortAttr === 'descending') {
            iconElement.style.transform = 'rotate(0deg)' // 위쪽 화살표 (내림차순)
          } else {
            iconElement.style.transform = 'rotate(0deg)' // 기본 상태
          }
          
          iconElement.style.color = '#ffffff'
          iconElement.style.opacity = sortAttr === 'none' ? '0' : '1'
          iconElement.style.transition = 'all 0.3s ease'
          iconElement.style.display = 'inline-flex'
          iconElement.style.alignItems = 'center'
          iconElement.style.justifyContent = 'center'
          
          wrapper.appendChild(iconElement)
        }
      })
    }, 100)

    return () => {
      if (tabulatorRef.current) {
        tabulatorRef.current.destroy()
        tabulatorRef.current = null
      }
    }
  }, [paginatedData, tableColumns, pageSize, tableData.length, enableHorizontalScroll, enableVerticalScroll, layout])

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  // 페이지 크기 변경 핸들러
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setCurrentPage(1) // 페이지 크기 변경 시 첫 페이지로 이동
  }

  return (
    <div className={`sample-table-container ${className} relative w-full h-full ${layout === 'fitDataFill' ? 'fit-data-fill' : ''}`} style={{ height: height, maxHeight: '100%', overflow: 'hidden' }}>
      {/* 테이블 영역 - 페이지네이션 여부에 따라 높이 조정 */}
      <div 
        className={`table-area w-full ${showPagination ? 'h-[calc(100%-40px)]' : 'h-full'}`}
        style={{
          overflowX: enableHorizontalScroll ? 'auto' : 'hidden',
          overflowY: enableVerticalScroll ? 'auto' : 'hidden'
        }}
      >
        <div ref={tableRef} className="w-full h-full" />
      </div>
      
      {/* 페이지네이션 영역 - showPagination이 true일 때만 표시 */}
      {showPagination && (
        <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-between bg-white z-10">
        {/* 좌측: 페이지당 줄 수 선택 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">페이지당 줄 수:</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* 우측: 페이지네이션 컨트롤 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            총 {totalRecords}개 중 {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, totalRecords)}개
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-2 py-1 rounded text-sm flex items-center gap-1 transition-colors ${
              currentPage === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'
            }`}
          >
            <ChevronLeft size={16} />
            이전
          </button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-full text-sm transition-colors ${
                    currentPage === pageNum 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer border border-gray-300'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded text-sm flex items-center gap-1 transition-colors ${
              currentPage === totalPages 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'
            }`}
          >
            다음
            <ChevronRight size={16} />
          </button>
        </div>
        </div>
      )}
    </div>
  )
}
