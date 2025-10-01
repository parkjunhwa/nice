'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material'
import { Icons } from '@/components'

interface BasicModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
}

export default function BasicModal({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  fullWidth = true
}: BasicModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }
      }}
    >
      {title && (
        <DialogTitle sx={{ padding: '16px 16px' }}>
          <div className="flex items-center justify-between">
            {title}
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
      )}
      
      <DialogContent sx={{ pt: title ? 1 : 3 }}>
        {children}
      </DialogContent>
      
      <DialogActions sx={{ padding: '16px' }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          취소
        </Button>
        <Button variant="contained" onClick={onClose}>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  )
}
