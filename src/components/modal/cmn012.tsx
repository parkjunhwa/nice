'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, FormControl, Select, MenuItem, TextField, InputAdornment } from '@mui/material'
import { Icons, DateRangePicker } from '@/components'
import { useState } from 'react'
import SampleTable from '@/components/table/sample-table'
import { Search as SearchIcon } from 'lucide-react'

interface Cmn012Props {
  open: boolean
  onClose: () => void
}

export default function Cmn012({ open, onClose }: Cmn012Props) {
  const [customerCode, setCustomerCode] = useState('')
  const [deviceNumber, setDeviceNumber] = useState('')
  const [remark, setRemark] = useState('')
  const [dateRangeValue, setDateRangeValue] = useState<[Date | null, Date | null]>([null, null])
  const [status, setStatus] = useState('')

  // 상태 옵션
  const departmentOptions = [
    { value: '옵션1', label: '옵션1' },
    { value: '옵션2', label: '옵션2' },
    { value: '옵션3', label: '옵션3' }
  ]
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '100%'
        }
      }}
    >
      <DialogTitle sx={{ padding: '16px 16px' }}>
        <div className="flex items-center justify-between">
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            세금계산서 대사
          </Typography>
          <IconButton
            aria-label="닫기"
            onClick={onClose}
            size="small"
            edge="end"
          >
            <Icons.XIcon size={20} />
          </IconButton>
        </div>
      </DialogTitle>
      <div className="grid w-full h-full gap-0 grid-cols-1 [@media_(min-width:1800px)]:grid-cols-2">
        <div className="h-full flex flex-col">
          {/* 좌측 구조 내용 */}
          <div className="flex flex-row w-full justify-between flex-1 bg-gray-50 py-2 px-6 border-t border-b border-l border-blue-100 items-end lg:border-t lg:border-b lg:border-l lg:border-blue-100">
            {/* 좌측: 키워드 검색 */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-start">
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
              <div className="flex flex-col items-start">
                <label className="form-side-label text-left">
                  발급일자
                </label>
                <div className="flex items-center gap-2">
                  <div style={{ background: '#fff' }}>
                    <DateRangePicker
                      value={dateRangeValue}
                      onChange={(newValue: [Date | null, Date | null]) => setDateRangeValue(newValue)}
                      placeholder="날짜 범위를 선택하세요"
                      size="small"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <label className="form-side-label text-left">
                  비고
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  sx={{ width: '120px' }}
                  InputProps={{
                    endAdornment: remark && (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setRemark('')}
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
            {/* 우측: 카테고리/상태/버튼 (width auto) */}
            <div className="flex flex-row items-center gap-2 flex-shrink-0">
              <Button
                variant="outlined"
                color="secondary"
                size="small">
                조회
              </Button>
            </div>
          </div>
          <DialogContent>
            {/* 세로 꽉차는 테이블 샘플 */}
            <div
              style={{
                height: 'calc(100% - 0px)',
                marginTop: '16px',
                marginLeft: 0,
                marginRight: 0,
              }}
              className="[@media_(max-width:1800px)]:mb-4"
            >
              {/* 상단에 뭔가 들어가면 높이만큼 빼줘야 */}
              {/* 기본 설정: 좌우 스크롤 활성화 */}
              <div className="grid grid-cols-1 h-full overflow-hidden">
                <SampleTable
                  showPagination={false}
                  pageSize={20}
                  height={300}
                />
              </div>
            </div>
          </DialogContent>
        </div>
        <div className="h-full flex flex-col">
          <div className="flex flex-row w-full justify-between flex-1 bg-gray-50 py-2 px-6 border-t border-b border-l border-blue-100 items-end lg:border-t lg:border-b lg:border-l lg:border-blue-100">
            {/* 좌측: 키워드 검색 */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-start">
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
              <div className="flex flex-col items-start">
                <label className="form-side-label text-left">
                  매입일자
                </label>
                <div className="flex items-center gap-2">
                  <div style={{ background: '#fff' }}>
                    <DateRangePicker
                      value={dateRangeValue}
                      onChange={(newValue: [Date | null, Date | null]) => setDateRangeValue(newValue)}
                      placeholder="날짜 범위를 선택하세요"
                      size="small"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 우측: 카테고리/상태/버튼 (width auto) */}
            <div className="flex flex-row items-center gap-2 flex-shrink-0">
              <Button
                variant="outlined"
                color="secondary"
                size="small">
                조회
              </Button>
            </div>
          </div>
          <DialogContent>
            {/* 세로 꽉차는 테이블 샘플 */}
            <div style={{ height: 'calc(100% - 0px)', marginTop: '16px' }}>
              {/* 상단에 뭔가 들어가면 높이만큼 빼줘야 */}
              {/* 기본 설정: 좌우 스크롤 활성화 */}
              <div className="grid grid-cols-1 h-full overflow-hidden">
                <SampleTable
                  showPagination={false}
                  pageSize={20}
                  height={300}
                />
              </div>
            </div>
          </DialogContent>
        </div>
      </div>


      <DialogActions sx={{ padding: '16px' }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          취소
        </Button>
        <Button variant="contained" onClick={onClose}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  )
}
