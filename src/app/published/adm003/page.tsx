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
  SampleTable,
  Breadcrumb,
  DatePicker,
  AccordionToggleButton
} from '@/components'

export default function InterfaceLogPage() {
  const [searchPanelExpanded, setSearchPanelExpanded] = useState(true)

  // 폼 상태 변수들
  const [jobType, setJobType] = useState('')
  const [jobId, setJobId] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [status, setStatus] = useState('')

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
          <h1 className="text-2xl font-bold text-gray-900">I/F로그 관리</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: '시스템 관리', href: '/' },
              { label: 'I/F로그 관리', active: true }
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
                  Job Type
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
              <div className="flex items-center">
                <label className="form-side-label text-left">
                  Job ID
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  value={jobId}
                  onChange={(e) => setJobId(e.target.value)}
                  sx={{ width: '160px' }}
                  placeholder="Job ID 입력"
                />
              </div>
              <div className="flex items-center">
                <label className="form-side-label text-left">
                  시작일자
                </label>
                <div style={{ width: 160 }}>
                  <DatePicker
                    value={startDate}
                    onChange={(newValue: Date | null) => setStartDate(newValue)}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="form-side-label text-left">
                  상태
                </label>
                <FormControl sx={{ width: 160 }}>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    displayEmpty
                    className="bg-white"
                    size="small"
                  >
                    <MenuItem value="">
                      <span>선택</span>
                    </MenuItem>
                    {statusOptions.map((option) => (
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
          {/* 세로 꽉차는 테이블 샘플 */}
          <div style={{ height: 'calc(100% - 0px)' }}>
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
