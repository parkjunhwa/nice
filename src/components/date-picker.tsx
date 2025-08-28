import React from 'react'
import { DatePicker as MuiDatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { TextField } from '@/components'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ko } from 'date-fns/locale'

interface CustomDatePickerProps extends Omit<any, 'slotProps'> {
  placeholder?: string
  fullWidth?: boolean
}

export const DatePicker: React.FC<CustomDatePickerProps> = ({
  placeholder,
  fullWidth = true,
  ...props
}) => {
  const commonProps = {
    format: "yyyy년 MM월 dd일",
    views: ['year', 'month', 'day'] as const,
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
      <MuiDatePicker
        {...props}
        {...commonProps}
      />
    </LocalizationProvider>
  )
} 