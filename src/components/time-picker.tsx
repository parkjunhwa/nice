import React from 'react'
import { TimePicker as MuiTimePicker, TimePickerProps } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ko } from 'date-fns/locale'

interface CustomTimePickerProps extends Omit<TimePickerProps, 'slotProps'> {
  placeholder?: string
  fullWidth?: boolean
}

export const TimePicker: React.FC<CustomTimePickerProps> = ({
  ...props
}) => {
  const commonProps = {
    format: "HH:mm",
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
      <MuiTimePicker
        {...props}
        {...commonProps}
      />
    </LocalizationProvider>
  )
} 