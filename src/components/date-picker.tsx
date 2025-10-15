import React from 'react'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ko } from 'date-fns/locale'

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
            sx: {
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
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0', // disabled 테두리색
                  },
                  '& .MuiInputBase-input': {
                    color: '#9e9e9e', // disabled 텍스트색
                    cursor: 'not-allowed',
                  }
                }
              })
            }
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
            sx: {
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
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0', // disabled 테두리색
                  },
                  '& .MuiInputBase-input': {
                    color: '#9e9e9e', // disabled 텍스트색
                    cursor: 'not-allowed',
                  }
                }
              })
            }
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