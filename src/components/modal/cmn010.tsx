'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Alert } from '@mui/material'
import { Icons } from '@/components'

interface Cmn010Props {
  open: boolean
  onClose: () => void
}

export default function Cmn010({ open, onClose }: Cmn010Props) {
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
            비밀번호 변경
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
      <DialogContent>
        <div className='mb-4'>
          <Typography variant="body2" color="textSecondary">
            새로운 비밀번호로 변경해주세요.
          </Typography>
        </div>

        <Alert severity="warning">
          이 작업은 되돌릴 수 없습니다.
        </Alert>
      </DialogContent>

      <DialogActions>
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
