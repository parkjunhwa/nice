import React, { useState, useEffect } from 'react'
import { DateTimePicker as MuiDateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers'
import { TextField } from '@/components'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ko } from 'date-fns/locale'
import { isValid, parse } from 'date-fns'

interface CustomDateTimePickerProps extends Omit<any, 'slotProps'> {
  placeholder?: string
  fullWidth?: boolean
  error?: boolean
  helperText?: string
  onValidationError?: (error: string) => void
  readOnly?: boolean
  disabled?: boolean
  clearable?: boolean
}

export const DateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  placeholder = "날짜시간입력",
  fullWidth = true,
  error = false,
  helperText,
  onValidationError,
  readOnly = false,
  disabled = false,
  clearable = true,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [validationError, setValidationError] = useState<string>('')
  const [hasError, setHasError] = useState<boolean>(error)

  // props.error가 변경될 때 hasError 업데이트
  useEffect(() => {
    setHasError(error)
  }, [error])

  // props.helperText가 변경될 때 validationError 업데이트
  useEffect(() => {
    if (helperText) {
      setValidationError(helperText)
      setHasError(true)
    }
  }, [helperText])

  // 날짜시간 유효성 검사 함수
  const validateDateTime = (dateTimeString: string): boolean => {
    if (!dateTimeString.trim()) return true // 빈 값은 유효함
    
    // yyyy-MM-dd HH:mm 형식 검사
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/
    if (!dateTimeRegex.test(dateTimeString)) {
      return false
    }
    
    // 실제 날짜시간 유효성 검사
    const parsedDateTime = parse(dateTimeString, 'yyyy-MM-dd HH:mm', new Date())
    return isValid(parsedDateTime)
  }

  // 입력값 변경 처리
  const handleInputChange = (value: string) => {
    setInputValue(value)
    
    if (value && !validateDateTime(value)) {
      const errorMessage = "날짜 형식이 아닙니다."
      setValidationError(errorMessage)
      setHasError(true)
      onValidationError?.(errorMessage)
    } else {
      setValidationError('')
      setHasError(false)
      onValidationError?.('')
    }
  }

  const commonProps = {
    format: "yyyy-MM-dd HH:mm",
    inputFormat: props.value ? "yyyy-MM-dd HH:mm" : undefined,
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
        className: "bg-white",
        placeholder: placeholder,
        error: hasError,
        helperText: validationError || helperText,
        InputProps: {
          readOnly: readOnly,
        },
        disabled: disabled,
        inputProps: {
          'aria-label': '날짜 시간 입력',
        }
      }
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <MuiDateTimePicker
        {...props}
        {...commonProps}
        value={props.value}
        clearable={clearable}
        readOnly={readOnly}
        disabled={disabled}
        onChange={(newValue) => {
          if (props.onChange) {
            props.onChange(newValue)
          }
          // 날짜시간이 선택되면 에러 상태 초기화
          if (newValue) {
            setValidationError('')
            setHasError(false)
            onValidationError?.('')
          }
        }}
        slotProps={{
          ...commonProps.slotProps,
          textField: {
            ...commonProps.slotProps.textField,
            placeholder: props.value ? undefined : placeholder,
            error: hasError,
            helperText: validationError || helperText,
            readOnly: readOnly,
            disabled: disabled,
          }
        }}
      />
    </LocalizationProvider>
  )
} 