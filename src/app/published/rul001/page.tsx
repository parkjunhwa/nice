"use client"

import { useState } from 'react'
import {
  RefreshCw,
  Search,
  Search as SearchIcon,
  Download,
  Check,
  ClipboardPaste
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
  DateRangePicker,
  Icons
} from '@/components'

export default function Rul001Page() {

  const [searchPanelExpanded, setSearchPanelExpanded] = useState(true)

  // 폼 상태 변수들
  const [businessType, setBusinessType] = useState('')
  const [settlementCriteria, setSettlementCriteria] = useState('')
  const [settlementInfo, setSettlementInfo] = useState('')
  const [ruleStatus, setRuleStatus] = useState('')
  const [ruleName, setRuleName] = useState('')
  const [validPeriod, setValidPeriod] = useState<[Date | null, Date | null]>([null, null])


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
          <h1 className="text-2xl font-bold text-gray-900">정산규칙</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: '정산기준관리', href: '/' },
              { label: '정산규칙', active: true }
            ]}
          />
        </div>
      </div>

      <div className="top-search-panel">
        <Collapse in={searchPanelExpanded} collapsedSize={0}>
          <div className="pt-4 px-4 pb-5 gap-y-2">

            <div className="flex flex-wrap gap-x-4 gap-y-1 items-center">
              {/* 검색 조건들 */}
              <div className="flex items-center">
                <label className="form-side-label text-left">
                  사업
                </label>
                <div className="flex items-center gap-2">
                  <FormControl sx={{ width: '120px' }}>
                    <Select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
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
              <div className="flex items-center">
                <label className="form-side-label text-left">
                  정산기준정보
                </label>
                <div className="flex items-center gap-2">
                  <TextField
                    variant="outlined"
                    size="small"
                    value={settlementCriteria}
                    onChange={(e) => setSettlementCriteria(e.target.value)}
                    sx={{ width: '120px' }}
                    InputProps={{
                      endAdornment: settlementCriteria && (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => setSettlementCriteria('')}
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
                    value={settlementInfo}
                    onChange={(e) => setSettlementInfo(e.target.value)}
                    sx={{ width: '120px' }}
                    disabled
                    InputProps={{

                      endAdornment: settlementInfo && (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => setSettlementInfo('')}
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
                  상태
                </label>
                <FormControl sx={{ width: '120px' }}>
                  <Select
                    value={ruleStatus}
                    onChange={(e) => setRuleStatus(e.target.value)}
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
                  규칙명
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  sx={{ width: '120px' }}
                  InputProps={{
                    endAdornment: ruleName && (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setRuleName('')}
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
                  유효기간
                </label>
                <DateRangePicker
                  value={validPeriod}
                  onChange={(newValue: [Date | null, Date | null]) => setValidPeriod(newValue)}
                  placeholder="날짜 범위를 선택하세요"
                  size="small"
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
              <Button variant="contained" size="small" startIcon={<Check size={16} />}>
                일괄확정
              </Button>
              <Button variant="contained" size="small" startIcon={<Check size={16} />}>
                선택확정
              </Button>
              <Button variant="contained" size="small" startIcon={<ClipboardPaste size={16} />}>
                결재상신
              </Button>
              <Button variant="contained" size="small" startIcon={<Check size={16} />}>
                등록
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
