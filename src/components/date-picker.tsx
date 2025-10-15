import React from 'react'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ko } from 'date-fns/locale'

// 공통 스타일 함수 (중복 여부: 독립 함수, 단순화 가능. 타 컴포넌트 formula-input 등에서 유사 border 처리 있으나 직접적 중복은 아님)
// disabled 시 borderColor를 TextField와 동일하게 important로 강제
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
    // MUI DatePicker 특정 클래스명으로 정확한 타겟팅
    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root.Mui-disabled .MuiPickersOutlinedInput-notchedOutline': {
      borderColor: 'hsl(var(--color-border)) !important', // TextField와 동일한 disabled border 컬러
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
  ...props
}) => {
  const content = (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <MuiDatePicker
        value={value}
        onChange={onChange}
        format="yyyy-MM-dd"
        views={['year', 'month', 'day']}
        shouldDisableDate={shouldDisableDate}
        disabled={disabled || readOnly} // disabled 또는 readOnly 상태에서 날짜 선택 비활성화
        localeText={{
          cancelButtonLabel: '취소',
          okButtonLabel: '확인',
          clearButtonLabel: '지우기',
          todayButtonLabel: '오늘',
          start: '시작',
          end: '종료',
        }}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
            variant: "outlined",
            className: "bg-white",
            placeholder: placeholder,
            error: error,
            helperText: helperText,
            InputProps: {
              readOnly: readOnly,
            },
            disabled: disabled,
            inputProps: {
              'aria-label': '날짜 입력',
            },
            sx: getTextFieldSx(helperText, disabled)
          },
          actionBar: {
            actions: clearable ? ['clear', 'cancel', 'accept'] : ['cancel', 'accept']
          }
        }}
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
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <MuiDatePicker
        value={value}
        onChange={onChange}
        format="yyyy-MM"
        views={['year', 'month']}
        disabled={disabled || readOnly} // disabled 또는 readOnly 상태에서 날짜 선택 비활성화
        localeText={{
          cancelButtonLabel: '취소',
          okButtonLabel: '확인',
          clearButtonLabel: '지우기',
          todayButtonLabel: '이번달',
          start: '시작',
          end: '종료',
        }}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
            variant: "outlined",
            className: "bg-white",
            placeholder: placeholder,
            error: error,
            helperText: helperText,
            InputProps: {
              readOnly: readOnly,
            },
            disabled: disabled,
            inputProps: {
              'aria-label': '월 선택',
            },
            sx: getTextFieldSx(helperText, disabled)
          },
          actionBar: {
            actions: clearable ? ['clear', 'cancel', 'accept'] : ['cancel', 'accept']
          }
        }}
        {...props}
      />
    </LocalizationProvider>
  )
} 