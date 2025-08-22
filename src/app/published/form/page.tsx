"use client"

import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  Upload,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Search,
  Plus
} from "lucide-react"
import { useState } from "react"
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  FormGroup,
  Switch,
  Slider,
  Chip,
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Alert,
  LinearProgress,
  Rating,
  Autocomplete,
  CircularProgress
} from '@mui/material'
import { DatePicker, DateTimePicker } from '@/components'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ko } from 'date-fns/locale'

export default function FormPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    birthDate: null,
    startDate: null,
    endDate: null,
    meetingTime: null,
    bio: '',
    skills: [],
    experience: 'beginner',
    newsletter: false,
    terms: false,
    rating: 0,
    volume: 50
  })

  // 날짜 관련 설정
  const dateConfig = {
    birthDate: {
      placeholder: "생년월일을 선택하세요",
      maxDate: new Date(),
      format: "yyyy-MM-dd",
      views: ['year', 'month', 'day']
    },
    startDate: {
      placeholder: "시작일을 선택하세요",
      minDate: new Date(),
      format: "yyyy-MM-dd",
      views: ['year', 'month', 'day']
    },
    endDate: {
      placeholder: "종료일을 선택하세요",
      minDate: formData.startDate || new Date(),
      format: "yyyy-MM-dd",
      views: ['year', 'month', 'day']
    },
    meetingTime: {
      placeholder: "미팅 시간을 선택하세요",
      minDate: new Date(),
      format: "yyyy-MM-dd HH:mm",
      views: ['year', 'month', 'day', 'hours', 'minutes']
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleDateChange = (name: string, value: Date | null) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('폼이 제출되었습니다!')
  }

  const skills = ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'MUI', 'Node.js', 'Python', 'Java']

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <div className="space-y-8">
          {/* 페이지 헤더 */}
          <div className="c-page-header">
            <h1 className="c-page-header__title">MUI + Tailwind 폼 컴포넌트</h1>
            <p className="c-page-header__description">
              MUI 컴포넌트와 Tailwind CSS가 통합된 다양한 폼 예시들
            </p>
          </div>

          {/* 기본 폼과 고급 컴포넌트 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4 }}>
            {/* 기본 폼 */}
            <Paper className="p-6 shadow-lg rounded-lg">
              <Typography variant="h5" className="mb-4 font-semibold text-gray-900">
                기본 폼 (MUI + Tailwind)
              </Typography>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <TextField
                      fullWidth
                      size="small"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      className="bg-white"
                      placeholder="이름을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      성 <span className="text-red-500">*</span>
                    </label>
                    <TextField
                      fullWidth
                      size="small"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      className="bg-white"
                      placeholder="성을 입력하세요"
                    />
                  </div>
                </Box>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    className="bg-white"
                    placeholder="이메일을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    전화번호 <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    className="bg-white"
                    placeholder="전화번호를 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    주소
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    variant="outlined"
                    className="bg-white"
                    placeholder="주소를 입력하세요"
                  />
                </div>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      도시
                    </label>
                    <TextField
                      fullWidth
                      size="small"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      variant="outlined"
                      className="bg-white"
                      placeholder="도시를 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      우편번호
                    </label>
                    <TextField
                      fullWidth
                      size="small"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      variant="outlined"
                      className="bg-white"
                      placeholder="우편번호를 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      국가
                    </label>
                    <FormControl fullWidth variant="outlined" size="small" className="bg-white">
                      <Select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="">국가를 선택하세요</MenuItem>
                        <MenuItem value="kr">대한민국</MenuItem>
                        <MenuItem value="us">미국</MenuItem>
                        <MenuItem value="jp">일본</MenuItem>
                        <MenuItem value="cn">중국</MenuItem>
                        <MenuItem value="uk">영국</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Box>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    생년월일
                  </label>
                  <DatePicker
                    value={formData.birthDate}
                    onChange={(newValue) => handleDateChange('birthDate', newValue)}
                    placeholder={dateConfig.birthDate.placeholder}
                    maxDate={dateConfig.birthDate.maxDate}
                    format={dateConfig.birthDate.format}
                    views={['year', 'month', 'day']}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    자기소개
                  </label>
                  <TextField
                    fullWidth
                    size="small"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    variant="outlined"
                    className="bg-white"
                    placeholder="자기소개를 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    기술 스택
                  </label>
                  <Autocomplete
                    multiple
                    size="small"
                    options={skills}
                    value={formData.skills}
                    onChange={(event, newValue) => {
                      setFormData(prev => ({ ...prev, skills: newValue }))
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        variant="outlined"
                        className="bg-white"
                        placeholder="기술을 선택하세요"
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          label={option}
                          size="small"
                          className="bg-blue-100 text-blue-800"
                        />
                      ))
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    경험 수준
                  </label>
                  <FormControl component="fieldset">
                    <RadioGroup
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      row
                    >
                      <FormControlLabel value="beginner" control={<Radio />} label="초급" />
                      <FormControlLabel value="intermediate" control={<Radio />} label="중급" />
                      <FormControlLabel value="advanced" control={<Radio />} label="고급" />
                      <FormControlLabel value="expert" control={<Radio />} label="전문가" />
                    </RadioGroup>
                  </FormControl>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    추가 옵션
                  </label>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleInputChange}
                        />
                      }
                      label="뉴스레터 구독"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="terms"
                          checked={formData.terms}
                          onChange={handleInputChange}
                          required
                        />
                      }
                      label="이용약관에 동의합니다."
                    />
                  </FormGroup>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                >
                  <CheckCircle className="mr-2" />
                  제출하기
                </Button>
              </form>
            </Paper>

            {/* 고급 컴포넌트 */}
            <Paper className="p-6 shadow-lg rounded-lg">
              <Typography variant="h5" className="mb-4 font-semibold text-gray-900">
                고급 컴포넌트 (MUI + Tailwind)
              </Typography>
              
              <div className="space-y-6">
                {/* 날짜 선택 예시 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    시작일
                  </label>
                  <DatePicker
                    value={formData.startDate}
                    onChange={(newValue) => handleDateChange('startDate', newValue)}
                    placeholder={dateConfig.startDate.placeholder}
                    minDate={dateConfig.startDate.minDate}
                    format={dateConfig.startDate.format}
                    views={['year', 'month', 'day']}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    클릭하여 달력을 열어보세요. 취소/확인 버튼이 한국어로 표시됩니다.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    종료일
                  </label>
                  <DatePicker
                    value={formData.endDate}
                    onChange={(newValue) => handleDateChange('endDate', newValue)}
                    placeholder={dateConfig.endDate.placeholder}
                    minDate={dateConfig.endDate.minDate}
                    format={dateConfig.endDate.format}
                    views={['year', 'month', 'day']}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    달력에서 한국어 버튼을 확인할 수 있습니다.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    미팅 시간
                  </label>
                  <DateTimePicker
                    value={formData.meetingTime}
                    onChange={(newValue) => handleDateChange('meetingTime', newValue)}
                    placeholder={dateConfig.meetingTime.placeholder}
                    minDate={dateConfig.meetingTime.minDate}
                    format={dateConfig.meetingTime.format}
                    views={['year', 'month', 'day', 'hours', 'minutes']}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    날짜와 시간을 모두 선택할 수 있으며, 한국어 UI가 적용됩니다.
                  </p>
                </div>


                <Divider />

                {/* 토글 스위치 */}
                <Box>
                  <Typography variant="subtitle1" className="mb-2 font-medium text-gray-700">
                    알림 설정
                  </Typography>
                  <FormControlLabel
                    control={<Switch />}
                    label="이메일 알림 받기"
                    className="text-gray-600"
                  />
                </Box>

                <Divider />

                {/* 슬라이더 */}
                <Box>
                  <Typography variant="subtitle1" className="mb-2 font-medium text-gray-700">
                    볼륨 설정: {formData.volume}%
                  </Typography>
                  <Slider
                    value={formData.volume}
                    onChange={(event, newValue) => {
                      setFormData(prev => ({ ...prev, volume: newValue as number }))
                    }}
                    aria-label="볼륨"
                    className="text-blue-600"
                  />
                </Box>

                <Divider />

                {/* 평점 */}
                <Box>
                  <Typography variant="subtitle1" className="mb-2 font-medium text-gray-700">
                    만족도: {formData.rating}/5
                  </Typography>
                  <Rating
                    value={formData.rating}
                    onChange={(event, newValue) => {
                      setFormData(prev => ({ ...prev, rating: newValue || 0 }))
                    }}
                    size="large"
                    className="text-yellow-500"
                  />
                </Box>

                <Divider />

                {/* 진행률 */}
                <Box>
                  <Typography variant="subtitle1" className="mb-2 font-medium text-gray-700">
                    프로필 완성도: 75%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={75} 
                    className="h-3 rounded-full bg-gray-200"
                    sx={{
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#3B82F6',
                        borderRadius: '9999px'
                      }
                    }}
                  />
                </Box>

                <Divider />

                {/* 상태 알림 */}
                <Box className="space-y-3">
                  <Typography variant="subtitle1" className="font-medium text-gray-700">
                    상태 알림
                  </Typography>
                  <Alert severity="success" className="bg-green-50 border-green-200 text-green-800">
                    성공적으로 저장되었습니다!
                  </Alert>
                  <Alert severity="warning" className="bg-yellow-50 border-yellow-200 text-yellow-800">
                    일부 정보가 누락되었습니다.
                  </Alert>
                  <Alert severity="error" className="bg-red-50 border-red-200 text-red-800">
                    오류가 발생했습니다. 다시 시도해주세요.
                  </Alert>
                </Box>

                <Divider />

              </div>
            </Paper>
          </Box>


        </div>
      </LocalizationProvider>
  )
} 