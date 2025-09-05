'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material'
import { Icons, SampleTable } from '@/components'

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
      <DialogTitle sx={{ padding: '16px 16px' }}>
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

      <DialogContent>
        <Typography variant="body1" color="textSecondary">
          충전소 검색 기능이 준비 중입니다.
        </Typography>
        {/* 세로 꽉차는 테이블 샘플 */}
        <div style={{ height: 'calc(100% - 0px)' }}>
          {/* 상단에 뭔가 들어가면 높이만끔 빼줘야 */}
          {/* 기본 설정: 좌우 스크롤 활성화 */}
          <div className="grid grid-cols-1 h-full overflow-hidden">
            <SampleTable
              showPagination={false}
              pageSize={20}
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
