'use client'

import { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel
} from '@/components'
import { Icons } from '@/components'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberId, setRememberId] = useState(false)
  const [isLoading, setIsLoading] = useState(false)



  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      console.log('로그인 시도:', formData)
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('로그인 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* 왼쪽 배경 이미지 섹션 */}
      <div className="flex-1 relative bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: 'url(/images/background_login.png)' }}>
      </div>

      {/* 오른쪽 로그인 폼 섹션 */}
      <div className="flex items-center justify-center bg-white w-[400px] flex-shrink-0">
        <div className="w-[400px] p-10 m-0">
          {/* 로고 및 제목 */}
          <div className="text-center mb-8">
            <div className="inline-block mb-2">
              <img
                src="/images/ci.png"
                alt="NICE 로고"
                className="h-16 w-auto mx-auto"
              />
            </div>
            <img
              src="/images/logo.png"
              alt="NICE 로고"
              className="h-[18px] w-auto mx-auto mb-2"
            />
            <Typography variant="body2" className="text-gray-400 text-sm font-['NICE']">
              Nice Settlement System
            </Typography>
          </div>

          {/* 로그인 폼 */}
          <Box component="form" onSubmit={handleSubmit} className="space-y-4 mb-4">
            {/* ID 입력 */}
            <div>

              <label className="form-top-label">ID</label>
              <TextField
                fullWidth
                size="medium"
                variant="outlined"
                value={formData.id}
                onChange={handleInputChange('id')}
                placeholder="ID 입력"
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
                      <Icons.UserIcon className="w-4 h-4 text-gray-400" />
                    </InputAdornment>
                  ),
                  endAdornment: formData.id && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setFormData(prev => ({ ...prev, id: '' }))}
                        edge="end"
                        size="small"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Icons.XIcon className="w-4 h-4" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}

              />
            </div>

            {/* 비밀번호 입력 */}
            <div>

              <label className="form-top-label">Password</label>
              <TextField
                fullWidth
                size="medium"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange('password')}
                placeholder="비밀번호 입력"
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
                    <InputAdornment position="end">
                      <Icons.LockIcon className="w-4 h-4 text-gray-400" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {formData.password && (
                        <IconButton
                          onClick={() => setFormData(prev => ({ ...prev, password: '' }))}
                          edge="end"
                          size="small"
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Icons.XIcon className="w-4 h-4" />
                        </IconButton>
                      )}
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? (
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

            {/* 아이디 저장 체크박스 */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberId}
                  onChange={(e) => setRememberId(e.target.checked)}
                  size="small"
                />
              }
              label="아이디저장"
            />

            {/* 로그인 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </Box>

          {/* 저작권 */}
          <div className="text-center">
            <Typography variant="caption" className="text-gray-400 text-xs">
              Copyright NICE Infra Service. All Right Reserved.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
