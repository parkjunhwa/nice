"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Card,
  CardContent,
  Grid,
  Chip,
  FormHelperText
} from "@mui/material"
import { 
  Save as SaveIcon, 
  RestartAlt as ResetIcon,
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
  Check as CheckIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Star as StarIcon
} from "@mui/icons-material"
import { useState } from "react"

interface FormData {
  // 1단계: 기본 정보
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  
  // 2단계: 주소 정보
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  
  // 3단계: 직업 정보
  occupation: string
  company: string
  experience: string
  education: string
  skills: string[]
  
  // 4단계: 추가 정보
  interests: string[]
  languages: string[]
  certifications: string
  references: string
  agreeToTerms: boolean
}

interface FormErrors {
  [key: string]: string
}

export default function MultiStepFormPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    occupation: '',
    company: '',
    experience: '',
    education: '',
    skills: [],
    interests: [],
    languages: [],
    certifications: '',
    references: '',
    agreeToTerms: false
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const steps = [
    {
      label: '기본 정보',
      description: '개인 기본 정보를 입력하세요',
      icon: <PersonIcon />
    },
    {
      label: '주소 정보',
      description: '거주지 정보를 입력하세요',
      icon: <LocationIcon />
    },
    {
      label: '직업 정보',
      description: '직업 및 경력 정보를 입력하세요',
      icon: <WorkIcon />
    },
    {
      label: '추가 정보',
      description: '관심사 및 기타 정보를 입력하세요',
      icon: <StarIcon />
    }
  ]

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      occupation: '',
      company: '',
      experience: '',
      education: '',
      skills: [],
      interests: [],
      languages: [],
      certifications: '',
      references: '',
      agreeToTerms: false
    })
    setErrors({})
  }

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    switch (step) {
      case 0: // 기본 정보
        if (!formData.firstName) newErrors.firstName = '이름은 필수입니다.'
        if (!formData.lastName) newErrors.lastName = '성은 필수입니다.'
        if (!formData.email) {
          newErrors.email = '이메일은 필수입니다.'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = '올바른 이메일 형식을 입력하세요.'
        }
        if (!formData.phone) newErrors.phone = '전화번호는 필수입니다.'
        break

      case 1: // 주소 정보
        if (!formData.address) newErrors.address = '주소는 필수입니다.'
        if (!formData.city) newErrors.city = '도시는 필수입니다.'
        if (!formData.state) newErrors.state = '주/도는 필수입니다.'
        if (!formData.zipCode) newErrors.zipCode = '우편번호는 필수입니다.'
        break

      case 2: // 직업 정보
        if (!formData.occupation) newErrors.occupation = '직업은 필수입니다.'
        if (!formData.company) newErrors.company = '회사명은 필수입니다.'
        break

      case 3: // 추가 정보
        if (!formData.agreeToTerms) newErrors.agreeToTerms = '이용약관에 동의해야 합니다.'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // 에러 제거
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      // 폼 제출 로직
      console.log('폼 제출:', formData)
      alert('폼이 성공적으로 제출되었습니다!')
    }
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" gutterBottom>개인 기본 정보</Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="이름 *"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                error={!!errors.firstName}
                helperText={errors.firstName}
                fullWidth
                required
              />
              <TextField
                label="성 *"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                error={!!errors.lastName}
                helperText={errors.lastName}
                fullWidth
                required
              />
            </Box>

            <TextField
              label="이메일 *"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
            />

            <TextField
              label="전화번호 *"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
              required
            />

            <TextField
              label="생년월일"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        )

      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" gutterBottom>주소 정보</Typography>
            
            <TextField
              label="주소 *"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
              fullWidth
              required
              multiline
              rows={2}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="도시 *"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                error={!!errors.city}
                helperText={errors.city}
                fullWidth
                required
              />
              <TextField
                label="주/도 *"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                error={!!errors.state}
                helperText={errors.state}
                fullWidth
                required
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="우편번호 *"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                error={!!errors.zipCode}
                helperText={errors.zipCode}
                fullWidth
                required
              />
              <TextField
                label="국가"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                fullWidth
              />
            </Box>
          </Box>
        )

      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" gutterBottom>직업 정보</Typography>
            
            <TextField
              label="직업 *"
              value={formData.occupation}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
              error={!!errors.occupation}
              helperText={errors.occupation}
              fullWidth
              required
            />

            <TextField
              label="회사명 *"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              error={!!errors.company}
              helperText={errors.company}
              fullWidth
              required
            />

            <TextField
              label="경력"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              fullWidth
              placeholder="예: 5년"
            />

            <FormControl fullWidth>
              <InputLabel>학력</InputLabel>
              <Select
                value={formData.education}
                label="학력"
                onChange={(e) => handleInputChange('education', e.target.value)}
              >
                <MenuItem value="고등학교">고등학교</MenuItem>
                <MenuItem value="전문대학">전문대학</MenuItem>
                <MenuItem value="대학교">대학교</MenuItem>
                <MenuItem value="대학원">대학원</MenuItem>
                <MenuItem value="기타">기타</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="기술 스택"
              value={formData.skills.join(', ')}
              onChange={(e) => handleInputChange('skills', e.target.value.split(', ').filter(s => s.trim()))}
              fullWidth
              placeholder="예: React, TypeScript, Node.js"
              helperText="쉼표로 구분하여 입력하세요"
            />
          </Box>
        )

      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" gutterBottom>추가 정보</Typography>
            
            <TextField
              label="관심사"
              value={formData.interests.join(', ')}
              onChange={(e) => handleInputChange('interests', e.target.value.split(', ').filter(s => s.trim()))}
              fullWidth
              placeholder="예: 여행, 독서, 음악"
              helperText="쉼표로 구분하여 입력하세요"
            />

            <TextField
              label="사용 가능한 언어"
              value={formData.languages.join(', ')}
              onChange={(e) => handleInputChange('languages', e.target.value.split(', ').filter(s => s.trim()))}
              fullWidth
              placeholder="예: 한국어, 영어, 일본어"
              helperText="쉼표로 구분하여 입력하세요"
            />

            <TextField
              label="자격증"
              value={formData.certifications}
              onChange={(e) => handleInputChange('certifications', e.target.value)}
              fullWidth
              placeholder="보유한 자격증을 입력하세요"
            />

            <TextField
              label="추천인"
              value={formData.references}
              onChange={(e) => handleInputChange('references', e.target.value)}
              fullWidth
              placeholder="추천인 정보를 입력하세요"
            />

            <FormControl error={!!errors.agreeToTerms}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  />
                }
                label="이용약관 및 개인정보처리방침에 동의합니다 *"
              />
              {errors.agreeToTerms && (
                <FormHelperText>{errors.agreeToTerms}</FormHelperText>
              )}
            </FormControl>
          </Box>
        )

      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">다단계 폼 예시</h1>
          <p className="text-gray-600">Material UI의 Stepper를 사용한 다단계 폼 예시입니다.</p>
        </div>

        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            사용자 등록 폼
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={() => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {step.icon}
                      <Typography variant="body2">{step.label}</Typography>
                    </Box>
                  )}
                >
                  <Typography variant="h6">{step.label}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {step.description}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Box sx={{ mb: 2, mt: 2 }}>
                    {renderStepContent(index)}
                    
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                        startIcon={index === steps.length - 1 ? <CheckIcon /> : <NextIcon />}
                        sx={{ textTransform: 'none' }}
                      >
                        {index === steps.length - 1 ? '완료' : '다음'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        startIcon={<PrevIcon />}
                        sx={{ textTransform: 'none' }}
                      >
                        이전
                      </Button>
                    </Box>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {/* 진행 상황 요약 */}
          <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>진행 상황</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="body2">
                단계 {activeStep + 1} / {steps.length}
              </Typography>
              <Box sx={{ flex: 1, bgcolor: 'grey.300', borderRadius: 1, height: 8 }}>
                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    height: '100%',
                    borderRadius: 1,
                    width: `${((activeStep + 1) / steps.length) * 100}%`,
                    transition: 'width 0.3s ease'
                  }}
                />
              </Box>
              <Typography variant="body2">
                {Math.round(((activeStep + 1) / steps.length) * 100)}%
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<ResetIcon />}
                onClick={handleReset}
                sx={{ textTransform: 'none' }}
              >
                처음부터 다시 시작
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* 사용법 안내 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            사용법
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Alert severity="info">
              <Typography variant="subtitle2" gutterBottom>
                단계별 입력
              </Typography>
              <Typography variant="body2">
                각 단계에서 필요한 정보를 입력하고 '다음' 버튼을 클릭하여 진행하세요.
              </Typography>
            </Alert>
            
            <Alert severity="warning">
              <Typography variant="subtitle2" gutterBottom>
                필수 입력 항목
              </Typography>
              <Typography variant="body2">
                * 표시가 있는 항목은 반드시 입력해야 다음 단계로 진행할 수 있습니다.
              </Typography>
            </Alert>
            
            <Alert severity="success">
              <Typography variant="subtitle2" gutterBottom>
                진행 상황 확인
              </Typography>
              <Typography variant="body2">
                하단의 진행 상황 바를 통해 전체 진행률을 확인할 수 있습니다.
              </Typography>
            </Alert>
          </Box>
        </Paper>
      </div>
    </DashboardLayout>
  )
} 