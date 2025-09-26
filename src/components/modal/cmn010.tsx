'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, TextField, Box } from '@mui/material'
import { Icons } from '@/components'
import { useState, useRef } from 'react'
import { X } from 'lucide-react'
import dynamic from 'next/dynamic'

// MD Editor를 동적으로 import (SSR 문제 방지)
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface Cmn010Props {
  open: boolean
  onClose: () => void
}

export default function Cmn010({ open, onClose }: Cmn010Props) {
  // 폼 상태 변수들
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [attachments, setAttachments] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)


  // 파일 첨부 함수
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setAttachments(Array.from(files))
    }
  }

  // 파일 삭제 함수
  const handleRemoveFile = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  // 파일 크기 계산 함수
  const getFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // 총 파일 크기 계산
  const totalFileSize = attachments.reduce((total, file) => total + file.size, 0)

  // 폼 제출 함수
  const handleSubmit = () => {
    // 여기에 실제 제출 로직 구현
    console.log('제출된 데이터:', {
      title,
      content,
      attachments
    })
    
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
          width: '640px'
        }
      }}
    >
      <DialogTitle sx={{ padding: '16px 16px' }}>
        <div className="flex items-center justify-between">
          <Typography variant="h6" component="div" sx={{ fontWeight: 400 }}>
            결재상신 본문 등록
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

      <DialogContent sx={{ padding: '16px 16px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* 제목 입력 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle2" sx={{ minWidth: '60px' }}>
              제목
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              sx={{
                '& .MuiInputBase-root': {
                  fontSize: '14px'
                }
              }}
            />
          </Box>


          {/* 본문 입력 (MD Editor) */}
          <Box>
            <Typography variant="subtitle2" sx={{ marginBottom: '4px'}}>
              본문내용
            </Typography>
            <Box
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: 'white',
                '&:focus-within': {
                  borderColor: '#1976d2'
                },
                '& .w-md-editor': {
                  backgroundColor: 'white'
                },
                '& .w-md-editor-text': {
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  lineHeight: '1.5'
                },
                '& .w-md-editor-text-input': {
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  lineHeight: '1.5'
                }
              }}
            >
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || '')}
                height={300}
                data-color-mode="light"
                visibleDragBar={false}
                preview="edit"
              />
            </Box>
          </Box>

          {/* 파일 첨부 */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <Typography variant="subtitle2">
                첨부파일 : ({attachments.length}개, {getFileSize(totalFileSize)})
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => fileInputRef.current?.click()}
              >
                파일선택
              </Button>
            </Box>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              style={{ display: 'none' }}
            />
            {attachments.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'flex-start' }}>
                {attachments.map((file, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      padding: '4px 4px 4px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '20px',
                      backgroundColor: '#f5f5f5',
                      fontSize: '13px'
                    }}
                  >
                    <Typography variant="body2">
                      {file.name}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X size={16} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: '16px' }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          취소
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  )
}
