'use client'

import { useState } from 'react'
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
  Divider
} from "@mui/material"
import { Save as SaveIcon, RestartAlt as ResetIcon } from "@mui/icons-material"

export default function BasicFormPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    job: '',
    interests: [] as string[],
    gender: '',
    newsletter: false,
    terms: false
  })

  const handleInputChange = (field: string) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleCheckboxChange = (field: string) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Form submitted:', formData)
    // 여기에 폼 제출 로직 추가
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      job: '',
      interests: [],
      gender: '',
      newsletter: false,
      terms: false
    })
  }
  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">기본 폼</h1>
          <p className="text-gray-600">Material UI 컴포넌트를 사용한 기본 폼 예제입니다.</p>
        </div>

        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            사용자 정보 입력
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* 개인 정보 */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    개인 정보
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                      <TextField
                        label="이름"
                        fullWidth
                        required
                        size="small"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                      />
                      <TextField
                        label="성"
                        fullWidth
                        required
                        size="small"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                      />
                    </Box>
                    <TextField
                      label="이메일"
                      type="email"
                      fullWidth
                      required
                      size="small"
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                    />
                    <TextField
                      label="전화번호"
                      type="tel"
                      fullWidth
                      size="small"
                    />
                  </Box>
                </Box>

                {/* 계정 정보 */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    계정 정보
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="사용자명"
                      fullWidth
                      required
                      size="small"
                    />
                    <TextField
                      label="비밀번호"
                      type="password"
                      fullWidth
                      required
                      size="small"
                    />
                    <TextField
                      label="비밀번호 확인"
                      type="password"
                      fullWidth
                      required
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>

              {/* 추가 정보 */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  추가 정보
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>직업</InputLabel>
                    <Select 
                      label="직업"
                      value={formData.job}
                      onChange={handleInputChange('job')}
                    >
                      <MenuItem value="student">학생</MenuItem>
                      <MenuItem value="employee">직원</MenuItem>
                      <MenuItem value="freelancer">프리랜서</MenuItem>
                      <MenuItem value="other">기타</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="small">
                    <InputLabel>관심 분야</InputLabel>
                    <Select 
                      label="관심 분야" 
                      multiple
                      value={formData.interests}
                      onChange={handleInputChange('interests')}
                    >
                      <MenuItem value="technology">기술</MenuItem>
                      <MenuItem value="design">디자인</MenuItem>
                      <MenuItem value="business">비즈니스</MenuItem>
                      <MenuItem value="art">예술</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">성별</FormLabel>
                    <RadioGroup 
                      row
                      value={formData.gender}
                      onChange={handleInputChange('gender')}
                    >
                      <FormControlLabel value="male" control={<Radio />} label="남성" />
                      <FormControlLabel value="female" control={<Radio />} label="여성" />
                      <FormControlLabel value="other" control={<Radio />} label="기타" />
                    </RadioGroup>
                  </FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={formData.newsletter}
                        onChange={handleCheckboxChange('newsletter')}
                      />
                    }
                    label="뉴스레터 구독에 동의합니다"
                  />
                  <TextField
                    label="자기소개"
                    multiline
                    rows={4}
                    fullWidth
                    size="small"
                  />
                </Box>
              </Box>

              {/* 액션 버튼 */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  variant="outlined"
                  startIcon={<ResetIcon />}
                  onClick={handleReset}
                  sx={{ 
                    textTransform: 'none',
                    borderColor: '#d1d5db', // gray-300
                    color: '#374151', // gray-700
                    '&:hover': {
                      borderColor: '#9ca3af', // gray-400
                      backgroundColor: '#f9fafb', // gray-50
                    }
                  }}
                >
                  초기화
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{ 
                    textTransform: 'none',
                    backgroundColor: '#3b82f6', // blue-500
                    '&:hover': {
                      backgroundColor: '#2563eb', // blue-600
                    }
                  }}
                >
                  저장
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
              </div>
    )
  } 