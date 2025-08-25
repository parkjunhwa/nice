"use client"

import {
  TextField,
  Button,
  ButtonGroup,
  Checkbox,
  Fab,
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
  Autocomplete,
  Avatar,
  Badge,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Typography,
  Alert,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  CircularProgress,
  Skeleton,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  BottomNavigation,
  BottomNavigationAction,
  Breadcrumbs,
  Drawer,
  Link,
  Menu,
  MenuItem as MenuItemComponent,
  Pagination,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Tabs,
  Tab,
  Box,
  Grid,
  IconButton,
  // 추가 컴포넌트들
  FormGroup,
  InputAdornment,
  OutlinedInput,
  FilledInput,
  Input,
  FormHelperText,
  ListItemIcon,
  ListItemSecondaryAction,
  ListSubheader,
  TablePagination,
  TableSortLabel,
  CardActionArea,
  Popper,
  Grow,
  Fade,
  Zoom,
  Slide,
  Collapse,
  StepConnector,
  StepIcon,
  MobileStepper,
  Popover
} from '@mui/material'
// 아이콘은 공통 모듈에서 import
import {
  SearchIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  MinusIcon,
  SettingsIcon,
  HeartIcon,
  StarIcon,
  CheckIcon,
  XIcon,
  EditIcon,
  HomeIcon,
  MapPinIcon,
  TrashIcon,
  AlertCircleIcon,
  BellIcon,
  MessageCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  ClockIcon,
  DownloadIcon,
  UploadIcon,
  ShareIcon,
  BookmarkIcon,
  FilterIcon,
  SortAscIcon,
  SortDescIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  ZoomInIcon,
  ZoomOutIcon,
  MaximizeIcon,
  MinimizeIcon,
  XCircleIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  HelpCircleIcon,
  FileTextIcon,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  FolderIcon,
  HardDriveIcon,
  DatabaseIcon,
  ServerIcon,
  WifiIcon,
  BluetoothIcon,
  BatteryIcon,
  PowerIcon,
  Volume2Icon,
  MicIcon,
  CameraIcon,
  SmartphoneIcon,
  MonitorIcon,
  TabletIcon,
  LaptopIcon,
  PrinterIcon,
  KeyboardIcon,
  MouseIcon,
  HeadphonesIcon,
  SpeakerIcon,
  TrophyIcon,
  AwardIcon,
  GiftIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  DollarSignIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  BarChart3Icon,
  PieChart3Icon,
  LineChartIcon,
  ActivityIcon,
  TargetIcon,
  ZapIcon,
  SunIcon,
  MoonIcon,
  CloudIcon,
  BuildingIcon,
  StoreIcon,
  FactoryIcon,
  WarehouseIcon,
  TruckIcon,
  CarIcon,
  BikeIcon,
  PlaneIcon,
  ShipIcon,
  TrainIcon,
  BusIcon,
  RocketIcon,
  SatelliteIcon,
  TelescopeIcon,
  MicroscopeIcon,
  FlaskConicalIcon,
  AtomIcon,
  DnaIcon,
  PillIcon,
  StethoscopeIcon,
  SyringeIcon,
  BandageIcon,
  HeartPulseIcon,
  BrainIcon,
  TestTubeIcon,
  BeakerIcon,
  GraduationCapIcon,
  BookOpenIcon,
  LibraryIcon,
  SchoolIcon,
  UniversityIcon,
  CakeIcon,
  WineIcon,
  CoffeeIcon,
  UtensilsIcon,
  PizzaIcon,
  HamburgerIcon,
  IceCreamIcon,
  CookieIcon,
  AppleIcon,
  CarrotIcon,
  LeafIcon,
  TreesIcon,
  FlowerIcon,
  MountainIcon
} from '@/components/icons'
import { useState } from 'react'

export default function MuiPage() {
  const [value, setValue] = useState(0)
  const [open, setOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [toggleValue, setToggleValue] = useState<string | null>('left')
  const [deletableChips, setDeletableChips] = useState(['삭제 가능 1', '삭제 가능 2', '삭제 가능 3'])
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)
  const [popoverPlacement, setPopoverPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('top')

  // 공통 input 스타일 (기본 속성만 유지, 스타일은 SCSS에서 전역 관리)
  const commonInputProps = {
    size: "small" as const
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null,
  ) => {
    setToggleValue(newValue)
  }

  const handleChipDelete = (chipToDelete: string) => {
    setDeletableChips((chips) => chips.filter((chip) => chip !== chipToDelete))
  }

  const steps = [
    {
      label: '기본 정보',
      description: `이름, 이메일, 전화번호 등 기본 정보를 입력하세요.`,
    },
    {
      label: '주소 정보',
      description: '주소, 도시, 우편번호를 입력하세요.',
    },
    {
      label: '계정 설정',
      description: `비밀번호와 보안 설정을 완료하세요.`,
    },
  ]

  return (
      <div className="space-y-8">
        {/* 페이지 헤더 */}
        <div className="c-page-header">
          <h1 className="c-page-header__title">Material-UI Components</h1>
          <p className="c-page-header__description">
            MUI 컴포넌트 라이브러리의 모든 컴포넌트 예시
          </p>
        </div>

        {/* INPUTS 섹션 */}
        <div>
          <Typography variant="h4" className="mb-6 font-bold text-gray-900">
            INPUTS
          </Typography>
          
          <Grid container spacing={4}>
            {/* Autocomplete */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Autocomplete
                </Typography>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  프레임워크 선택
                </label>
                <Autocomplete
                  options={['React', 'Vue', 'Angular', 'Svelte', 'Next.js']}
                  size="small"
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      variant="outlined" 
                      {...commonInputProps}
                      placeholder="프레임워크를 선택하세요"
                    />
                  )}
                />
              </Paper>
            </Grid>

            {/* Button */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Button
                </Typography>
                <div className="space-y-3">
                  <Button variant="contained" color="primary">Primary</Button>
                  <Button variant="contained" color="secondary">Secondary</Button>
                  <Button variant="outlined">Outlined</Button>
                  <Button variant="text">Text</Button>
                </div>
              </Paper>
            </Grid>

            {/* Button Group */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Button Group
                </Typography>
                <ButtonGroup variant="contained" aria-label="outlined button group">
                  <Button>One</Button>
                  <Button>Two</Button>
                  <Button>Three</Button>
                </ButtonGroup>
              </Paper>
            </Grid>

            {/* Checkbox */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Checkbox
                </Typography>
                <div>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="기본 체크박스" />
                  <FormControlLabel control={<Checkbox />} label="체크되지 않은 체크박스" />
                  <FormControlLabel control={<Checkbox disabled />} label="비활성화된 체크박스" />
                </div>
              </Paper>
            </Grid>

            {/* Floating Action Button */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Floating Action Button
                </Typography>
                <Fab color="primary" aria-label="add">
                  <PlusIcon size={24} />
                </Fab>
              </Paper>
            </Grid>

            {/* Radio Group */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Radio Group
                </Typography>
                <FormControl component="fieldset">
                  <FormLabel component="legend">성별 선택</FormLabel>
                  <RadioGroup defaultValue="female" name="gender">
                    <FormControlLabel value="female" control={<Radio />} label="여성" />
                    <FormControlLabel value="male" control={<Radio />} label="남성" />
                    <FormControlLabel value="other" control={<Radio />} label="기타" />
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>

            {/* Rating */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Rating
                </Typography>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              </Paper>
            </Grid>

            {/* Select */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Select
                </Typography>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  옵션 선택
                </label>
                <FormControl fullWidth>
                  <Select defaultValue="" displayEmpty {...commonInputProps}>
                    <MenuItem value="">
                      <em>선택하세요</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Grid>

            {/* Slider */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Slider
                </Typography>
                <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
              </Paper>
            </Grid>

            {/* Switch */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Switch
                </Typography>
                <FormControlLabel control={<Switch defaultChecked />} label="알림 받기" />
              </Paper>
            </Grid>

            {/* Text Field */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Text Field
                </Typography>
                 <div className="space-y-4">
                   <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                       Normal 상태
                </label>
                <TextField 
                  variant="outlined" 
                  fullWidth 
                       size="small"
                  {...commonInputProps}
                       placeholder="일반 입력 필드"
                       InputProps={{
                         startAdornment: <UserIcon size={18} className="text-gray-400" />
                       }}
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       에러 상태
                     </label>
                     <TextField 
                       variant="outlined" 
                       fullWidth 
                       size="small"
                       {...commonInputProps}
                       placeholder="에러 상태 예시"
                       error
                       helperText="이 필드는 필수 입력 항목입니다."
                       InputProps={{
                         startAdornment: <AlertCircleIcon size={18} className="text-red-500" />
                       }}
                     />
                     
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Readonly 상태
                     </label>
                     <TextField 
                       variant="outlined" 
                       fullWidth 
                       size="small"
                       {...commonInputProps}
                       value="읽기 전용 텍스트"
                       InputProps={{
                         readOnly: true,
                         startAdornment: <EyeIcon size={18} className="text-gray-400" />
                       }}
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Disabled 상태
                     </label>
                     <TextField 
                       variant="outlined" 
                       fullWidth 
                       size="small"
                       {...commonInputProps}
                       placeholder="비활성화된 필드"
                       disabled
                       InputProps={{
                         startAdornment: <LockIcon size={18} className="text-gray-400" />
                       }}
                     />
                   </div>
                 </div>
              </Paper>
            </Grid>

            {/* Toggle Button */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Toggle Button
                </Typography>
                <div className="space-y-4">
                  <div>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      현재 선택된 값: {toggleValue || '없음'}
                    </Typography>
                    <ToggleButtonGroup 
                      value={toggleValue} 
                      exclusive 
                      size="small"
                      onChange={handleToggleChange}
                      sx={{
                        height: '36px',
                        '& .MuiToggleButton-root': {
                          height: '36px',
                          padding: '4px 12px',
                          fontSize: '14px',
                          lineHeight: '1.25',
                          border: '1px solid rgba(0, 0, 0, 0.12)',
                          '&:not(:last-of-type)': {
                            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                          },
                          '&:first-of-type': {
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                          },
                          '&:last-of-type': {
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                          },
                          '&:not(:first-of-type):not(:last-of-type)': {
                            borderRadius: 0,
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                            color: 'rgb(25, 118, 210)',
                            '&:hover': {
                              backgroundColor: 'rgba(25, 118, 210, 0.12)',
                            },
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          },
                        },
                      }}
                    >
                      <ToggleButton value="left" size="small">Left</ToggleButton>
                      <ToggleButton value="center" size="small">Center</ToggleButton>
                      <ToggleButton value="right" size="small">Right</ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                  
                </div>
              </Paper>
            </Grid>

            {/* Form Control */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Form Control
                </Typography>
                <FormControl fullWidth>
                  <FormLabel component="legend">폼 레이블</FormLabel>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    입력 필드
                  </label>
                  <TextField
                    variant="outlined"
                    {...commonInputProps}
                    placeholder="텍스트를 입력하세요"
                  />
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </div>

        <Divider />

        {/* DATA DISPLAY 섹션 */}
        <div>
          <Typography variant="h4" className="mb-6 font-bold text-gray-900">
            DATA DISPLAY
          </Typography>
          
          <Grid container spacing={4}>
            {/* Avatar */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Avatar
                </Typography>
                <div className="flex space-x-4">
                  <Avatar>H</Avatar>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>N</Avatar>
                  <Avatar sx={{ bgcolor: 'success.main' }}>OP</Avatar>
                </div>
              </Paper>
            </Grid>

            {/* Badge */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Badge
                </Typography>
                <Badge badgeContent={4} color="primary">
                  <MailIcon size={24} />
                </Badge>
              </Paper>
            </Grid>

            {/* Chip */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Chip
                </Typography>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Chip label="기본" />
                    <Chip label="클릭 가능" clickable />
                  </div>
                  <div>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      삭제 가능한 칩들:
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                      {deletableChips.map((chip, index) => (
                        <Chip
                          key={index}
                          label={chip}
                          onDelete={() => handleChipDelete(chip)}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </div>
                    {deletableChips.length === 0 && (
                      <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                        모든 칩이 삭제되었습니다.
                      </Typography>
                    )}
                  </div>
                </div>
              </Paper>
            </Grid>

            {/* Divider */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Divider
                </Typography>
                <div>
                  <div className="space-y-4">위 내용</div>
                  <Divider />
                  <div className="space-y-4">아래 내용</div>
                </div>
              </Paper>
            </Grid>

            {/* Icons */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Icons
                </Typography>
                <div className="flex space-x-4">
                  <HomeIcon size={24} />
                  <HeartIcon size={24} />
                  <MapPinIcon size={24} />
                  <UserIcon size={24} />
                  <SettingsIcon size={24} />
                </div>
              </Paper>
            </Grid>

            {/* List */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  List
                </Typography>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <UserIcon size={20} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="사용자 1" secondary="사용자 설명" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <UserIcon size={20} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="사용자 2" secondary="사용자 설명" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Table */}
            <Grid item xs={12}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Table
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell>이메일</TableCell>
                        <TableCell>역할</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>홍길동</TableCell>
                        <TableCell>hong@example.com</TableCell>
                        <TableCell>관리자</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>김철수</TableCell>
                        <TableCell>kim@example.com</TableCell>
                        <TableCell>사용자</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            {/* Large Data Table - 40x40 */}
            <Grid item xs={12}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  대용량 데이터 테이블 (40x40)
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mb-4">
                  가로 40셀, 세로 40라인의 대용량 데이터 테이블 예시입니다.
                </Typography>
                                 <TableContainer sx={{ maxHeight: 600, overflowX: 'auto', width: '100%' }}>
                   <Table size="small" stickyHeader sx={{ width: '100%', tableLayout: 'fixed' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>ID</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>이름</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>이메일</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>전화번호</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>나이</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>직업</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>회사</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>부서</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>직급</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>입사일</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>급여</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>성별</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>주소</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>도시</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>우편번호</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>국가</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>언어</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>시간대</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>통화</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>생년월일</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>학력</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>전공</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>경력</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>스킬</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>인증서</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>프로젝트</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>담당업무</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>상태</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>우선순위</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>마감일</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>진행률</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>담당자</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>예산</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>비용</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>수익</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>ROI</TableCell>
                        <TableCell sx={{ width: '2.5%', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>평가</TableCell>
                      </TableRow>
                    </TableHead>
                                         <TableBody>
                       {Array.from({ length: 40 }, (_, rowIndex) => (
                         <TableRow key={rowIndex} hover>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rowIndex + 1}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>사용자{rowIndex + 1}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>user{rowIndex + 1}@example.com</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>010-1234-{String(rowIndex + 1000).padStart(4, '0')}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{20 + (rowIndex % 40)}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{['개발자', '디자이너', '기획자', '마케터', '영업'][rowIndex % 5]}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>회사{(rowIndex % 10) + 1}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{['개발팀', '디자인팀', '기획팀', '마케팅팀', '영업팀'][rowIndex % 5]}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{['사원', '대리', '과장', '차장', '부장'][rowIndex % 5]}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>202{Math.floor(rowIndex / 10) + 3}-{String((rowIndex % 12) + 1).padStart(2, '0')}-{String((rowIndex % 28) + 1).padStart(2, '0')}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(3000 + (rowIndex * 100)).toLocaleString()}만원</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rowIndex % 2 === 0 ? '남성' : '여성'}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>서울시 강남구 테헤란로 {rowIndex + 1}길</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>서울</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{String(60000 + rowIndex).padStart(5, '0')}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>대한민국</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>한국어</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>UTC+9</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>KRW</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>199{Math.floor(rowIndex / 10) + 0}-{String((rowIndex % 12) + 1).padStart(2, '0')}-{String((rowIndex % 28) + 1).padStart(2, '0')}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{['고졸', '전문대', '대졸', '석사', '박사'][rowIndex % 5]}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{['컴퓨터공학', '디자인', '경영학', '마케팅', '경제학'][rowIndex % 5]}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rowIndex + 1}년</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{['JavaScript', 'Python', 'Java', 'C++', 'React'][rowIndex % 5]}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'][rowIndex % 5]}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>프로젝트{rowIndex + 1}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{['개발', '디자인', '기획', '테스트', '배포'][rowIndex % 5]}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{['진행중', '완료', '보류', '취소'][rowIndex % 4]}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{['낮음', '보통', '높음', '긴급'][rowIndex % 4]}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>2024-{String((rowIndex % 12) + 1).padStart(2, '0')}-{String((rowIndex % 28) + 1).padStart(2, '0')}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rowIndex * 2.5}%</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>담당자{rowIndex + 1}</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(1000 + rowIndex * 50).toLocaleString()}만원</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(500 + rowIndex * 25).toLocaleString()}만원</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(1500 + rowIndex * 75).toLocaleString()}만원</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{((rowIndex + 1) * 2.5).toFixed(1)}%</TableCell>
                           <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{['A', 'B', 'C', 'D'][rowIndex % 4]}</TableCell>
                         </TableRow>
                       ))}
                     </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="textSecondary">
                    총 40개 행, 40개 열의 데이터
                  </Typography>
                  <TablePagination
                    component="div"
                    count={40}
                    page={0}
                    onPageChange={() => {}}
                    rowsPerPage={10}
                    onRowsPerPageChange={() => {}}
                    labelRowsPerPage="페이지당:"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to}/${count}`}
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Tooltip */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Tooltip
                </Typography>
                <Tooltip title="이것은 툴팁입니다">
                  <Button>마우스를 올려보세요</Button>
                </Tooltip>
              </Paper>
            </Grid>
          </Grid>
        </div>

        <Divider />

        {/* FEEDBACK 섹션 */}
        <div>
          <Typography variant="h4" className="mb-6 font-bold text-gray-900">
            FEEDBACK
          </Typography>
          
          <Grid container spacing={4}>
            {/* Alert */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Alert
                </Typography>
                <div className="space-y-2">
                  <Alert severity="error">에러 메시지입니다!</Alert>
                  <Alert severity="warning">경고 메시지입니다!</Alert>
                  <Alert severity="info">정보 메시지입니다!</Alert>
                  <Alert severity="success">성공 메시지입니다!</Alert>
                </div>
              </Paper>
            </Grid>

            {/* Backdrop */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Backdrop
                </Typography>
                <Button onClick={() => setOpen(true)}>Backdrop 열기</Button>
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open}
                  onClick={() => setOpen(false)}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Paper>
            </Grid>

            {/* Dialog */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Dialog
                </Typography>
                <Button variant="outlined" onClick={() => setOpen(true)}>
                  다이얼로그 열기
                </Button>
                <Dialog 
                  open={open} 
                  onClose={() => setOpen(false)}
                  PaperProps={{
                    sx: {
                      minWidth: '600px',
                      minHeight: '300px',
                      zIndex: 1500
                    }
                  }}
                  BackdropProps={{
                    sx: {
                      zIndex: 1400
                    }
                  }}
                >
                  <DialogTitle>다이얼로그 제목</DialogTitle>
                  <DialogContent>
                    <Typography>다이얼로그 내용입니다.</Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button variant="contained" color="secondary" onClick={() => setOpen(false)}>취소</Button>
                    <Button variant="contained" color="primary" onClick={() => setOpen(false)} autoFocus>확인</Button>
                  </DialogActions>
                </Dialog>
              </Paper>
            </Grid>

            {/* Progress */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Progress
                </Typography>
                <div className="space-y-4">
                  <LinearProgress variant="determinate" value={75} />
                  <CircularProgress variant="determinate" value={75} />
                </div>
              </Paper>
            </Grid>

            {/* Skeleton */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Skeleton
                </Typography>
                <div className="space-y-2">
                  <Skeleton variant="text" />
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={210} height={118} />
                </div>
              </Paper>
            </Grid>

            {/* Snackbar */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Snackbar
                </Typography>
                <Button onClick={() => setSnackbarOpen(true)}>Snackbar 열기</Button>
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={6000}
                  onClose={() => setSnackbarOpen(false)}
                  message="Snackbar 메시지입니다"
                  sx={{
                    zIndex: 1400
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>

        <Divider />

        {/* SURFACES 섹션 */}
        <div>
          <Typography variant="h4" className="mb-6 font-bold text-gray-900">
            SURFACES
          </Typography>
          
          <Grid container spacing={4}>
            {/* Accordion */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Accordion
                </Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ChevronDownIcon size={20} />}>
                    <Typography>아코디언 제목</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>아코디언 내용입니다.</Typography>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>

            {/* App Bar */}
            <Grid item xs={12}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  App Bar
                </Typography>
                <AppBar position="static">
                  <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      앱 제목
                    </Typography>
                    <IconButton color="inherit">
                      <SearchIcon size={24} />
                    </IconButton>
                    <IconButton color="inherit">
                      <BellIcon size={24} />
                    </IconButton>
                  </Toolbar>
                </AppBar>
              </Paper>
            </Grid>

            {/* Card */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Card
                </Typography>
                <Card>
                  <CardMedia
                    component="img"
                    sx={{ height: '50px' }}
                    image="/images/logo.png"
                    alt="카드 이미지"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      카드 제목
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      카드 내용입니다. 이곳에 설명이나 세부 정보를 작성할 수 있습니다.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">공유</Button>
                    <Button size="small">자세히 보기</Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>

            {/* Paper */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Paper
                </Typography>
                <Paper elevation={3} className="p-4">
                  <Typography>Paper 컴포넌트입니다. 그림자와 함께 표시됩니다.</Typography>
                </Paper>
              </Paper>
            </Grid>
          </Grid>
        </div>

        <Divider />

        {/* NAVIGATION 섹션 */}
        <div>
          <Typography variant="h4" className="mb-6 font-bold text-gray-900">
            NAVIGATION
          </Typography>
          
          <Grid container spacing={4}>
            {/* Bottom Navigation */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Bottom Navigation
                </Typography>
                <div className="space-y-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">홈</label>
                  <label className="block text-sm font-medium text-gray-700">즐겨찾기</label>
                  <label className="block text-sm font-medium text-gray-700">위치</label>
                </div>
                <Paper sx={{ position: 'relative' }} elevation={3}>
                  <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue)
                    }}
                  >
                    <BottomNavigationAction icon={<HomeIcon size={24} />} />
                    <BottomNavigationAction icon={<HeartIcon size={24} />} />
                    <BottomNavigationAction icon={<MapPinIcon size={24} />} />
                  </BottomNavigation>
                </Paper>
              </Paper>
            </Grid>

            {/* Breadcrumbs */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Breadcrumbs
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="#">
                    홈
                  </Link>
                  <Link underline="hover" color="inherit" href="#">
                    사용자
                  </Link>
                  <Typography color="text.primary">프로필</Typography>
                </Breadcrumbs>
              </Paper>
            </Grid>

            {/* Drawer */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Drawer
                </Typography>
                <Button onClick={() => setDrawerOpen(true)}>Drawer 열기</Button>
                <Drawer
                  anchor="left"
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                >
                  <Box sx={{ width: 250 }} role="presentation">
                    <List>
                      <ListItem>
                        <ListItemText primary="메뉴 항목 1" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="메뉴 항목 2" />
                      </ListItem>
                    </List>
                  </Box>
                </Drawer>
              </Paper>
            </Grid>

            {/* Link */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Link
                </Typography>
                <Link href="#" underline="hover">
                  링크 예시
                </Link>
              </Paper>
            </Grid>

            {/* Menu */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Menu
                </Typography>
                <Button
                  onClick={(event) => setMenuAnchor(event.currentTarget)}
                >
                  메뉴 열기
                </Button>
                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={() => setMenuAnchor(null)}
                >
                  <MenuItemComponent onClick={() => setMenuAnchor(null)}>메뉴 항목 1</MenuItemComponent>
                  <MenuItemComponent onClick={() => setMenuAnchor(null)}>메뉴 항목 2</MenuItemComponent>
                  <MenuItemComponent onClick={() => setMenuAnchor(null)}>메뉴 항목 3</MenuItemComponent>
                </Menu>
              </Paper>
            </Grid>

            {/* Pagination */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Pagination
                </Typography>
                <Pagination count={10} />
              </Paper>
            </Grid>

            {/* Speed Dial */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Speed Dial
                </Typography>
                <SpeedDial
                  ariaLabel="SpeedDial example"
                  sx={{ position: 'relative' }}
                  icon={<PlusIcon size={24} />}
                >
                  <SpeedDialAction
                    icon={<EditIcon size={24} />}
                    tooltipTitle="편집"
                  />
                  <SpeedDialAction
                    icon={<TrashIcon size={24} />}
                    tooltipTitle="삭제"
                  />
                </SpeedDial>
              </Paper>
            </Grid>

            {/* Stepper */}
            <Grid item xs={12}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Stepper
                </Typography>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel>{step.label}</StepLabel>
                      <StepContent>
                        <Typography>{step.description}</Typography>
                        <Box sx={{ mb: 2 }}>
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
                              뒤로
                            </Button>
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length && (
                  <Paper square elevation={0} sx={{ p: 3, mt: 3, bgcolor: 'grey.50' }}>
                    <Typography>모든 단계가 완료되었습니다!</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1 }}>
                      다시 시작
                    </Button>
                  </Paper>
                )}
              </Paper>
            </Grid>

            {/* Tabs */}
            <Grid item xs={12}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Tabs
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleTabChange} aria-label="탭 네비게이션">
                    <Tab label="탭 1" />
                    <Tab label="탭 2" />
                    <Tab label="탭 3" />
                  </Tabs>
                </Box>
                <Box sx={{ p: 3 }}>
                  {value === 0 && <Typography>탭 1의 내용입니다.</Typography>}
                  {value === 1 && <Typography>탭 2의 내용입니다.</Typography>}
                  {value === 2 && <Typography>탭 3의 내용입니다.</Typography>}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </div>

        <Divider />

        {/* ADDITIONAL COMPONENTS 섹션 */}
        <div>
          <Typography variant="h4" className="mb-6 font-bold text-gray-900">
            ADDITIONAL COMPONENTS
          </Typography>
          
          <Grid container spacing={4}>
            {/* Form Group */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Form Group
                </Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="옵션 1" />
                  <FormControlLabel control={<Checkbox />} label="옵션 2" />
                  <FormControlLabel control={<Checkbox />} label="옵션 3" />
                </FormGroup>
              </Paper>
            </Grid>

            {/* Input with Adornment */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Input with Adornment
                </Typography>
                 <div className="space-y-4">
                   <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  가격
                </label>
                <TextField
                  variant="outlined"
                       {...commonInputProps}
                       placeholder="가격을 입력하세요"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₩</InputAdornment>,
                  }}
                />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       검색
                     </label>
                     <TextField
                       variant="outlined"
                       {...commonInputProps}
                       placeholder="검색어를 입력하세요"
                       InputProps={{
                         startAdornment: <SearchIcon size={18} className="text-gray-400" />,
                       }}
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       비밀번호
                     </label>
                     <TextField
                       variant="outlined"
                       {...commonInputProps}
                       type="password"
                       placeholder="비밀번호를 입력하세요"
                       InputProps={{
                         startAdornment: <LockIcon size={18} className="text-gray-400" />,
                         endAdornment: <EyeIcon size={18} className="text-gray-400 cursor-pointer" />,
                       }}
                     />
                   </div>
                 </div>
              </Paper>
            </Grid>

            {/* Outlined Input */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Outlined Input
                </Typography>
                 <div className="space-y-4">
                   <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                       무게 입력
                </label>
                <OutlinedInput
                       placeholder="무게를 입력하세요"
                       {...commonInputProps}
                  endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       설정
                     </label>
                     <OutlinedInput
                       placeholder="설정값을 입력하세요"
                       {...commonInputProps}
                       startAdornment={<SettingsIcon size={18} className="text-gray-400" />}
                     />
                   </div>
                 </div>
              </Paper>
            </Grid>

            {/* Basic Input */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Basic Input
                </Typography>
                 <div className="space-y-4">
                   <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                       기본 입력
                </label>
                <Input
                  placeholder="기본 입력"
                       {...commonInputProps}
                       startAdornment={<PlusIcon size={18} className="text-gray-400" />}
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       즐겨찾기
                     </label>
                     <Input
                       placeholder="즐겨찾기 입력"
                       {...commonInputProps}
                       startAdornment={<HeartIcon size={18} className="text-gray-400" />}
                     />
                   </div>
                 </div>
              </Paper>
            </Grid>

            {/* Form Helper Text */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Form Helper Text
                </Typography>
                 <div className="space-y-4">
                   <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <TextField
                  variant="outlined"
                       {...commonInputProps}
                       placeholder="이메일을 입력하세요"
                  helperText="올바른 이메일 형식을 입력하세요"
                  error
                       InputProps={{
                         startAdornment:<MailIcon size={18} className="text-gray-400" />,
                       }}
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       사용자명
                     </label>
                     <TextField
                       variant="outlined"
                       {...commonInputProps}
                       placeholder="사용자명을 입력하세요"
                       helperText="3-20자 사이로 입력하세요"
                       InputProps={{
                         startAdornment: <UserIcon size={18} className="text-gray-400" />,
                       }}
                     />
                   </div>
                 </div>
              </Paper>
            </Grid>

            {/* List with Icons */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  List with Icons
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                       <MailIcon size={20} className="text-blue-500" />
                    </ListItemIcon>
                    <ListItemText primary="이메일" secondary="mail@example.com" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                       <PhoneIcon size={20} className="text-green-500" />
                    </ListItemIcon>
                    <ListItemText primary="전화번호" secondary="010-1234-5678" />
                  </ListItem>
                   <ListItem>
                     <ListItemIcon>
                       <UserIcon size={20} className="text-purple-500" />
                     </ListItemIcon>
                     <ListItemText primary="사용자" secondary="사용자 정보" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* List with Secondary Action */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  List with Secondary Action
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="항목 1" />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="삭제">
                         <TrashIcon size={18} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="항목 2" />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="편집">
                         <EditIcon size={18} />
                       </IconButton>
                     </ListItemSecondaryAction>
                   </ListItem>
                   <ListItem>
                     <ListItemText primary="항목 3" />
                     <ListItemSecondaryAction>
                       <IconButton edge="end" aria-label="확인">
                         <CheckIcon size={18} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* List with Subheader */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  List with Subheader
                </Typography>
                <List subheader={<ListSubheader>카테고리</ListSubheader>}>
                  <ListItem>
                     <ListItemIcon>
                       <StarIcon size={18} className="text-yellow-500" />
                     </ListItemIcon>
                    <ListItemText primary="항목 1" />
                  </ListItem>
                  <ListItem>
                     <ListItemIcon>
                       <HeartIcon size={18} className="text-red-500" />
                     </ListItemIcon>
                    <ListItemText primary="항목 2" />
                  </ListItem>
                   <ListItem>
                     <ListItemIcon>
                       <CheckIcon size={18} className="text-green-500" />
                     </ListItemIcon>
                     <ListItemText primary="항목 3" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Table with Pagination */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Table with Pagination
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                         <TableCell>
                           <div className="flex items-center gap-2">
                             <UserIcon size={16} className="text-gray-500" />
                             이름
                           </div>
                         </TableCell>
                         <TableCell>
                           <div className="flex items-center gap-2">
                             <SettingsIcon size={16} className="text-gray-500" />
                             역할
                           </div>
                         </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>홍길동</TableCell>
                        <TableCell>관리자</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={100}
                  page={0}
                  onPageChange={() => {}}
                  rowsPerPage={10}
                  onRowsPerPageChange={() => {}}
                  labelRowsPerPage="페이지당:"
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to}/${count}`}
                />
              </Paper>
            </Grid>

            {/* Table with Sort Label */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Table with Sort Label
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                           <div className="flex items-center gap-2">
                             <UserIcon size={16} className="text-gray-500" />
                          <TableSortLabel>이름</TableSortLabel>
                           </div>
                        </TableCell>
                        <TableCell>
                           <div className="flex items-center gap-2">
                             <StarIcon size={16} className="text-gray-500" />
                          <TableSortLabel>나이</TableSortLabel>
                           </div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>홍길동</TableCell>
                        <TableCell>30</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            {/* Card with Action Area */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Card with Action Area
                </Typography>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="/images/logo.png"
                      alt="카드 이미지"
                    />
                    <CardContent>
                       <div className="flex items-center gap-2 mb-2">
                         <HeartIcon size={20} className="text-red-500" />
                      <Typography gutterBottom variant="h5" component="div">
                        클릭 가능한 카드
                      </Typography>
                       </div>
                      <Typography variant="body2" color="text.secondary">
                        클릭하면 액션이 실행됩니다.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Paper>
            </Grid>

            {/* Mobile Stepper */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Mobile Stepper
                </Typography>
                <MobileStepper
                  steps={6}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button 
                      size="small" 
                      onClick={handleNext}
                      disabled={activeStep === 5}
                      startIcon={<PlusIcon size={16} />}
                    >
                      다음
                    </Button>
                  }
                  backButton={
                    <Button 
                      size="small" 
                      onClick={handleBack}
                      disabled={activeStep === 0}
                      startIcon={<MinusIcon size={16} />}
                    >
                      뒤로
                    </Button>
                  }
                />
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    단계 {activeStep + 1} / 6
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Collapse */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Collapse
                </Typography>
                <Button onClick={() => setOpen(!open)}>
                  {open ? '접기' : '펼치기'}
                </Button>
                <Collapse in={open}>
                  <Box sx={{ p: 2, bgcolor: 'grey.100', mt: 2 }}>
                    <Typography>접힌 내용이 여기에 표시됩니다.</Typography>
                  </Box>
                </Collapse>
              </Paper>
            </Grid>

            {/* Grow */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Grow
                </Typography>
                <Grow in={open}>
                  <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                    <Typography>성장 애니메이션</Typography>
                  </Box>
                </Grow>
              </Paper>
            </Grid>

            {/* Fade */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Fade
                </Typography>
                <Fade in={open}>
                  <Box sx={{ p: 2, bgcolor: 'secondary.main', color: 'white' }}>
                    <Typography>페이드 애니메이션</Typography>
                  </Box>
                </Fade>
              </Paper>
            </Grid>

            {/* Zoom */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Zoom
                </Typography>
                <Zoom in={open}>
                  <Box sx={{ p: 2, bgcolor: 'success.main', color: 'white' }}>
                    <Typography>줌 애니메이션</Typography>
                  </Box>
                </Zoom>
              </Paper>
            </Grid>

            {/* Slide */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Slide
                </Typography>
                <Slide direction="up" in={open}>
                  <Box sx={{ p: 2, bgcolor: 'warning.main', color: 'white' }}>
                    <Typography>슬라이드 애니메이션</Typography>
                  </Box>
                </Slide>
              </Paper>
            </Grid>

            {/* Popper */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Popper
                </Typography>
                <Button onClick={(event) => setMenuAnchor(event.currentTarget)}>
                  Popper 열기
                </Button>
                <Popper open={Boolean(menuAnchor)} anchorEl={menuAnchor}>
                  <Paper sx={{ p: 2, mt: 1 }}>
                    <Typography>Popper 내용</Typography>
                  </Paper>
                </Popper>
              </Paper>
            </Grid>
          </Grid>
        </div>

        {/* TYPOGRAPHY SHOWCASE 섹션 */}
        <div>
          <Typography variant="h4" className="mb-6 font-bold text-gray-900">
            TYPOGRAPHY SHOWCASE
          </Typography>
          
          <Grid container spacing={4}>
            {/* Typography Variants */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Typography Variants
                </Typography>
                <div className="space-y-2">
                  <Typography variant="h1" gutterBottom>h1. Heading 1</Typography>
                  <Typography variant="h2" gutterBottom>h2. Heading 2</Typography>
                  <Typography variant="h3" gutterBottom>h3. Heading 3</Typography>
                  <Typography variant="h4" gutterBottom>h4. Heading 4</Typography>
                  <Typography variant="h5" gutterBottom>h5. Heading 5</Typography>
                  <Typography variant="h6" gutterBottom>h6. Heading 6</Typography>
                  <Typography variant="subtitle1" gutterBottom>subtitle1. Subtitle 1</Typography>
                  <Typography variant="subtitle2" gutterBottom>subtitle2. Subtitle 2</Typography>
                  <Typography variant="body1" gutterBottom>body1. Body 1 - 기본 본문 텍스트입니다. 이는 기본적인 본문 텍스트 스타일입니다.</Typography>
                  <Typography variant="body2" gutterBottom>body2. Body 2 - 더 작은 본문 텍스트입니다. 이는 보조적인 텍스트에 사용됩니다.</Typography>
                  <Typography variant="button" gutterBottom>button. Button text</Typography>
                  <Typography variant="caption" gutterBottom>caption. Caption text</Typography>
                  <Typography variant="overline" gutterBottom>overline. Overline text</Typography>
                </div>
              </Paper>
            </Grid>

            {/* Typography Colors */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Typography Colors
                </Typography>
                <div className="space-y-2">
                  <Typography variant="h6" color="primary" gutterBottom>Primary Color Text</Typography>
                  <Typography variant="h6" color="secondary" gutterBottom>Secondary Color Text</Typography>
                  <Typography variant="h6" color="error" gutterBottom>Error Color Text</Typography>
                  <Typography variant="h6" color="warning" gutterBottom>Warning Color Text</Typography>
                  <Typography variant="h6" color="info" gutterBottom>Info Color Text</Typography>
                  <Typography variant="h6" color="success" gutterBottom>Success Color Text</Typography>
                  <Typography variant="h6" color="textPrimary" gutterBottom>Text Primary Color</Typography>
                  <Typography variant="h6" color="textSecondary" gutterBottom>Text Secondary Color</Typography>
                </div>
              </Paper>
            </Grid>

            {/* Typography Alignment */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Typography Alignment
                </Typography>
                <div className="space-y-2">
                  <Typography variant="h6" align="left" gutterBottom>Left Aligned Text</Typography>
                  <Typography variant="h6" align="center" gutterBottom>Center Aligned Text</Typography>
                  <Typography variant="h6" align="right" gutterBottom>Right Aligned Text</Typography>
                  <Typography variant="h6" align="justify" gutterBottom>Justify Aligned Text - 이 텍스트는 양쪽 정렬을 보여줍니다. 긴 텍스트에서 양쪽 정렬의 효과를 확인할 수 있습니다.</Typography>
                </div>
              </Paper>
            </Grid>

            {/* Typography with Custom Styling */}
            <Grid item xs={12} md={6}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Custom Styling
                </Typography>
                <div className="space-y-2">
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                      fontStyle: 'italic'
                    }}
                    gutterBottom
                  >
                    Bold, Underlined, Italic Text
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}
                    gutterBottom
                  >
                    Uppercase with Letter Spacing
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      color: 'primary.main'
                    }}
                    gutterBottom
                  >
                    Text with Shadow
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: 'bold'
                    }}
                    gutterBottom
                  >
                    Gradient Text
                  </Typography>
                </div>
              </Paper>
            </Grid>

            {/* Responsive Typography */}
            <Grid item xs={12}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  Responsive Typography
                </Typography>
                <div className="space-y-2">
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
                      textAlign: { xs: 'left', sm: 'center', md: 'right' }
                    }}
                    gutterBottom
                  >
                    Responsive Heading
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                      lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 }
                    }}
                    gutterBottom
                  >
                    이 텍스트는 화면 크기에 따라 폰트 크기와 줄 간격이 조정됩니다. 작은 화면에서는 작은 폰트로, 큰 화면에서는 큰 폰트로 표시되어 가독성을 최적화합니다.
                  </Typography>
                </div>
              </Paper>
            </Grid>

                        {/* Popover & Tooltip */}
            <Grid item xs={12}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'semibold', color: '#111827' }}>
                  Popover & Tooltip
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Tooltip Examples */}
                  <div>
                    <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'medium', color: '#1f2937' }}>
                      Tooltip Examples
                    </Typography>
                    <div className="flex flex-wrap gap-4">
                      <Tooltip 
                        title="Top tooltip with arrow" 
                        arrow 
                        placement="top"
                        sx={{
                          '& .MuiTooltip-tooltip': {
                            backgroundColor: '#000000',
                            color: '#ffffff'
                          },
                          '& .MuiTooltip-arrow': {
                            color: '#000000'
                          }
                        }}
                      >
                        <Button variant="outlined">Top Tooltip</Button>
                      </Tooltip>
                      
                      <Tooltip 
                        title="Bottom tooltip with arrow" 
                        arrow 
                        placement="bottom"
                        sx={{
                          '& .MuiTooltip-tooltip': {
                            backgroundColor: '#000000',
                            color: '#ffffff'
                          },
                          '& .MuiTooltip-arrow': {
                            color: '#000000'
                          }
                        }}
                      >
                        <Button variant="outlined">Bottom Tooltip</Button>
                      </Tooltip>
                      
                      <Tooltip 
                        title="Left tooltip with arrow" 
                        arrow 
                        placement="left"
                        sx={{
                          '& .MuiTooltip-tooltip': {
                            backgroundColor: '#000000',
                            color: '#ffffff'
                          },
                          '& .MuiTooltip-arrow': {
                            color: '#000000'
                          }
                        }}
                      >
                        <Button variant="outlined">Left Tooltip</Button>
                      </Tooltip>
                      
                      <Tooltip 
                        title="Right tooltip with arrow" 
                        arrow 
                        placement="right"
                        sx={{
                          '& .MuiTooltip-tooltip': {
                            backgroundColor: '#000000',
                            color: '#ffffff'
                          },
                          '& .MuiTooltip-arrow': {
                            color: '#000000'
                          }
                        }}
                      >
                        <Button variant="outlined">Right Tooltip</Button>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Popover Examples */}
                  <div>
                    <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'medium', color: '#1f2937' }}>
                      Popover Examples
                    </Typography>
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        variant="contained" 
                        onClick={(e) => {
                          setPopoverAnchor(e.currentTarget)
                          setPopoverPlacement('top')
                        }}
                      >
                        Top Popover
                      </Button>
                      
                      <Button 
                        variant="contained" 
                        onClick={(e) => {
                          setPopoverAnchor(e.currentTarget)
                          setPopoverPlacement('bottom')
                        }}
                      >
                        Bottom Popover
                      </Button>
                      
                      <Button 
                        variant="contained" 
                        onClick={(e) => {
                          setPopoverAnchor(e.currentTarget)
                          setPopoverPlacement('left')
                        }}
                      >
                        Left Popover
                      </Button>
                      
                      <Button 
                        variant="contained" 
                        onClick={(e) => {
                          setPopoverAnchor(e.currentTarget)
                          setPopoverPlacement('right')
                        }}
                      >
                        Right Popover
                      </Button>
                    </div>
                  </div>
                </div>
              </Paper>
          </Grid>

            {/* Lucide Icons Examples */}
            <Grid item xs={12}>
              <Paper className="p-6 shadow-lg rounded-lg">
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'semibold', color: '#111827' }}>
                  Lucide Icons Examples
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Technology Icons */}
                  <div>
                    <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'medium', color: '#1f2937' }}>
                      Technology Icons
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outlined" startIcon={<LaptopIcon size={18} />}>
                        Laptop
                      </Button>
                      <Button variant="outlined" startIcon={<SmartphoneIcon size={18} />}>
                        Smartphone
                      </Button>
                      <Button variant="outlined" startIcon={<TabletIcon size={18} />}>
                        Tablet
                      </Button>
                      <Button variant="outlined" startIcon={<MonitorIcon size={18} />}>
                        Monitor
                      </Button>
                      <Button variant="outlined" startIcon={<ServerIcon size={18} />}>
                        Server
                      </Button>
                      <Button variant="outlined" startIcon={<DatabaseIcon size={18} />}>
                        Database
                      </Button>
        </div>
      </div>

                  {/* Communication Icons */}
                  <div>
                    <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'medium', color: '#1f2937' }}>
                      Communication Icons
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outlined" startIcon={<MailIcon size={18} />}>
                        Mail
                      </Button>
                      <Button variant="outlined" startIcon={<PhoneIcon size={18} />}>
                        Phone
                      </Button>
                      <Button variant="outlined" startIcon={<MessageCircleIcon size={18} />}>
                        Message
                      </Button>
                      <Button variant="outlined" startIcon={<VideoIcon size={18} />}>
                        Video Call
                      </Button>
                      <Button variant="outlined" startIcon={<ShareIcon size={18} />}>
                        Share
                      </Button>
                      <Button variant="outlined" startIcon={<BellIcon size={18} />}>
                        Notifications
                      </Button>
                    </div>
                  </div>

                  {/* Business Icons */}
                  <div>
                    <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'medium', color: '#1f2937' }}>
                      Business Icons
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outlined" startIcon={<BuildingIcon size={18} />}>
                        Building
                      </Button>
                      <Button variant="outlined" startIcon={<StoreIcon size={18} />}>
                        Store
                      </Button>
                      <Button variant="outlined" startIcon={<FactoryIcon size={18} />}>
                        Factory
                      </Button>
                      <Button variant="outlined" startIcon={<WarehouseIcon size={18} />}>
                        Warehouse
                      </Button>
                      <Button variant="outlined" startIcon={<TruckIcon size={18} />}>
                        Truck
                      </Button>
                      <Button variant="outlined" startIcon={<ShipIcon size={18} />}>
                        Ship
                      </Button>
                    </div>
                  </div>

                  {/* Nature Icons */}
                  <div>
                    <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'medium', color: '#1f2937' }}>
                      Nature Icons
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outlined" startIcon={<TreesIcon size={18} />}>
                        Trees
                      </Button>
                      <Button variant="outlined" startIcon={<FlowerIcon size={18} />}>
                        Flower
                      </Button>
                      <Button variant="outlined" startIcon={<MountainIcon size={18} />}>
                        Mountain
                      </Button>
                      <Button variant="outlined" startIcon={<CloudIcon size={18} />}>
                        Cloud
                      </Button>
                      <Button variant="outlined" startIcon={<SunIcon size={18} />}>
                        Sun
                      </Button>
                      <Button variant="outlined" startIcon={<MoonIcon size={18} />}>
                        Moon
                      </Button>
                    </div>
                  </div>

                  {/* Science Icons */}
                  <div>
                    <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'medium', color: '#1f2937' }}>
                      Science Icons
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outlined" startIcon={<AtomIcon size={18} />}>
                        Atom
                      </Button>
                      <Button variant="outlined" startIcon={<DnaIcon size={18} />}>
                        DNA
                      </Button>
                      <Button variant="outlined" startIcon={<FlaskConicalIcon size={18} />}>
                        Flask
                      </Button>
                      <Button variant="outlined" startIcon={<MicroscopeIcon size={18} />}>
                        Microscope
                      </Button>
                      <Button variant="outlined" startIcon={<TelescopeIcon size={18} />}>
                        Telescope
                      </Button>
                      <Button variant="outlined" startIcon={<RocketIcon size={18} />}>
                        Rocket
                      </Button>
                    </div>
                  </div>

                  {/* Finance Icons */}
                  <div>
                    <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'medium', color: '#1f2937' }}>
                      Finance Icons
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outlined" startIcon={<DollarSignIcon size={18} />}>
                        Dollar
                      </Button>
                      <Button variant="outlined" startIcon={<CreditCardIcon size={18} />}>
                        Credit Card
                      </Button>
                      <Button variant="outlined" startIcon={<TrendingUpIcon size={18} />}>
                        Trending Up
                      </Button>
                      <Button variant="outlined" startIcon={<BarChart3Icon size={18} />}>
                        Bar Chart
                      </Button>
                      <Button variant="outlined" startIcon={<PieChart3Icon size={18} />}>
                        Pie Chart
                      </Button>
                      <Button variant="outlined" startIcon={<LineChartIcon size={18} />}>
                        Line Chart
                      </Button>
                    </div>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>

        {/* Popover Component */}
        <Popover
          open={Boolean(popoverAnchor)}
          anchorEl={popoverAnchor}
          onClose={() => setPopoverAnchor(null)}
          anchorOrigin={{
            vertical: popoverPlacement === 'top' ? 'top' : popoverPlacement === 'bottom' ? 'bottom' : 'center',
            horizontal: popoverPlacement === 'left' ? 'left' : popoverPlacement === 'right' ? 'right' : 'center',
          }}
          transformOrigin={{
            vertical: popoverPlacement === 'top' ? 'bottom' : popoverPlacement === 'bottom' ? 'top' : 'center',
            horizontal: popoverPlacement === 'left' ? 'right' : popoverPlacement === 'right' ? 'left' : 'center',
          }}
          sx={{
            '& .MuiPopover-paper': {
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              border: '1px solid rgba(0,0,0,0.1)',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '0',
                height: '0',
                ...(popoverPlacement === 'top' && {
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '8px solid white',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }),
                ...(popoverPlacement === 'bottom' && {
                  top: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderBottom: '8px solid white',
                  filter: 'drop-shadow(0 -2px 4px rgba(0,0,0,0.1))'
                }),
                ...(popoverPlacement === 'left' && {
                  right: '-8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderRight: '8px solid white',
                  filter: 'drop-shadow(2px 0 4px rgba(0,0,0,0.1))'
                }),
                ...(popoverPlacement === 'right' && {
                  left: '-8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderLeft: '8px solid white',
                  filter: 'drop-shadow(-2px 0 4px rgba(0,0,0,0.1))'
                })
              }
            }
          }}
        >
          <div className="p-4 max-w-xs">
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'semibold', color: '#111827' }}>
              Popover Content
            </Typography>
            <Typography variant="body2" sx={{ color: '#4b5563' }}>
              이것은 {popoverPlacement} 방향으로 표시되는 Popover입니다. 
              화살표가 {popoverPlacement} 방향을 가리키고 있습니다.
            </Typography>
            <div className="flex gap-2 mt-3 justify-end">
              <Button 
                size="small" 
                variant="outlined" 
                onClick={() => setPopoverAnchor(null)}
              >
                닫기
              </Button>
              <Button 
                size="small" 
                variant="contained"
                onClick={() => setPopoverAnchor(null)}
              >
                확인
              </Button>
            </div>
          </div>
        </Popover>
      </div>
  )
} 