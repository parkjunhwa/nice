'use client'

import { useEffect, useRef } from 'react'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import '@/components/table/table-common.scss'

interface SampleTableProps {
  className?: string
  height?: string | number
}

export default function SampleTable({
  className = '',
  height = 300
}: SampleTableProps) {
  const tableRef = useRef<HTMLDivElement>(null)
  const tabulatorRef = useRef<Tabulator | null>(null)

  // 샘플 데이터
  const sampleData = [
    { header1: '예시', header2: '예시', header3: '예시' },
    { header1: '예시', header2: '예시', header3: '예시' },
    { header1: '예시', header2: '예시', header3: '예시' },
    { header1: '예시', header2: '예시', header3: '예시' },
    { header1: '예시', header2: '예시', header3: '예시' }
  ]

  // 컬럼 정의
  const columns = [
    { title: '헤더1', field: 'header1', width: 150, headerSort: true, headerSortTristate: true },
    { title: '헤더2', field: 'header2', width: 150, headerSort: true, headerSortTristate: true },
    { title: '헤더3', field: 'header3', width: 150, headerSort: true, headerSortTristate: true }
  ]

  useEffect(() => {
    if (!tableRef.current) return

    if (tabulatorRef.current) {
      tabulatorRef.current.destroy()
    }

    tabulatorRef.current = new Tabulator(tableRef.current, {
      data: sampleData,
      columns: columns,
      height: height,
      layout: 'fitColumns',
      headerVisible: true,
      scrollToColumnIfVisible: true,
      scrollToColumnPosition: 'left',
      sortMode: 'local',
      initialSort: [{ column: 'header1', dir: 'asc' }],
      pagination: false,
      rowFormatter: (row: { getElement: () => HTMLElement; getPosition: () => number | false }) => {
        const element = row.getElement()
        element.style.transition = 'all 0.2s ease'
        const position = row.getPosition()
        if (typeof position === 'number' && position % 2 === 0) {
          element.style.backgroundColor = '#f9fafb'
        }
      }
    })

    return () => {
      if (tabulatorRef.current) {
        tabulatorRef.current.destroy()
        tabulatorRef.current = null
      }
    }
  }, [height, columns, sampleData])

  return (
    <div className={`sample-table ${className}`}>
      <div ref={tableRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
