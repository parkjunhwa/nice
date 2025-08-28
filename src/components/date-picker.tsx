import React, { useState, useEffect } from 'react'
import { DatePicker as MuiDatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { TextField } from '@/components'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ko } from 'date-fns/locale'
import { isValid, parse } from 'date-fns'

interface CustomDatePickerProps extends Omit<any, 'slotProps'> {
  placeholder?: string
  fullWidth?: boolean
  error?: boolean
  helperText?: string
  onValidationError?: (error: string) => void
  readOnly?: boolean
  disabled?: boolean
  clearable?: boolean
}

export const DatePicker: React.FC<CustomDatePickerProps> = ({
  placeholder = "날짜입력",
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

  // 날짜 유효성 검사 함수
  const validateDate = (dateString: string): boolean => {
    if (!dateString.trim()) return true // 빈 값은 유효함
    
    // yyyy-MM-dd 형식 검사
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(dateString)) {
      return false
    }
    
    // 실제 날짜 유효성 검사
    const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date())
    return isValid(parsedDate)
  }

  // 입력값 변경 처리
  const handleInputChange = (value: string) => {
    setInputValue(value)
    
    if (value && !validateDate(value)) {
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
    format: "yyyy-MM-dd",
    inputFormat: props.value ? "yyyy-MM-dd" : undefined,
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
        className: "bg-white",
        placeholder: placeholder,
        error: hasError,
        helperText: validationError || helperText,
        InputProps: {
          readOnly: readOnly,
        },
        disabled: disabled,
        inputProps: {
          'aria-label': '날짜 입력',
        }
      }
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <MuiDatePicker
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
          // 날짜가 선택되면 에러 상태 초기화
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