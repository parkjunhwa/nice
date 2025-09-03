"use client"

import { useState, useRef, useCallback, useEffect } from 'react'
import {
  Search,
  ChevronUp,
  Plus,
  Minus
} from 'lucide-react'
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Collapse,
  Typography,
  SampleTable,
  Breadcrumb,
  DateRangePicker
} from '@/components'
import { Card, CardContent } from '@mui/material'

export default function InterfaceLogPage() {
  const [searchPanelExpanded, setSearchPanelExpanded] = useState(true)

  // 폼 상태 변수들
  const [jobType, setJobType] = useState('')
  const [jobId, setJobId] = useState('')
  const [status, setStatus] = useState('')
  const [dateValue, setDateValue] = useState<Date | null>(null)
  const [dateRangeValue, setDateRangeValue] = useState<[Date | null, Date | null]>([null, null])

  // 패널 크기 조절 상태
  const [leftPanelWidth, setLeftPanelWidth] = useState(234)
  const [topPanelHeight, setTopPanelHeight] = useState(200)
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false)
  const [isDraggingVertical, setIsDraggingVertical] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartY, setDragStartY] = useState(0)
  const [dragStartLeftWidth, setDragStartLeftWidth] = useState(0)
  const [dragStartTopHeight, setDragStartTopHeight] = useState(0)

  // Select 옵션들
  const jobTypeOptions = [
    { value: 'option1', label: '옵션1' },
    { value: 'option2', label: '옵션2' },
    { value: 'option3', label: '옵션3' }
  ]

  const statusOptions = [
    { value: 'option1', label: '옵션1' },
    { value: 'option2', label: '옵션2' },
    { value: 'option3', label: '옵션3' }
  ]

  // 수평 드래그 핸들러
  const handleHorizontalDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDraggingHorizontal(true)
    setDragStartX(e.clientX)
    setDragStartLeftWidth(leftPanelWidth)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [leftPanelWidth])

  const handleHorizontalDragMove = useCallback((e: MouseEvent) => {
    if (!isDraggingHorizontal) return

    const deltaX = e.clientX - dragStartX
    const newWidth = Math.max(234, Math.min(400, dragStartLeftWidth + deltaX))
    setLeftPanelWidth(newWidth)
  }, [isDraggingHorizontal, dragStartX, dragStartLeftWidth])

  const handleHorizontalDragEnd = useCallback(() => {
    setIsDraggingHorizontal(false)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [])

  // 수직 드래그 핸들러
  const handleVerticalDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDraggingVertical(true)
    setDragStartY(e.clientY)
    setDragStartTopHeight(topPanelHeight)
    document.body.style.cursor = 'row-resize'
    document.body.style.userSelect = 'none'
  }, [topPanelHeight])

  const handleVerticalDragMove = useCallback((e: MouseEvent) => {
    if (!isDraggingVertical) return

    const deltaY = e.clientY - dragStartY
    const newHeight = Math.max(100, Math.min(400, dragStartTopHeight + deltaY))
    setTopPanelHeight(newHeight)
  }, [isDraggingVertical, dragStartY, dragStartTopHeight])

  const handleVerticalDragEnd = useCallback(() => {
    setIsDraggingVertical(false)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [])

  // 마우스 이벤트 리스너 등록
  useEffect(() => {
    if (isDraggingHorizontal) {
      document.addEventListener('mousemove', handleHorizontalDragMove)
      document.addEventListener('mouseup', handleHorizontalDragEnd)
      return () => {
        document.removeEventListener('mousemove', handleHorizontalDragMove)
        document.removeEventListener('mouseup', handleHorizontalDragEnd)
      }
    }
  }, [isDraggingHorizontal, handleHorizontalDragMove, handleHorizontalDragEnd])

  useEffect(() => {
    if (isDraggingVertical) {
      document.addEventListener('mousemove', handleVerticalDragMove)
      document.addEventListener('mouseup', handleVerticalDragEnd)
      return () => {
        document.removeEventListener('mousemove', handleVerticalDragMove)
        document.removeEventListener('mouseup', handleVerticalDragEnd)
      }
    }
  }, [isDraggingVertical, handleVerticalDragMove, handleVerticalDragEnd])

  return (
    <div
      className="flex flex-col h-full min-h-0 layout-top-bottom"
      style={{
        height: 'calc(100vh - 64px - 3rem)', // 64px topbar + 1.5rem top + 1.5rem bottom (space-y-6 = 1.5rem*2)
      }}
    >
      {/* xsmallbtn 스타일 오버라이드 */}
      <style jsx global>{`
        .xsmallbtn1 {
          padding: 0px !important;
          min-width: auto !important;
          align-items: center !important;
          justify-content: center !important;
          height:24px !important;
          max-width:32px;
        }
        }
        
        .xsmallbtn1 .MuiButton-startIcon {
          margin: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          height:24px !important;
        }
        .xsmallbtn2 {
          padding: 0px !important;
          min-width: auto !important;
          align-items: center !important;
          justify-content: center !important;
          height:24px !important;
          max-width:20px;
        }
        
        .xsmallbtn2 .MuiButton-startIcon {
          margin: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          height:24px !important;
        }
      `}</style>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'ADMIN', href: '/' },
          { label: 'I/F로그 관리', active: true }
        ]}
      />

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900">I/F로그 관리</h1>
      <div className="top-search-panel">
        <Collapse in={searchPanelExpanded} collapsedSize={12}>
          <div className="pt-4 pb-2 px-6">
            <div className="flex items-center gap-4">
              {/* 검색 조건들 */}
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center">
                  <label className="form-side-label text-left">
                    부서명
                  </label>
                  <FormControl sx={{ width: '160px' }}>
                    <Select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      displayEmpty
                      className="bg-white"
                      size="small"
                    >
                      <MenuItem value="">
                        <span>선택</span>
                      </MenuItem>
                      {jobTypeOptions.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* 조회 버튼 그룹 */}
              <div className="flex justify-center items-center gap-2 flex-none">
                <Button variant="contained" size="small" startIcon={<Search size={16} />}>
                  조회
                </Button>
              </div>
            </div>
          </div>
        </Collapse>
        {/* 아코디언 토글 버튼 */}
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="accordion-menu-button"
            onClick={() => setSearchPanelExpanded(!searchPanelExpanded)}
          >
            {searchPanelExpanded ? (
              <ChevronUp
                size={16}
                className="accordion-menu-button__icon"
              />
            ) : (
              <Search
                size={16}
                className="accordion-menu-button__icon"
              />
            )}
          </button>
        </div>
      </div>

      {/* bottom-contents-pannel */}
      <div className="bottom-contents-pannel__content flex gap-1.5 h-full">
        {/* 왼쪽 카드 1 (폭 가변) */}
        <div style={{ width: leftPanelWidth }} className="flex-shrink-0">
          <Card className="h-full">
            <CardContent className="h-full flex flex-col" style={{ padding: 16 }}>
              <div className="flex items-center justify-between mb-2 gap-2" style={{ flex: 0 }}>
                <Typography variant="subtitle1" className="font-semibold text-gray-900 whitespace-nowrap">
                  권한 그룹
                </Typography>
                <div className="flex gap-1">
                  <Button
                    variant="outlined"
                    size="small"
                    className="xsmallbtn1"
                  >
                    저장
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    className="xsmallbtn1"
                  >
                    취소
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    className="xsmallbtn2"
                    startIcon={<Plus size={16} />}
                  >
                    <span style={{ display: "none" }}>+</span>
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    className="xsmallbtn2"
                    startIcon={<Minus size={16} />}
                  >
                    <span style={{ display: "none" }}>-</span>
                  </Button>
                </div>
              </div>
              <div className="flex-1 bg-gray-50 w-full min-h-0 overflow-auto">
                <div className="flex items-center justify-center h-full w-full">
                  <span className="text-[14px] text-gray-400 text-center">table grid영역</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 수평 드래그 핸들러 */}
        <div
          className="w-0.5 cursor-col-resize border-l-2 border-dashed border-gray-200"
          onMouseDown={handleHorizontalDragStart}
        />

        {/* 오른쪽 카드들 (폭 가변 flex:1) */}
        <div className="flex-1 flex flex-col gap-2">
          {/* 오른쪽 위 카드 (높이 가변) */}
          <div style={{ height: topPanelHeight }} className="flex-shrink-0">
            <Card className="h-full">
              <CardContent className="h-full flex flex-col" style={{ padding: 16 }}>
                <div className="flex items-center justify-between mb-2 gap-2" style={{ flex: 0 }}>
                  <Typography variant="subtitle1" className="font-semibold text-gray-900 whitespace-nowrap">
                    사용자 정보
                  </Typography>
                  <div className="flex gap-1">
                  <Button
                      variant="outlined"
                      size="small"
                    >
                      저장
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                    >
                      추가
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                    >
                      삭제
                    </Button>
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 w-full min-h-0 overflow-auto">
                  <div className="flex items-center justify-center h-full w-full">
                    <span className="text-[14px] text-gray-400 text-center">table grid영역</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 수직 드래그 핸들러 */}
          <div
            className="h-0.5 cursor-row-resize border-t-2 border-dashed border-gray-200"
            onMouseDown={handleVerticalDragStart}
          />

          {/* 오른쪽 아래 카드 (나머지 영역 꽉 채움) */}
          <div className="flex-1 min-h-0">
            <Card className="h-full">
              <CardContent className="h-full flex flex-col" style={{ padding: 16 }}>
                <div className="flex items-center justify-between mb-2 gap-2" style={{ flex: 0 }}>
                  <Typography variant="subtitle1" className="font-semibold text-gray-900 whitespace-nowrap">
                    메뉴 권한설정
                  </Typography>
                  <div className="flex gap-1">
                    <Button
                      variant="outlined"
                      size="small"
                    >
                      저장
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="secondary"
                    >
                      취소
                    </Button>
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 w-full min-h-0 overflow-auto">
                  <div className="flex items-center justify-center h-full w-full">
                    <span className="text-[14px] text-gray-400 text-center">table grid영역</span>
              </div>
            </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 
