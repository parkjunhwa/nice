import React from 'react'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ko } from 'date-fns/locale'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { GlobalStyles } from '@mui/material'

// 공통 스타일 함수
const getTextFieldSx = (helperText?: string, disabled?: boolean, readOnly?: boolean) => ({
  ...(helperText && {
    '& .MuiFormHelperText-root': {
      color: 'rgb(239 68 68)', // text-red-500
      fontSize: '0.75rem', // text-xs
      marginTop: '0.25rem', // mt-1
    }
  }),
  ...(disabled && {
    '& .MuiInputBase-root': {
      backgroundColor: 'hsl(var(--color-muted))', // disabled 배경색 (TextField와 동일)
      '& .MuiInputBase-input': {
        color: 'hsl(var(--color-muted-foreground))', // disabled 텍스트색 (TextField와 동일)
        cursor: 'not-allowed',
      }
    },
    // MUI DatePicker disabled 상태 border 색상 통일
    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root.Mui-disabled .MuiPickersOutlinedInput-notchedOutline': {
      borderColor: 'hsl(var(--color-border)) !important',
    },
    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root.Mui-disabled:hover .MuiPickersOutlinedInput-notchedOutline': {
      borderColor: 'hsl(var(--color-border)) !important'
    },
    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root.Mui-disabled.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
      borderColor: 'hsl(var(--color-border)) !important'
    },
    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root.Mui-disabled.Mui-hover .MuiPickersOutlinedInput-notchedOutline': {
      borderColor: 'hsl(var(--color-border)) !important'
    }
  }),
  ...(readOnly && {
    // MUI DatePicker readonly 상태 배경색 적용
    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root': {
      backgroundColor: 'hsl(var(--color-muted)) !important',
      '& .MuiInputBase-input': {
        color: 'hsl(var(--color-muted-foreground)) !important',
        cursor: 'default',
      },
      pointerEvents: 'none',
    },
    // readonly 상태에서 focus 시에도 텍스트 색상 유지
    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root.Mui-focused': {
      backgroundColor: 'hsl(var(--color-muted)) !important',
      '& .MuiInputBase-input': {
        color: 'hsl(var(--color-muted-foreground)) !important',
      },
      '& .MuiInputBase-input.MuiInputBase-input': {
        color: 'hsl(var(--color-muted-foreground)) !important',
      }
    },
    // readonly 상태에서 hover 시에도 텍스트 색상 유지
    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root:hover': {
      backgroundColor: 'hsl(var(--color-muted)) !important',
      '& .MuiInputBase-input': {
        color: 'hsl(var(--color-muted-foreground)) !important',
      }
    },
    // MUI DatePicker readonly 상태 border 색상 통일
    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root .MuiPickersOutlinedInput-notchedOutline': {
      borderColor: 'hsl(var(--color-border)) !important',
    },
    // readonly 상태에서 focus 시에도 border 색상 유지
    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
      borderColor: 'hsl(var(--color-border)) !important',
    },
    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root:hover .MuiPickersOutlinedInput-notchedOutline': {
      borderColor: 'hsl(var(--color-border)) !important',
    }
  }),
  // MUI DatePicker focus 상태 border 색상 통일 (readonly가 아닐 때만)
  ...(!readOnly && {
    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
      borderColor: '#1976d2 !important', // MUI primary color
      borderWidth: '2px !important',
    },
    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root:hover .MuiPickersOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0, 0, 0, 0.87) !important', // MUI default hover color
    }
  })
})

// 요일별 색상 적용 Day 컴포넌트 (일: 빨강, 토: 파랑)
function ColoredPickersDay(dayProps: PickersDayProps) {
  const date = dayProps.day as Date
  const weekday = date.getDay()
  const color = weekday === 0 ? '#ef4444' : (weekday === 6 ? '#2563eb' : undefined)
  return (
    <PickersDay
      {...dayProps}
      sx={color ? { color } : undefined}
    />
  )
}

// ActionBar 기본 동작 유지 + 스타일만 CSS로 오버라이드 (핸들러 안정성 보장)

// 공통 slotProps 생성 함수
const createSlotProps = (
  placeholder: string,
  error: boolean,
  helperText: string | undefined,
  readOnly: boolean | undefined,
  disabled: boolean | undefined,
  clearable: boolean | undefined,
  ariaLabel: string
) => ({
  textField: {
    size: "small" as const,
    fullWidth: true,
    variant: "outlined" as const,
    placeholder,
    error,
    helperText,
    InputProps: {
      readOnly,
    },
    disabled,
    inputProps: {
      'aria-label': ariaLabel,
    },
    sx: getTextFieldSx(helperText, disabled, readOnly)
  },
  actionBar: {
    actions: (clearable ? ['clear', 'cancel', 'accept'] : ['cancel', 'accept']) as ('clear' | 'cancel' | 'accept')[]
  }
})

interface CustomDatePickerProps {
  value: Date | null
  onChange: (value: Date | null) => void
  placeholder?: string
  error?: boolean
  helperText?: string
  readOnly?: boolean
  disabled?: boolean
  clearable?: boolean
  shouldDisableDate?: (date: Date) => boolean
  width?: string | number
  ariaLabel?: string
}

interface MonthPickerProps {
  value: Date | null
  onChange: (value: Date | null) => void
  placeholder?: string
  error?: boolean
  helperText?: string
  readOnly?: boolean
  disabled?: boolean
  clearable?: boolean
  ariaLabel?: string
}

export const DatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  placeholder = "날짜입력",
  error = false,
  helperText,
  readOnly = false,
  disabled = false,
  clearable = true,
  shouldDisableDate,
  width,
  ariaLabel = "날짜 입력",
  ...props
}) => {
  const slotProps = createSlotProps(
    placeholder,
    error,
    helperText,
    readOnly,
    disabled,
    clearable,
    ariaLabel
  )

  const content = (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <GlobalStyles styles={(theme) => ({
        '.MuiDayCalendar-weekDayLabel:nth-of-type(1)': { color: '#ef4444' },
        '.MuiDayCalendar-weekDayLabel:nth-of-type(7)': { color: '#2563eb' },
        '.MuiPickersLayout-actionBar': { display: 'flex', justifyContent: 'flex-end', gap: '0px', padding: '12px 16px' },
        '.MuiPickersLayout-actionBar .MuiButton-root': {
          border: '1px solid #d1d5db',
          color: '#6b7280',
          background: 'transparent',
          padding: '2px 4px',
          lineHeight: 1.5,
          fontSize: '0.8125rem',
          minHeight: '28px'
        },
        '.MuiPickersLayout-actionBar .MuiButton-root:last-child': { border: `1px solid ${theme.palette.primary.main}`, background: theme.palette.primary.main, color: '#fff' }
      })} />
      <MuiDatePicker
        value={value}
        onChange={onChange}
        format="yyyy-MM-dd"
        views={['year', 'month', 'day']}
        slots={{ day: ColoredPickersDay }}
        shouldDisableDate={shouldDisableDate}
        disabled={disabled || readOnly}
        open={readOnly ? false : undefined}
        localeText={{
          cancelButtonLabel: '취소',
          okButtonLabel: '확인',
          clearButtonLabel: '지우기',
          todayButtonLabel: '오늘',
          start: '시작',
          end: '종료',
        }}
        slotProps={slotProps}
        {...props}
      />
    </LocalizationProvider>
  )

  return width ? (
    <div style={{ width }}>{content}</div>
  ) : content
}

export const MonthPicker: React.FC<MonthPickerProps> = ({
  value,
  onChange,
  placeholder = "월 선택",
  error = false,
  helperText,
  readOnly = false,
  disabled = false,
  clearable = true,
  ariaLabel = "월 선택",
  ...props
}) => {
  const slotProps = createSlotProps(
    placeholder,
    error,
    helperText,
    readOnly,
    disabled,
    clearable,
    ariaLabel
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <GlobalStyles styles={(theme) => ({
        '.MuiDayCalendar-weekDayLabel:nth-of-type(1)': { color: '#ef4444' },
        '.MuiDayCalendar-weekDayLabel:nth-of-type(7)': { color: '#2563eb' },
        '.MuiPickersLayout-actionBar': { display: 'flex', justifyContent: 'flex-end', gap: '0px', padding: '12px 16px' },
        '.MuiPickersLayout-actionBar .MuiButton-root': {
          border: '1px solid #d1d5db',
          color: '#6b7280',
          background: 'transparent',
          padding: '2px 4px',
          lineHeight: 1.5,
          fontSize: '0.8125rem',
          minHeight: '28px'
        },
        '.MuiPickersLayout-actionBar .MuiButton-root:last-child': { border: `1px solid ${theme.palette.primary.main}`, background: theme.palette.primary.main, color: '#fff' }
      })} />
      <MuiDatePicker
        value={value}
        onChange={onChange}
        format="yyyy-MM"
        views={['year', 'month']}
        slots={{ day: ColoredPickersDay }}
        disabled={disabled || readOnly}
        open={readOnly ? false : undefined}
        localeText={{
          cancelButtonLabel: '취소',
          okButtonLabel: '확인',
          clearButtonLabel: '지우기',
          todayButtonLabel: '이번달',
          start: '시작',
          end: '종료',
        }}
        slotProps={slotProps}
        {...props}
      />
    </LocalizationProvider>
  )
} 