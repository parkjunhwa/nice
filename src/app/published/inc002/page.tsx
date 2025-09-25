"use client"

import { useState } from 'react'
import {
  RefreshCw,
  Search,
  Search as SearchIcon,
  Download
} from 'lucide-react'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import {
  SampleTable,
  Breadcrumb,
  AccordionToggleButton,
  MonthPicker,
  Icons
} from '@/components'

export default function UserManagementPage() {
  const [searchPanelExpanded, setSearchPanelExpanded] = useState(true)

  // 폼 상태 변수들
  const [businessUnitName, setBusinessUnitName] = useState('')
  const [monthValue, setMonthValue] = useState<Date | null>(null)
  const [salesItem, setSalesItem] = useState('')
  const [salesType, setSalesType] = useState('')
  const [customerCode, setCustomerCode] = useState('')
  const [deviceNumber, setDeviceNumber] = useState('')
  const [status, setStatus] = useState('')

  // 이번달 버튼 클릭 핸들러
  const handleThisMonthClick = () => {
    const today = new Date()
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    setMonthValue(thisMonth)
  }

  // Select 옵션들
  const departmentOptions = [
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
          <h1 className="text-2xl font-bold text-gray-900">매출 집계(월)</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: '매출', href: '/' },
              { label: '매출 집계(월)', active: true }
            ]}
          />
        </div>
      </div>

      <div className="top-search-panel">
        <Collapse in={searchPanelExpanded} collapsedSize={0}>
          <div className="pt-4 px-4 pb-5">
            <div
              className="flex flex-col gap-y-1 gap-x-4"
            >
              {/* 검색 조건들 */}
              {/* 첫 번째 줄 */}
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <label className="form-side-label text-left">
                    사업부
                  </label>
                  <FormControl sx={{ width: '120px' }}>
                    <Select
                      value={businessUnitName}
                      onChange={(e) => setBusinessUnitName(e.target.value)}
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
                    조회년월
                  </label>
                  <div className="flex items-center gap-2">
                    <MonthPicker
                      value={monthValue}
                      onChange={(newValue: Date | null) => setMonthValue(newValue)}
                      placeholder="월을 선택하세요"
                    />
                    <Button variant="outlined" size="small" className="bg-white" color="secondary" onClick={handleThisMonthClick}>이번달</Button>
                  </div>
                </div>
              </div>

            </div>
            <div
              className="
                flex flex-col gap-y-1 gap-x-4 mt-1
                2xl:flex-row
              "
            >
              {/* 두번째 줄 */}
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <label className="form-side-label text-left">
                    거래처
                  </label>
                  <div className="flex items-center gap-2">
                    <TextField
                      variant="outlined"
                      size="small"
                      value={customerCode}
                      onChange={(e) => setCustomerCode(e.target.value)}
                      sx={{ width: '120px' }}
                      InputProps={{
                        endAdornment: customerCode && (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() => setCustomerCode('')}
                              sx={{
                                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                              }}
                            >
                              <Icons.XIcon size={14} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      color="secondary"
                      className="xsmallbtn3"
                      startIcon={<SearchIcon size={16} />}
                    >
                      <span style={{ display: "none" }}>+</span>
                    </Button>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={deviceNumber}
                      onChange={(e) => setDeviceNumber(e.target.value)}
                      sx={{ width: '120px' }}
                      disabled
                      InputProps={{

                        endAdornment: deviceNumber && (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() => setDeviceNumber('')}
                              sx={{
                                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                              }}
                            >
                              <Icons.XIcon size={14} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="form-side-label text-left">
                    매출품목
                  </label>
                  <div className="flex items-center gap-2">
                    <FormControl sx={{ width: '120px' }}>
                      <Select
                        value={salesItem}
                        onChange={(e) => setSalesItem(e.target.value)}
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
                    <TextField
                      variant="outlined"
                      size="small"
                      value={customerCode}
                      onChange={(e) => setCustomerCode(e.target.value)}
                      sx={{ width: '120px' }}
                      InputProps={{
                        endAdornment: customerCode && (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() => setCustomerCode('')}
                              sx={{
                                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                              }}
                            >
                              <Icons.XIcon size={14} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      color="secondary"
                      className="xsmallbtn3"
                      startIcon={<SearchIcon size={16} />}
                    >
                      <span style={{ display: "none" }}>+</span>
                    </Button>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={deviceNumber}
                      onChange={(e) => setDeviceNumber(e.target.value)}
                      sx={{ width: '120px' }}
                      disabled
                      InputProps={{

                        endAdornment: deviceNumber && (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() => setDeviceNumber('')}
                              sx={{
                                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                              }}
                            >
                              <Icons.XIcon size={14} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* 세번째 줄 */}
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <label className="form-side-label text-left">
                    매출유형
                  </label>
                  <FormControl sx={{ width: '120px' }}>
                    <Select
                      value={salesType}
                      onChange={(e) => setSalesType(e.target.value)}
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
                    결재유형
                  </label>
                  <FormControl sx={{ width: '120px' }}>
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
          <div className="flex items-center justify-between mb-2 gap-2" style={{ flex: 0 }}>
            <div className="flex gap-1">
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                startIcon={<Download size={16} />}
              >
                엑셀 다운로드
              </Button>
            </div>
            <div className="flex gap-1">

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
