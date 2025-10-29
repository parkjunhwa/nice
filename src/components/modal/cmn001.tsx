'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material'
import { Icons } from '@/components'
import { useState } from 'react'
import SampleTable from '@/components/table/sample-table'

interface Cmn001Props {
  open: boolean
  onClose: () => void
}

export default function Cmn001({ open, onClose }: Cmn001Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [successCount, setSuccessCount] = useState<number>(0)
  const [failureCount, setFailureCount] = useState<number>(0)
  const [isUploaded, setIsUploaded] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // TODO: 실제 엑셀 업로드 로직
      // 예시 데이터
      setSuccessCount(150)
      setFailureCount(8)
      setIsUploaded(true)
    }
  }

  const handleUpload = () => {
    // 파일은 이미 선택 시 업로드됨
    onClose()
  }

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
      <DialogTitle sx={{ padding: '16px 16px' }}>
        <div className="flex items-center justify-between">
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            엑셀 업로드
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
      <div className="flex flex-row items-center w-full justify-between flex-1 bg-gray-50 py-2 px-4 border-t border-b border-blue-100">
        {/* 좌측: 파일 선택 버튼과 파일명 표시 */}
        <div className="flex items-center gap-1">
          <label htmlFor="excel-upload-input">
            <input
              id="excel-upload-input"
              type="file"
              accept=".xlsx,.xls"
              style={{ display: 'none' }}
              onChange={handleFileChange}
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
                  onClick={() => {
                    setSelectedFile(null)
                    setIsUploaded(false)
                    setSuccessCount(0)
                    setFailureCount(0)
                  }}
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

        {/* 우측: 성공/실패 통계 */}
        {isUploaded && (
          <div className="flex items-center gap-2">
            <span className="text-[13px] pt-[2px]">
              성공 (<span className="text-blue-600">{successCount}</span>)
            </span>
            <span className="text-[13px] pt-[2px]">
              실패 (<span className="text-red-600">{failureCount}</span>)
            </span>
          </div>
        )}
      </div>
      <DialogContent>
        {/* 세로 꽉차는 테이블 샘플 */}
        <div style={{ height: 'calc(100% - 0px)', marginTop: '16px' }}>
          {/* 상단에 뭔가 들어가면 높이만끔 빼줘야 */}
          {/* 기본 설정: 좌우 스크롤 활성화 */}
          <div className="grid grid-cols-1 h-full overflow-hidden">
            <SampleTable
              showPagination={false}
              pageSize={20}
              height={400}
            />
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ padding: '16px' }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  )
}
