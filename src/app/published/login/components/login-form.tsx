'use client'

import { useState } from 'react'
import { 
  TextField, 
  Button, 
  Typography,
  Box,
  Card,
  CardContent,
  InputAdornment,
  IconButton
} from '@/components'
import { Icons } from '@/components'

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
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
    
    // 로그인 로직 처리
    try {
      console.log('로그인 시도:', formData)
      // 실제 로그인 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000)) // 임시 딜레이
    } catch (error) {
      console.error('로그인 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0">
      <CardContent className="p-8">
        {/* 로고 및 제목 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Icons.UserIcon className="w-8 h-8 text-white" />
          </div>
          <Typography variant="h4" className="font-bold text-gray-900 mb-2">
            로그인
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            Published Pages Dashboard에 오신 것을 환영합니다
          </Typography>
        </div>

        {/* 로그인 폼 */}
        <Box component="form" onSubmit={handleSubmit} className="space-y-6">
          {/* 이메일 입력 */}
          <TextField
            fullWidth
            label="이메일"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            placeholder="이메일을 입력하세요"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icons.MailIcon className="w-5 h-5 text-gray-400" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3b82f6',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3b82f6',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#6b7280',
                '&.Mui-focused': {
                  color: '#3b82f6',
                },
              },
            }}
          />

          {/* 비밀번호 입력 */}
          <TextField
            fullWidth
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange('password')}
            placeholder="비밀번호를 입력하세요"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icons.LockIcon className="w-5 h-5 text-gray-400" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? (
                      <Icons.EyeOffIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Icons.EyeIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3b82f6',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3b82f6',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#6b7280',
                '&.Mui-focused': {
                  color: '#3b82f6',
                },
              },
            }}
          />

          {/* 로그인 버튼 */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            className="h-12 rounded-xl font-semibold text-base bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            sx={{
              textTransform: 'none',
              '&:hover': {
                transform: 'translateY(-1px)',
              },
            }}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>로그인 중...</span>
              </div>
            ) : (
              '로그인'
            )}
          </Button>

          {/* 추가 옵션 */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-600">로그인 상태 유지</span>
            </label>
            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              비밀번호 찾기
            </button>
          </div>
        </Box>

        {/* 구분선 */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">또는</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* 소셜 로그인 */}
        <div className="space-y-3">
          <Button
            fullWidth
            variant="outlined"
            className="h-12 rounded-xl font-medium border-gray-300 text-gray-700 hover:bg-gray-50"
            sx={{ textTransform: 'none' }}
          >
            <Icons.UserIcon className="w-5 h-5 mr-2" />
            Google로 로그인
          </Button>
          
          <Button
            fullWidth
            variant="outlined"
            className="h-12 rounded-xl font-medium border-gray-300 text-gray-700 hover:bg-gray-50"
            sx={{ textTransform: 'none' }}
          >
            <Icons.UserIcon className="w-5 h-5 mr-2" />
            GitHub로 로그인
          </Button>
        </div>

        {/* 회원가입 링크 */}
        <div className="text-center mt-6">
          <Typography variant="body2" className="text-gray-600">
            계정이 없으신가요?{' '}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              회원가입
            </button>
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}
