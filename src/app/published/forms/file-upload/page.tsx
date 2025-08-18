"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { 
  Button, 
  Paper,
  Typography,
  Box,
  Divider,
  Alert,
  Snackbar,
  LinearProgress,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Card,
  CardContent,
  Grid
} from "@mui/material"
import { 
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  FileCopy as CopyIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  Movie as VideoIcon,
  MusicNote as AudioIcon,
  Archive as ArchiveIcon,
  Code as CodeIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon
} from "@mui/icons-material"
import { useState, useRef } from "react"

interface FileItem {
  id: string
  file: File
  progress: number
  status: 'uploading' | 'success' | 'error'
  url?: string
  size: string
  type: string
}

export default function FileUploadPage() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon />
    if (type === 'application/pdf') return <PdfIcon />
    if (type.startsWith('video/')) return <VideoIcon />
    if (type.startsWith('audio/')) return <AudioIcon />
    if (type.includes('zip') || type.includes('rar')) return <ArchiveIcon />
    if (type.includes('text/') || type.includes('javascript') || type.includes('json')) return <CodeIcon />
    return <DocIcon />
  }

  const getFileTypeColor = (type: string) => {
    if (type.startsWith('image/')) return 'success'
    if (type === 'application/pdf') return 'error'
    if (type.startsWith('video/')) return 'warning'
    if (type.startsWith('audio/')) return 'info'
    if (type.includes('zip') || type.includes('rar')) return 'secondary'
    return 'default'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles) {
      const newFiles: FileItem[] = Array.from(selectedFiles).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        progress: 0,
        status: 'uploading',
        size: formatFileSize(file.size),
        type: file.type || 'application/octet-stream'
      }))
      
      setFiles(prev => [...prev, ...newFiles])
      simulateUpload(newFiles)
    }
  }

  const simulateUpload = (fileItems: FileItem[]) => {
    setUploading(true)
    
    fileItems.forEach((fileItem, index) => {
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === fileItem.id) {
            const newProgress = f.progress + Math.random() * 20
            if (newProgress >= 100) {
              clearInterval(interval)
              return {
                ...f,
                progress: 100,
                status: 'success',
                url: URL.createObjectURL(f.file)
              }
            }
            return { ...f, progress: newProgress }
          }
          return f
        }))
      }, 200 + index * 100)
    })

    setTimeout(() => {
      setUploading(false)
      setSnackbarMessage('파일 업로드가 완료되었습니다!')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)
    }, 3000)
  }

  const handleDeleteFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
    setSnackbarMessage('파일이 삭제되었습니다.')
    setSnackbarSeverity('success')
    setOpenSnackbar(true)
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setSnackbarMessage('URL이 클립보드에 복사되었습니다.')
    setSnackbarSeverity('success')
    setOpenSnackbar(true)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    
    if (droppedFiles.length > 0) {
      const newFiles: FileItem[] = droppedFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        progress: 0,
        status: 'uploading',
        size: formatFileSize(file.size),
        type: file.type || 'application/octet-stream'
      }))
      
      setFiles(prev => [...prev, ...newFiles])
      simulateUpload(newFiles)
    }
  }

  const totalFiles = files.length
  const uploadedFiles = files.filter(f => f.status === 'success').length
  const uploadingFiles = files.filter(f => f.status === 'uploading').length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">파일 업로드 예시</h1>
          <p className="text-gray-600">Material UI의 파일 업로드 기능과 드래그 앤 드롭을 보여주는 예시입니다.</p>
        </div>

        {/* 업로드 통계 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            업로드 현황
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  총 파일
                </Typography>
                <Typography variant="h4">{totalFiles}</Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  업로드 완료
                </Typography>
                <Typography variant="h4" color="success.main">{uploadedFiles}</Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  업로드 중
                </Typography>
                <Typography variant="h4" color="warning.main">{uploadingFiles}</Typography>
              </CardContent>
            </Card>
          </Box>
        </Paper>

        {/* 파일 업로드 영역 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            파일 업로드
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'grey.300',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'action.hover'
              }
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              파일을 드래그하여 놓거나 클릭하여 선택하세요
            </Typography>
            <Typography variant="body2" color="textSecondary">
              지원 형식: 이미지, PDF, 비디오, 오디오, 문서, 압축파일 등
            </Typography>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileSelect}
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.zip,.rar"
              aria-label="파일 선택"
            />
            
            <Button
              variant="contained"
              startIcon={<UploadIcon />}
              sx={{ mt: 2, textTransform: 'none' }}
            >
              파일 선택
            </Button>
          </Box>
        </Paper>

        {/* 파일 목록 */}
        {files.length > 0 && (
          <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              업로드된 파일
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <List>
              {files.map((fileItem) => (
                <ListItem key={fileItem.id} sx={{ border: 1, borderColor: 'divider', borderRadius: 1, mb: 1 }}>
                  <ListItemIcon>
                    {getFileIcon(fileItem.type)}
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={fileItem.file.name}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          {fileItem.size} • {fileItem.type}
                        </Typography>
                        {fileItem.status === 'uploading' && (
                          <Box sx={{ mt: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={fileItem.progress} 
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                            <Typography variant="caption" color="textSecondary">
                              {Math.round(fileItem.progress)}% 완료
                            </Typography>
                          </Box>
                        )}
                        {fileItem.status === 'success' && (
                          <Chip 
                            icon={<CheckIcon />} 
                            label="업로드 완료" 
                            color="success" 
                            size="small" 
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Box>
                    }
                  />
                  
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {fileItem.status === 'success' && fileItem.url && (
                        <IconButton
                          edge="end"
                          onClick={() => handleCopyUrl(fileItem.url!)}
                          size="small"
                        >
                          <CopyIcon />
                        </IconButton>
                      )}
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteFile(fileItem.id)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {/* 사용법 안내 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            사용법
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Alert severity="info">
              <Typography variant="subtitle2" gutterBottom>
                드래그 앤 드롭
              </Typography>
              <Typography variant="body2">
                파일을 업로드 영역에 드래그하여 놓으면 자동으로 업로드가 시작됩니다.
              </Typography>
            </Alert>
            
            <Alert severity="warning">
              <Typography variant="subtitle2" gutterBottom>
                지원 파일 형식
              </Typography>
              <Typography variant="body2">
                • 이미지: JPG, PNG, GIF, SVG 등<br/>
                • 문서: PDF, DOC, DOCX, TXT 등<br/>
                • 미디어: MP4, MP3, AVI 등<br/>
                • 압축: ZIP, RAR 등
              </Typography>
            </Alert>
            
            <Alert severity="success">
              <Typography variant="subtitle2" gutterBottom>
                진행 상황
              </Typography>
              <Typography variant="body2">
                각 파일의 업로드 진행 상황을 실시간으로 확인할 수 있으며, 완료된 파일은 URL을 복사할 수 있습니다.
              </Typography>
            </Alert>
          </Box>
        </Paper>

        {/* 성공 메시지 */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert 
            onClose={() => setOpenSnackbar(false)} 
            severity={snackbarSeverity} 
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </DashboardLayout>
  )
} 