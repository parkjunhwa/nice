'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem
} from '@mui/material'
import { Icons, MonthPicker } from '@/components'
import { useState } from 'react'

interface Stl002Props {
  open: boolean
  onClose: () => void
  onSuccess?: (message: string) => void
}

interface DepartmentOption {
  value: string
  label: string
  disabled: boolean
}

export default function Stl002({ open, onClose, onSuccess }: Stl002Props) {
  const [businessUnit1, setBusinessUnit1] = useState('')
  const [monthValue, setMonthValue] = useState<Date | null>(null)

  const handleSubmit = () => {
    // 성공 처리
    onSuccess?.('정산 실행이 완료되었습니다.')
    handleClose()
  }

  const handleClose = () => {
    // 상태 초기화
    setBusinessUnit1('')
    setMonthValue(null)
    onClose()
  }

  const handleLastMonthClick = () => {
    const today = new Date()
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    setMonthValue(lastMonth)
  }

  // 옵션 데이터
  const departmentOptions: DepartmentOption[] = [
    { value: 'option1', label: '옵션1', disabled: false },
    { value: 'option2', label: '옵션2', disabled: true },
    { value: 'option3', label: '옵션3', disabled: false }
  ]


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '454px'
        }
      }}
    >
      <DialogTitle sx={{ padding: '16px 16px' }}>
        <div className="flex items-center justify-between">
          <Typography variant="h6" component="div" sx={{ fontWeight: 560 }}>
            정산 실행 월
          </Typography>
          <IconButton
            aria-label="닫기"
            onClick={handleClose}
            size="small"
            edge="end"
          >
            <Icons.XIcon size={20} />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent>

        <div className="p-0 gap-y-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1 items-center mb-1">
            <div className="flex items-center">
              <label className="form-side-label text-left">
                사업부
              </label>
              <div className="flex items-center gap-2">
                <FormControl sx={{ width: '120px' }}>
                  <Select
                    value={businessUnit1}
                    onChange={(e) => setBusinessUnit1(e.target.value)}
                    displayEmpty
                    className="bg-white"
                    size="small"
                    disabled
                  >
                    <MenuItem value="">
                      <span>주차</span>
                    </MenuItem>
                    {departmentOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
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
                정산년월
              </label>
              <div className="flex items-center gap-2">
                <div style={{ width: '120px' }}>
                  <MonthPicker
                    value={monthValue}
                    onChange={(newValue: Date | null) => setMonthValue(newValue)}
                    placeholder="월을 선택하세요"
                  />
                </div>
                 <Button variant="outlined" size="small" className="bg-white" color="secondary" onClick={handleLastMonthClick}>전월</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ padding: '16px' }}>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          취소
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          선택
        </Button>
      </DialogActions>
    </Dialog>
  )
}
