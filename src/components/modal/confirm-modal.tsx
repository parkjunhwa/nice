'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material'
import { Icons } from '@/components'

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  type?: 'info' | 'warning' | 'error' | 'success'
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  type = 'info',
  confirmText = '확인',
  cancelText = '취소',
  loading = false
}: ConfirmModalProps) {


  const getConfirmButtonColor = () => {
    switch (type) {
      case 'warning':
        return 'warning'
      case 'error':
        return 'error'
      case 'success':
        return 'success'
      default:
        return 'primary'
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }
      }}
    >
      <DialogTitle sx={{ padding: '16px 16px' }}>
        <div className="flex items-center justify-between">
          {title}
          <div className="flex items-center gap-2">
            <IconButton
              aria-label="닫기"
              onClick={onClose}
              size="small"
              edge="end"
            >
              <Icons.XIcon size={20} />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body1" sx={{ mt: 1, lineHeight: 1.6 }}>
          {message}
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ padding: '16px' }}>
                       <Button
                 onClick={onClose}
                 variant="outlined"
                 color="secondary"
                 disabled={loading}
               >
                 {cancelText}
               </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={getConfirmButtonColor()}
          disabled={loading}
        >
          {loading ? '처리중...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
