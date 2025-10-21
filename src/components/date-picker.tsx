import React from 'react'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ko } from 'date-fns/locale'

// 공통 스타일 함수
const getTextFieldSx = (helperText?: string, disabled?: boolean) => ({
  ...(helperText && {
    '& .MuiFormHelperText-root': {
      color: 'rgb(239 68 68)', // text-red-500
      fontSize: '0.75rem', // text-xs
      marginTop: '0.25rem', // mt-1
    }
  }),
  ...(disabled && {
    '& .MuiInputBase-root': {
      backgroundColor: '#f5f5f5', // disabled 배경색
      '& .MuiInputBase-input': {
        color: '#9e9e9e', // disabled 텍스트색
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
  })
})

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
    className: "bg-white",
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
    sx: getTextFieldSx(helperText, disabled)
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
      <MuiDatePicker
        value={value}
        onChange={onChange}
        format="yyyy-MM-dd"
        views={['year', 'month', 'day']}
        shouldDisableDate={shouldDisableDate}
        disabled={disabled || readOnly}
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
      <MuiDatePicker
        value={value}
        onChange={onChange}
        format="yyyy-MM"
        views={['year', 'month']}
        disabled={disabled || readOnly}
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