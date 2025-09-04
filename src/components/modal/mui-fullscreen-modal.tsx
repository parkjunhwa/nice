'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, FormControlLabel, Checkbox, Switch, Slider, IconButton } from '@mui/material'
import { Icons } from '@/components'

interface MuiFullscreenModalProps {
  open: boolean
  onClose: () => void
  title?: string
  onSubmit?: () => void
  onDelete?: () => void
}

export default function MuiFullscreenModal({
  open,
  onClose,
  title = '전체화면 다이얼로그',
  onSubmit,
  onDelete
}: MuiFullscreenModalProps) {
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit()
    }
    onClose()
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete()
    }
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
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
        <div className="space-y-6">
          <div className="space-y-4">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="알림 받기"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="자동 저장"
            />
            <div>
              <Typography variant="body2" gutterBottom>
                우선순위
              </Typography>
              <Slider
                defaultValue={3}
                min={1}
                max={5}
                marks
                valueLabelDisplay="auto"
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={onClose} variant="outlined" color="secondary">
          취소
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          삭제
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  )
}
