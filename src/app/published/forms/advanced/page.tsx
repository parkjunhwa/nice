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
  Slider,
  Rating,
  Autocomplete,
  Chip,
  Switch,
  FormGroup,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Snackbar,
  LinearProgress,
  CircularProgress,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from "@mui/material"
import { 
  Save as SaveIcon, 
  RestartAlt as ResetIcon,
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
  Search as SearchIcon,
  AttachMoney as MoneyIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from "@mui/icons-material"
import { useState } from "react"

export default function AdvancedFormPage() {
  const [value, setValue] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [expanded, setExpanded] = useState<string | false>(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOpenSnackbar(true)
    }, 2000)
  }

  const steps = [
    {
      label: '기본 정보',
      description: '이름과 연락처 정보를 입력하세요.',
    },
    {
      label: '상세 정보',
      description: '추가 정보와 선호도를 설정하세요.',
    },
    {
      label: '확인',
      description: '입력한 정보를 확인하고 제출하세요.',
    },
  ]

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">고급 폼 컴포넌트</h1>
          <p className="text-gray-600">Material UI의 다양한 고급 폼 컴포넌트 예시입니다.</p>
        </div>

        {/* 스텝퍼 폼 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            단계별 폼 (Stepper)
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2, mt: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? '완료' : '다음'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        이전
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* 아코디언 폼 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            접을 수 있는 폼 (Accordion)
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>개인 정보</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="이름"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="이메일"
                  type="email"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="전화번호"
                  type="tel"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>주소 정보</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="주소"
                  fullWidth
                  multiline
                  rows={2}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="우편번호"
                  fullWidth
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        </Paper>

        {/* 탭 폼 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            탭 폼 (Tabs)
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
              <Tab label="기본 정보" />
              <Tab label="상세 설정" />
              <Tab label="검토" />
            </Tabs>
          </Box>

          {value === 0 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>기본 정보</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="사용자명" fullWidth />
                <TextField label="비밀번호" type="password" fullWidth />
                <TextField label="비밀번호 확인" type="password" fullWidth />
              </Box>
            </Box>
          )}

          {value === 1 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>상세 설정</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">알림 설정</FormLabel>
                  <FormGroup>
                    <FormControlLabel control={<Switch />} label="이메일 알림" />
                    <FormControlLabel control={<Switch />} label="푸시 알림" />
                    <FormControlLabel control={<Switch />} label="SMS 알림" />
                  </FormGroup>
                </FormControl>
                
                <FormControl component="fieldset">
                  <FormLabel component="legend">테마 설정</FormLabel>
                  <ToggleButtonGroup value="light" exclusive>
                    <ToggleButton value="light">라이트</ToggleButton>
                    <ToggleButton value="dark">다크</ToggleButton>
                    <ToggleButton value="auto">자동</ToggleButton>
                  </ToggleButtonGroup>
                </FormControl>
              </Box>
            </Box>
          )}

          {value === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>검토</Typography>
              <Typography>입력한 모든 정보를 확인하고 제출하세요.</Typography>
            </Box>
          )}
        </Paper>

        {/* 고급 입력 컴포넌트들 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            고급 입력 컴포넌트
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* 슬라이더 */}
            <Box>
              <Typography variant="h6" gutterBottom>슬라이더 (Slider)</Typography>
              <Box sx={{ px: 2 }}>
                <Typography gutterBottom>가격 범위</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MoneyIcon />
                  <Slider
                    value={[20, 80]}
                    onChange={(event, newValue) => {}}
                    valueLabelDisplay="auto"
                    sx={{ flex: 1 }}
                  />
                  <MoneyIcon />
                </Box>
                <Typography gutterBottom>만족도</Typography>
                <Slider
                  defaultValue={70}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: '매우 불만족' },
                    { value: 50, label: '보통' },
                    { value: 100, label: '매우 만족' },
                  ]}
                />
              </Box>
            </Box>

            {/* 레이팅 */}
            <Box>
              <Typography variant="h6" gutterBottom>레이팅 (Rating)</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Rating
                  name="half-rating"
                  defaultValue={2.5}
                  precision={0.5}
                  icon={<StarIcon fontSize="inherit" />}
                />
                <Typography>(2.5/5)</Typography>
              </Box>
            </Box>

            {/* 자동완성 */}
            <Box>
              <Typography variant="h6" gutterBottom>자동완성 (Autocomplete)</Typography>
              <Autocomplete
                multiple
                id="tags-filled"
                options={['React', 'TypeScript', 'Material-UI', 'Next.js', 'Node.js']}
                defaultValue={['React']}
                freeSolo
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                      <Chip 
                        key={key} 
                        variant="outlined" 
                        label={option} 
                        {...tagProps}
                        sx={{
                          borderColor: '#d1d5db', // gray-300
                          color: '#374151', // gray-700
                          '&:hover': {
                            borderColor: '#9ca3af', // gray-400
                            backgroundColor: '#f9fafb', // gray-50
                          }
                        }}
                      />
                    );
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="기술 스택"
                    placeholder="기술 추가"
                  />
                )}
              />
            </Box>

            {/* 검색 필드 */}
            <Box>
              <Typography variant="h6" gutterBottom>검색 필드</Typography>
              <TextField
                fullWidth
                placeholder="검색어를 입력하세요..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Paper>

        {/* 진행 상태 표시 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            진행 상태 표시
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom>선형 진행률 (LinearProgress)</Typography>
              <LinearProgress variant="determinate" value={75} />
              <Typography variant="body2" sx={{ mt: 1 }}>75% 완료</Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>원형 진행률 (CircularProgress)</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress variant="determinate" value={60} />
                <Typography>60% 완료</Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>스켈레톤 로딩 (Skeleton)</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="rectangular" height={60} />
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* 액션 버튼 */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ResetIcon />}
            sx={{ 
              textTransform: 'none',
            }}
          >
            초기화
          </Button>
          <Button
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            onClick={handleSubmit}
            disabled={loading}
            sx={{ 
              textTransform: 'none',
              backgroundColor: '#3b82f6', // blue-500
              '&:hover': {
                backgroundColor: '#2563eb', // blue-600
              }
            }}
          >
            {loading ? '처리 중...' : '제출'}
          </Button>
        </Box>

        {/* 성공 메시지 */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            폼이 성공적으로 제출되었습니다!
          </Alert>
        </Snackbar>
              </div>
    )
  } 