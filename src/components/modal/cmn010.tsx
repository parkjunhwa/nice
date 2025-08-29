'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Alert,
  TextField,
  InputAdornment
} from '@mui/material'
import { Icons } from '@/components'
import { useState } from 'react'

interface Cmn010Props {
  open: boolean
  onClose: () => void
  onSuccess?: (message: string) => void
}

export default function Cmn010({ open, onClose, onSuccess }: Cmn010Props) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = () => {
    // 현재 비밀번호 검증 (간단한 예시 - 실제로는 서버에서 검증)
    if (!currentPassword) {
      setPasswordError('현재 비밀번호를 입력해주세요.')
      return
    }
    
    // 새 비밀번호 검증
    if (newPassword !== confirmPassword) {
      setPasswordError('새 비밀번호가 일치하지 않습니다.')
      return
    }
    
    if (newPassword.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.')
      return
    }
    
    // 에러 초기화
    setPasswordError('')
    
    // 성공 처리
    onSuccess?.('저장되었습니다.')
    handleClose()
  }

  const handleClose = () => {
    // 상태 초기화
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setShowCurrentPassword(false)
    setShowNewPassword(false)
    setShowConfirmPassword(false)
    setPasswordError('')
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          <Typography variant="h6" component="div" sx={{ fontWeight: 560 }}>
            비밀번호 변경
          </Typography>
          <IconButton
            aria-label="닫기"
            onClick={handleClose}
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

        <div className="flex flex-col gap-4 px-20 py-4 mb-6">
          <div>
            <label className="form-top-label">현재 비밀번호</label>
            <TextField
              fullWidth
              size="medium"
              variant="outlined"
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="현재 비밀번호 입력"
              required
              sx={{
                '& .MuiInputBase-root': {
                  height: '36px',
                  fontSize: '13px'
                },
                '& .MuiInputBase-input': {
                  height: '36px',
                  padding: '8px 12px',
                  fontSize: '14px'
                },
                '& .MuiInputAdornment-root': {
                  marginRight: '8px'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icons.LockIcon className="w-4 h-4 text-gray-400" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {currentPassword && (
                      <IconButton
                        onClick={() => setCurrentPassword('')}
                        edge="end"
                        size="small"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Icons.XIcon className="w-4 h-4" />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      edge="end"
                      size="small"
                    >
                      {showCurrentPassword ? (
                        <Icons.EyeOffIcon className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Icons.EyeIcon className="w-4 h-4 text-gray-400" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <label className="form-top-label">새 비밀번호</label>
            <TextField
              fullWidth
              size="medium"
              variant="outlined"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호 입력"
              required
              sx={{
                '& .MuiInputBase-root': {
                  height: '36px',
                  fontSize: '13px'
                },
                '& .MuiInputBase-input': {
                  height: '36px',
                  padding: '8px 12px',
                  fontSize: '14px'
                },
                '& .MuiInputAdornment-root': {
                  marginRight: '8px'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icons.LockIcon className="w-4 h-4 text-gray-400" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {newPassword && (
                      <IconButton
                        onClick={() => setNewPassword('')}
                        edge="end"
                        size="small"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Icons.XIcon className="w-4 h-4" />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                      size="small"
                    >
                      {showNewPassword ? (
                        <Icons.EyeOffIcon className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Icons.EyeIcon className="w-4 h-4 text-gray-400" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <label className="form-top-label">새 비밀번호 확인</label>
            <TextField
              fullWidth
              size="medium"
              variant="outlined"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="새 비밀번호 확인"
              required
              sx={{
                '& .MuiInputBase-root': {
                  height: '36px',
                  fontSize: '13px'
                },
                '& .MuiInputBase-input': {
                  height: '36px',
                  padding: '8px 12px',
                  fontSize: '14px'
                },
                '& .MuiInputAdornment-root': {
                  marginRight: '8px'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icons.LockIcon className="w-4 h-4 text-gray-400" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {confirmPassword && (
                      <IconButton
                        onClick={() => setConfirmPassword('')}
                        edge="end"
                        size="small"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Icons.XIcon className="w-4 h-4" />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? (
                        <Icons.EyeOffIcon className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Icons.EyeIcon className="w-4 h-4 text-gray-400" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        {/* 비밀번호 에러 메시지 */}
        {passwordError && (
          <Alert severity="error" className="mb-4">
            {passwordError}
          </Alert>
        )}

        <Alert severity="warning">
          <Typography variant="subtitle2" gutterBottom>
            비밀번호 변경 조건 안내
          </Typography>
          <Typography variant="body2">
            • 비밀번호는 <span className="text-red-500">영문 + 숫자 + 특수문자 8자 이상으로 조합</span> 되어야 합니다.<br />
            • 비밀번호는 <span className="text-red-500">90일마다 변경되어야</span> 합니다.
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          취소
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  )
}
