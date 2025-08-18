import React from 'react'
import { DateTimePicker as MuiDateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ko } from 'date-fns/locale'

interface CustomDateTimePickerProps extends Omit<DateTimePickerProps<Date>, 'slotProps'> {
  placeholder?: string
  fullWidth?: boolean
}

export const DateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  placeholder,
  fullWidth = true,
  ...props
}) => {
  const commonProps = {
    format: "yyyy년 MM월 dd일 HH:mm",
    views: ['year', 'month', 'day', 'hours', 'minutes'] as const,
    localeText: {
      cancelButtonLabel: '취소',
      okButtonLabel: '확인',
      clearButtonLabel: '지우기',
      todayButtonLabel: '오늘',
      start: '시작',
      end: '종료',
    },
    slotProps: {
      textField: {
        size: "small" as const,
        fullWidth: true,
        variant: "outlined" as const,
        className: "bg-white"
      }
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <MuiDateTimePicker
        {...props}
        {...commonProps}
      />
    </LocalizationProvider>
  )
} 