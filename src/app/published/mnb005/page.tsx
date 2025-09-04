"use client"

import { useState } from 'react'
import {
  TextField,
  Button,
  Collapse,
  Icons,
  SampleTable,
  Breadcrumb,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  DateRangePicker,
  ButtonGroup,
  AccordionToggleButton
} from '@/components'

export default function NoticeListPage() {
  const [searchPanelExpanded, setSearchPanelExpanded] = useState(true)

  // 폼 상태 변수들
  const [deviceNumber, setDeviceNumber] = useState('')
  const [dateRangeValue, setDateRangeValue] = useState<[Date | null, Date | null]>([null, null])

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
          <h1 className="text-2xl font-bold text-gray-900">공지사항</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: '공지사항', active: true }
            ]}
          />
        </div>
      </div>
      <div className="top-search-panel">
        <Collapse in={searchPanelExpanded} collapsedSize={0}>
          <div className="pt-4 px-4 pb-5">
            <div
              className="
                flex flex-col gap-y-1 gap-x-4
                2xl:flex-row
              "
            >
              {/* 첫 번째 줄 */}
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <label className="form-side-label text-left">
                    작성일
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
                    <Button>오늘</Button>
                    <Button>최근 일주일</Button>
                    <Button>이번달</Button>
                  </ButtonGroup>
                </div>
              </div>
              {/* 두 번째 줄 */}
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <label className="form-side-label text-left">
                    검색어
                  </label>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={deviceNumber}
                    onChange={(e) => setDeviceNumber(e.target.value)}
                    sx={{ width: '160px' }}
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
                <div className="flex items-center">
                  <div className="flex flex-row items-center gap-0">
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label="제목"
                    />
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label="작성자"
                    />
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label="내용"
                    />
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label="첨부파일"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="flex justify-center items-center gap-2">
                <Button variant="outlined" size="small" startIcon={<Icons.RefreshCwIcon size={16} />}>
                  초기화
                </Button>
                <Button variant="contained" size="small" startIcon={<Icons.SearchIcon size={16} />}>
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
          <div className="flex flex-1 gap-1 mb-2 justify-end">
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              startIcon={<Icons.Trash2Icon size={16} />}
            >
              삭제
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              startIcon={<Icons.Edit2Icon size={16} />}
            >
              수정
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              startIcon={<Icons.PlusCircleIcon size={16} />}
            >
              공지등록
            </Button>
          </div>
          <div className="flex-1 min-h-0">
            <div className="h-full w-full overflow-hidden">
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
