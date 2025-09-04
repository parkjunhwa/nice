"use client"

import { useState } from 'react'
import {
  RefreshCw,
  Search,
  ChevronUp
} from 'lucide-react'
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Collapse,
  Typography,
  Switch,
  FormControlLabel
} from '@mui/material'
import {
  SampleTable,
  Breadcrumb,
  DateRangePicker
} from '@/components'

export default function UserManagementPage() {
  const [searchPanelExpanded, setSearchPanelExpanded] = useState(true)

  // 폼 상태 변수들
  const [departmentName, setDepartmentName] = useState('')
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [useStatus, setUseStatus] = useState(false)
  const [dateValue, setDateValue] = useState<Date | null>(null)
  const [dateRangeValue, setDateRangeValue] = useState<[Date | null, Date | null]>([null, null])

  // Select 옵션들
  const departmentOptions = [
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
        height: 'calc(100vh - 3rem)', // 1.5rem top + 1.5rem bottom (space-y-6 = 1.5rem*2)
      }}
    >
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'ADMIN', href: '/' },
          { label: '사용자 관리', active: true }
        ]}
      />

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
      <div className="top-search-panel">
        <Collapse in={searchPanelExpanded} collapsedSize={12}>
          <div className="pt-4 pb-2 px-6">
            <div
              className="
                flex flex-col gap-y-1 gap-x-4
                xl:flex-row
              "
            >
              {/* 검색 조건들 */}
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <label className="form-side-label text-left">
                    부서명
                  </label>
                  <FormControl sx={{ width: '160px' }}>
                    <Select
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                      displayEmpty
                      className="bg-white"
                      size="small"
                    >
                      <MenuItem value="">
                        <span>선택</span>
                      </MenuItem>
                      {departmentOptions.map((option) => (
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
      <div className="c-panel bottom-contents-pannel">
        <div className="bottom-contents-pannel__content">
          <div
            className="flex-1 min-h-0"
            style={{
              margin: "-24px",
            }}
          >
            <div className="h-full w-full overflow-hidden" style={{ borderRadius: 8 }}>
              <div className="h-full w-full">
                <SampleTable height={300} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
