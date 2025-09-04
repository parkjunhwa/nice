'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, FormControl, Select, MenuItem, TextField, InputAdornment } from '@mui/material'
import { Icons } from '@/components'
import { useState } from 'react'
import SampleTable from '@/components/table/sample-table'

interface Cmn006Props {
  open: boolean
  onClose: () => void
}

export default function Cmn006({ open, onClose }: Cmn006Props) {
  const [institution, setInstitution] = useState('')
  const [branch, setBranch] = useState('')
  const [deviceNumber, setDeviceNumber] = useState('')
  const [deviceName, setDeviceName] = useState('')

  // 기관 샘플 데이터
  const institutionOptions = [
    { value: 'inst1', label: '신한은행' },
    { value: 'inst2', label: '국민은행' },
    { value: 'inst3', label: '우리은행' },
    { value: 'inst4', label: '하나은행' },
    { value: 'inst5', label: '기업은행' }
  ]

  // 지점 샘플 데이터
  const branchOptions = [
    { value: 'branch1', label: '강남지점' },
    { value: 'branch2', label: '서초지점' },
    { value: 'branch3', label: '종로지점' },
    { value: 'branch4', label: '마포지점' },
    { value: 'branch5', label: '송파지점' }
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
          width: '800px'
        }
      }}
    >
      <DialogTitle sx={{ padding: '16px 16px' }}>
        <div className="flex items-center justify-between">
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          ATM 기기 검색
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

      <div className="flex flex-row items-center w-full justify-between flex-1 bg-gray-50 py-2 px-4 border-t border-b border-blue-100">
        {/* 좌측: 키워드 검색 */}
        <div className="flex flex-col gap-1">
          {/* 첫 번째 줄: 기관, 지점 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <label className="form-side-label text-left" style={{ width: '50px', minWidth: '50px', maxWidth: '50px' }}>
                기관
              </label>
              <FormControl fullWidth>
                <Select
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  displayEmpty
                  className="bg-white"
                  size="small"
                  sx={{ width: '160px' }}
                >
                  <MenuItem value="">
                    <span>선택</span>
                  </MenuItem>
                  {institutionOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="flex items-center">
              <label className="form-side-label text-left" style={{ width: '50px', minWidth: '50px', maxWidth: '50px' }}>
                지점
              </label>
              <FormControl fullWidth>
                <Select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  displayEmpty
                  className="bg-white"
                  size="small"
                  sx={{ width: '160px' }}
                >
                  <MenuItem value="">
                    <span>선택</span>
                  </MenuItem>
                  {branchOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          {/* 두 번째 줄: 기기번호, 기기명 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <label className="form-side-label text-left" style={{ width: '50px', minWidth: '50px', maxWidth: '50px' }}>
                기기번호
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
              <label className="form-side-label text-left" style={{ width: '50px', minWidth: '50px', maxWidth: '50px' }}>
                기기명
              </label>
              <TextField
                variant="outlined"
                size="small"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                sx={{ width: '160px' }}
                InputProps={{
                  endAdornment: deviceName && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setDeviceName('')}
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
        {/* 우측: 카테고리/상태/버튼 (width auto) */}
        <div className="flex flex-row items-center gap-2 flex-shrink-0">
          <Button variant="outlined" size="small" color="secondary">
            조회
          </Button>
        </div>
      </div>
      
      <DialogContent>
        <div className="pt-4">
          <SampleTable height={300} />
        </div>
      </DialogContent>

      <DialogActions sx={{ padding: '16px' }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          취소
        </Button>
        <Button variant="contained" onClick={onClose}>
          선택
        </Button>
      </DialogActions>
    </Dialog>
  )
}
