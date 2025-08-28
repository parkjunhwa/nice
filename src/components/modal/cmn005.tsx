'use client'

import { Dialog, DialogTitle, DialogActions, Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import { Icons } from '@/components'
import { useState } from 'react'
import SampleTable from '@/components/table/sample-table'

interface Cmn005Props {
  open: boolean
  onClose: () => void
}

export default function Cmn005({ open, onClose }: Cmn005Props) {
  const [chargingStationName, setChargingStationName] = useState('')
  const [chargingStationId, setChargingStationId] = useState('')
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '800px'
        }
      }}
    >
      <DialogTitle>
        <div className="flex items-center justify-between">
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            EV충전소 검색
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

      <div className="flex flex-row items-center w-full justify-between flex-1 bg-gray-50 py-2 px-6 border-t border-b border-blue-100">
        {/* 좌측: 키워드 검색 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <label className="form-side-label">
              충전소 명
            </label>
            <TextField
              variant="outlined"
              size="small"
              value={chargingStationName}
              onChange={(e) => setChargingStationName(e.target.value)}
              sx={{ width: '160px' }}
              InputProps={{
                endAdornment: chargingStationName && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setChargingStationName('')}
                      sx={{
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                      }}
                    >
                      <Icons.XIcon size={14} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div className="flex items-center">
            <label className="form-side-label">
              충전소ID
            </label>
            <TextField
              variant="outlined"
              size="small"
              value={chargingStationId}
              onChange={(e) => setChargingStationId(e.target.value)}
              sx={{ width: '160px' }}
              InputProps={{
                endAdornment: chargingStationId && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setChargingStationId('')}
                    >
                      <Icons.XIcon size={14} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
        </div>
        {/* 우측: 카테고리/상태/버튼 (width auto) */}
        <div className="flex flex-row items-center gap-2 flex-shrink-0">
          <Button variant="outlined" size="small" color="secondary">
            조회
          </Button>
        </div>
      </div>
      <div style={{ padding: '0px' }}>
        <SampleTable height={300} />
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
