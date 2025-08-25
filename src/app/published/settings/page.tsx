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
// 공통 아이콘은 '@/components/icons'에서 관리
import * as Icons from '@/components/icons'
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

  // 공통 input 스타일
  const commonInputProps = {
    size: "small" as const,
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
      {/* top-search-panel */}
      <div className="c-panel top-search-panel">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">검색 패널</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outlined" size="small" startIcon={<Icons.FilterIcon size={16} />}>
                필터
              </Button>
              <Button variant="outlined" size="small" startIcon={<Icons.SortAscIcon size={16} />}>
                정렬
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                키워드 검색
              </label>
              <TextField
                variant="outlined"
                size="small"
                placeholder="검색어를 입력하세요"
                fullWidth
                InputProps={{
                  startAdornment: <Icons.SearchIcon size={18} className="text-gray-400" />
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    height: '36px',
                    fontSize: '14px'
                  }
                }}
              />
        </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리
              </label>
              <FormControl fullWidth size="small">
                <Select
                  defaultValue=""
                  displayEmpty
                  {...commonInputProps}
                >
                  <MenuItem value="">전체 카테고리</MenuItem>
                  <MenuItem value="tech">기술</MenuItem>
                  <MenuItem value="design">디자인</MenuItem>
                  <MenuItem value="business">비즈니스</MenuItem>
                </Select>
              </FormControl>
          </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상태
              </label>
              <FormControl fullWidth size="small">
                <Select
                  defaultValue=""
                  displayEmpty
                  {...commonInputProps}
                >
                  <MenuItem value="">전체 상태</MenuItem>
                  <MenuItem value="active">활성</MenuItem>
                  <MenuItem value="inactive">비활성</MenuItem>
                  <MenuItem value="pending">대기중</MenuItem>
                </Select>
              </FormControl>
        </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="고급 검색"
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
              />
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="즐겨찾기만"
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
              />
        </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outlined" size="small" startIcon={<Icons.RefreshCwIcon size={16} />}>
                새로고침
              </Button>
              <Button variant="contained" size="small" startIcon={<Icons.SearchIcon size={16} />}>
                검색
              </Button>
      </div>
          </div>
        </div>
      </div>

      {/* 상단 c-panel */}
      <div className="c-panel">
        <div className="p-0">
          1
        </div>
      </div>

    </div>
  )
} 