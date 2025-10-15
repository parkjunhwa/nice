"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { TextField, Box, Chip, IconButton } from '@mui/material'
import { Plus, X } from 'lucide-react'

interface FormulaInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  options?: string[]
}


const FormulaInput: React.FC<FormulaInputProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = "수식을 입력하세요",
  options = ['매출액', '건수', '충전량(kWh)']
}) => {
  const [displayText, setDisplayText] = useState('')
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [draggedChip, setDraggedChip] = useState<string | null>(null)
  const textFieldRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<HTMLDivElement>(null)
  const onChangeRef = useRef(onChange)
  const prevValueRef = useRef(value)

  // onChange ref 업데이트
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  // 텍스트를 파싱하여 칩과 일반 텍스트를 구분
  const parseText = (text: string) => {
    const parts = []
    let currentIndex = 0
    
    // 모든 옵션의 위치를 찾아서 정렬
    const optionPositions = []
    for (const option of options) {
      let searchIndex = 0
      while (searchIndex < text.length) {
        const optionIndex = text.indexOf(option, searchIndex)
        if (optionIndex !== -1) {
          optionPositions.push({
            option,
            startIndex: optionIndex,
            endIndex: optionIndex + option.length
          })
          searchIndex = optionIndex + 1
        } else {
          break
        }
      }
    }
    
    // 위치순으로 정렬
    optionPositions.sort((a, b) => a.startIndex - b.startIndex)
    
    // 겹치는 부분 제거 (같은 위치에 여러 옵션이 있는 경우)
    const uniquePositions: Array<{option: string, startIndex: number, endIndex: number}> = []
    for (const pos of optionPositions) {
      const isOverlapping = uniquePositions.some(existing => 
        (pos.startIndex >= existing.startIndex && pos.startIndex < existing.endIndex) ||
        (pos.endIndex > existing.startIndex && pos.endIndex <= existing.endIndex)
      )
      if (!isOverlapping) {
        uniquePositions.push(pos)
      }
    }
    
    // 파싱 실행
    for (const pos of uniquePositions) {
      // 옵션 앞의 텍스트가 있으면 일반 텍스트로 추가
      if (pos.startIndex > currentIndex) {
        const textPart = text.slice(currentIndex, pos.startIndex)
        if (textPart) {
          parts.push({ type: 'text', content: textPart, startIndex: currentIndex, endIndex: pos.startIndex })
        }
      }
      
      // 칩 추가
      parts.push({ type: 'chip', content: pos.option, startIndex: pos.startIndex, endIndex: pos.endIndex })
      currentIndex = pos.endIndex
    }
    
    // 남은 텍스트가 있으면 추가
    if (currentIndex < text.length) {
      const remainingText = text.slice(currentIndex)
      if (remainingText) {
        parts.push({ type: 'text', content: remainingText, startIndex: currentIndex, endIndex: text.length })
      }
    }
    
    return parts
  }


  // 칩 추가 - 현재 커서 위치에 추가
  const handleAddChip = (chipValue: string) => {
    const textField = textFieldRef.current
    if (textField) {
      const inputElement = textField.querySelector('input') as HTMLInputElement
      if (inputElement) {
        const cursorPos = inputElement.selectionStart || 0
        const beforeCursor = displayText.slice(0, cursorPos)
        const afterCursor = displayText.slice(cursorPos)
        
        // 칩을 커서 위치에 삽입
        const newText = beforeCursor + chipValue + afterCursor
        handleDisplayTextChange(newText)
        
        // 커서 위치를 칩 뒤로 이동
        setTimeout(() => {
          const newCursorPos = cursorPos + chipValue.length
          inputElement.setSelectionRange(newCursorPos, newCursorPos)
          inputElement.focus()
        }, 0)
      }
    }
    setShowAutocomplete(false)
  }

  // 초기화 버튼 핸들러
  const handleClear = () => {
    handleDisplayTextChange('')
  }


  // value prop 변경 시 displayText 업데이트
  useEffect(() => {
    if (value !== prevValueRef.current) {
      setDisplayText(value)
      prevValueRef.current = value
    }
  }, [value])

  // 밖을 클릭했을 때 autocomplete 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        // + 버튼이 아닌 경우에만 닫기
        const target = event.target as HTMLElement
        const plusButton = target.closest('button')
        if (!plusButton || !plusButton.querySelector('svg[data-lucide="plus"]')) {
          setShowAutocomplete(false)
        }
      }
    }

    if (showAutocomplete) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showAutocomplete])

  // displayText 변경 핸들러
  const handleDisplayTextChange = useCallback((newText: string) => {
    setDisplayText(newText)
    // 부모에게 변경사항 알림 (debounce 없이 즉시)
    onChangeRef.current(newText)
  }, [])

  // 드래그 시작
  const handleDragStart = (e: React.DragEvent, chipContent: string) => {
    if (!disabled) {
      setDraggedChip(chipContent)
      e.dataTransfer.effectAllowed = 'move'
    }
  }

  // 드래그 오버
  const handleDragOver = (e: React.DragEvent) => {
    if (!disabled) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    }
  }

  // 드롭 (칩을 텍스트 사이에 삽입)
  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    if (draggedChip && !disabled) {
      // 드래그된 칩을 원래 위치에서 제거
      const originalIndex = displayText.indexOf(draggedChip)
      if (originalIndex !== -1) {
        const beforeChip = displayText.slice(0, originalIndex)
        const afterChip = displayText.slice(originalIndex + draggedChip.length)
        const textWithoutChip = beforeChip + afterChip
        
        // 원래 위치가 타겟 위치보다 앞에 있으면 인덱스 조정
        let adjustedTargetIndex = targetIndex
        if (originalIndex < targetIndex) {
          adjustedTargetIndex = targetIndex - draggedChip.length
        }
        
        // 타겟 인덱스가 유효한 범위 내에 있는지 확인
        adjustedTargetIndex = Math.max(0, Math.min(adjustedTargetIndex, textWithoutChip.length))
        
        // 새로운 위치에 칩 삽입
        const beforeTarget = textWithoutChip.slice(0, adjustedTargetIndex)
        const afterTarget = textWithoutChip.slice(adjustedTargetIndex)
        const newText = beforeTarget + draggedChip + afterTarget
        
        handleDisplayTextChange(newText)
      }
      setDraggedChip(null)
    }
  }


  // 텍스트 필드에서 키 입력 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === '{' || e.key === '[' || e.key === '#') {
      e.preventDefault()
      setShowAutocomplete(true)
    } else if (e.key === 'Backspace') {
      // 백스페이스 처리 - 커서 바로 앞에 칩이 있으면 칩 전체 삭제
      const inputElement = e.target as HTMLInputElement
      const cursorPos = inputElement.selectionStart || 0
      
      // 커서 바로 앞에 칩이 있는지 확인
      for (const option of options) {
        const chipStart = displayText.lastIndexOf(option, cursorPos - 1)
        if (chipStart !== -1 && chipStart + option.length === cursorPos) {
          // 커서 바로 앞에 칩이 있으면 칩 전체 삭제
          e.preventDefault()
          const beforeChip = displayText.slice(0, chipStart)
          const afterChip = displayText.slice(cursorPos)
          const newText = beforeChip + afterChip
          handleDisplayTextChange(newText)
          
          // 커서 위치를 칩 삭제 후 위치로 이동
          setTimeout(() => {
            inputElement.setSelectionRange(chipStart, chipStart)
            inputElement.focus()
          }, 0)
          return
        }
      }
      // 칩이 아닌 경우에는 기본 백스페이스 동작 허용 (글자 단위 삭제)
      // 기본 백스페이스 동작을 허용하므로 preventDefault() 호출하지 않음
    }
  }



  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* 메인 입력 영역 */}
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          border: disabled
            ? '1px solid hsl(var(--color-border)) !important'
            : '1px solid rgba(0, 0, 0, 0.23)',
          borderRadius: '4px',
          padding: '8px',
          minHeight: '40px',
          backgroundColor: disabled
            ? 'rgb(241, 245, 249)'
            : 'white',
          color: disabled
            ? 'rgba(0, 0, 0, 0.38)'
            : 'rgba(0, 0, 0, 0.87)',
          cursor: disabled ? 'default' : 'text',
          flexWrap: 'wrap',
          '&:hover': {
            borderColor: disabled
              ? 'hsl(var(--color-border)) !important'
              : 'rgba(0, 0, 0, 0.87)',
          },
          '&:focus-within': {
            borderColor: disabled
              ? 'hsl(var(--color-border)) !important'
              : '#1976d2',
            borderWidth: disabled ? '1px' : '2px',
          },
          transition: 'border-color 0.2s',
        }}
        onClick={!disabled ? () => textFieldRef.current?.focus() : undefined}
      >
        {/* 파싱된 내용 렌더링 */}
        {parseText(displayText).map((part, index) => (
          <React.Fragment key={index}>
            {part.type === 'chip' ? (
              <Chip
                label={part.content}
                size="small"
                color="primary"
                draggable={!disabled}
                onDragStart={(e) => handleDragStart(e, part.content)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, part.startIndex)}
                onDelete={!disabled ? () => {
                  // 칩 삭제 - 텍스트에서 해당 칩 내용을 제거
                  const newText = displayText.replace(part.content, '')
                  handleDisplayTextChange(newText)
                } : undefined}
                sx={{
                  cursor: disabled ? 'default' : 'grab',
                  '&:active': {
                    cursor: disabled ? 'default' : 'grabbing'
                  }
                }}
              />
            ) : (
              <span 
                style={{ fontSize: '13px' }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, part.startIndex)}
              >
                {part.content}
              </span>
            )}
          </React.Fragment>
        ))}

        {/* 텍스트 입력 영역 */}
        <div
          style={{
            flex: 1,
            minWidth: '100px',
            height: '20px',
            cursor: 'text'
          }}
          onClick={() => {
            const textField = textFieldRef.current
            if (textField) {
              const inputElement = textField.querySelector('input')
              if (inputElement) {
                inputElement.focus()
              }
            }
          }}
        />

        {/* 숨겨진 텍스트 입력 필드 */}
        <TextField
          ref={textFieldRef}
          value={displayText}
          onChange={(e) => {
            handleDisplayTextChange(e.target.value)
          }}
          onKeyDown={handleKeyDown}
          placeholder={displayText === '' ? placeholder : ''}
          disabled={disabled}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            style: { 
              fontSize: '13px',
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              opacity: 0
            }
          }}
          sx={{ 
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            opacity: 0,
            '& .MuiInput-root': {
              '&:before': { display: 'none' },
              '&:after': { display: 'none' }
            }
          }}
        />

        {/* X 초기화 버튼과 + 버튼 - 오른쪽 끝에 고정 */}
        {!disabled && (
          <>
            {displayText && (
              <IconButton
                size="small"
                onClick={handleClear}
                sx={{
                  flexShrink: 0,
                  marginLeft: 'auto'
                }}
              >
                <X size={14} />
              </IconButton>
            )}
            <IconButton
              size="small"
              onClick={() => setShowAutocomplete(!showAutocomplete)}
              sx={{
                flexShrink: 0
              }}
            >
              <Plus size={14} />
            </IconButton>
          </>
        )}
      </Box>

      {/* Autocomplete 드롭다운 */}
      {showAutocomplete && !disabled && (
        <Box
          ref={autocompleteRef}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}
        >
          {options
            .map((option) => (
              <Box
                key={option}
                onClick={() => handleAddChip(option)}
                sx={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                {option}
              </Box>
            ))}
        </Box>
      )}
    </Box>
  )
}

export default FormulaInput
