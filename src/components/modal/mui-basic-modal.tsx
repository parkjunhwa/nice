'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Alert, IconButton } from '@mui/material'
import { Icons } from '@/components'

interface MuiBasicModalProps {
  open: boolean
  onClose: () => void
  title?: string
  message?: string
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
}

export default function MuiBasicModal({
  open,
  onClose,
  title = '기본 다이얼로그',
  message = '이것은 기본 다이얼로그입니다. 간단한 메시지나 알림을 표시할 때 사용합니다.',
  maxWidth = 'sm',
  fullWidth = true
}: MuiBasicModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
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
      <DialogContent>
        <div className="mb-4">
          <Typography variant="body1" className="mb-4">
            {message}
          </Typography>
        </div>
        <Alert severity="info" className="mb-4">
          정보: 이 다이얼로그는 사용자에게 중요한 정보를 전달하는 데 사용됩니다.
        </Alert>
        <Typography variant="body2" color="text.secondary">
          다이얼로그는 모달 형태로 표시되어 사용자의 주의를 집중시킵니다.
        </Typography>
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
