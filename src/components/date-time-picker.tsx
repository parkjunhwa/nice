import React from 'react'
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ko } from 'date-fns/locale'

interface CustomDateTimePickerProps {
  value: Date | null
  onChange: (value: Date | null) => void
  placeholder?: string
  error?: boolean
  helperText?: string
  readOnly?: boolean
  disabled?: boolean
  clearable?: boolean
}

export const DateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  value,
  onChange,
  placeholder = "날짜/시간입력",
  error = false,
  helperText,
  readOnly = false,
  disabled = false,
  clearable = true,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <MuiDateTimePicker
        value={value}
        onChange={onChange}
        format="yyyy-MM-dd HH:mm"
        views={['year', 'month', 'day', 'hours', 'minutes']}
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
              'aria-label': '날짜/시간 입력',
            }
          }
        }}
        {...props}
      />
    </LocalizationProvider>
  )
} 