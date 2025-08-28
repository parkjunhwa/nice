'use client'

import { Dialog, DialogTitle, DialogActions, Button, Typography, IconButton } from '@mui/material'
import { Icons } from '@/components'

interface Cmn011Props {
  open: boolean
  onClose: () => void
}

export default function Cmn011({ open, onClose }: Cmn011Props) {
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
      <DialogTitle>
        <div className="flex items-center justify-between">
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            충전소 검색
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

      <div style={{ padding: '20px' }}>
        <Typography variant="body1" color="textSecondary">
          충전소 검색 기능이 준비 중입니다.
        </Typography>
      </div>

      <DialogActions>
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
