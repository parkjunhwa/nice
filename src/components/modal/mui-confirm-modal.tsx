'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Alert } from '@mui/material'

interface MuiConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  severity?: 'warning' | 'error' | 'info' | 'success'
}

export default function MuiConfirmModal({
  open,
  onClose,
  onConfirm,
  title = '확인',
  message = '정말로 이 작업을 수행하시겠습니까?',
  confirmText = '삭제',
  cancelText = '취소',
  severity = 'warning'
}: MuiConfirmModalProps) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    console.log('확인됨')
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ padding: '16px 16px' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <div className='mb-4'>
          <Typography variant="body1">
            {message}
          </Typography>
        </div>

        <Alert severity={severity}>
          이 작업은 되돌릴 수 없습니다.
        </Alert>
      </DialogContent>
      <DialogActions sx={{ padding: '16px' }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          {cancelText}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleConfirm}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
