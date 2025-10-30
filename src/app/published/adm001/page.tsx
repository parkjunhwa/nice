"use client"

import { useState } from 'react'
import {
  RefreshCw,
  Search
} from 'lucide-react'
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Collapse,
  Switch,
  FormControlLabel
} from '@mui/material'
import {
  SampleTable,
  Breadcrumb,
  AccordionToggleButton
} from '@/components'

export default function Adm001Page() {
  const [searchPanelExpanded, setSearchPanelExpanded] = useState(true)

  // 폼 상태 변수들
  const [business, setBusiness] = useState('')
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [useStatus, setUseStatus] = useState(false)

  // Select 옵션들
  const businessOptions = [
    { value: 'option1', label: '옵션1' },
    { value: 'option2', label: '옵션2' },
    { value: 'option3', label: '옵션3' }
  ]

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
          <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: '시스템 관리', href: '/' },
              { label: '사용자 관리', active: true }
            ]}
          />
        </div>
      </div>

      <div className="top-search-panel">
        <Collapse in={searchPanelExpanded} collapsedSize={0}>
          <div className="pt-4 px-4 pb-5 gap-y-2">
            {/* 검색 조건들 */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 items-center">
              <div className="flex items-center">
                <label className="form-side-label text-left">
                  사업
                </label>
                <FormControl sx={{ width: '160px' }}>
                  <Select
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    displayEmpty
                    className="bg-white"
                    size="small"
                  >
                    <MenuItem value="">
                      <span>선택</span>
                    </MenuItem>
                    {businessOptions.map((option) => (
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
              <div className="flex items-center">
                <label className="form-side-label text-left">
                  사용자ID
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  sx={{ width: '160px' }}
                  placeholder="사용자 ID 입력"
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
                      checked={useStatus}
                      onChange={(e) => setUseStatus(e.target.checked)}
                      size="small"
                    />
                  }
                  label=""
                />
              </div>
              <div className="flex items-center">
                <label className="form-side-label text-left">
                  사용자 명
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  sx={{ width: '160px' }}
                  placeholder="사용자명 입력"
                />
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="flex justify-center items-center gap-2">
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
      <div className="c-panel bottom-contents-pannel">
        <div className="bottom-contents-pannel__content">
          <div className="flex items-center justify-end mb-2 gap-2" style={{ flex: 0 }}>
            <div className="flex gap-1">
              <Button
                variant="outlined"
                size="small"
                color="secondary"
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
              >
                비밀번호 초기화
              </Button>
            </div>
          </div>
          {/* 세로 꽉차는 테이블 샘플 */}
          <div style={{ height: 'calc(100% - 40px)' }}>
            {/* 상단에 뭔가 들어가면 높이만끔 빼줘야 */}
            {/* 기본 설정: 좌우 스크롤 활성화 */}
            <div className="grid grid-cols-1 h-full overflow-hidden">
              <SampleTable
                showPagination={true}
                pageSize={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
