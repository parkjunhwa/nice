'use client'

import { useState } from 'react'
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField
} from '@mui/material'

interface MuiFormModalProps {
  open: boolean
  onClose: () => void
  onSubmit?: (data: { name: string; email: string; message: string }) => void
  title?: string
}

export default function MuiFormModal({
  open,
  onClose,
  onSubmit,
  title = '문의하기'
}: MuiFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData)
    }
    console.log('폼 데이터:', formData)
    setFormData({ name: '', email: '', message: '' })
    onClose()
  }

  const handleClose = () => {
    setFormData({ name: '', email: '', message: '' })
    onClose()
  }

  // 공통 input 스타일
  const commonInputProps = {
    size: "small" as const,
    fullWidth: true,
    variant: "outlined" as const,
    className: "bg-white"
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ padding: '16px 16px' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <div className="space-y-4 pt-0">
          {/* 보통 (Normal) */}
          <div className="flex flex-col">
            <label className="form-top-label">보통 (Normal)</label>
            <TextField
              variant="outlined"
              size="small"
              placeholder="검색어를 입력하세요"
              fullWidth
            />
          </div>

          {/* 에러 메시지 (Error with helper text) */}
          <div className="flex flex-col">
            <label className="form-top-label">에러 메시지 (Error)</label>
            <TextField
              {...commonInputProps}
              placeholder="이메일을 입력하세요"
              error
              helperText="올바른 이메일을 입력하세요"
            />
          </div>

          {/* READONLY */}
          <div className="flex flex-col">
            <label className="form-top-label">READONLY</label>
            <TextField
              {...commonInputProps}
              value="010-1234-5678"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>

          {/* DISABLED */}
          <div className="flex flex-col">
            <label className="form-top-label">DISABLED</label>
            <TextField
              {...commonInputProps}
              value="서울특별시 강남구"
              disabled
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{ padding: '16px' }}>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          취소
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          전송
        </Button>
      </DialogActions>
    </Dialog>
  )
}
