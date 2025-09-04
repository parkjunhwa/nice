'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, FormControl, Select, MenuItem } from '@mui/material'
import { Icons } from '@/components'
import { useState } from 'react'
import SampleTable from '@/components/table/sample-table'

interface Cmn008Props {
  open: boolean
  onClose: () => void
}

export default function Cmn008({ open, onClose }: Cmn008Props) {
  const [productName, setProductName] = useState('')
  const [productCode, setProductCode] = useState('')

  // 상품명 샘플 데이터
  const productNameOptions = [
    { value: 'prod1', label: '노트북' },
    { value: 'prod2', label: '스마트폰' },
    { value: 'prod3', label: '태블릿' },
    { value: 'prod4', label: '모니터' },
    { value: 'prod5', label: '키보드' }
  ]

  // 상품코드 샘플 데이터
  const productCodeOptions = [
    { value: 'code1', label: 'P001' },
    { value: 'code2', label: 'P002' },
    { value: 'code3', label: 'P003' },
    { value: 'code4', label: 'P004' },
    { value: 'code5', label: 'P005' }
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
            상품 코드 검색
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
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <label className="form-side-label">
              상품 명
            </label>
            <FormControl fullWidth>
              <Select
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                displayEmpty
                className="bg-white"
                size="small"
                sx={{ width: '150px' }}
              >
                <MenuItem value="">
                  <span>선택</span>
                </MenuItem>
                {productNameOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center">
            <label className="form-side-label">
              상품코드
            </label>
            <FormControl fullWidth>
              <Select
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                displayEmpty
                className="bg-white"
                size="small"
                sx={{ width: '150px' }}
              >
                <MenuItem value="">
                  <span>선택</span>
                </MenuItem>
                {productCodeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
