'use client'

import { useEffect, useRef } from 'react'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import '@/components/table/table-common.scss'

interface TabulatorTableProps {
  data?: any[]
  columns?: any[]
  height?: string | number
  className?: string
  onAction?: (action: string, rowData: any) => void
}

export default function TabulatorTable({
  className = '',
  height = 300,
  data,
  columns,
  onAction
}: TabulatorTableProps) {
  const tableRef = useRef<HTMLDivElement>(null)
  const tabulatorRef = useRef<Tabulator | null>(null)

  // 샘플 데이터
  const sampleData = [
    {
      id: 1, name: '김철수', email: 'kim@example.com', phone: '010-1234-5678',
      address: '서울시 강남구 테헤란로 123', age: 30, department: '개발팀',
      position: '시니어 개발자', salary: 8000000, joinDate: '2020-01-15',
      status: '활성', project: '웹사이트 리뉴얼', manager: '박영희',
      location: '서울', skills: 'React, TypeScript, Node.js', experience: '5년',
      education: '컴퓨터공학 학사', certification: 'AWS Solutions Architect',
      language: '영어, 일본어', lastLogin: '2024-01-15 09:30:00'
    },
    {
      id: 2, name: '이영희', email: 'lee@example.com', phone: '010-2345-6789',
      address: '서울시 서초구 서초대로 456', age: 28, department: '디자인팀',
      position: 'UI/UX 디자이너', salary: 6500000, joinDate: '2021-03-20',
      status: '활성', project: '모바일 앱 디자인', manager: '최민수',
      location: '서울', skills: 'Figma, Adobe XD, Sketch', experience: '3년',
      education: '시각디자인 학사', certification: 'Adobe Certified Expert',
      language: '영어', lastLogin: '2024-01-15 08:45:00'
    },
    {
      id: 3, name: '박민수', email: 'park@example.com', phone: '010-3456-7890',
      address: '경기도 성남시 분당구 판교역로 789', age: 35, department: '기획팀',
      position: '프로덕트 매니저', salary: 9000000, joinDate: '2019-07-10',
      status: '활성', project: '신규 서비스 기획', manager: '정수진',
      location: '경기', skills: 'Product Management, Analytics', experience: '7년',
      education: '경영학 석사', certification: 'PMP',
      language: '영어, 중국어', lastLogin: '2024-01-15 10:15:00'
    },
    {
      id: 4, name: '최수진', email: 'choi@example.com', phone: '010-4567-8901',
      address: '인천시 연수구 컨벤시아대로 321', age: 32, department: '마케팅팀',
      position: '마케팅 매니저', salary: 7500000, joinDate: '2020-09-05',
      status: '활성', project: '브랜드 캠페인', manager: '김대표',
      location: '인천', skills: 'Digital Marketing, SEO', experience: '6년',
      education: '광고홍보학 학사', certification: 'Google Analytics',
      language: '영어, 스페인어', lastLogin: '2024-01-15 11:20:00'
    },
    {
      id: 5, name: '정대표', email: 'jung@example.com', phone: '010-5678-9012',
      address: '부산시 해운대구 센텀중앙로 654', age: 40, department: '경영진',
      position: '대표이사', salary: 15000000, joinDate: '2018-01-01',
      status: '활성', project: '전체 경영', manager: '이사회',
      location: '부산', skills: 'Leadership, Strategy', experience: '12년',
      education: '경영학 박사', certification: 'CEO 인증',
      language: '영어, 일본어, 중국어', lastLogin: '2024-01-15 07:00:00'
    }
  ]

  // 샘플 컬럼 정의
  const sampleColumns = [
    { title: 'ID', field: 'id', width: 60, headerSort: true, headerSortTristate: true },
    { title: '이름', field: 'name', width: 100, headerSort: true, headerSortTristate: true },
    { title: '이메일', field: 'email', width: 180, headerSort: true, headerSortTristate: true },
    { title: '전화번호', field: 'phone', width: 130, headerSort: true, headerSortTristate: true },
    { title: '주소', field: 'address', width: 200, headerSort: true, headerSortTristate: true },
    { title: '나이', field: 'age', width: 60, headerSort: true, headerSortTristate: true },
    { title: '부서', field: 'department', width: 100, headerSort: true, headerSortTristate: true },
    { title: '직급', field: 'position', width: 120, headerSort: true, headerSortTristate: true },
    { 
      title: '연봉', field: 'salary', width: 100, headerSort: true, headerSortTristate: true,
      formatter: (cell: any) => new Intl.NumberFormat('ko-KR').format(cell.getValue()) + '원'
    },
    { title: '입사일', field: 'joinDate', width: 100, headerSort: true, headerSortTristate: true },
    { title: '상태', field: 'status', width: 80, headerSort: true, headerSortTristate: true },
    { title: '프로젝트', field: 'project', width: 150, headerSort: true, headerSortTristate: true },
    { title: '상급자', field: 'manager', width: 100, headerSort: true, headerSortTristate: true },
    { title: '근무지', field: 'location', width: 80, headerSort: true, headerSortTristate: true },
    { title: '기술스택', field: 'skills', width: 200, headerSort: true, headerSortTristate: true },
    { title: '경력', field: 'experience', width: 80, headerSort: true, headerSortTristate: true },
    { title: '학력', field: 'education', width: 120, headerSort: true, headerSortTristate: true },
    { title: '자격증', field: 'certification', width: 150, headerSort: true, headerSortTristate: true },
    { title: '언어', field: 'language', width: 120, headerSort: true, headerSortTristate: true },
    { title: '마지막 로그인', field: 'lastLogin', width: 150, headerSort: true, headerSortTristate: true },
    {
      title: '액션', field: 'actions', width: 120, headerSort: false,
      formatter: () => `
        <div class="action-buttons">
          <button class="action-btn view-btn" title="보기">👁</button>
          <button class="action-btn edit-btn" title="편집">✏️</button>
          <button class="action-btn delete-btn" title="삭제">🗑️</button>
        </div>
      `
    }
  ]

  useEffect(() => {
    if (!tableRef.current) return

    if (tabulatorRef.current) {
      tabulatorRef.current.destroy()
    }

    tabulatorRef.current = new Tabulator(tableRef.current, {
      data: data || sampleData,
      columns: columns || sampleColumns,
      height: height,
      layout: 'fitColumns',
      headerVisible: true,
      scrollToColumnIfVisible: true,
      scrollToColumnPosition: 'left',
      sortMode: 'local',
      initialSort: [{ column: 'id', dir: 'asc' }],
      pagination: true,
      paginationMode: 'local',
      paginationSize: 10,
      paginationSizeSelector: [5, 10, 20, 50],
      paginationCounter: 'rows',
      paginationElement: '<div class="pagination-wrapper"></div>',
      paginationAddRow: 'page',
      rowFormatter: (row: any) => {
        const element = row.getElement()
        element.style.transition = 'all 0.2s ease'
        if (row.getPosition() % 2 === 0) {
          element.style.backgroundColor = '#f9fafb'
        }
      }
    })

    // 테이블이 완성된 후 스크롤 동기화 설정
    tabulatorRef.current.on('tableBuilt', () => {
      const tableElement = tableRef.current
      if (!tableElement) return

      const headerElement = tableElement.querySelector('.tabulator-header')
      const tableholderElement = tableElement.querySelector('.tabulator-tableholder')
      
      if (headerElement && tableholderElement) {
        const syncScroll = () => {
          const scrollLeft = tableholderElement.scrollLeft
          headerElement.scrollLeft = scrollLeft
        }
        tableholderElement.addEventListener('scroll', syncScroll)
      }
    })

    const handleActionClick = (e: Event) => {
      const target = e.target as HTMLElement
      const button = target.closest('.action-btn')
      if (!button) return

      const row = button.closest('.tabulator-row')
      if (!row) return

      const rowData = tabulatorRef.current?.getRowFromElement(row)?.getData()
      if (!rowData) return

      if (button.classList.contains('view-btn')) {
        onAction?.('view', rowData)
      } else if (button.classList.contains('edit-btn')) {
        onAction?.('edit', rowData)
      } else if (button.classList.contains('delete-btn')) {
        if (confirm(`정말로 ${rowData.name}을(를) 삭제하시겠습니까?`)) {
          tabulatorRef.current?.deleteRow(rowData.id)
        }
      }
    }

    tableRef.current.addEventListener('click', handleActionClick)

    return () => {
      if (tabulatorRef.current) {
        tabulatorRef.current.destroy()
        tabulatorRef.current = null
      }
      if (tableRef.current) {
        tableRef.current.removeEventListener('click', handleActionClick)
      }
    }
  }, [data, columns, height, onAction])

  return (
    <div className={`tabulator-table ${className}`}>
      <div ref={tableRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}