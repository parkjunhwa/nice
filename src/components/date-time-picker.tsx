import React from 'react'
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ko } from 'date-fns/locale'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { GlobalStyles } from '@mui/material'

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
      <MuiDateTimePicker
        value={value}
        onChange={onChange}
        format="yyyy-MM-dd HH:mm"
        views={['year', 'month', 'day', 'hours', 'minutes']}
        slots={{ day: ColoredPickersDay as unknown as React.ComponentType<PickersDayProps> }}
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