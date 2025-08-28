"use client"

import { useState } from 'react'
import {
  TextField,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Rating,
  Select,
  MenuItem,
  Slider,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Paper,
  Typography,
  Alert,
  LinearProgress,
  CircularProgress,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Tabs,
  Tab,
  Box,
  Stepper,
  Step,
  StepLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  IconButton,
  Autocomplete,
  InputAdornment,
  MuiBasicModal,
  MuiFormModal,
  MuiConfirmModal,
  MuiFullscreenModal,
} from '@/components'
import { Icons } from '@/components'
import { DatePicker } from '@/components/date-picker'
import { DateTimePicker } from '@/components/date-time-picker'


const {
  MailIcon,
  PhoneIcon,
  StarIcon,
  HomeIcon: GlobeIcon,
  SmartphoneIcon,
  ChevronDownIcon: ExpandMoreIcon,
  BellIcon: NotificationsIcon,
  SearchIcon,
} = Icons

export default function MuiPage() {
  const [rating, setRating] = useState<number | null>(2)
  const [sliderValue, setSliderValue] = useState<number>(30)
  const [switchValue, setSwitchValue] = useState<boolean>(false)
  const [toggleValue, setToggleValue] = useState<string>('web')
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState(0)
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>('panel1')
  const [activeStep, setActiveStep] = useState(0)

  // 다이얼로그 상태들
  const [openBasicDialog, setOpenBasicDialog] = useState<boolean>(false)
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false)
  const [openFullScreenDialog, setOpenFullScreenDialog] = useState<boolean>(false)

  // 폼 다이얼로그 상태
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Search, Autocomplete, Select 상태
  const [searchValue, setSearchValue] = useState('')
  const [autocompleteValue, setAutocompleteValue] = useState<{ label: string; value: string } | null>(null)
  const [selectValue, setSelectValue] = useState('')
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([])
  const [interestAreas, setInterestAreas] = useState<string[]>([])

  // Date Picker 상태
  const [dateValue, setDateValue] = useState<Date | null>(null)
  const [dateTimeValue, setDateTimeValue] = useState<Date | null>(null)



  // Autocomplete 옵션들
  const autocompleteOptions = [
    { label: '서울특별시', value: 'seoul' },
    { label: '부산광역시', value: 'busan' },
    { label: '대구광역시', value: 'daegu' },
    { label: '인천광역시', value: 'incheon' },
    { label: '광주광역시', value: 'gwangju' },
    { label: '대전광역시', value: 'daejeon' },
    { label: '울산광역시', value: 'ulsan' },
    { label: '세종특별자치시', value: 'sejong' },
  ]

  // Select 옵션들
  const selectOptions = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
    { value: 'option4', label: '옵션 4' },
    { value: 'option5', label: '옵션 5' },
  ]

  // Alert 상태 관리
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success')

  // Alert 표시 함수
  const showAlert = (message: string, severity: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setAlertMessage(message)
    setAlertSeverity(severity)
    setAlertOpen(true)
  }

  // 공통 input 스타일
  const commonInputProps = {
    size: "small" as const,
    fullWidth: true,
    variant: "outlined" as const,
    className: "bg-white"
  }

  const handleAccordionChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedAccordion(isExpanded ? panel : false)
  }

  const steps = ['기본 정보', '주소 정보', '결제 정보', '확인']

  return (
    <div className="c-panel bottom-contents-pannel flex-1 min-h-0 flex flex-col">
      <div className="p-0 flex-1 min-h-0">
        <div className="grid grid-cols-4 gap-2">
          {/* 보통 (Normal) */}
          <div className="flex flex-col">
            <label className="form-top-label">보통 (Normal)</label>
            <TextField
              variant="outlined"
              size="small"
              placeholder="검색어를 입력하세요"
              fullWidth

            />
          </div>

          {/* 에러 메시지 (Error with helper text) */}
          <div className="flex flex-col">
            <label className="form-top-label">에러 메시지 (Error)</label>
            <TextField
              {...commonInputProps}
              placeholder="이메일을 입력하세요"
              error
              helperText="올바른 이메일을 입력하세요"
            />
          </div>

          {/* READONLY */}
          <div className="flex flex-col">
            <label className="form-top-label">READONLY</label>
            <TextField
              {...commonInputProps}
              value="010-1234-5678"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>

          {/* DISABLED */}
          <div className="flex flex-col">
            <label className="form-top-label">DISABLED</label>
            <TextField
              {...commonInputProps}
              value="서울특별시 강남구"
              disabled
            />
          </div>
        </div>

        {/* Search, Autocomplete, Select, MultiSelect 행 */}
        <div className="grid grid-cols-5 gap-2 mt-2">
          {/* Search TextField */}
          <div className="flex flex-col">
            <label className="form-top-label">Search</label>
            <TextField
              {...commonInputProps}
              placeholder="검색어를 입력하세요"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon size={16} />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Autocomplete */}
          <div className="flex flex-col">
            <label className="form-top-label">Autocomplete</label>
            <Autocomplete
              size="small"
              options={autocompleteOptions}
              value={autocompleteValue}
              onChange={(event, newValue) => {
                setAutocompleteValue(newValue)
              }}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...commonInputProps}
                  placeholder="도시를 선택하세요"
                />
              )}
            />
          </div>

          {/* Select */}
          <div className="flex flex-col">
            <label className="form-top-label">Select</label>
            <FormControl fullWidth>
              <Select
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                displayEmpty
                className="bg-white"
                size="small"
              >
                <MenuItem value="">
                  <span>옵션을 선택하세요</span>
                </MenuItem>
                {selectOptions.map((option) => (
                  <MenuItem 
                    key={option.value} 
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* MultiSelect */}
          <div className="flex flex-col">
            <label className="form-top-label">MultiSelect</label>
            <FormControl fullWidth size="small">
                   <Select
                     multiple
                     value={interestAreas}
                     onChange={(e) => setInterestAreas(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                     displayEmpty
                     className="bg-white"
                     renderValue={(selected: unknown) => {
                       if (!selected || !Array.isArray(selected) || selected.length === 0) {
                         return <span className="text-gray-500">관심 분야를 선택하세요</span>
                       }
                       return (
                         <div className="flex flex-wrap gap-1">
                           {selected.map((value: string) => (
                             <Chip
                               key={value}
                               label={value}
                               size="small"
                               onDelete={() => {
                                 setInterestAreas(prev => prev.filter(v => v !== value))
                               }}
                               className="bg-blue-100 text-blue-800"
                             />
                           ))}
                         </div>
                       )
                     }}
                   >
                     <MenuItem value="web">웹 개발</MenuItem>
                     <MenuItem value="mobile">모바일 개발</MenuItem>
                     <MenuItem value="ai">인공지능</MenuItem>
                     <MenuItem value="data">데이터 분석</MenuItem>
                   </Select>
                 </FormControl>
          </div>

        </div>

        {/* DatePicker, DateTimePicker 행 */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {/* DatePicker */}
          <div className="flex flex-col">
            <label className="form-top-label">DatePicker</label>
            <DatePicker
              value={dateValue}
              onChange={(newValue: Date | null) => setDateValue(newValue)}
              placeholder="날짜를 선택하세요"
              slotProps={{ textField: { size: "small" as const } }}
            />
          </div>

          {/* DateTimePicker */}
          <div className="flex flex-col">
            <label className="form-top-label">DateTimePicker</label>
            <DateTimePicker
              value={dateTimeValue}
              onChange={(newValue: Date | null) => setDateTimeValue(newValue)}
              placeholder="날짜와 시간을 선택하세요"
              slotProps={{ textField: { size: "small" as const } }}
            />
          </div>

          {/* 빈 공간 */}
          <div className="flex flex-col">
          </div>

          {/* 빈 공간 */}
          <div className="flex flex-col">
          </div>
        </div>

        <div className="flex flex-row  gap-2 mt-4 items-start">
          <Button
            variant="outlined"
            size="small"
            color="error"
            className="bg-white"
            onClick={() => {
              showAlert('삭제되었습니다.', 'error')
            }}
          >
            삭제 알럿
          </Button>
          <Button
            variant="outlined"
            size="small"
            className="bg-white"
            onClick={() => {
              showAlert('처리되었습니다.', 'info')
            }}
          >
            처리 알럿
          </Button>
          <Button
            variant="outlined"
            size="small"
            className="bg-white"
            color="success"
            onClick={() => {
              showAlert('처리 완료!', 'success')
            }}
          >
            처리완료 알럿
          </Button>
        </div>

        {/* 추가 DatePicker 예시들 */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {/* 에러 상태 DatePicker - 기본 */}
          <div className="flex flex-col">
            <label className="form-top-label">에러 상태 DatePicker</label>
            <DatePicker
              value={dateValue}
              onChange={(newValue: Date | null) => setDateValue(newValue)}
              placeholder="에러 상태 날짜"
              error={true}
              helperText="날짜를 선택해주세요"
            />
          </div>

          {/* 에러 상태 DatePicker - 유효성 검사 */}
          <div className="flex flex-col">
            <label className="form-top-label">유효성 검사 에러</label>
            <DatePicker
              value={dateValue}
              onChange={(newValue: Date | null) => setDateValue(newValue)}
              placeholder="유효성 검사 날짜"
              error={true}
              helperText="올바른 날짜 형식이 아닙니다"
            />
          </div>


          {/* 읽기 전용 DatePicker */}
          <div className="flex flex-col">
            <label className="form-top-label">READONLY DatePicker</label>
            <DatePicker
              value={null}
              onChange={(newValue: Date | null) => { }}
              readOnly
              clearable={false}
              placeholder="읽기 전용 날짜"
              slotProps={{
                textField: {
                  size: "small" as const
                }
              }}
            />
          </div>

          {/* 비활성화 DatePicker */}
          <div className="flex flex-col">
            <label className="form-top-label">DISABLED DatePicker</label>
            <DatePicker
              value={dateValue}
              onChange={(newValue: Date | null) => setDateValue(newValue)}
              placeholder="비활성화 날짜"
              disabled
              clearable={false}
              slotProps={{
                textField: {
                  size: "small" as const
                }
              }}
            />
          </div>


        </div>

        {/* 스위치, 라디오, 체크박스 예시들 */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {/* 기본 체크박스 */}
          <div className="flex flex-col">
            <label className="form-top-label">기본 체크박스</label>
            <div className="flex flex-col gap-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={switchValue}
                    onChange={(e) => setSwitchValue(e.target.checked)}
                    size="small"
                  />
                }
                label="기본 체크박스"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={true}
                    disabled
                    size="small"
                  />
                }
                label="비활성화 체크박스"
              />
            </div>
          </div>

          {/* 라디오 버튼 그룹 */}
          <div className="flex flex-col">
            <label className="form-top-label">라디오 버튼 그룹</label>
            <FormControl component="fieldset" size="small">
              <RadioGroup
                value={toggleValue}
                onChange={(e) => setToggleValue(e.target.value)}
              >
                <FormControlLabel
                  value="web"
                  control={<Radio size="small" />}
                  label="웹 개발"
                />
                <FormControlLabel
                  value="mobile"
                  control={<Radio size="small" />}
                  label="모바일 개발"
                />
                <FormControlLabel
                  value="design"
                  control={<Radio size="small" />}
                  label="UI/UX 디자인"
                />
              </RadioGroup>
            </FormControl>
          </div>

          {/* 스위치 토글 */}
          <div className="flex flex-col">
            <label className="form-top-label">스위치 토글</label>
            <div className="flex flex-col gap-2">
              <FormControlLabel
                control={
                  <Switch
                    checked={switchValue}
                    onChange={(e) => setSwitchValue(e.target.checked)}
                    size="small"
                  />
                }
                label="기본 스위치"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={true}
                    disabled
                    size="small"
                  />
                }
                label="비활성화 스위치"
              />
            </div>
          </div>

          {/* 체크박스 그룹 */}
          <div className="flex flex-col">
            <label className="form-top-label">체크박스 그룹</label>
            <div className="flex flex-col gap-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={switchValue}
                    onChange={(e) => setSwitchValue(e.target.checked)}
                    size="small"
                  />
                }
                label="이메일 알림"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={true}
                    size="small"
                  />
                }
                label="SMS 알림"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    size="small"
                  />
                }
                label="푸시 알림"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {/* 기본 다이얼로그 */}
          <div className="flex flex-col">
            <label className="form-top-label">기본 다이얼로그</label>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenBasicDialog(true)}
              className="bg-white"
            >
              기본 다이얼로그 열기
            </Button>
          </div>

          {/* 폼 다이얼로그 */}
          <div className="flex flex-col">
            <label className="form-top-label">폼 다이얼로그</label>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenFormDialog(true)}
              className="bg-white"
            >
              폼 다이얼로그 열기
            </Button>
          </div>

          {/* 확인 다이얼로그 */}
          <div className="flex flex-col">
            <label className="form-top-label">확인 다이얼로그</label>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenConfirmDialog(true)}
              className="bg-white"
            >
              확인 다이얼로그 열기
            </Button>
          </div>

          {/* 전체화면 다이얼로그 */}
          <div className="flex flex-col">
            <label className="form-top-label">전체화면 다이얼로그</label>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenFullScreenDialog(true)}
              className="bg-white"
            >
              전체화면 다이얼로그 열기
            </Button>
          </div>
        </div>

        <div className="mt-6">
          
          
          {/* 체크박스 그룹 */}
          <div className="mb-6">
            <label className="form-top-label">알림 설정</label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="이메일 알림"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="SMS 알림"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="푸시 알림"
              />
            </div>
          </div>
          
          {/* 라디오 버튼 그룹 */}
          <div className="mb-6">
            <label className="form-top-label">계정 유형</label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <FormControlLabel
                value="personal"
                control={<Radio size="small" />}
                label="개인 계정"
              />
              <FormControlLabel
                value="business"
                control={<Radio size="small" />}
                label="비즈니스 계정"
              />
              <FormControlLabel
                value="enterprise"
                control={<Radio size="small" />}
                label="기업 계정"
              />
            </div>
          </div>
          
          {/* 슬라이더 */}
          <div className="mb-6">
            <label className="form-top-label">예상 연봉 (만원)</label>
            <div className="px-2">
              <Slider
                size="small"
                value={sliderValue}
                onChange={(e, newValue) => setSliderValue(newValue as number)}
                min={2000}
                max={10000}
                step={500}
                marks={[
                  { value: 2000, label: '2,000' },
                  { value: 5000, label: '5,000' },
                  { value: 10000, label: '10,000' }
                ]}
                valueLabelDisplay="auto"
                className="mt-2"
              />
            </div>
          </div>
          
          {/* 액션 버튼 */}
          <div className="flex gap-3">
            <Button
              variant="contained"
              size="small"
              color="primary"
              className="bg-blue-600 hover:bg-blue-700"
            >
              저장
            </Button>
            <Button
              variant="outlined"
              size="small"
              className="bg-white"
            >
              취소
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              className="bg-white"
            >
              삭제
            </Button>
          </div>
        </div>
      </div>

      {/* 기본 다이얼로그 */}
      <MuiBasicModal
        open={openBasicDialog}
        onClose={() => setOpenBasicDialog(false)}
        title="기본 다이얼로그"
        message="이것은 기본 다이얼로그입니다. 간단한 메시지나 알림을 표시할 때 사용합니다."
      />

      {/* 폼 다이얼로그 */}
      <MuiFormModal
        open={openFormDialog}
        onClose={() => setOpenFormDialog(false)}
        title="문의하기"
        onSubmit={(data) => {
          console.log('폼 데이터:', data)
          setFormData({ name: '', email: '', message: '' })
        }}
      />

      {/* 확인 다이얼로그 */}
      <MuiConfirmModal
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        title="확인"
        message="정말로 이 작업을 수행하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        severity="warning"
        onConfirm={() => {
          console.log('확인됨')
        }}
      />

      {/* 전체화면 다이얼로그 */}
      <MuiFullscreenModal
        open={openFullScreenDialog}
        onClose={() => setOpenFullScreenDialog(false)}
        title="전체화면 다이얼로그"
        onSubmit={() => {
          console.log('전체화면 모달 저장됨')
        }}
        onDelete={() => {
          showAlert('전체화면 모달에서 항목이 삭제되었습니다!', 'success')
        }}
      />

      {/* MUI Alert Snackbar */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}
