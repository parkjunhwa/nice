'use client'

import { useEffect, useRef, useMemo, useState, useCallback } from 'react'
import { TabulatorFull as Tabulator, ColumnDefinition, CellComponent } from 'tabulator-tables'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import '@/components/table/table-common.scss'

interface SampleTableProps {
  className?: string
  height?: string | number
  showPagination?: boolean
  pageSize?: number
  data?: Record<string, unknown>[]
  columns?: ColumnDefinition[]
  enableHorizontalScroll?: boolean
  enableVerticalScroll?: boolean
  layout?: 'fitColumns' | 'fitDataFill' | 'fitData'
}

export default function SampleTable({
  className = '',
  height = '100%',
  showPagination = true,
  pageSize: initialPageSize = 10,
  data: customData,
  columns: customColumns,
  enableHorizontalScroll = true,
  enableVerticalScroll = true,
  layout = 'fitColumns'
}: SampleTableProps) {
  const tableRef = useRef<HTMLDivElement>(null)
  const tabulatorRef = useRef<Tabulator | null>(null)

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [totalPages, setTotalPages] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [isAllSelected, setIsAllSelected] = useState(false)

  // Lucide 아이콘 렌더링 함수
  const renderLucideIcon = (iconName: string) => {
    const iconMap: Record<string, string> = {
      'check-square': '<div class="mui-checkbox-icon checked"></div>',
      'square': '<div class="mui-checkbox-icon unchecked"></div>'
    }
    return iconMap[iconName] || ''
  }

  // 커스텀 에디터 (검색 아이콘이 있는 input)
  const searchEditor = useCallback((
    cell: { getValue: () => string | number },
    onRendered: (cb: () => void) => void,
    success: (value: string | number) => void,
    cancel: () => void,
  ) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'table-editor-wrapper'

    const input = document.createElement('input')
    input.type = 'text'
    input.value = String(cell.getValue() ?? '')
    input.className = 'table-editor-input'
    input.placeholder = '검색...'

    const icon = document.createElement('button')
    icon.type = 'button'
    icon.className = 'table-search-icon'
    icon.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>'
    icon.title = '검색'

    wrapper.appendChild(input)
    wrapper.appendChild(icon)

    onRendered(() => {
      input.focus()
      input.select()

      // Enter: 확정, Esc: 취소
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.stopPropagation()
          success(input.value)
        } else if (e.key === 'Escape') {
          e.stopPropagation()
          cancel()
        }
      })

      // blur 되면 값 확정 (버튼 클릭이 아닐 때만)
      let isButtonClicked = false
      input.addEventListener('blur', () => {
        if (!isButtonClicked) {
          success(input.value)
        }
      })

      // 아이콘 클릭 시 검색 알림 후 편집 종료
      icon.addEventListener('click', (e) => {
        e.stopPropagation()
        e.preventDefault()
        isButtonClicked = true

        const v = input.value.trim()
        alert(v ? `검색어: "${v}"` : '검색어를 입력해주세요.')

        // 알림 닫힌 후 편집 종료
        setTimeout(() => {
          success(input.value)
          isButtonClicked = false
        }, 100)
      })

      // 마우스 다운 이벤트도 추가 (blur 이전에 처리)
      icon.addEventListener('mousedown', (e) => {
        e.preventDefault()
        isButtonClicked = true
      })
    })

    return wrapper
  }, [])

  // 커스텀 에디터 (select)
  const selectEditor = useCallback((
    cell: { getValue: () => string | number },
    onRendered: (cb: () => void) => void,
    success: (value: string | number) => void,
    cancel: () => void,
  ) => {
    const select = document.createElement('select')
    select.className = 'table-editor-select'

    const options = ['활성', '비활성', '대기', '완료', '진행중']
    options.forEach((option) => {
      const opt = document.createElement('option')
      opt.value = option
      opt.textContent = option
      opt.selected = cell.getValue() === option
      select.appendChild(opt)
    })

    const wrapper = document.createElement('div')
    wrapper.className = 'table-editor-select-wrapper'
    
    // 화살표 아이콘 추가
    const arrowIcon = document.createElement('span')
    arrowIcon.className = 'table-select-arrow-icon'
    arrowIcon.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    `
    
    wrapper.appendChild(select)
    wrapper.appendChild(arrowIcon)

    onRendered(() => {
      select.focus()

      // 포커스 시 열린 상태로 가정 (드롭다운 표시 준비)
      const handleFocus = () => {
        arrowIcon.classList.add('open')
      }
      
      // mousedown 이벤트로 클릭 시 열림
      const handleMouseDown = () => {
        // 클릭 시 열린 상태로 설정 (드롭다운이 열림)
        setTimeout(() => {
          arrowIcon.classList.add('open')
        }, 0)
      }
      
      // blur 시 닫힌 상태로 설정
      const handleBlur = () => {
        // 약간의 지연을 두어 change 이벤트가 먼저 처리되도록
        setTimeout(() => {
          arrowIcon.classList.remove('open')
        }, 150)
        success(select.value)
      }

      // 값 선택 시 닫힌 상태로 전환
      const handleChange = (e: Event) => {
        e.stopPropagation()
        arrowIcon.classList.remove('open')
        success(select.value)
      }

      select.addEventListener('focus', handleFocus)
      select.addEventListener('mousedown', handleMouseDown)
      select.addEventListener('blur', handleBlur)
      select.addEventListener('change', handleChange)

      // Enter: 확정, Esc: 취소
      select.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.stopPropagation()
          arrowIcon.classList.remove('open')
          success(select.value)
        } else if (e.key === 'Escape') {
          e.stopPropagation()
          arrowIcon.classList.remove('open')
          cancel()
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          // 방향키로 옵션 탐색 시 열린 상태로 가정
          arrowIcon.classList.add('open')
        }
      })
    })

    return wrapper
  }, [])

  // 날짜 형식 검증 함수 (yyyy-mm-dd 형식만 허용)
  const validateDate = (value: string): boolean => {
    if (!value || value.trim() === '') return true // 빈 값은 허용
    
    // yyyy-mm-dd 형식만 허용
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    
    // 패턴 매칭 확인
    if (!datePattern.test(value)) return false
    
    // 입력값 파싱하여 검증
    const parts = value.split('-')
    const year = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10)
    const day = parseInt(parts[2], 10)
    
    // 월과 일 범위 확인
    if (month < 1 || month > 12 || day < 1 || day > 31) return false
    
    // 실제 날짜 객체로 재검증
    const testDate = new Date(year, month - 1, day)
    return (
      testDate.getFullYear() === year &&
      testDate.getMonth() === month - 1 &&
      testDate.getDate() === day
    )
  }

  // 커스텀 에디터 (날짜 입력 - datepicker 없이)
  const dateEditor = useCallback((
    cell: CellComponent,
    onRendered: (cb: () => void) => void,
    success: (value: string | number) => void,
    cancel: () => void,
  ) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'table-editor-wrapper date-editor-wrapper'

    const input = document.createElement('input')
    input.type = 'text'
    input.value = String(cell.getValue() ?? '')
    input.className = 'table-editor-input'
    input.placeholder = 'yyyy-mm-dd (예: 2024-01-15)'

    wrapper.appendChild(input)

    // 셀 요소 찾기
    const getCellElement = (): HTMLElement | null => {
      return cell.getElement()
    }

    const validateAndShowError = (value: string): boolean => {
      const isValid = validateDate(value)
      const cellElement = getCellElement()
      
      if (!isValid && value.trim() !== '') {
        // 셀 테두리를 빨간색으로 변경 (편집 모드의 파란색 대신)
        if (cellElement) {
          cellElement.style.setProperty('border', '2px solid #ef4444', 'important')
        }
      } else {
        // 셀 테두리를 원래대로 (파란색 편집 모드 테두리로 복원)
        if (cellElement) {
          cellElement.style.border = ''
          cellElement.style.removeProperty('border')
        }
      }
      return isValid || value.trim() === ''
    }

    onRendered(() => {
      input.focus()
      input.select()

      // 숫자와 날짜 구분자(-, /, .)만 입력 가능하도록 제한
      input.addEventListener('keydown', (e) => {
        // 허용된 키: 숫자, 구분자(-, /, .), 백스페이스, Delete, 화살표, Tab, Enter, Escape
        const allowedKeys = [
          'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
          'Tab', 'Enter', 'Escape', 'Home', 'End'
        ]
        
        // 숫자 키 (0-9)
        const isNumber = (e.key >= '0' && e.key <= '9')
        
        // 구분자 키 (하이픈만 허용)
        const isSeparator = e.key === '-'
        
        // 허용된 키
        const isAllowedKey = allowedKeys.includes(e.key)
        
        // Ctrl/Cmd + A, C, V, X, Z (복사/붙여넣기/실행취소용)
        const isCtrlKey = (e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())
        
        if (!isNumber && !isSeparator && !isAllowedKey && !isCtrlKey) {
          e.preventDefault()
        }
      })

      // 붙여넣기 이벤트 처리 (숫자와 하이픈만 허용)
      input.addEventListener('paste', (e) => {
        e.preventDefault()
        const pasteText = e.clipboardData?.getData('text') || ''
        // 숫자와 하이픈만 필터링
        const filtered = pasteText.replace(/[^\d\-]/g, '')
        const currentValue = input.value
        const start = input.selectionStart || 0
        const end = input.selectionEnd || 0
        const newValue = currentValue.substring(0, start) + filtered + currentValue.substring(end)
        input.value = newValue
        input.setSelectionRange(start + filtered.length, start + filtered.length)
        validateAndShowError(newValue)
      })

      // 실시간 검증
      input.addEventListener('input', (e) => {
        const value = (e.target as HTMLInputElement).value
        validateAndShowError(value)
      })

      // Enter: 확정 (유효한 경우만)
      input.addEventListener('keydown', (e) => {
        const cellElement = getCellElement()
        
        if (e.key === 'Enter') {
          e.stopPropagation()
          const value = input.value.trim()
          if (validateDate(value) || value === '') {
            // 셀 테두리를 원래대로 복원
            if (cellElement) {
              cellElement.style.border = ''
              cellElement.style.removeProperty('border')
            }
            
            success(value)
          } else {
            e.preventDefault()
            
            // 셀 테두리를 빨간색으로 변경
            if (cellElement) {
              cellElement.style.setProperty('border', '2px solid #ef4444', 'important')
            }
            
            input.focus()
          }
        } else if (e.key === 'Escape') {
          e.stopPropagation()
          
          // 셀 테두리를 원래대로 복원
          if (cellElement) {
            cellElement.style.border = ''
            cellElement.style.removeProperty('border')
          }
          
          cancel()
        }
      })

      // blur 되면 값 확정 (유효한 경우만)
      input.addEventListener('blur', () => {
        const cellElement = getCellElement()
        const value = input.value.trim()
        
        if (validateDate(value) || value === '') {
          // 셀 테두리를 원래대로 복원
          if (cellElement) {
            cellElement.style.border = ''
            cellElement.style.removeProperty('border')
          }
          
          success(value)
        } else {
          // 유효하지 않으면 에러 표시 (빨간색 테두리만)
          if (cellElement) {
            cellElement.style.setProperty('border', '2px solid #ef4444', 'important')
          }
        }
      })
    })

    return wrapper
  }, [])

  // 헤더 메뉴 정의 (컬럼 표시/숨김 토글)
  const headerMenu = useCallback(function (this: { getColumns: () => Array<{ isVisible: () => boolean; toggle: () => void; getDefinition: () => { title: string } }> }) {
    const menu: Array<{ label: HTMLElement; action: (e: Event) => void }> = [];
    const columns = this.getColumns();

    for (const column of columns) {
      // create checkbox element using lucide icons
      const icon = document.createElement("span");
      icon.innerHTML = column.isVisible() ? renderLucideIcon('check-square') : renderLucideIcon('square');
      icon.style.marginRight = "8px";

      // build label
      const label = document.createElement("span");
      const title = document.createElement("span");

      title.textContent = " " + column.getDefinition().title;

      label.appendChild(icon);
      label.appendChild(title);

      // create menu item
      menu.push({
        label: label,
        action: function (e: Event) {
          // prevent menu closing
          e.stopPropagation();

          // toggle current column visibility
          column.toggle();

          // change menu item icon
          if (column.isVisible()) {
            icon.innerHTML = renderLucideIcon('check-square');
          } else {
            icon.innerHTML = renderLucideIcon('square');
          }
        }
      });
    }

    return menu;
  }, []);


  // 데이터 (커스텀 데이터가 있으면 사용, 없으면 샘플 데이터)
  const tableData = useMemo(() => {
    if (customData) return customData

    const data = []
    const names = ['김철수', '이영희', '박민수', '최지영', '정현우', '한소영', '윤태호', '강미래', '임동현', '서유진']
    const statuses = ['활성', '비활성', '대기', '완료', '진행중']
    const categories = ['개발', '디자인', '마케팅', '영업', '관리', '고객지원', '품질관리', '운영']

    for (let i = 1; i <= 50; i++) {
      const randomDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      // yyyy-mm-dd 형식으로 변환
      const year = randomDate.getFullYear()
      const month = String(randomDate.getMonth() + 1).padStart(2, '0')
      const day = String(randomDate.getDate()).padStart(2, '0')
      const formattedDate = `${year}-${month}-${day}`
      data.push({
        id: i,
        header1: names[i % names.length],
        header2: `${Math.floor(Math.random() * 1000) + 100}만원`,
        header3: categories[i % categories.length],
        header4: statuses[i % statuses.length],
        header5: formattedDate,
        header6: `user${i}@company.com`,
        header7: categories[Math.floor(Math.random() * categories.length)],
        header8: `프로젝트 ${i}`,
        header9: `${Math.floor(Math.random() * 100)}%`,
        header10: `부서 ${Math.floor(i / 10) + 1}`
      })
    }
    return data
  }, [customData])

  // 전체선택 핸들러
  const handleSelectAll = useCallback(() => {
    if (tabulatorRef.current) {
      if (isAllSelected) {
        // 전체 선택 해제
        tabulatorRef.current.deselectRow()
        setIsAllSelected(false)
      } else {
        // 전체 선택
        tabulatorRef.current.selectRow()
        setIsAllSelected(true)
      }
    }
  }, [isAllSelected])

  // 컬럼 정의 (커스텀 컬럼이 있으면 사용, 없으면 기본 컬럼)
  const tableColumns = useMemo(() => {
    if (customColumns) return customColumns

    const allColumns = [
      {
        title: `<input type="checkbox" aria-label="Select All" class="select-all-checkbox" ${isAllSelected ? 'checked' : ''}>`,
        field: 'select',
        width: 50,
        headerSort: false,
        formatter: 'rowSelection',
        headerClick: handleSelectAll,
        hozAlign: 'center',
        frozen: true,
      },
      { title: 'ID', field: 'id', width: 100, headerSort: true, headerSortTristate: true, headerMenu: headerMenu },
      { title: '헤더1', field: 'header1', width: 150, headerSort: true, headerSortTristate: true, editor: 'input' as const, headerMenu: headerMenu },
      { title: '헤더2', field: 'header2', width: 150, headerSort: true, headerSortTristate: true },
      {
        title: '헤더3',
        field: 'header3',
        width: 150,
        headerSort: true,
        headerSortTristate: true,
        headerMenu: headerMenu,
        // ✅ 보기 모드에서 희미한 검색 아이콘을 표시
        formatter: (cell: CellComponent) => {
          const v = cell.getValue() ?? ''
          return `
      <div class="cell-with-search-hint">
        <span class="cell-text">${String(v)}</span>
        <span class="table-search-icon hint" aria-hidden="true" title="검색">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </span>
      </div>
    `
        },
        editor: searchEditor,
        clickEdit: true
      },
      {
        title: '상태',
        field: 'header4',
        width: 120,
        headerSort: true,
        headerSortTristate: true,
        headerMenu: headerMenu,
        // ✅ 보기 모드에서 희미한 화살표 아이콘을 표시
        formatter: (cell: CellComponent) => {
          const v = cell.getValue() ?? ''
          return `
      <div class="cell-with-search-hint">
        <span class="cell-text">${String(v)}</span>
        <span class="table-search-icon hint" aria-hidden="true" title="선택">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    `
        },
        editor: selectEditor,
        clickEdit: true
      },
      {
        title: '날짜',
        field: 'header5',
        width: 180,
        headerSort: true,
        headerSortTristate: true,
        headerMenu: headerMenu,
        editor: dateEditor,
        clickEdit: true
      },
      { title: '사용자', field: 'header6', width: 140, headerSort: false, headerMenu: headerMenu, headerHozAlign: 'center' },
      { title: '카테고리', field: 'header7', width: 160, headerSort: true, headerSortTristate: true, headerMenu: headerMenu },
      { title: '추가컬럼1', field: 'header8', width: 150, headerSort: true, headerSortTristate: true, headerMenu: headerMenu },
      { title: '추가컬럼2', field: 'header9', width: 150, headerSort: true, headerSortTristate: true, headerMenu: headerMenu },
      { title: '추가컬럼3', field: 'header10', width: 150, headerSort: true, headerSortTristate: true, headerMenu: headerMenu, frozen: true }
    ]

    return allColumns
  }, [customColumns, headerMenu, handleSelectAll, isAllSelected, searchEditor, selectEditor, dateEditor])

  // 페이지네이션된 데이터 계산
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return tableData.slice(startIndex, endIndex)
  }, [tableData, currentPage, pageSize])

  useEffect(() => {
    if (!tableRef.current) return

    if (tabulatorRef.current) {
      tabulatorRef.current.destroy()
    }

    // 총 페이지 수 계산
    const total = Math.ceil(tableData.length / pageSize)
    setTotalPages(total)
    setTotalRecords(tableData.length)

    tabulatorRef.current = new Tabulator(tableRef.current, {
      data: paginatedData,
      columns: tableColumns,
      height: '100%',
      layout: layout,
      headerVisible: true,
      scrollToColumnIfVisible: enableHorizontalScroll,
      scrollToColumnPosition: 'left',
      sortMode: 'local',
      initialSort: [{ column: 'id', dir: 'asc' }],
      pagination: false, // 커스텀 페이지네이션 사용
      rowSelection: true, // 행 선택 체크박스 활성화
      rowSelectionCheck: () => {
        // 모든 행 선택 가능
        return true
      },
      rowSelectionChanged: (data: unknown[], rows: unknown[]) => {
        // 전체선택 상태 업데이트
        const allRows = data.length
        const selectedRows = rows.length
        setIsAllSelected(allRows > 0 && selectedRows === allRows)
      },
      rowFormatter: (row: { getElement: () => HTMLElement; getPosition: () => number | false }) => {
        const element = row.getElement()
        element.style.transition = 'all 0.2s ease'
        const position = row.getPosition()
        if (typeof position === 'number' && position % 2 === 0) {
          element.style.backgroundColor = '#f9fafb'
        }
      }
    } as Record<string, unknown>)

    // 정렬 아이콘을 회전하는 화살표로 교체
    setTimeout(() => {
      const sortElements = tableRef.current?.querySelectorAll('.sort-icon-wrapper')
      sortElements?.forEach((element) => {
        const wrapper = element as HTMLElement
        wrapper.innerHTML = ''

        // 정렬 상태에 따라 회전하는 화살표 표시
        const col = wrapper.closest('.tabulator-col')
        if (col) {
          const sortAttr = col.getAttribute('aria-sort')
          const iconElement = document.createElement('div')

          // 기본 화살표 아이콘 (ChevronUp)
          iconElement.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>'

          // 정렬 상태에 따라 회전
          if (sortAttr === 'ascending') {
            iconElement.style.transform = 'rotate(180deg)' // 아래쪽 화살표 (오름차순)
          } else if (sortAttr === 'descending') {
            iconElement.style.transform = 'rotate(0deg)' // 위쪽 화살표 (내림차순)
          } else {
            iconElement.style.transform = 'rotate(0deg)' // 기본 상태
          }

          iconElement.style.color = '#ffffff'
          iconElement.style.opacity = sortAttr === 'none' ? '0' : '1'
          iconElement.style.transition = 'all 0.3s ease'
          iconElement.style.display = 'inline-flex'
          iconElement.style.alignItems = 'center'
          iconElement.style.justifyContent = 'center'

          wrapper.appendChild(iconElement)
        }
      })
    }, 100)

    return () => {
      if (tabulatorRef.current) {
        tabulatorRef.current.destroy()
        tabulatorRef.current = null
      }
    }
  }, [paginatedData, tableColumns, pageSize, tableData.length, enableHorizontalScroll, enableVerticalScroll, layout])

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  // 페이지 크기 변경 핸들러
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setCurrentPage(1) // 페이지 크기 변경 시 첫 페이지로 이동
  }

  return (
    <div className={`sample-table-container ${className} relative w-full h-full ${layout === 'fitDataFill' ? 'fit-data-fill' : ''}`} style={{ height: height, maxHeight: '100%', overflow: 'hidden' }}>

      {/* 테이블 영역 - 페이지네이션 여부에 따라 높이 조정 */}
      <div
        className={`table-area w-full ${showPagination ? 'h-[calc(100%-40px)]' : 'h-full'}`}
        style={{
          overflowX: enableHorizontalScroll ? 'auto' : 'hidden',
          overflowY: enableVerticalScroll ? 'auto' : 'hidden'
        }}
      >
        <div ref={tableRef} className="w-full h-full" />
      </div>

      {/* 페이지네이션 영역 - showPagination이 true일 때만 표시 */}
      {showPagination && (
        <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-between bg-white z-10">
          {/* 좌측: 페이지당 줄 수 선택 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">페이지당 줄 수:</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="px-2 py-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* 우측: 페이지네이션 컨트롤 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              총 {totalRecords}개 중 {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, totalRecords)}개
            </span>

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded text-sm flex items-center gap-1 transition-colors ${currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'
                }`}
            >
              <ChevronLeft size={16} />
              이전
            </button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-full text-sm transition-colors ${currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer border border-gray-300'
                      }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded text-sm flex items-center gap-1 transition-colors ${currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'
                }`}
            >
              다음
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

