"use client"

import { useState } from 'react'
import {
  RefreshCw,
  Search,
  Search as SearchIcon,
  Download,
  ClipboardPaste
} from 'lucide-react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
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
  DateRangePicker,
  Icons
} from '@/components'

export default function UserManagementPage() {
  const [searchPanelExpanded, setSearchPanelExpanded] = useState(true)

  // 폼 상태 변수들
  const [businessUnitName, setBusinessUnitName] = useState('')
  const [dateRangeValue, setDateRangeValue] = useState<[Date | null, Date | null]>([null, null])
  const [customerCode, setCustomerCode] = useState('')
  const [paymentType, setPaymentType] = useState('')
  const [depositAccount, setDepositAccount] = useState('')
  const [status, setStatus] = useState('')
  const [depositCategory, setDepositCategory] = useState('')

  // 날짜 계산 함수들
  const getYesterdayRange = (): [Date, Date] => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const startDate = new Date(yesterday)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(yesterday)
    endDate.setHours(23, 59, 59, 999)
    return [startDate, endDate]
  }

  const getLastWeekRange = (): [Date, Date] => {
    const today = new Date()
    const lastWeek = new Date()
    lastWeek.setDate(today.getDate() - 7)
    const startDate = new Date(lastWeek)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(today)
    endDate.setHours(23, 59, 59, 999)
    return [startDate, endDate]
  }

  const getThisMonthRange = (): [Date, Date] => {
    const today = new Date()
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    firstDayOfMonth.setHours(0, 0, 0, 0)
    const endDate = new Date(today)
    endDate.setHours(23, 59, 59, 999)
    return [firstDayOfMonth, endDate]
  }

  // 버튼 클릭 핸들러들
  const handleYesterdayClick = () => {
    const [startDate, endDate] = getYesterdayRange()
    setDateRangeValue([startDate, endDate])
  }

  const handleLastWeekClick = () => {
    const [startDate, endDate] = getLastWeekRange()
    setDateRangeValue([startDate, endDate])
  }

  const handleThisMonthClick = () => {
    const [startDate, endDate] = getThisMonthRange()
    setDateRangeValue([startDate, endDate])
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
          <h1 className="text-2xl font-bold text-gray-900">매출 집계(일)</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: '수납', href: '/' },
              { label: '수납 집계(일)', active: true }
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
                    기간
                  </label>
                  <DateRangePicker
                    value={dateRangeValue}
                    onChange={(newValue: [Date | null, Date | null]) => setDateRangeValue(newValue)}
                    placeholder="날짜 범위를 선택하세요"
                    size="small"
                  />
                </div>
                <div className="flex items-center">
                  <ButtonGroup variant="outlined" size="small" className="bg-white" color="secondary">
                    <Button onClick={handleYesterdayClick}>전일</Button>
                    <Button onClick={handleLastWeekClick}>최근 일주일</Button>
                    <Button onClick={handleThisMonthClick}>이번달</Button>
                  </ButtonGroup>
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
                      value={customerCode}
                      onChange={(e) => setCustomerCode(e.target.value)}
                      sx={{ width: '120px' }}
                      disabled
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
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="form-side-label text-left">
                    수납유형
                  </label>
                  <FormControl sx={{ width: '120px' }}>
                    <Select
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
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
              {/* 세번째 줄 */}
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <label className="form-side-label text-left">
                    입금처
                  </label>
                  <TextField
                      variant="outlined"
                      size="small"
                      value={depositAccount}
                      onChange={(e) => setDepositAccount(e.target.value)}
                      sx={{ width: '120px' }}
                      InputProps={{
                        endAdornment: depositAccount && (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() => setDepositAccount('')}
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
                <div className="flex items-center">
                  <label className="form-side-label text-left">
                    상태
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
                <div className="flex items-center">
                  <label className="form-side-label text-left">
                    입금구분
                  </label>
                  <FormControl sx={{ width: '120px' }}>
                    <Select
                      value={depositCategory}
                      onChange={(e) => setDepositCategory(e.target.value)}
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
              <Button variant="contained" size="small" startIcon={<ClipboardPaste size={16} />}>
                ERP재전송
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
