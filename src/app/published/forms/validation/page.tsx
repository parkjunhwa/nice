"use client"

import { 
  TextField, 
  Button, 
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  Typography,
  Box,
  Divider,
  Alert,
  Snackbar,
  FormHelperText,
  InputAdornment,
  IconButton
} from "@mui/material"
import { 
  Save as SaveIcon, 
  RotateCcw as ResetIcon,
  Eye as VisibilityIcon,
  EyeOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as ErrorIcon
} from "lucide-react"
import { useState } from "react"

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  age: string
  website: string
  agree: boolean
}

interface FormErrors {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  phone?: string
  age?: string
  website?: string
  agree?: string
}

export default function ValidationFormPage() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    age: '',
    website: '',
    agree: false
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // 사용자명 검증
    if (!formData.username) {
      newErrors.username = '사용자명은 필수입니다.'
    } else if (formData.username.length < 3) {
      newErrors.username = '사용자명은 최소 3자 이상이어야 합니다.'
    } else if (formData.username.length > 20) {
      newErrors.username = '사용자명은 최대 20자까지 가능합니다.'
    }

    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = '이메일은 필수입니다.'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력하세요.'
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = '비밀번호는 필수입니다.'
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = '비밀번호는 영문 대소문자와 숫자를 포함해야 합니다.'
    }

    // 비밀번호 확인 검증
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인은 필수입니다.'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }

    // 전화번호 검증
    const phoneRegex = /^[0-9-+\s()]+$/
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = '올바른 전화번호 형식을 입력하세요.'
    }

    // 나이 검증
    if (formData.age) {
      const age = parseInt(formData.age)
      if (isNaN(age) || age < 0 || age > 120) {
        newErrors.age = '올바른 나이를 입력하세요 (0-120).'
      }
    }

    // 웹사이트 검증
    if (formData.website) {
      const urlRegex = /^https?:\/\/.+\..+/
      if (!urlRegex.test(formData.website)) {
        newErrors.website = '올바른 웹사이트 URL을 입력하세요 (http:// 또는 https:// 포함).'
      }
    }

    // 약관 동의 검증
    if (!formData.agree) {
      newErrors.agree = '이용약관에 동의해야 합니다.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setSnackbarMessage('폼이 성공적으로 제출되었습니다!')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)
      // 여기서 실제 폼 제출 로직을 구현할 수 있습니다
    } else {
      setSnackbarMessage('폼에 오류가 있습니다. 확인해주세요.')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    }
  }

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // 실시간 검증을 위해 에러도 함께 제거
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      age: '',
      website: '',
      agree: false
    })
    setErrors({})
  }

  const getFieldStatus = (field: keyof FormData) => {
    if (errors[field]) {
      return 'error'
    }
    if (formData[field] && typeof formData[field] === 'string' && formData[field].toString().length > 0) {
      return 'success'
    }
    return 'default'
  }

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">폼 검증 예시</h1>
          <p className="text-gray-600">Material UI의 폼 검증 기능과 실시간 피드백을 보여주는 예시입니다.</p>
        </div>

        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            사용자 등록 폼
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* 기본 정보 */}
              <Box>
                <Typography variant="h6" gutterBottom>기본 정보</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="사용자명 *"
                    value={formData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username || '3-20자 사이의 사용자명을 입력하세요'}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: getFieldStatus('username') === 'success' ? (
                        <CheckCircleIcon color="success" />
                      ) : getFieldStatus('username') === 'error' ? (
                        <ErrorIcon color="error" />
                      ) : null
                    }}
                  />
                  
                  <TextField
                    label="이메일 *"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email || '올바른 이메일 형식을 입력하세요'}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: getFieldStatus('email') === 'success' ? (
                        <CheckCircleIcon color="success" />
                      ) : getFieldStatus('email') === 'error' ? (
                        <ErrorIcon color="error" />
                      ) : null
                    }}
                  />
                  
                  <TextField
                    label="비밀번호 *"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password || '최소 8자, 영문 대소문자와 숫자를 포함해야 합니다'}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  
                  <TextField
                    label="비밀번호 확인 *"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword || '비밀번호를 다시 입력하세요'}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Box>

              {/* 추가 정보 */}
              <Box>
                <Typography variant="h6" gutterBottom>추가 정보</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="전화번호"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone || '선택사항: 전화번호를 입력하세요'}
                    fullWidth
                    placeholder="010-1234-5678"
                  />
                  
                  <TextField
                    label="나이"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    error={!!errors.age}
                    helperText={errors.age || '선택사항: 나이를 입력하세요'}
                    fullWidth
                    placeholder="25"
                  />
                  
                  <TextField
                    label="웹사이트"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    error={!!errors.website}
                    helperText={errors.website || '선택사항: 웹사이트 URL을 입력하세요'}
                    fullWidth
                    placeholder="https://example.com"
                  />
                </Box>
              </Box>

              {/* 약관 동의 */}
              <Box>
                <Typography variant="h6" gutterBottom>약관 동의</Typography>
                <FormControl error={!!errors.agree}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.agree}
                        onChange={(e) => handleChange('agree', e.target.checked)}
                      />
                    }
                    label="이용약관 및 개인정보처리방침에 동의합니다"
                  />
                  {errors.agree && (
                    <FormHelperText>{errors.agree}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              {/* 검증 요약 */}
              {Object.keys(errors).length > 0 && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    다음 오류를 수정해주세요:
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field}>{error}</li>
                    ))}
                  </ul>
                </Alert>
              )}

              {/* 액션 버튼 */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<ResetIcon />}
                  onClick={handleReset}
                  sx={{ textTransform: 'none' }}
                >
                  초기화
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  제출
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* 검증 규칙 안내 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            검증 규칙
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Alert severity="info">
              <Typography variant="subtitle2" gutterBottom>
                필수 필드 (*)
              </Typography>
              <Typography variant="body2">
                사용자명, 이메일, 비밀번호, 비밀번호 확인, 약관 동의는 필수 입력 항목입니다.
              </Typography>
            </Alert>
            
            <Alert severity="warning">
              <Typography variant="subtitle2" gutterBottom>
                입력 형식
              </Typography>
              <Typography variant="body2">
                • 사용자명: 3-20자<br/>
                • 이메일: 올바른 이메일 형식<br/>
                • 비밀번호: 최소 8자, 영문 대소문자와 숫자 포함<br/>
                • 전화번호: 숫자, 하이픈, 공백, 괄호만 허용<br/>
                • 나이: 0-120 사이의 숫자<br/>
                • 웹사이트: http:// 또는 https:// 포함한 URL
              </Typography>
            </Alert>
            
            <Alert severity="success">
              <Typography variant="subtitle2" gutterBottom>
                실시간 검증
              </Typography>
              <Typography variant="body2">
                입력할 때마다 실시간으로 검증이 이루어지며, 오류가 있으면 즉시 피드백을 제공합니다.
              </Typography>
            </Alert>
          </Box>
        </Paper>

        {/* 성공/오류 메시지 */}
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
    )
  } 