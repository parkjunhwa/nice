'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, FormControl, Select, MenuItem } from '@mui/material'
import { Icons } from '@/components'
import { useState } from 'react'
import SampleTable from '@/components/table/sample-table'

interface Cmn012Props {
  open: boolean
  onClose: () => void
}

export default function Cmn012({ open, onClose }: Cmn012Props) {
  const [contractNumber, setContractNumber] = useState('')
  
  // 계약번호 샘플 데이터
  const contractNumberOptions = [
    { value: 'contract1', label: 'CT001' },
    { value: 'contract2', label: 'CT002' },
    { value: 'contract3', label: 'CT003' },
    { value: 'contract4', label: 'CT004' },
    { value: 'contract5', label: 'CT005' }
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
            계약마스터 검색
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

      <div className="flex flex-row items-center w-full justify-between flex-1 bg-gray-50 py-2 px-6 border-t border-b border-blue-100">
        {/* 좌측: 키워드 검색 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <label className="form-side-label">
              계약번호
            </label>
            <FormControl fullWidth>
              <Select
                value={contractNumber}
                onChange={(e) => setContractNumber(e.target.value)}
                displayEmpty
                className="bg-white"
                size="small"
                sx={{ width: '150px' }}
              >
                <MenuItem value="">
                  <span>선택</span>
                </MenuItem>
                {contractNumberOptions.map((option) => (
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
        {/* 세로 꽉차는 테이블 샘플 */}
        <div style={{ height: 'calc(100% - 0px)', marginTop: '16px' }}>
          {/* 상단에 뭔가 들어가면 높이만끔 빼줘야 */}
          {/* 기본 설정: 좌우 스크롤 활성화 */}
          <div className="grid grid-cols-1 h-full overflow-hidden">
            <SampleTable
              showPagination={false}
              pageSize={20}
              height={400}
            />
          </div>
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
