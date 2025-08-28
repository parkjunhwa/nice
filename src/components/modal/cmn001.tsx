'use client'

import { Dialog, DialogTitle, DialogActions, Button, Typography, IconButton } from '@mui/material'
import { Icons } from '@/components'
import { useState } from 'react'
import SampleTable from '@/components/table/sample-table'

interface Cmn001Props {
  open: boolean
  onClose: () => void
}

export default function Cmn001({ open, onClose }: Cmn001Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
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
            엑셀 업로드 결과
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
        {/* 좌측: 파일 선택 버튼과 파일명 표시 */}
        <div className="flex items-center gap-2">
          <label htmlFor="excel-upload-input">
            <input
              id="excel-upload-input"
              type="file"
              accept=".xlsx,.xls"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setSelectedFile(file)
                }
              }}
            />
            <Button
              variant="outlined"
              size="small"
              component="span"
            >
              파일 선택
            </Button>
          </label>

          {/* 파일명 표시 (버튼 오른쪽에 8px 띄워서) */}
          <div className="ml-2 flex items-center gap-2">
            <Typography variant="body2" color="textSecondary">
              선택된 파일:
            </Typography>
            {selectedFile ? (
              <>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {selectedFile.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setSelectedFile(null)}
                >
                  <Icons.XIcon size={20} />
                </IconButton>
              </>
            ) : (
              <Typography variant="body2" color="textSecondary">
                없음
              </Typography>
            )}
          </div>
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
          업로드
        </Button>
      </DialogActions>
    </Dialog>
  )
}
