"use client"

import { useState, useCallback, useEffect } from 'react'
import {
  Search,
  Plus,
  Minus,
  RefreshCw,
  X
} from 'lucide-react'
import { SampleTable } from '@/components'
import {
  TextField,
  Button,
  Collapse,
  Typography,
  Breadcrumb,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Switch,
  AccordionToggleButton
} from '@/components'
import { Card, CardContent } from '@mui/material'

export default function InterfaceLogPage() {
  const [searchPanelExpanded, setSearchPanelExpanded] = useState(true)

  // 폼 상태 변수들
  const [groupCode, setGroupCode] = useState('')
  const [groupName, setGroupName] = useState('')
  const [switchValue, setSwitchValue] = useState(false)

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
        height: 'calc(100vh - 2rem)', // 1rem top + 1rem bottom
      }}
    >
      {/* Breadcrumb and Page Title */}
      <div className="flex flex-row items-center justify-between mt-1 mb-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">공통코드 관리</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'ADMIN', href: '/' },
              { label: '공통코드 관리', active: true }
            ]}
          />
        </div>
      </div>
      <div className="top-search-panel">
        <Collapse in={searchPanelExpanded} collapsedSize={0}>
          <div className="pt-4 px-4 pb-5">
            <div className="flex items-center gap-4">
              {/* 검색 조건들 */}
              <div className="flex items-center gap-4 flex-1">

                <div className="flex items-center">
                  <label className="form-side-label">
                    그룹코드
                  </label>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={groupCode}
                    onChange={(e) => setGroupCode(e.target.value)}
                    sx={{ width: '160px' }}
                    InputProps={{
                      endAdornment: groupCode && (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => setGroupCode('')}
                            sx={{
                              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                            }}
                          >
                            <X size={14} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <div className="flex items-center">
                  <label className="form-side-label">
                    그룹 명
                  </label>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    sx={{ width: '160px' }}
                    InputProps={{
                      endAdornment: groupName && (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => setGroupName('')}
                          >
                            <X size={14} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <div className="flex items-center">
                  <label className="form-side-label">
                    사용여부
                  </label>
                  <FormControlLabel
                    sx={{ marginLeft: '4px' }}
                    control={
                      <Switch
                        checked={switchValue}
                        onChange={(e) => setSwitchValue(e.target.checked)}
                        size="small"
                      />
                    }
                    label=""
                  />
                </div>
              </div>
              {/* 조회 버튼 그룹 */}
              <div className="flex justify-center items-center gap-2 flex-none">
                <Button variant="outlined" size="small" startIcon={<RefreshCw size={16} />}>
                  초기화
                </Button>
                <Button variant="contained" size="small" startIcon={<Search size={16} />}>
                  조회
                </Button>
              </div>
            </div>
          </div>
        </Collapse>
        {/* 아코디언 토글 버튼 */}
        <AccordionToggleButton
          expanded={searchPanelExpanded}
          onClick={() => setSearchPanelExpanded(!searchPanelExpanded)}
        />
      </div>

      {/* bottom-contents-pannel */}
      <div
        className="bottom-contents-pannel__content flex gap-1.5"
        style={{ height: 'calc(100vh - 166px)', flex: 1 }}
      >
        {/* 왼쪽 카드 1 (폭 가변) */}
        <div style={{ width: leftPanelWidth }} className="flex-shrink-0">
          <Card className="h-full">
            <CardContent className="h-full flex flex-col" style={{ padding: 16 }}>
              <div className="flex items-center justify-between mb-2 gap-2" style={{ flex: 0 }}>
                <Typography variant="subtitle1" className="font-semibold text-gray-900 whitespace-nowrap">
                  코드 그룹
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
              {/* 세로 꽉차는 테이블 샘플 */}
              <div style={{ height: 'calc(100% - 40px)' }}>
                {/* 상단에 뭔가 들어가면 높이만끔 빼줘야 */}
                {/* 기본 설정: 좌우 스크롤 활성화 */}
                <div className="grid grid-cols-1 h-full overflow-hidden">
                  <SampleTable
                    showPagination={false}
                    pageSize={20}
                  />
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
                    공통 코드
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
                {/* 세로 꽉차는 테이블 샘플 */}
                <div style={{ height: 'calc(100% - 40px)' }}>
                  {/* 상단에 뭔가 들어가면 높이만끔 빼줘야 */}
                  {/* 기본 설정: 좌우 스크롤 활성화 */}
                  <div className="grid grid-cols-1 h-full overflow-hidden">
                    <SampleTable
                      showPagination={false}
                      pageSize={20}
                    />
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
                {/* 세로 꽉차는 테이블 샘플 */}
                <div style={{ height: 'calc(100% - 0px)' }}>
                  {/* 상단에 뭔가 들어가면 높이만끔 빼줘야 */}
                  {/* 기본 설정: 좌우 스크롤 활성화 */}
                  <div className="grid grid-cols-1 h-full overflow-hidden">
                    <SampleTable
                      showPagination={false}
                      pageSize={20}
                    />
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
