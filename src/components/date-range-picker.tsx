"use client"

import React from 'react'
import { DatePicker } from './date-picker'
import { FormControl, Box, Typography } from '@mui/material'

interface DateRangePickerProps {
  value: [Date | null, Date | null]
  onChange: (value: [Date | null, Date | null]) => void
  placeholder?: string
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  readOnly?: boolean
  className?: string
  label?: string
  clearable?: boolean
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "날짜 범위를 선택하세요",
  size = "small",
  disabled = false,
  readOnly = false,
  className = "",
  label,
  clearable = true
}: DateRangePickerProps) {
  const handleStartDateChange = (newValue: Date | null) => {
    // 시작 날짜가 종료 날짜보다 늦으면 종료 날짜를 null로 설정
    if (newValue && value[1] && newValue > value[1]) {
      onChange([newValue, null])
    } else {
      onChange([newValue, value[1]])
    }
  }

  const handleEndDateChange = (newValue: Date | null) => {
    // 종료 날짜가 시작 날짜보다 이르면 변경하지 않음
    if (newValue && value[0] && newValue < value[0]) {
      return
    }
    onChange([value[0], newValue])
  }

  // 날짜 범위 표시 텍스트
  const getRangeDisplayText = () => {
    if (!value[0] && !value[1]) return placeholder
    
    const startDate = value[0] ? value[0].toLocaleDateString('ko-KR') : ''
    const endDate = value[1] ? value[1].toLocaleDateString('ko-KR') : ''
    
    if (startDate && endDate) {
      return `${startDate} ~ ${endDate}`
    } else if (startDate) {
      return `${startDate} ~ `
    } else if (endDate) {
      return ` ~ ${endDate}`
    }
    
    return placeholder
  }

  // 날짜 범위가 유효한지 확인
  const isRangeValid = value[0] && value[1] && value[0] <= value[1]
  
  // 에러 상태 확인
  const hasError = value[0] && value[1] && value[0] > value[1]

  return (
    <FormControl fullWidth className={className}>
      {label && (
        <Typography className="form-top-label">
          {label}
        </Typography>
      )}
      
      <Box className="flex items-center gap-1">
        <div style={{ width: 140 }}>
          <DatePicker
            value={value[0]}
            onChange={handleStartDateChange}
            placeholder="시작 날짜"
            disabled={disabled}
            readOnly={readOnly}
            error={hasError || undefined}
          />
        </div>
        
        <div className="flex items-center text-gray-400">
          <span className="text-lg font-medium px-0.5">~</span>
        </div>
        
        <div style={{ width: 140 }}>
          <DatePicker
            value={value[1]}
            onChange={handleEndDateChange}
            placeholder="종료 날짜"
            disabled={disabled}
            readOnly={readOnly}
            error={hasError || undefined}
          />
        </div>
      </Box>
      
      {/* 에러 메시지 (Error) */}
      {hasError && (
        <Typography variant="caption" className="text-red-600 mt-1 block">
          에러 메시지 (Error): 날짜 범위가 올바르지 않습니다. 시작 날짜는 종료 날짜보다 이어야 합니다.
        </Typography>
      )}
    </FormControl>
  )
}
